
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

// Import routes
const authRoutes = require('./server/routes/auth');
const pagesRoutes = require('./server/routes/pages');
const mediaRoutes = require('./server/routes/media');
const usersRoutes = require('./server/routes/users');
const advertisementsRoutes = require('./server/routes/advertisements');
const consultationsRoutes = require('./server/routes/consultations');
const settingsRoutes = require('./server/routes/settings');
const blogRoutes = require('./server/routes/blog');

// App setup
const app = express();
const PORT = process.env.PORT || 3001;

// Load database configuration with environment variable override
let dbConfig;

try {
  // Try to load from config file first
  const dbConfigPath = path.join(__dirname, 'database.config.json');
  
  if (fs.existsSync(dbConfigPath)) {
    const dbConfigRaw = fs.readFileSync(dbConfigPath, 'utf8');
    dbConfig = JSON.parse(dbConfigRaw);
    
    // Override with environment variables if provided
    if (process.env.DB_HOST) dbConfig.host = process.env.DB_HOST;
    if (process.env.DB_USER) dbConfig.username = process.env.DB_USER;
    if (process.env.DB_PASSWORD) dbConfig.password = process.env.DB_PASSWORD;
    if (process.env.DB_DATABASE) dbConfig.database = process.env.DB_DATABASE;
    if (process.env.DB_PORT) dbConfig.port = parseInt(process.env.DB_PORT, 10);
  } else {
    // If config file doesn't exist, use environment variables
    dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'dbuser',
      password: process.env.DB_PASSWORD || 'dbpassword',
      database: process.env.DB_DATABASE || 'mydatabase',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    };
  }
  
  console.log('Database configuration loaded:', {
    host: dbConfig.host,
    database: dbConfig.database,
    port: dbConfig.port
  });
} catch (error) {
  console.error('Failed to load database configuration:', error);
  process.exit(1);
}

// Database connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.username || 'dbuser',  // Fallback if username is undefined
  password: dbConfig.password || '',    // Fallback if password is undefined
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Set up middleware
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MIME types configuration - Enhanced for cPanel compatibility
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// Global middleware to set MIME types for all responses
app.use((req, res, next) => {
  const extname = path.extname(req.url).toLowerCase();
  if (mimeTypes[extname]) {
    res.setHeader('Content-Type', mimeTypes[extname]);
  }
  next();
});

// Static files for uploaded media
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    const extname = path.extname(filePath).toLowerCase();
    if (mimeTypes[extname]) {
      res.setHeader('Content-Type', mimeTypes[extname]);
    }
  }
}));

// Static files for client (React build)
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const extname = path.extname(filePath).toLowerCase();
    if (mimeTypes[extname]) {
      res.setHeader('Content-Type', mimeTypes[extname]);
    }
  }
}));

// Make db pool available to route handlers
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/advertisements', advertisementsRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/blog', blogRoutes);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// API status endpoint - useful for debugging
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbConfig.database,
    host: dbConfig.host,
    nodeEnv: process.env.NODE_ENV,
    platform: process.platform,
    cwd: process.cwd(),
    dirname: __dirname
  });
});

// Debug endpoint to check database tables
app.get('/api/debug/tables', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Debug endpoints are disabled in production' });
  }
  
  try {
    const [tables] = await pool.query('SHOW TABLES');
    res.json({ tables });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Debug route to check MIME type settings
app.get('/api/debug/mime', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Debug endpoints are disabled in production' });
  }
  
  res.json({
    mimeTypes,
    headers: req.headers,
    nodeEnv: process.env.NODE_ENV
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    error: true,
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For React Router (SPA) - handle any requests not matched by the above routes
app.get('*', (req, res) => {
  // Set proper content type for HTML files
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function startServer() {
  let dbConnected = false;
  
  try {
    dbConnected = await testDbConnection();
  } catch (err) {
    console.error('Database connection test failed:', err);
  }
  
  // In production, warn but continue even if DB connection fails initially
  if (!dbConnected && (process.env.ALLOW_DB_FAIL === 'true' || process.env.NODE_ENV !== 'production')) {
    console.warn('⚠️ WARNING: Database connection failed, but continuing server startup');
    console.warn('Please check your database configuration and ensure your database is running');
  } else if (!dbConnected) {
    console.error('❌ ERROR: Database connection failed and ALLOW_DB_FAIL is not set to true');
    console.error('Set ALLOW_DB_FAIL=true in your environment variables to start the server anyway');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API accessible at http://localhost:${PORT}/api`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database connection: ${dbConnected ? 'Successful' : 'Failed'}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
