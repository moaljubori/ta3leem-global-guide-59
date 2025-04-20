
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all advertisements
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    
    // Build query with filters
    let query = `
      SELECT a.*, m.path as image_path 
      FROM advertisements a
      LEFT JOIN media_files m ON a.image_version_id = m.file_version_id
      WHERE 1=1
    `;
    
    const queryParams = [];
    
    // Filter by active status if provided
    if (req.query.active === 'true') {
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      query += ` AND a.is_published = 1 
                 AND (a.start_date IS NULL OR a.start_date <= ?) 
                 AND (a.end_date IS NULL OR a.end_date >= ?)`;
      queryParams.push(now, now);
    }
    
    // Add order by
    query += ` ORDER BY a.created_at DESC`;
    
    // Execute query
    const [ads] = await db.query(query, queryParams);
    
    // Return advertisements
    res.json({ advertisements: ads });
    
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ error: true, message: 'Server error fetching advertisements' });
  }
});

// Create a new advertisement (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  const { name, content, url, image_version_id, start_date, end_date, is_published } = req.body;
  
  // Validation
  if (!name) {
    return res.status(400).json({ error: true, message: 'Name is required' });
  }
  
  try {
    const db = req.db;
    
    // Insert advertisement
    const [result] = await db.query(
      `INSERT INTO advertisements 
       (advertisement_id, name, content, url, image_version_id, start_date, end_date, is_published)
       VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)`,
      [name, content, url, image_version_id, start_date, end_date, is_published || false]
    );
    
    res.status(201).json({
      success: true,
      message: 'Advertisement created successfully',
      advertisement_id: result.insertId
    });
    
  } catch (error) {
    console.error('Error creating advertisement:', error);
    res.status(500).json({ error: true, message: 'Server error creating advertisement' });
  }
});

// Get advertisement by ID
router.get('/:adId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const adId = req.params.adId;
    
    // Get advertisement details
    const [ads] = await db.query(
      `SELECT a.*, m.path as image_path 
       FROM advertisements a
       LEFT JOIN media_files m ON a.image_version_id = m.file_version_id
       WHERE a.advertisement_id = ? OR a.advertisement_version_id = ?`,
      [adId, adId]
    );
    
    if (ads.length === 0) {
      return res.status(404).json({ error: true, message: 'Advertisement not found' });
    }
    
    res.json({ advertisement: ads[0] });
    
  } catch (error) {
    console.error('Error fetching advertisement:', error);
    res.status(500).json({ error: true, message: 'Server error fetching advertisement' });
  }
});

// Update advertisement (editor or admin only)
router.put('/:adId', isAuthenticated, isEditor, async (req, res) => {
  const adId = req.params.adId;
  const { name, content, url, image_version_id, start_date, end_date, is_published } = req.body;
  
  try {
    const db = req.db;
    
    // Check if ad exists
    const [ads] = await db.query(
      'SELECT * FROM advertisements WHERE advertisement_id = ? OR advertisement_version_id = ?',
      [adId, adId]
    );
    
    if (ads.length === 0) {
      return res.status(404).json({ error: true, message: 'Advertisement not found' });
    }
    
    // Update advertisement fields
    let query = 'UPDATE advertisements SET updated_at = NOW()';
    const params = [];
    
    if (name) {
      query += ', name = ?';
      params.push(name);
    }
    
    if (content !== undefined) {
      query += ', content = ?';
      params.push(content);
    }
    
    if (url !== undefined) {
      query += ', url = ?';
      params.push(url);
    }
    
    if (image_version_id !== undefined) {
      query += ', image_version_id = ?';
      params.push(image_version_id);
    }
    
    if (start_date !== undefined) {
      query += ', start_date = ?';
      params.push(start_date);
    }
    
    if (end_date !== undefined) {
      query += ', end_date = ?';
      params.push(end_date);
    }
    
    if (is_published !== undefined) {
      query += ', is_published = ?';
      params.push(is_published);
    }
    
    query += ' WHERE advertisement_id = ? OR advertisement_version_id = ?';
    params.push(adId, adId);
    
    // Execute update
    await db.query(query, params);
    
    res.json({
      success: true,
      message: 'Advertisement updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating advertisement:', error);
    res.status(500).json({ error: true, message: 'Server error updating advertisement' });
  }
});

// Delete advertisement (editor or admin only)
router.delete('/:adId', isAuthenticated, isEditor, async (req, res) => {
  const adId = req.params.adId;
  
  try {
    const db = req.db;
    
    // Delete advertisement
    await db.query(
      'DELETE FROM advertisements WHERE advertisement_id = ? OR advertisement_version_id = ?',
      [adId, adId]
    );
    
    res.json({
      success: true,
      message: 'Advertisement deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    res.status(500).json({ error: true, message: 'Server error deleting advertisement' });
  }
});

module.exports = router;
