
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all countries (public)
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    // Default query for countries
    let query = `
      SELECT c.country_id, c.name, c.code, c.content, c.url_slug, 
             c.meta_title, c.meta_description, c.order_index, 
             c.is_active, c.is_published, mf.path as flag_image_path
      FROM countries c
      LEFT JOIN media_files mf ON c.flag_image_version_id = mf.file_version_id
    `;
    
    // Filter by published status if specified
    if (req.query.published === 'true') {
      query += ` WHERE c.is_published = TRUE AND c.is_active = TRUE`;
    }
    
    // Add ordering
    query += ` ORDER BY c.order_index ASC, c.name ASC`;
    
    const [countries] = await db.query(query);
    
    res.json({ countries });
    
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: true, message: 'Server error fetching countries' });
  }
});

// Get country by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const db = req.db;
    const slug = req.params.slug;
    
    // Get country with image
    const [countries] = await db.query(`
      SELECT c.country_id, c.name, c.code, c.content, c.url_slug, 
             c.meta_title, c.meta_description, mf.path as flag_image_path
      FROM countries c
      LEFT JOIN media_files mf ON c.flag_image_version_id = mf.file_version_id
      WHERE c.url_slug = ? AND c.is_active = TRUE
      ${req.query.published === 'true' ? 'AND c.is_published = TRUE' : ''}
    `, [slug]);
    
    if (countries.length === 0) {
      return res.status(404).json({ error: true, message: 'Country not found' });
    }
    
    const country = countries[0];
    
    // Get services for this country
    const [services] = await db.query(`
      SELECT s.service_id, s.name, s.short_description, s.url_slug, 
             mf.path as icon_path
      FROM services s
      JOIN country_services cs ON s.service_id = cs.service_id
      LEFT JOIN media_files mf ON s.icon_version_id = mf.file_version_id
      WHERE cs.country_id = ? AND s.is_active = TRUE
      ${req.query.published === 'true' ? 'AND s.is_published = TRUE' : ''}
      ORDER BY s.order_index ASC, s.name ASC
    `, [country.country_id]);
    
    country.services = services;
    
    res.json({ country });
    
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({ error: true, message: 'Server error fetching country' });
  }
});

// Get country by ID (auth required)
router.get('/:countryId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const countryId = req.params.countryId;
    
    // Get country with image
    const [countries] = await db.query(`
      SELECT c.*, mf.path as flag_image_path
      FROM countries c
      LEFT JOIN media_files mf ON c.flag_image_version_id = mf.file_version_id
      WHERE c.country_id = ? OR c.country_version_id = ?
    `, [countryId, countryId]);
    
    if (countries.length === 0) {
      return res.status(404).json({ error: true, message: 'Country not found' });
    }
    
    const country = countries[0];
    
    // Get services for this country
    const [services] = await db.query(`
      SELECT s.service_id, s.name 
      FROM services s
      JOIN country_services cs ON s.service_id = cs.service_id
      WHERE cs.country_id = ?
    `, [country.country_id]);
    
    country.services = services;
    
    res.json({ country });
    
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({ error: true, message: 'Server error fetching country' });
  }
});

// Create country (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const { name, code, content, flag_image_id, meta_title, meta_description, 
            url_slug, order_index, is_active, is_published, services } = req.body;
    
    if (!name || !code || !url_slug) {
      return res.status(400).json({ 
        error: true, 
        message: 'Name, code, and URL slug are required' 
      });
    }
    
    // Check if slug exists
    const [existingSlugs] = await db.query(
      'SELECT country_id FROM countries WHERE url_slug = ?',
      [url_slug]
    );
    
    if (existingSlugs.length > 0) {
      return res.status(400).json({ error: true, message: 'URL slug already exists' });
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Generate UUID for country_id
      const countryId = require('uuid').v4();
      
      // Insert country
      await connection.query(
        `INSERT INTO countries 
         (country_id, name, code, content, flag_image_version_id, meta_title, 
          meta_description, url_slug, order_index, is_active, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [countryId, name, code, content, flag_image_id, meta_title, 
         meta_description, url_slug, order_index, is_active, is_published]
      );
      
      // Add service relationships if provided
      if (services && services.length > 0) {
        const serviceValues = services.map(serviceId => [countryId, serviceId]);
        
        await connection.query(
          `INSERT INTO country_services (country_id, service_id) VALUES ?`,
          [serviceValues]
        );
      }
      
      await connection.commit();
      
      res.status(201).json({
        success: true,
        message: 'Country created successfully',
        country_id: countryId
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: true, message: 'Server error creating country' });
  }
});

// Update country (editor or admin only)
router.put('/:countryId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const countryId = req.params.countryId;
    const { name, code, content, flag_image_id, meta_title, meta_description, 
            url_slug, order_index, is_active, is_published, services } = req.body;
    
    // Verify country exists
    const [existingCountries] = await db.query(
      'SELECT country_id FROM countries WHERE country_id = ?',
      [countryId]
    );
    
    if (existingCountries.length === 0) {
      return res.status(404).json({ error: true, message: 'Country not found' });
    }
    
    // Check if slug exists (if changed)
    if (url_slug) {
      const [existingSlugs] = await db.query(
        'SELECT country_id FROM countries WHERE url_slug = ? AND country_id <> ?',
        [url_slug, countryId]
      );
      
      if (existingSlugs.length > 0) {
        return res.status(400).json({ error: true, message: 'URL slug already exists' });
      }
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Update country
      let query = 'UPDATE countries SET updated_at = NOW()';
      const params = [];
      
      if (name) {
        query += ', name = ?';
        params.push(name);
      }
      
      if (code) {
        query += ', code = ?';
        params.push(code);
      }
      
      if (content !== undefined) {
        query += ', content = ?';
        params.push(content);
      }
      
      if (flag_image_id !== undefined) {
        query += ', flag_image_version_id = ?';
        params.push(flag_image_id);
      }
      
      if (meta_title !== undefined) {
        query += ', meta_title = ?';
        params.push(meta_title);
      }
      
      if (meta_description !== undefined) {
        query += ', meta_description = ?';
        params.push(meta_description);
      }
      
      if (url_slug) {
        query += ', url_slug = ?';
        params.push(url_slug);
      }
      
      if (order_index !== undefined) {
        query += ', order_index = ?';
        params.push(order_index);
      }
      
      if (is_active !== undefined) {
        query += ', is_active = ?';
        params.push(is_active);
      }
      
      if (is_published !== undefined) {
        query += ', is_published = ?';
        params.push(is_published);
      }
      
      query += ' WHERE country_id = ?';
      params.push(countryId);
      
      await connection.query(query, params);
      
      // Update services if provided
      if (services) {
        // Delete existing relationships
        await connection.query(
          'DELETE FROM country_services WHERE country_id = ?',
          [countryId]
        );
        
        // Add new relationships
        if (services.length > 0) {
          const serviceValues = services.map(serviceId => [countryId, serviceId]);
          
          await connection.query(
            `INSERT INTO country_services (country_id, service_id) VALUES ?`,
            [serviceValues]
          );
        }
      }
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Country updated successfully'
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ error: true, message: 'Server error updating country' });
  }
});

// Delete country (editor or admin only)
router.delete('/:countryId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const countryId = req.params.countryId;
    
    // Verify country exists
    const [existingCountries] = await db.query(
      'SELECT country_id FROM countries WHERE country_id = ?',
      [countryId]
    );
    
    if (existingCountries.length === 0) {
      return res.status(404).json({ error: true, message: 'Country not found' });
    }
    
    // Delete country (cascade will handle relationships)
    await db.query('DELETE FROM countries WHERE country_id = ?', [countryId]);
    
    res.json({
      success: true,
      message: 'Country deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ error: true, message: 'Server error deleting country' });
  }
});

module.exports = router;
