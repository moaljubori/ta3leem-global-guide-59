
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, isAuthenticated } = require('../middleware/auth');

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: true, message: 'Username and password are required' });
  }
  
  try {
    const db = req.db;
    
    // Find user by username
    const [users] = await db.query(
      'SELECT * FROM admin_users WHERE username = ? LIMIT 1',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { 
        id: user.user_id, 
        username: user.username,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Update last login time
    await db.query(
      'UPDATE admin_users SET last_login = NOW() WHERE user_id = ?',
      [user.user_id]
    );
    
    // Return user info and token
    return res.json({
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      },
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: true, message: 'Server error during login' });
  }
});

// Register a new admin user (admin only)
router.post('/register', isAuthenticated, async (req, res) => {
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
    
    return res.status(201).json({
      success: true, 
      message: 'User created successfully',
      user_id: result.insertId
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: true, message: 'Server error during registration' });
  }
});

// Get current user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    
    // Find user by ID
    const [users] = await db.query(
      'SELECT user_id, username, email, role, first_name, last_name, created_at FROM admin_users WHERE user_id = ? LIMIT 1',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    // Return user info (without password)
    return res.json({ user: users[0] });
    
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({ error: true, message: 'Server error fetching profile' });
  }
});

// Change password
router.post('/change-password', isAuthenticated, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: true, message: 'Current and new passwords are required' });
  }
  
  try {
    const db = req.db;
    
    // Get user with password hash
    const [users] = await db.query(
      'SELECT * FROM admin_users WHERE user_id = ? LIMIT 1',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    const user = users[0];
    
    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: true, message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    
    // Update password
    await db.query(
      'UPDATE admin_users SET password_hash = ? WHERE user_id = ?',
      [newPasswordHash, req.user.id]
    );
    
    return res.json({ success: true, message: 'Password updated successfully' });
    
  } catch (error) {
    console.error('Password change error:', error);
    return res.status(500).json({ error: true, message: 'Server error changing password' });
  }
});

module.exports = router;
