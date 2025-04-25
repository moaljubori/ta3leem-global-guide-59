
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all consultations (auth required)
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    
    // Build query with filters
    let query = `
      SELECT * FROM consultations
    `;
    
    const queryParams = [];
    
    // Filter by status if provided
    if (req.query.status) {
      query += ` WHERE status = ?`;
      queryParams.push(req.query.status);
    }
    
    // Filter by email if provided
    if (req.query.email) {
      query += query.includes('WHERE') ? ` AND email LIKE ?` : ` WHERE email LIKE ?`;
      queryParams.push(`%${req.query.email}%`);
    }
    
    // Add order by
    query += ` ORDER BY created_at DESC`;
    
    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
    
    // Execute query
    const [consultations] = await db.query(query, queryParams);
    
    // Count total for pagination
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM consultations
       ${req.query.status ? 'WHERE status = ?' : ''}
       ${req.query.email ? (req.query.status ? 'AND' : 'WHERE') + ' email LIKE ?' : ''}`,
      queryParams.slice(0, -2) // Remove limit and offset
    );
    
    const total = countResult[0].total;
    
    // Return consultations with pagination info
    res.json({
      consultations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: true, message: 'Server error fetching consultations' });
  }
});

// Get consultation by ID (auth required)
router.get('/:consultationId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const consultationId = req.params.consultationId;
    
    // Get consultation
    const [consultations] = await db.query(
      'SELECT * FROM consultations WHERE consultation_id = ?',
      [consultationId]
    );
    
    if (consultations.length === 0) {
      return res.status(404).json({ error: true, message: 'Consultation not found' });
    }
    
    res.json({ consultation: consultations[0] });
    
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({ error: true, message: 'Server error fetching consultation' });
  }
});

// Create consultation (public endpoint)
router.post('/', async (req, res) => {
  try {
    const db = req.db;
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: true, message: 'Name, email, and message are required' });
    }
    
    // Insert consultation
    await db.query(
      `INSERT INTO consultations (name, email, phone, message, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [name, email, phone, message]
    );
    
    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully'
    });
    
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ error: true, message: 'Server error creating consultation' });
  }
});

// Update consultation status and reply (auth required)
router.put('/:consultationId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const consultationId = req.params.consultationId;
    const { status, reply } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: true, message: 'Status is required' });
    }
    
    // Update consultation
    await db.query(
      `UPDATE consultations 
       SET status = ?, reply = ?, updated_at = NOW()
       WHERE consultation_id = ?`,
      [status, reply, consultationId]
    );
    
    res.json({
      success: true,
      message: 'Consultation updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ error: true, message: 'Server error updating consultation' });
  }
});

// Delete consultation (auth required)
router.delete('/:consultationId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const consultationId = req.params.consultationId;
    
    // Delete consultation
    await db.query(
      'DELETE FROM consultations WHERE consultation_id = ?',
      [consultationId]
    );
    
    res.json({
      success: true,
      message: 'Consultation deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ error: true, message: 'Server error deleting consultation' });
  }
});

module.exports = router;
