
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const db = req.db;
    
    // Select all users except password hash
    const [users] = await db.query(`
      SELECT 
        user_id, username, email, role, first_name, last_name, 
        created_at, updated_at
      FROM admin_users
    `);
    
    res.json({ users });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: true, message: 'Server error fetching users' });
  }
});

// Create a new user (admin only)
router.post('/', isAuthenticated, isAdmin, async (req, res) => {
  const { username, password, email, role, first_name, last_name } = req.body;
  
  // Validation
  if (!username || !password || !email || !role) {
    return res.status(400).json({ error: true, message: 'Missing required fields' });
  }
  
  try {
    const db = req.db;
    
    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM admin_users WHERE username = ? OR email = ? LIMIT 1',
      [username, email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: true, message: 'Username or email already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Insert new user
    const [result] = await db.query(
      `INSERT INTO admin_users 
       (username, password_hash, email, role, first_name, last_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, passwordHash, email, role, first_name, last_name]
    );
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user_id: result.insertId
    });
    
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: true, message: 'Server error creating user' });
  }
});

// Get user by ID (admin only)
router.get('/:userId', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const db = req.db;
    const userId = req.params.userId;
    
    // Select user except password hash
    const [users] = await db.query(`
      SELECT 
        user_id, username, email, role, first_name, last_name, 
        created_at, updated_at
      FROM admin_users
      WHERE user_id = ?
    `, [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    res.json({ user: users[0] });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: true, message: 'Server error fetching user' });
  }
});

// Update user (admin only)
router.put('/:userId', isAuthenticated, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  const { username, email, role, first_name, last_name, password } = req.body;
  
  try {
    const db = req.db;
    
    // Check if user exists
    const [users] = await db.query('SELECT * FROM admin_users WHERE user_id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    // Check if username or email is already taken by another user
    if (username || email) {
      const [existingUsers] = await db.query(
        'SELECT * FROM admin_users WHERE (username = ? OR email = ?) AND user_id != ? LIMIT 1',
        [username || '', email || '', userId]
      );
      
      if (existingUsers.length > 0) {
        return res.status(409).json({ error: true, message: 'Username or email already taken' });
      }
    }
    
    // Update user fields
    let query = 'UPDATE admin_users SET updated_at = NOW()';
    const params = [];
    
    if (username) {
      query += ', username = ?';
      params.push(username);
    }
    
    if (email) {
      query += ', email = ?';
      params.push(email);
    }
    
    if (role) {
      query += ', role = ?';
      params.push(role);
    }
    
    if (first_name !== undefined) {
      query += ', first_name = ?';
      params.push(first_name);
    }
    
    if (last_name !== undefined) {
      query += ', last_name = ?';
      params.push(last_name);
    }
    
    // Update password if provided
    if (password) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      query += ', password_hash = ?';
      params.push(passwordHash);
    }
    
    query += ' WHERE user_id = ?';
    params.push(userId);
    
    // Execute update
    await db.query(query, params);
    
    res.json({
      success: true,
      message: 'User updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: true, message: 'Server error updating user' });
  }
});

// Delete user (admin only)
router.delete('/:userId', isAuthenticated, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  
  // Don't allow deletion of own account
  if (userId === req.user.id) {
    return res.status(400).json({ error: true, message: 'Cannot delete your own account' });
  }
  
  try {
    const db = req.db;
    
    // Check if user exists
    const [users] = await db.query('SELECT * FROM admin_users WHERE user_id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    // Delete user
    await db.query('DELETE FROM admin_users WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: true, message: 'Server error deleting user' });
  }
});

module.exports = router;
