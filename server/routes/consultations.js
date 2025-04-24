const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Get all consultations
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    
    // Build query with filters
    let query = `
      SELECT c.* FROM consultations c
      WHERE 1=1
    `;
    
    const queryParams = [];
    
    // Filter by status if provided
    if (req.query.status) {
      query += ` AND c.status = ?`;
      queryParams.push(req.query.status);
    }
    
    // Filter by date range if provided
    if (req.query.startDate) {
      query += ` AND c.created_at >= ?`;
      queryParams.push(req.query.startDate);
    }
    
    if (req.query.endDate) {
      query += ` AND c.created_at <= ?`;
      queryParams.push(req.query.endDate);
    }
    
    // Filter by search term if provided
    if (req.query.search) {
      query += ` AND (c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.message LIKE ?)`;
      const searchTerm = `%${req.query.search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }
    
    // Add order by
    query += ` ORDER BY c.created_at DESC`;
    
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
      `SELECT COUNT(*) as total FROM consultations c WHERE 1=1
       ${req.query.status ? 'AND c.status = ?' : ''}
       ${req.query.startDate ? 'AND c.created_at >= ?' : ''}
       ${req.query.endDate ? 'AND c.created_at <= ?' : ''}
       ${req.query.search ? 'AND (c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.message LIKE ?)' : ''}`,
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

// Create a new consultation (public endpoint)
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: true, message: 'Name and email are required' });
  }
  
  try {
    const db = req.db;
    
    // Insert consultation
    const [result] = await db.query(
      `INSERT INTO consultations (name, email, phone, message, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [name, email, phone, message]
    );
    
    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully',
      consultation_id: result.insertId
    });
    
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ error: true, message: 'Server error creating consultation' });
  }
});

// Get consultation by ID
router.get('/:consultationId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const consultationId = req.params.consultationId;
    
    // Get consultation details
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

// Update consultation status
router.patch('/:consultationId/status', isAuthenticated, async (req, res) => {
  const consultationId = req.params.consultationId;
  const { status } = req.body;
  
  // Validation
  if (!status) {
    return res.status(400).json({ error: true, message: 'Status is required' });
  }
  
  // Validate status values
  const validStatuses = ['pending', 'in-progress', 'completed', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: true, message: 'Invalid status value' });
  }
  
  try {
    const db = req.db;
    
    // Update consultation status
    await db.query(
      'UPDATE consultations SET status = ?, updated_at = NOW() WHERE consultation_id = ?',
      [status, consultationId]
    );
    
    res.json({
      success: true,
      message: 'Consultation status updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating consultation status:', error);
    res.status(500).json({ error: true, message: 'Server error updating consultation status' });
  }
});

// Delete consultation
router.delete('/:consultationId', isAuthenticated, async (req, res) => {
  const consultationId = req.params.consultationId;
  
  try {
    const db = req.db;
    
    // Delete consultation
    await db.query('DELETE FROM consultations WHERE consultation_id = ?', [consultationId]);
    
    res.json({
      success: true,
      message: 'Consultation deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ error: true, message: 'Server error deleting consultation' });
  }
});

// Reply to consultation
router.post('/:consultationId/reply', isAuthenticated, async (req, res) => {
  const consultationId = req.params.consultationId;
  const { reply } = req.body;
  
  // Validation
  if (!reply) {
    return res.status(400).json({ error: true, message: 'Reply message is required' });
  }
  
  try {
    const db = req.db;
    
    // Update consultation with reply
    await db.query(
      'UPDATE consultations SET reply = ?, status = "replied", updated_at = NOW() WHERE consultation_id = ?',
      [reply, consultationId]
    );
    
    res.json({
      success: true,
      message: 'Reply sent successfully'
    });
    
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ error: true, message: 'Server error sending reply' });
  }
});

module.exports = router;
