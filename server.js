
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
} catch (error) {
  console.error('Failed to load database configuration:', error);
  process.exit(1);
}

// Database connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
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
// Configure CORS to allow requests from any origin during development
// In production, you should restrict this to your specific domains
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files for uploaded media
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Static files for client (React build)
// For production, serve the React build files
app.use(express.static(path.join(__dirname, 'dist')));

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

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbConfig.database,
    host: dbConfig.host
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For React Router (SPA) - handle any requests not matched by the above routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function startServer() {
  const dbConnected = await testDbConnection();
  
  if (!dbConnected && process.env.NODE_ENV === 'production') {
    console.warn('Warning: Starting server despite database connection failure');
  } else if (!dbConnected && process.env.NODE_ENV !== 'production') {
    console.error('Failed to connect to database in development mode, exiting');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API accessible at http://localhost:${PORT}/api`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
