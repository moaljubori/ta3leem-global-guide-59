
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all pages
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    // Build query with filters
    let query = `
      SELECT p.*, COUNT(pv.page_version_id) as version_count 
      FROM pages p
      LEFT JOIN page_versions pv ON p.page_id = pv.page_id
    `;
    
    // Filter by published status if specified
    if (req.query.published === 'true') {
      query += ` WHERE p.is_published = TRUE`;
    }
    
    // Group by page_id to count versions
    query += ` GROUP BY p.page_id`;
    
    // Add ordering
    query += ` ORDER BY p.url ASC`;
    
    // Execute query
    const [pages] = await db.query(query);
    
    res.json({ pages });
    
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: true, message: 'Server error fetching pages' });
  }
});

// Get page by URL (public endpoint)
router.get('/url/:url', async (req, res) => {
  try {
    const db = req.db;
    let url = req.params.url;
    
    // Ensure URL starts with '/'
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    
    // Get page
    const [pages] = await db.query(
      `SELECT p.* FROM pages p WHERE p.url = ? AND p.is_published = TRUE`,
      [url]
    );
    
    if (pages.length === 0) {
      return res.status(404).json({ error: true, message: 'Page not found' });
    }
    
    const page = pages[0];
    
    // Get latest version
    const [versions] = await db.query(
      `SELECT pv.* FROM page_versions pv 
       WHERE pv.page_id = ? 
       ORDER BY pv.version DESC LIMIT 1`,
      [page.page_id]
    );
    
    if (versions.length === 0) {
      return res.status(404).json({ error: true, message: 'Page version not found' });
    }
    
    const version = versions[0];
    
    // Get sections for this version
    const [sections] = await db.query(
      `SELECT s.* FROM sections s
       WHERE s.page_version_id = ? AND s.is_published = TRUE
       ORDER BY s.order ASC`,
      [version.page_version_id]
    );
    
    // Add sections to response
    page.sections = sections;
    
    // Get media for each section
    for (let i = 0; i < sections.length; i++) {
      const [media] = await db.query(
        `SELECT m.* FROM media_files m
         JOIN section_media sm ON m.file_version_id = sm.file_version_id
         WHERE sm.section_version_id = ?`,
        [sections[i].section_version_id]
      );
      
      page.sections[i].media = media;
    }
    
    res.json({ page });
    
  } catch (error) {
    console.error('Error fetching page by URL:', error);
    res.status(500).json({ error: true, message: 'Server error fetching page' });
  }
});

// Get page by ID (auth required)
router.get('/:pageId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const pageId = req.params.pageId;
    
    // Get page
    const [pages] = await db.query(
      `SELECT p.* FROM pages p WHERE p.page_id = ?`,
      [pageId]
    );
    
    if (pages.length === 0) {
      return res.status(404).json({ error: true, message: 'Page not found' });
    }
    
    const page = pages[0];
    
    // Get versions
    const [versions] = await db.query(
      `SELECT pv.* FROM page_versions pv 
       WHERE pv.page_id = ? 
       ORDER BY pv.version DESC`,
      [page.page_id]
    );
    
    page.versions = versions;
    
    // Get sections for latest version if available
    if (versions.length > 0) {
      const latestVersion = versions[0];
      
      const [sections] = await db.query(
        `SELECT s.* FROM sections s
         WHERE s.page_version_id = ?
         ORDER BY s.order ASC`,
        [latestVersion.page_version_id]
      );
      
      // Add sections to response
      page.sections = sections;
      
      // Get media for each section
      for (let i = 0; i < sections.length; i++) {
        const [media] = await db.query(
          `SELECT m.* FROM media_files m
           JOIN section_media sm ON m.file_version_id = sm.file_version_id
           WHERE sm.section_version_id = ?`,
          [sections[i].section_version_id]
        );
        
        page.sections[i].media = media;
      }
    }
    
    res.json({ page });
    
  } catch (error) {
    console.error('Error fetching page by ID:', error);
    res.status(500).json({ error: true, message: 'Server error fetching page' });
  }
});

// Create page (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const { url, title, meta_description, parent_id, order, meta_keywords, is_published, sections } = req.body;
    
    if (!url || !title) {
      return res.status(400).json({ error: true, message: 'URL and title are required' });
    }
    
    // Check if URL exists
    const [existingPages] = await db.query(
      'SELECT page_id FROM pages WHERE url = ?',
      [url]
    );
    
    if (existingPages.length > 0) {
      return res.status(400).json({ error: true, message: 'URL already exists' });
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert page
      const [pageResult] = await connection.query(
        `INSERT INTO pages 
         (url, title, meta_description, parent_id, \`order\`, meta_keywords, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [url, title, meta_description, parent_id, order, meta_keywords, is_published]
      );
      
      const pageId = pageResult.insertId;
      
      // Create initial version
      const [versionResult] = await connection.query(
        'INSERT INTO page_versions (page_id, version) VALUES (?, 1)',
        [pageId]
      );
      
      const versionId = versionResult.insertId;
      
      // Add sections if provided
      if (sections && sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const sectionId = require('uuid').v4();
          
          // Insert section
          const [sectionResult] = await connection.query(
            `INSERT INTO sections 
             (section_id, page_version_id, type, name, content, \`order\`, is_published)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [sectionId, versionId, section.type, section.name, section.content, i + 1, is_published]
          );
          
          // Add media relations if provided
          if (section.media && section.media.length > 0) {
            const mediaValues = section.media.map(mediaId => [sectionResult.insertId, mediaId]);
            
            await connection.query(
              `INSERT INTO section_media (section_version_id, file_version_id) VALUES ?`,
              [mediaValues]
            );
          }
        }
      }
      
      await connection.commit();
      
      res.status(201).json({
        success: true,
        message: 'Page created successfully',
        page_id: pageId
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: true, message: 'Server error creating page' });
  }
});

// Update page (editor or admin only)
router.put('/:pageId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const pageId = req.params.pageId;
    const { url, title, meta_description, parent_id, order, 
            meta_keywords, is_published, sections } = req.body;
    
    // Verify page exists
    const [existingPages] = await db.query(
      'SELECT * FROM pages WHERE page_id = ?',
      [pageId]
    );
    
    if (existingPages.length === 0) {
      return res.status(404).json({ error: true, message: 'Page not found' });
    }
    
    // Check if URL exists (if changed)
    if (url && url !== existingPages[0].url) {
      const [existingUrls] = await db.query(
        'SELECT page_id FROM pages WHERE url = ? AND page_id <> ?',
        [url, pageId]
      );
      
      if (existingUrls.length > 0) {
        return res.status(400).json({ error: true, message: 'URL already exists' });
      }
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Update page
      let query = 'UPDATE pages SET updated_at = NOW()';
      const params = [];
      
      if (url) {
        query += ', url = ?';
        params.push(url);
      }
      
      if (title) {
        query += ', title = ?';
        params.push(title);
      }
      
      if (meta_description !== undefined) {
        query += ', meta_description = ?';
        params.push(meta_description);
      }
      
      if (parent_id !== undefined) {
        query += ', parent_id = ?';
        params.push(parent_id);
      }
      
      if (order !== undefined) {
        query += ', `order` = ?';
        params.push(order);
      }
      
      if (meta_keywords !== undefined) {
        query += ', meta_keywords = ?';
        params.push(meta_keywords);
      }
      
      if (is_published !== undefined) {
        query += ', is_published = ?';
        params.push(is_published);
      }
      
      // Increment version
      query += ', version = version + 1';
      
      query += ' WHERE page_id = ?';
      params.push(pageId);
      
      await connection.query(query, params);
      
      // Get current version number
      const [versionInfo] = await connection.query(
        'SELECT version FROM pages WHERE page_id = ?',
        [pageId]
      );
      
      const currentVersion = versionInfo[0].version;
      
      // Create new version
      const [versionResult] = await connection.query(
        'INSERT INTO page_versions (page_id, version) VALUES (?, ?)',
        [pageId, currentVersion]
      );
      
      const versionId = versionResult.insertId;
      
      // Add sections if provided
      if (sections && sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const sectionId = section.section_id || require('uuid').v4();
          
          // Insert section
          const [sectionResult] = await connection.query(
            `INSERT INTO sections 
             (section_id, page_version_id, type, name, content, \`order\`, is_published)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [sectionId, versionId, section.type, section.name, 
             section.content, i + 1, is_published]
          );
          
          // Add media relations if provided
          if (section.media && section.media.length > 0) {
            const mediaValues = section.media.map(mediaId => [sectionResult.insertId, mediaId]);
            
            await connection.query(
              `INSERT INTO section_media (section_version_id, file_version_id) VALUES ?`,
              [mediaValues]
            );
          }
        }
      }
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Page updated successfully',
        version: currentVersion
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: true, message: 'Server error updating page' });
  }
});

// Publish/unpublish a page
router.patch('/:pageId/publish', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const pageId = req.params.pageId;
    const { is_published } = req.body;
    
    if (is_published === undefined) {
      return res.status(400).json({ error: true, message: 'Publish status is required' });
    }
    
    // Update page publish status
    await db.query(
      'UPDATE pages SET is_published = ? WHERE page_id = ?',
      [is_published, pageId]
    );
    
    res.json({
      success: true,
      message: `Page ${is_published ? 'published' : 'unpublished'} successfully`
    });
    
  } catch (error) {
    console.error('Error updating page publish status:', error);
    res.status(500).json({ error: true, message: 'Server error updating publish status' });
  }
});

// Delete page (editor or admin only)
router.delete('/:pageId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const pageId = req.params.pageId;
    
    // Verify page exists
    const [existingPages] = await db.query(
      'SELECT * FROM pages WHERE page_id = ?',
      [pageId]
    );
    
    if (existingPages.length === 0) {
      return res.status(404).json({ error: true, message: 'Page not found' });
    }
    
    // Delete page (cascades to versions and sections)
    await db.query('DELETE FROM pages WHERE page_id = ?', [pageId]);
    
    res.json({
      success: true,
      message: 'Page deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: true, message: 'Server error deleting page' });
  }
});

module.exports = router;
