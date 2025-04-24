
const jwt = require('jsonwebtoken');

// Authentication middleware
const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: true, message: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: true, message: 'Authentication token required' });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add user info to request
      
      // Optional: Check if token is blacklisted or user is still valid in database
      const db = req.db;
      const [users] = await db.query('SELECT role FROM admin_users WHERE user_id = ? AND username = ?', [decoded.id, decoded.username]);
      
      if (users.length === 0) {
        return res.status(401).json({ error: true, message: 'User no longer exists' });
      }
      
      // Update decoded role in case it changed in the database
      req.user.role = users[0].role;
      
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: true, message: 'Token expired', code: 'token_expired' });
      }
      console.error('Auth token verification error:', err);
      return res.status(401).json({ error: true, message: 'Invalid authentication token' });
    }
    
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ error: true, message: 'Server error during authentication' });
  }
};

// Admin role middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: true, message: 'Admin access required' });
  }
};

// Editor role middleware
const isEditor = (req, res, next) => {
  if (req.user && (req.user.role === 'editor' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ error: true, message: 'Editor access required' });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isEditor
};
