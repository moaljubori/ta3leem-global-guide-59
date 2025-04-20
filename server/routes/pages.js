
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all pages
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    
    // Get published pages by default or all pages for admin/editor
    let query = `
      SELECT DISTINCT p.page_id, p.url, p.title, p.meta_description, 
             p.parent_id, p.order, p.is_published, MAX(p.version) as latest_version
      FROM pages p
      GROUP BY p.page_id
      ORDER BY p.order ASC
    `;
    
    if (req.query.published === 'true' && (!req.user || (req.user.role !== 'admin' && req.user.role !== 'editor'))) {
      query = `
        SELECT DISTINCT p.page_id, p.url, p.title, p.meta_description, 
               p.parent_id, p.order, p.is_published, MAX(p.version) as latest_version
        FROM pages p
        WHERE p.is_published = true
        GROUP BY p.page_id
        ORDER BY p.order ASC
      `;
    }
    
    const [pages] = await db.query(query);
    
    // Return pages
    res.json({ pages });
    
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: true, message: 'Server error fetching pages' });
  }
});

// Get page by ID
router.get('/:pageId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const pageId = req.params.pageId;
    const version = req.query.version || null;
    
    // Construct query based on version
    let pageQuery;
    let pageParams;
    
    if (version) {
      pageQuery = `
        SELECT p.*, pv.page_version_id 
        FROM pages p
        JOIN page_versions pv ON p.page_id = pv.page_id
        WHERE p.page_id = ? AND p.version = ?
      `;
      pageParams = [pageId, version];
    } else {
      pageQuery = `
        SELECT p.*, pv.page_version_id 
        FROM pages p
        JOIN page_versions pv ON p.page_id = pv.page_id
        WHERE p.page_id = ?
        ORDER BY p.version DESC LIMIT 1
      `;
      pageParams = [pageId];
    }
    
    const [pages] = await db.query(pageQuery, pageParams);
    
    if (pages.length === 0) {
      return res.status(404).json({ error: true, message: 'Page not found' });
    }
    
    const page = pages[0];
    
    // Get sections for this page version
    const [sections] = await db.query(
      `SELECT s.* 
       FROM sections s
       WHERE s.page_version_id = ?
       ORDER BY s.order ASC`,
      [page.page_version_id]
    );
    
    // For each section, get associated media
    for (const section of sections) {
      const [media] = await db.query(
        `SELECT m.* 
         FROM media_files m
         JOIN section_media sm ON m.file_version_id = sm.file_version_id
         WHERE sm.section_version_id = ?`,
        [section.section_version_id]
      );
      
      section.media = media;
    }
    
    // Return page with sections
    res.json({
      page: {
        ...page,
        sections
      }
    });
    
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: true, message: 'Server error fetching page' });
  }
});

// Create a new page (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  const { title, url, meta_description, meta_keywords, parent_id, order, is_published, sections } = req.body;
  
  // Validation
  if (!title || !url) {
    return res.status(400).json({ error: true, message: 'Title and URL are required' });
  }
  
  try {
    const db = req.db;
    
    // Start a transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Check if URL is already used
      const [existingPages] = await connection.query(
        'SELECT * FROM pages WHERE url = ? LIMIT 1',
        [url]
      );
      
      if (existingPages.length > 0) {
        await connection.rollback();
        return res.status(409).json({ error: true, message: 'URL is already in use' });
      }
      
      // Insert page record
      const [pageResult] = await connection.query(
        `INSERT INTO pages 
         (url, title, meta_description, meta_keywords, parent_id, order, is_published, version)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [url, title, meta_description, meta_keywords, parent_id, order, is_published || false, 1]
      );
      
      const pageId = pageResult.insertId;
      
      // Create page version
      const [pageVersionResult] = await connection.query(
        `INSERT INTO page_versions (page_id) VALUES (?)`,
        [pageId]
      );
      
      const pageVersionId = pageVersionResult.insertId;
      
      // Insert sections if provided
      if (sections && Array.isArray(sections)) {
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          
          // Insert section
          const [sectionResult] = await connection.query(
            `INSERT INTO sections 
             (section_id, page_version_id, type, name, content, order, is_published)
             VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
            [pageVersionId, section.type, section.name, section.content, i, is_published || false]
          );
          
          const sectionVersionId = sectionResult.insertId;
          
          // Handle section media if any
          if (section.media && Array.isArray(section.media)) {
            for (const mediaId of section.media) {
              await connection.query(
                `INSERT INTO section_media (section_version_id, file_version_id) VALUES (?, ?)`,
                [sectionVersionId, mediaId]
              );
            }
          }
        }
      }
      
      // Commit transaction
      await connection.commit();
      
      // Return success response
      res.status(201).json({
        success: true,
        message: 'Page created successfully',
        page_id: pageId
      });
      
    } catch (error) {
      // Rollback on error
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

// Update a page (editor or admin only)
router.put('/:pageId', isAuthenticated, isEditor, async (req, res) => {
  const pageId = req.params.pageId;
  const { title, url, meta_description, meta_keywords, parent_id, order, is_published, sections } = req.body;
  
  try {
    const db = req.db;
    
    // Start a transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Get current page version
      const [currentVersions] = await connection.query(
        'SELECT MAX(version) as current_version FROM pages WHERE page_id = ?',
        [pageId]
      );
      
      if (currentVersions.length === 0 || !currentVersions[0].current_version) {
        await connection.rollback();
        return res.status(404).json({ error: true, message: 'Page not found' });
      }
      
      const newVersion = currentVersions[0].current_version + 1;
      
      // Check if URL is already used by a different page
      if (url) {
        const [existingPages] = await connection.query(
          'SELECT * FROM pages WHERE url = ? AND page_id != ? LIMIT 1',
          [url, pageId]
        );
        
        if (existingPages.length > 0) {
          await connection.rollback();
          return res.status(409).json({ error: true, message: 'URL is already in use by another page' });
        }
      }
      
      // Insert new version of the page
      await connection.query(
        `INSERT INTO pages 
         (page_id, url, title, meta_description, meta_keywords, parent_id, order, is_published, version)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          pageId, 
          url, 
          title, 
          meta_description, 
          meta_keywords, 
          parent_id, 
          order, 
          is_published || false, 
          newVersion
        ]
      );
      
      // Create page version
      const [pageVersionResult] = await connection.query(
        `INSERT INTO page_versions (page_id) VALUES (?)`,
        [pageId]
      );
      
      const pageVersionId = pageVersionResult.insertId;
      
      // Insert sections if provided
      if (sections && Array.isArray(sections)) {
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          
          // Insert section
          const [sectionResult] = await connection.query(
            `INSERT INTO sections 
             (section_id, page_version_id, type, name, content, order, is_published)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              section.id || `section-${Date.now()}-${i}`, 
              pageVersionId, 
              section.type, 
              section.name, 
              section.content, 
              i, 
              section.is_published || is_published || false
            ]
          );
          
          const sectionVersionId = sectionResult.insertId;
          
          // Handle section media if any
          if (section.media && Array.isArray(section.media)) {
            for (const mediaId of section.media) {
              await connection.query(
                `INSERT INTO section_media (section_version_id, file_version_id) VALUES (?, ?)`,
                [sectionVersionId, mediaId]
              );
            }
          }
        }
      }
      
      // Commit transaction
      await connection.commit();
      
      // Return success response
      res.json({
        success: true,
        message: 'Page updated successfully',
        page_id: pageId,
        version: newVersion
      });
      
    } catch (error) {
      // Rollback on error
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

// Publish or unpublish a page
router.patch('/:pageId/publish', isAuthenticated, isEditor, async (req, res) => {
  const pageId = req.params.pageId;
  const { is_published } = req.body;
  
  if (typeof is_published !== 'boolean') {
    return res.status(400).json({ error: true, message: 'is_published boolean value is required' });
  }
  
  try {
    const db = req.db;
    
    // Update page publish status
    await db.query(
      'UPDATE pages SET is_published = ? WHERE page_id = ?',
      [is_published, pageId]
    );
    
    res.json({
      success: true,
      message: is_published ? 'Page published successfully' : 'Page unpublished successfully'
    });
    
  } catch (error) {
    console.error('Error updating page publish status:', error);
    res.status(500).json({ error: true, message: 'Server error updating page publish status' });
  }
});

// Delete a page
router.delete('/:pageId', isAuthenticated, isEditor, async (req, res) => {
  const pageId = req.params.pageId;
  
  try {
    const db = req.db;
    
    // Delete page (cascade will handle related records)
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
