
const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Get all settings
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    // Get published settings only for public, all for authenticated users
    let query = 'SELECT * FROM settings WHERE is_published = 1';
    
    // If authenticated, return all settings
    if (req.user) {
      query = 'SELECT * FROM settings';
    }
    
    // Filter by category if provided
    if (req.query.category) {
      query += ' AND category = ?';
    }
    
    // Execute query
    const queryParams = req.query.category ? [req.query.category] : [];
    const [settings] = await db.query(query, queryParams);
    
    // Convert to key-value format
    const formattedSettings = settings.reduce((acc, setting) => {
      acc[setting.name] = {
        value: setting.value,
        type: setting.type,
        category: setting.category,
        description: setting.description,
        is_published: setting.is_published
      };
      return acc;
    }, {});
    
    res.json({ settings: formattedSettings });
    
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: true, message: 'Server error fetching settings' });
  }
});

// Update settings (admin only)
router.put('/', isAuthenticated, isAdmin, async (req, res) => {
  const { settings } = req.body;
  
  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ error: true, message: 'Settings object is required' });
  }
  
  try {
    const db = req.db;
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Process each setting
      for (const [name, settingData] of Object.entries(settings)) {
        const { value, type, category, description, is_published } = settingData;
        
        // Check if setting exists
        const [existingSettings] = await connection.query(
          'SELECT * FROM settings WHERE name = ?',
          [name]
        );
        
        if (existingSettings.length > 0) {
          // Update existing setting
          await connection.query(
            `UPDATE settings 
             SET value = ?, type = ?, category = ?, description = ?, is_published = ?
             WHERE name = ?`,
            [value, type, category, description, is_published, name]
          );
        } else {
          // Create new setting
          await connection.query(
            `INSERT INTO settings 
             (setting_id, name, value, type, category, description, is_published)
             VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
            [name, value, type, category, description, is_published]
          );
        }
      }
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Settings updated successfully'
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: true, message: 'Server error updating settings' });
  }
});

// Get a specific setting by name
router.get('/:name', async (req, res) => {
  try {
    const db = req.db;
    const name = req.params.name;
    
    // Get setting
    let query = 'SELECT * FROM settings WHERE name = ? AND is_published = 1';
    
    // If authenticated, don't filter by published status
    if (req.user) {
      query = 'SELECT * FROM settings WHERE name = ?';
    }
    
    const [settings] = await db.query(query, [name]);
    
    if (settings.length === 0) {
      return res.status(404).json({ error: true, message: 'Setting not found' });
    }
    
    res.json({ setting: settings[0] });
    
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: true, message: 'Server error fetching setting' });
  }
});

// Delete a setting (admin only)
router.delete('/:name', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const db = req.db;
    const name = req.params.name;
    
    // Delete setting
    await db.query('DELETE FROM settings WHERE name = ?', [name]);
    
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
