
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: true, message: 'Username and password are required' });
    }
    
    const db = req.db;
    const [users] = await db.query('SELECT * FROM admin_users WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Create refresh token
    const refreshToken = uuidv4();
    const tokenExpires = new Date();
    tokenExpires.setDate(tokenExpires.getDate() + 30); // 30 days
    
    // Update user with refresh token
    await db.query(
      'UPDATE admin_users SET refresh_token = ?, token_expires = ?, last_login = NOW() WHERE user_id = ?',
      [refreshToken, tokenExpires, user.user_id]
    );
    
    // Create session
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    await db.query(
      'INSERT INTO user_sessions (session_id, user_id, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)',
      [sessionId, user.user_id, req.ip, req.headers['user-agent'], expiresAt]
    );
    
    // Don't send password hash to client
    const { password_hash, refresh_token, ...userWithoutSensitiveData } = user;
    
    res.json({
      success: true,
      token,
      refreshToken,
      user: userWithoutSensitiveData
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: true, message: 'Server error during authentication' });
  }
});

// Refresh token route
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: true, message: 'Refresh token is required' });
    }
    
    const db = req.db;
    const [users] = await db.query(
      'SELECT * FROM admin_users WHERE refresh_token = ? AND token_expires > NOW()',
      [refreshToken]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: true, message: 'Invalid or expired refresh token' });
    }
    
    const user = users[0];
    
    // Create new JWT token
    const token = jwt.sign(
      { id: user.user_id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Create new refresh token
    const newRefreshToken = uuidv4();
    const tokenExpires = new Date();
    tokenExpires.setDate(tokenExpires.getDate() + 30); // 30 days
    
    // Update user with new refresh token
    await db.query(
      'UPDATE admin_users SET refresh_token = ?, token_expires = ? WHERE user_id = ?',
      [newRefreshToken, tokenExpires, user.user_id]
    );
    
    res.json({
      success: true,
      token,
      refreshToken: newRefreshToken
    });
    
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ error: true, message: 'Server error refreshing token' });
  }
});

// Register route (admin only)
router.post('/register', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, role } = req.body;
    
    if (!username || !password || !email || !role) {
      return res.status(400).json({ error: true, message: 'Username, password, email, and role are required' });
    }
    
    const db = req.db;
    
    // Check if username or email already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM admin_users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: true, message: 'Username or email already in use' });
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Insert new user
    const [result] = await db.query(
      `INSERT INTO admin_users 
       (username, password_hash, email, first_name, last_name, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, passwordHash, email, firstName || null, lastName || null, role]
    );
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: result.insertId
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: true, message: 'Server error during registration' });
  }
});

// Get current user
router.get('/me', isAuthenticated, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: true, message: 'Not authenticated' });
    }
    
    const db = req.db;
    const [users] = await db.query('SELECT * FROM admin_users WHERE user_id = ?', [req.user.id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    const user = users[0];
    // Don't send password hash to client
    const { password_hash, refresh_token, ...userWithoutSensitiveData } = user;
    
    res.json({
      success: true,
      user: userWithoutSensitiveData
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: true, message: 'Server error getting user data' });
  }
});

// Log out
router.post('/logout', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = req.db;
    
    // Invalidate the user's refresh token
    await db.query(
      'UPDATE admin_users SET refresh_token = NULL, token_expires = NULL WHERE user_id = ?',
      [userId]
    );
    
    // Invalidate the user's sessions
    await db.query(
      'UPDATE user_sessions SET is_valid = FALSE WHERE user_id = ? AND is_valid = TRUE',
      [userId]
    );
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: true, message: 'Server error during logout' });
  }
});

// Change password (for authenticated user)
router.post('/change-password', isAuthenticated, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: true, message: 'Current password and new password are required' });
    }
    
    const userId = req.user.id;
    const db = req.db;
    
    // Get user
    const [users] = await db.query('SELECT * FROM admin_users WHERE user_id = ?', [userId]);
    
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
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    
    // Update user with new password
    await db.query(
      'UPDATE admin_users SET password_hash = ? WHERE user_id = ?',
      [passwordHash, userId]
    );
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: true, message: 'Server error changing password' });
  }
});

module.exports = router;
