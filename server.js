
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

// Load database configuration
const dbConfigPath = path.join(__dirname, 'database.config.json');
const dbConfigRaw = fs.readFileSync(dbConfigPath, 'utf8');
const dbConfig = JSON.parse(dbConfigRaw);

// App setup
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
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
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files for uploaded media
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
async function startServer() {
  await testDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
