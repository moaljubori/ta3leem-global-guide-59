
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');

// Enhanced MIME types config with module types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.tsx': 'application/javascript',
  '.ts': 'application/javascript',
  '.jsx': 'application/javascript',
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

function setupCommonMiddleware(app) {
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Enhanced middleware to properly set Content-Type headers for all files
  app.use((req, res, next) => {
    const extname = path.extname(req.url).toLowerCase();
    if (mimeTypes[extname]) {
      res.setHeader('Content-Type', mimeTypes[extname]);
    }
    next();
  });

  // Static files for uploaded media
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads'), {
    setHeaders: (res, filePath) => {
      const extname = path.extname(filePath).toLowerCase();
      if (mimeTypes[extname]) {
        res.setHeader('Content-Type', mimeTypes[extname]);
      }
    }
  }));

  // Static files for client (React build) with proper MIME types
  app.use(express.static(path.join(__dirname, '../../dist'), {
    setHeaders: (res, filePath) => {
      const extname = path.extname(filePath).toLowerCase();
      if (mimeTypes[extname]) {
        res.setHeader('Content-Type', mimeTypes[extname]);
      }
      
      // Force JavaScript MIME type for module scripts
      if (['.js', '.mjs', '.ts', '.tsx'].includes(extname)) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));

  // Create uploads directory if missing (used in main entry too)
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
  }
}

module.exports = {
  setupCommonMiddleware,
  mimeTypes
};
