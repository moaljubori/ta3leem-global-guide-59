
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    // Default query for services
    let query = `
      SELECT s.service_id, s.name, s.short_description, s.content, s.url_slug, 
             s.meta_title, s.meta_description, s.order_index, 
             s.is_active, s.is_published, mf.path as icon_path
      FROM services s
      LEFT JOIN media_files mf ON s.icon_version_id = mf.file_version_id
    `;
    
    // Filter by published status if specified
    if (req.query.published === 'true') {
      query += ` WHERE s.is_published = TRUE AND s.is_active = TRUE`;
    }
    
    // Add ordering
    query += ` ORDER BY s.order_index ASC, s.name ASC`;
    
    const [services] = await db.query(query);
    
    res.json({ services });
    
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: true, message: 'Server error fetching services' });
  }
});

// Get service by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const db = req.db;
    const slug = req.params.slug;
    
    // Get service with icon
    const [services] = await db.query(`
      SELECT s.service_id, s.name, s.short_description, s.content, s.url_slug, 
             s.meta_title, s.meta_description, mf.path as icon_path
      FROM services s
      LEFT JOIN media_files mf ON s.icon_version_id = mf.file_version_id
      WHERE s.url_slug = ? AND s.is_active = TRUE
      ${req.query.published === 'true' ? 'AND s.is_published = TRUE' : ''}
    `, [slug]);
    
    if (services.length === 0) {
      return res.status(404).json({ error: true, message: 'Service not found' });
    }
    
    const service = services[0];
    
    // Get countries that offer this service
    const [countries] = await db.query(`
      SELECT c.country_id, c.name, c.url_slug, mf.path as flag_image_path
      FROM countries c
      JOIN country_services cs ON c.country_id = cs.country_id
      LEFT JOIN media_files mf ON c.flag_image_version_id = mf.file_version_id
      WHERE cs.service_id = ? AND c.is_active = TRUE
      ${req.query.published === 'true' ? 'AND c.is_published = TRUE' : ''}
      ORDER BY c.order_index ASC, c.name ASC
    `, [service.service_id]);
    
    service.countries = countries;
    
    res.json({ service });
    
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: true, message: 'Server error fetching service' });
  }
});

// Get service by ID (auth required)
router.get('/:serviceId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const serviceId = req.params.serviceId;
    
    // Get service with image
    const [services] = await db.query(`
      SELECT s.*, mf.path as icon_path
      FROM services s
      LEFT JOIN media_files mf ON s.icon_version_id = mf.file_version_id
      WHERE s.service_id = ? OR s.service_version_id = ?
    `, [serviceId, serviceId]);
    
    if (services.length === 0) {
      return res.status(404).json({ error: true, message: 'Service not found' });
    }
    
    const service = services[0];
    
    // Get countries for this service
    const [countries] = await db.query(`
      SELECT c.country_id, c.name 
      FROM countries c
      JOIN country_services cs ON c.country_id = cs.country_id
      WHERE cs.service_id = ?
    `, [service.service_id]);
    
    service.countries = countries;
    
    res.json({ service });
    
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: true, message: 'Server error fetching service' });
  }
});

// Create service (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const { name, short_description, content, icon_id, meta_title, meta_description, 
            url_slug, order_index, is_active, is_published, countries } = req.body;
    
    if (!name || !url_slug) {
      return res.status(400).json({ error: true, message: 'Name and URL slug are required' });
    }
    
    // Check if slug exists
    const [existingSlugs] = await db.query(
      'SELECT service_id FROM services WHERE url_slug = ?',
      [url_slug]
    );
    
    if (existingSlugs.length > 0) {
      return res.status(400).json({ error: true, message: 'URL slug already exists' });
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Generate UUID for service_id
      const serviceId = require('uuid').v4();
      
      // Insert service
      await connection.query(
        `INSERT INTO services 
         (service_id, name, short_description, content, icon_version_id, meta_title, 
          meta_description, url_slug, order_index, is_active, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [serviceId, name, short_description, content, icon_id, meta_title, 
         meta_description, url_slug, order_index, is_active, is_published]
      );
      
      // Add country relationships if provided
      if (countries && countries.length > 0) {
        const countryValues = countries.map(countryId => [countryId, serviceId]);
        
        await connection.query(
          `INSERT INTO country_services (country_id, service_id) VALUES ?`,
          [countryValues]
        );
      }
      
      await connection.commit();
      
      res.status(201).json({
        success: true,
        message: 'Service created successfully',
        service_id: serviceId
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: true, message: 'Server error creating service' });
  }
});

// Update service (editor or admin only)
router.put('/:serviceId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const serviceId = req.params.serviceId;
    const { name, short_description, content, icon_id, meta_title, meta_description, 
            url_slug, order_index, is_active, is_published, countries } = req.body;
    
    // Verify service exists
    const [existingServices] = await db.query(
      'SELECT service_id FROM services WHERE service_id = ?',
      [serviceId]
    );
    
    if (existingServices.length === 0) {
      return res.status(404).json({ error: true, message: 'Service not found' });
    }
    
    // Check if slug exists (if changed)
    if (url_slug) {
      const [existingSlugs] = await db.query(
        'SELECT service_id FROM services WHERE url_slug = ? AND service_id <> ?',
        [url_slug, serviceId]
      );
      
      if (existingSlugs.length > 0) {
        return res.status(400).json({ error: true, message: 'URL slug already exists' });
      }
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Update service
      let query = 'UPDATE services SET updated_at = NOW()';
      const params = [];
      
      if (name) {
        query += ', name = ?';
        params.push(name);
      }
      
      if (short_description !== undefined) {
        query += ', short_description = ?';
        params.push(short_description);
      }
      
      if (content !== undefined) {
        query += ', content = ?';
        params.push(content);
      }
      
      if (icon_id !== undefined) {
        query += ', icon_version_id = ?';
        params.push(icon_id);
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
      
      query += ' WHERE service_id = ?';
      params.push(serviceId);
      
      await connection.query(query, params);
      
      // Update countries if provided
      if (countries) {
        // Delete existing relationships
        await connection.query(
          'DELETE FROM country_services WHERE service_id = ?',
          [serviceId]
        );
        
        // Add new relationships
        if (countries.length > 0) {
          const countryValues = countries.map(countryId => [countryId, serviceId]);
          
          await connection.query(
            `INSERT INTO country_services (country_id, service_id) VALUES ?`,
            [countryValues]
          );
        }
      }
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Service updated successfully'
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: true, message: 'Server error updating service' });
  }
});

// Delete service (editor or admin only)
router.delete('/:serviceId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const serviceId = req.params.serviceId;
    
    // Verify service exists
    const [existingServices] = await db.query(
      'SELECT service_id FROM services WHERE service_id = ?',
      [serviceId]
    );
    
    if (existingServices.length === 0) {
      return res.status(404).json({ error: true, message: 'Service not found' });
    }
    
    // Delete service (cascade will handle relationships)
    await db.query('DELETE FROM services WHERE service_id = ?', [serviceId]);
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: true, message: 'Server error deleting service' });
  }
});

module.exports = router;
