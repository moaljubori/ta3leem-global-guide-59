
const jwt = require('jsonwebtoken');

// JWT secret should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-should-be-in-env';

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: true, message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Invalid or expired token' });
  }
};

// Check if user has admin role
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: true, message: 'Admin access required' });
  }
  next();
};

// Check if user has editor role or higher
const isEditor = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'editor')) {
    return res.status(403).json({ error: true, message: 'Editor access required' });
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isEditor,
  JWT_SECRET
};
