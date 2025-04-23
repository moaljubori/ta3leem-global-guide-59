
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all custom code snippets
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    // Get published code snippets only for public, all for authenticated users
    let query = 'SELECT * FROM custom_code WHERE is_published = 1';
    
    // If authenticated, return all code snippets
    if (req.user) {
      query = 'SELECT * FROM custom_code';
    }
    
    // Execute query
    const [codeSnippets] = await db.query(query);
    
    res.json({ code_snippets: codeSnippets });
    
  } catch (error) {
    console.error('Error fetching custom code snippets:', error);
    res.status(500).json({ error: true, message: 'Server error fetching custom code snippets' });
  }
});

// Get custom code snippet by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.db;
    const codeId = req.params.id;
    
    const [codeSnippets] = await db.query(
      'SELECT * FROM custom_code WHERE code_id = ?',
      [codeId]
    );
    
    if (codeSnippets.length === 0) {
      return res.status(404).json({ error: true, message: 'Custom code snippet not found' });
    }
    
    res.json({ code_snippet: codeSnippets[0] });
    
  } catch (error) {
    console.error('Error fetching custom code snippet:', error);
    res.status(500).json({ error: true, message: 'Server error fetching custom code snippet' });
  }
});

// Create or update custom code snippet (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  const { name, html_code, css_code, js_code, location, is_published } = req.body;
  
  try {
    const db = req.db;
    
    // Check if the code snippet with this name already exists
    const [existingSnippets] = await db.query(
      'SELECT * FROM custom_code WHERE name = ?',
      [name]
    );
    
    let codeId;
    
    if (existingSnippets.length > 0) {
      // Update existing code snippet
      codeId = existingSnippets[0].code_id;
      
      await db.query(
        `UPDATE custom_code 
         SET html_code = ?, css_code = ?, js_code = ?, location = ?, is_published = ?
         WHERE code_id = ?`,
        [html_code, css_code, js_code, location, is_published, codeId]
      );
      
      res.json({
        success: true,
        message: 'Custom code snippet updated successfully',
        code_id: codeId
      });
    } else {
      // Create new code snippet
      codeId = require('crypto').randomUUID();
      
      await db.query(
        `INSERT INTO custom_code 
         (code_id, name, html_code, css_code, js_code, location, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [codeId, name, html_code, css_code, js_code, location, is_published]
      );
      
      res.status(201).json({
        success: true,
        message: 'Custom code snippet created successfully',
        code_id: codeId
      });
    }
    
  } catch (error) {
    console.error('Error saving custom code snippet:', error);
    res.status(500).json({ error: true, message: 'Server error saving custom code snippet' });
  }
});

// Delete custom code snippet (editor or admin only)
router.delete('/:id', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const codeId = req.params.id;
    
    await db.query(
      'DELETE FROM custom_code WHERE code_id = ?',
      [codeId]
    );
    
    res.json({
      success: true,
      message: 'Custom code snippet deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting custom code snippet:', error);
    res.status(500).json({ error: true, message: 'Server error deleting custom code snippet' });
  }
});

module.exports = router;
