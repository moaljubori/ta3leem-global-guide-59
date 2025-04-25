
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Common MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.csv': 'text/csv'
};

/**
 * Set up common middleware used across the application
 * @param {Express} app - Express application
 */
function setupCommonMiddleware(app) {
  // CORS configuration
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.VITE_PUBLIC_URL || true 
      : 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  
  // Body parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Static files
  // Serve React app from dist
  const distDir = path.join(__dirname, '../../dist');
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, { 
      // Set proper MIME types for files
      setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        if (mimeTypes[ext]) {
          res.setHeader('Content-Type', mimeTypes[ext]);
        }
      }
    }));
    console.log('Serving static files from:', distDir);
  }
  
  // Serve uploads directory
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (mimeTypes[ext]) {
        res.setHeader('Content-Type', mimeTypes[ext]);
      }
    }
  }));
  console.log('Serving uploads from:', uploadsDir);
}

module.exports = {
  setupCommonMiddleware,
  mimeTypes
};
