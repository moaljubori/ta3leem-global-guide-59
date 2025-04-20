
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { isAuthenticated, isEditor } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Get all media files
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    
    // Build query with filters
    let query = `
      SELECT m.* FROM media_files m
      WHERE 1=1
    `;
    
    const queryParams = [];
    
    // Filter by type if provided
    if (req.query.type) {
      query += ` AND m.type = ?`;
      queryParams.push(req.query.type);
    }
    
    // Filter by name if provided
    if (req.query.search) {
      query += ` AND m.name LIKE ?`;
      queryParams.push(`%${req.query.search}%`);
    }
    
    // Add order by
    query += ` ORDER BY m.upload_date DESC`;
    
    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
    
    // Execute query
    const [files] = await db.query(query, queryParams);
    
    // Count total for pagination
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM media_files m WHERE 1=1
       ${req.query.type ? 'AND m.type = ?' : ''}
       ${req.query.search ? 'AND m.name LIKE ?' : ''}`,
      queryParams.slice(0, -2) // Remove limit and offset
    );
    
    const total = countResult[0].total;
    
    // Return files with pagination info
    res.json({
      files,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching media files:', error);
    res.status(500).json({ error: true, message: 'Server error fetching media files' });
  }
});

// Upload a new file
router.post('/upload', isAuthenticated, isEditor, upload.single('file'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: true, message: 'No file uploaded' });
    }
    
    const db = req.db;
    
    // Get file details
    const { filename, path: filePath, mimetype, size } = req.file;
    
    // Determine file type category
    let type = 'document';
    if (mimetype.startsWith('image/')) {
      type = 'image';
    } else if (mimetype.startsWith('video/')) {
      type = 'video';
    }
    
    // Get original file name from request if available
    const originalName = req.body.name || filename;
    
    // Create relative path for storage in DB
    const relativePath = filePath.replace(path.join(__dirname, '../../'), '');
    
    // Insert file record
    const [result] = await db.query(
      `INSERT INTO media_files 
       (file_id, name, path, upload_date, type, size)
       VALUES (UUID(), ?, ?, NOW(), ?, ?)`,
      [originalName, relativePath, type, size]
    );
    
    // Get the file_version_id
    const fileVersionId = result.insertId;
    
    // Return success with file details
    res.status(201).json({
      success: true,
      file: {
        id: fileVersionId,
        name: originalName,
        path: relativePath,
        type,
        size,
        url: `/uploads/${path.basename(filePath)}`
      }
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: true, message: 'Server error uploading file' });
  }
});

// Get file details
router.get('/:fileId', isAuthenticated, async (req, res) => {
  try {
    const db = req.db;
    const fileId = req.params.fileId;
    
    // Get file details
    const [files] = await db.query(
      'SELECT * FROM media_files WHERE file_version_id = ? OR file_id = ? LIMIT 1',
      [fileId, fileId]
    );
    
    if (files.length === 0) {
      return res.status(404).json({ error: true, message: 'File not found' });
    }
    
    // Return file details
    res.json({ file: files[0] });
    
  } catch (error) {
    console.error('Error fetching file details:', error);
    res.status(500).json({ error: true, message: 'Server error fetching file details' });
  }
});

// Delete a file
router.delete('/:fileId', isAuthenticated, isEditor, async (req, res) => {
  const fileId = req.params.fileId;
  
  try {
    const db = req.db;
    
    // Get file details first
    const [files] = await db.query(
      'SELECT * FROM media_files WHERE file_version_id = ? OR file_id = ? LIMIT 1',
      [fileId, fileId]
    );
    
    if (files.length === 0) {
      return res.status(404).json({ error: true, message: 'File not found' });
    }
    
    const file = files[0];
    
    // Delete the physical file
    const filePath = path.join(__dirname, '../../', file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete the database record
    await db.query(
      'DELETE FROM media_files WHERE file_version_id = ? OR file_id = ?',
      [fileId, fileId]
    );
    
    // Return success
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: true, message: 'Server error deleting file' });
  }
});

// Update file details
router.put('/:fileId', isAuthenticated, isEditor, async (req, res) => {
  const fileId = req.params.fileId;
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: true, message: 'Name is required' });
  }
  
  try {
    const db = req.db;
    
    // Update file name
    await db.query(
      'UPDATE media_files SET name = ? WHERE file_version_id = ? OR file_id = ?',
      [name, fileId, fileId]
    );
    
    // Return success
    res.json({
      success: true,
      message: 'File updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).json({ error: true, message: 'Server error updating file' });
  }
});

module.exports = router;
