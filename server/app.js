
require('dotenv').config();
const express = require('express');
const path = require('path');
const { pool, dbConfig } = require('./database');
const { setupCommonMiddleware, mimeTypes } = require('./middleware/commonMiddleware');
const registerRoutes = require('./routes');
const fs = require('fs');

// App setup
const app = express();

// Set up global middleware (CORS, body-parser, static, mimetype, uploads)
setupCommonMiddleware(app);

// Make db pool available to route handlers
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// Register API routes
registerRoutes(app);

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

// MIME type test endpoint for JavaScript modules
app.get('/api/debug/mime-test', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send('console.log("MIME type test successful")');
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
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

module.exports = app;
