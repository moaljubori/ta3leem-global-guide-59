const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all settings (or by category)
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    let query = `
      SELECT setting_id, name, value, type, category, description, is_published
      FROM settings
    `;
    
    const params = [];
    
    // Filter by category if specified
    if (req.query.category) {
      query += ` WHERE category = ?`;
      params.push(req.query.category);
    }
    
    // Filter by published status if specified
    if (req.query.published === 'true') {
      query += query.includes('WHERE') ? ` AND is_published = TRUE` : ` WHERE is_published = TRUE`;
    }
    
    // Add ordering
    query += ` ORDER BY category, name`;
    
    const [settings] = await db.query(query, params);
    
    // Group settings by category for easier frontend use
    const groupedSettings = {};
    
    settings.forEach(setting => {
      const category = setting.category || 'general';
      
      if (!groupedSettings[category]) {
        groupedSettings[category] = [];
      }
      
      // Convert value to appropriate type
      if (setting.type === 'number') {
        setting.value = parseFloat(setting.value);
      } else if (setting.type === 'boolean') {
        setting.value = setting.value === 'true';
      } else if (setting.type === 'json') {
        try {
          setting.value = JSON.parse(setting.value);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
      
      groupedSettings[category].push(setting);
    });
    
    res.json({ settings: groupedSettings });
    
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: true, message: 'Server error fetching settings' });
  }
});

// Get setting by name
router.get('/name/:name', async (req, res) => {
  try {
    const db = req.db;
    const name = req.params.name;
    
    // Get setting by name
    const [settings] = await db.query(
      `SELECT setting_id, name, value, type, category, description, is_published
       FROM settings 
       WHERE name = ?
       ${req.query.published === 'true' ? 'AND is_published = TRUE' : ''}`,
      [name]
    );
    
    if (settings.length === 0) {
      return res.status(404).json({ error: true, message: 'Setting not found' });
    }
    
    const setting = settings[0];
    
    // Convert value to appropriate type
    if (setting.type === 'number') {
      setting.value = parseFloat(setting.value);
    } else if (setting.type === 'boolean') {
      setting.value = setting.value === 'true';
    } else if (setting.type === 'json') {
      try {
        setting.value = JSON.parse(setting.value);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }
    
    res.json({ setting });
    
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: true, message: 'Server error fetching setting' });
  }
});

// Create setting (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const { name, value, type, category, description, is_published } = req.body;
    
    if (!name || value === undefined || !type) {
      return res.status(400).json({ error: true, message: 'Name, value, and type are required' });
    }
    
    // Check if name exists
    const [existingSettings] = await db.query(
      'SELECT setting_id FROM settings WHERE name = ?',
      [name]
    );
    
    if (existingSettings.length > 0) {
      return res.status(400).json({ error: true, message: 'Setting name already exists' });
    }
    
    // Convert value to string for storage
    let stringValue;
    
    if (typeof value === 'object') {
      stringValue = JSON.stringify(value);
    } else {
      stringValue = String(value);
    }
    
    // Insert setting
    const settingId = require('uuid').v4();
    
    await db.query(
      `INSERT INTO settings 
       (setting_id, name, value, type, category, description, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [settingId, name, stringValue, type, category, description, is_published]
    );
    
    res.status(201).json({
      success: true,
      message: 'Setting created successfully',
      setting_id: settingId
    });
    
  } catch (error) {
    console.error('Error creating setting:', error);
    res.status(500).json({ error: true, message: 'Server error creating setting' });
  }
});

// Update setting (editor or admin only)
router.put('/:settingId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const settingId = req.params.settingId;
    const { value, type, category, description, is_published } = req.body;
    
    // Verify setting exists
    const [existingSettings] = await db.query(
      'SELECT * FROM settings WHERE setting_id = ?',
      [settingId]
    );
    
    if (existingSettings.length === 0) {
      return res.status(404).json({ error: true, message: 'Setting not found' });
    }
    
    // Convert value to string for storage if provided
    let stringValue;
    
    if (value !== undefined) {
      if (typeof value === 'object') {
        stringValue = JSON.stringify(value);
      } else {
        stringValue = String(value);
      }
    }
    
    // Update setting
    let query = 'UPDATE settings SET updated_at = NOW()';
    const params = [];
    
    if (value !== undefined) {
      query += ', value = ?';
      params.push(stringValue);
    }
    
    if (type) {
      query += ', type = ?';
      params.push(type);
    }
    
    if (category !== undefined) {
      query += ', category = ?';
      params.push(category);
    }
    
    if (description !== undefined) {
      query += ', description = ?';
      params.push(description);
    }
    
    if (is_published !== undefined) {
      query += ', is_published = ?';
      params.push(is_published);
    }
    
    query += ' WHERE setting_id = ?';
    params.push(settingId);
    
    await db.query(query, params);
    
    res.json({
      success: true,
      message: 'Setting updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ error: true, message: 'Server error updating setting' });
  }
});

// Delete setting (editor or admin only)
router.delete('/:settingId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const settingId = req.params.settingId;
    
    // Delete setting
    await db.query('DELETE FROM settings WHERE setting_id = ?', [settingId]);
    
    res.json({
      success: true,
      message: 'Setting deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({ error: true, message: 'Server error deleting setting' });
  }
});

module.exports = router;
