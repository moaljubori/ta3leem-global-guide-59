
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEditor } = require('../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    
    // Default query for all posts
    let query = `
      SELECT bp.post_id, bp.title, bp.content, bp.publish_date, bp.category, bp.tags,
             bp.url, bp.is_published, au.first_name as author_first_name, 
             au.last_name as author_last_name, mf.path as image_path
      FROM blog_posts bp
      LEFT JOIN admin_users au ON bp.author_id = au.user_id
      LEFT JOIN media_files mf ON bp.image_version_id = mf.file_version_id
      ORDER BY bp.publish_date DESC
    `;
    
    // If checking for published posts only
    if (req.query.published === 'true') {
      query = `
        SELECT bp.post_id, bp.title, bp.content, bp.publish_date, bp.category, bp.tags,
               bp.url, au.first_name as author_first_name, 
               au.last_name as author_last_name, mf.path as image_path
        FROM blog_posts bp
        LEFT JOIN admin_users au ON bp.author_id = au.user_id
        LEFT JOIN media_files mf ON bp.image_version_id = mf.file_version_id
        WHERE bp.is_published = true
        ORDER BY bp.publish_date DESC
      `;
    }
    
    // Filter by category if provided
    if (req.query.category) {
      if (query.includes('WHERE')) {
        query += ` AND bp.category = ?`;
      } else {
        query += ` WHERE bp.category = ?`;
      }
    }
    
    // Execute the query
    let params = [];
    if (req.query.category) {
      params.push(req.query.category);
    }
    
    const [posts] = await db.query(query, params);
    
    // Process the posts to create excerpts and format data
    const processedPosts = posts.map(post => {
      // Create excerpt from content (first 150 characters)
      const excerpt = post.content 
        ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
        : '';
      
      // Format author name
      const author = post.author_first_name && post.author_last_name
        ? `${post.author_first_name} ${post.author_last_name}`
        : 'Unknown Author';
      
      // Format date
      const date = post.publish_date
        ? new Date(post.publish_date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : '';
      
      return {
        id: post.post_id,
        title: post.title,
        excerpt: excerpt,
        content: post.content,
        category: post.category,
        date: date,
        author: author,
        image: post.image_path || '',
        url: post.url || `/blog/${post.post_id}`,
        tags: post.tags ? post.tags.split(',') : [],
        is_published: post.is_published
      };
    });
    
    // Get categories for filtering
    const [categoriesResult] = await db.query(`
      SELECT DISTINCT category FROM blog_posts WHERE category IS NOT NULL
    `);
    
    const categories = categoriesResult.map(item => item.category);
    categories.unshift('جميع المقالات'); // Add "All Posts" as first category
    
    res.json({ 
      posts: processedPosts,
      categories: categories
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: true, message: 'Server error fetching blog posts' });
  }
});

// Get single blog post by ID
router.get('/:postId', async (req, res) => {
  try {
    const db = req.db;
    const postId = req.params.postId;
    
    // Get post with author and image information
    const [posts] = await db.query(`
      SELECT bp.post_id, bp.title, bp.content, bp.publish_date, bp.category, bp.tags,
             bp.url, bp.is_published, au.first_name as author_first_name, 
             au.last_name as author_last_name, mf.path as image_path
      FROM blog_posts bp
      LEFT JOIN admin_users au ON bp.author_id = au.user_id
      LEFT JOIN media_files mf ON bp.image_version_id = mf.file_version_id
      WHERE bp.post_id = ?
    `, [postId]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: true, message: 'Blog post not found' });
    }
    
    const post = posts[0];
    
    // Format the post
    const formattedPost = {
      id: post.post_id,
      title: post.title,
      content: post.content,
      category: post.category,
      date: post.publish_date
        ? new Date(post.publish_date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : '',
      author: post.author_first_name && post.author_last_name
        ? `${post.author_first_name} ${post.author_last_name}`
        : 'Unknown Author',
      readTime: Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, '').length / 1000)) + ' دقائق',
      image: post.image_path || '',
      tags: post.tags ? post.tags.split(',') : []
    };
    
    // Get related posts (same category)
    const [relatedPosts] = await db.query(`
      SELECT bp.post_id, bp.title, bp.publish_date, mf.path as image_path
      FROM blog_posts bp
      LEFT JOIN media_files mf ON bp.image_version_id = mf.file_version_id
      WHERE bp.category = ? AND bp.post_id != ? AND bp.is_published = true
      ORDER BY bp.publish_date DESC
      LIMIT 3
    `, [post.category, postId]);
    
    const formattedRelatedPosts = relatedPosts.map(relPost => ({
      id: relPost.post_id,
      title: relPost.title,
      date: relPost.publish_date
        ? new Date(relPost.publish_date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : '',
      image: relPost.image_path || ''
    }));
    
    formattedPost.relatedPosts = formattedRelatedPosts;
    
    res.json({ post: formattedPost });
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: true, message: 'Server error fetching blog post' });
  }
});

// Create a new blog post (editor or admin only)
router.post('/', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const { title, content, image_id, category, tags, url, is_published } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: true, message: 'Title and content are required' });
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert into page_versions first to get page_version_id
      const [pageVersionResult] = await connection.query(
        'INSERT INTO page_versions (page_id) VALUES (UUID())'
      );
      const pageVersionId = pageVersionResult.insertId;
      
      // Insert blog post
      const [postResult] = await connection.query(
        `INSERT INTO blog_posts 
         (post_id, page_version_id, title, content, image_version_id, 
          publish_date, author_id, url, is_published, category, tags)
         VALUES (UUID(), ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
        [pageVersionId, title, content, image_id, req.user.id, url, is_published || false, category, tags]
      );
      
      await connection.commit();
      
      res.status(201).json({
        success: true,
        message: 'Blog post created successfully',
        post_id: postResult.insertId
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: true, message: 'Server error creating blog post' });
  }
});

// Update a blog post (editor or admin only)
router.put('/:postId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const postId = req.params.postId;
    const { title, content, image_id, category, tags, url, is_published } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: true, message: 'Title and content are required' });
    }
    
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Create new version
      const [pageVersionResult] = await connection.query(
        'INSERT INTO page_versions (page_id) VALUES (?)',
        [postId]
      );
      const pageVersionId = pageVersionResult.insertId;
      
      // Insert updated blog post
      await connection.query(
        `INSERT INTO blog_posts 
         (post_id, page_version_id, title, content, image_version_id, 
          publish_date, author_id, url, is_published, category, tags)
         VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
        [postId, pageVersionId, title, content, image_id, req.user.id, url, is_published, category, tags]
      );
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Blog post updated successfully',
        post_id: postId
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: true, message: 'Server error updating blog post' });
  }
});

// Delete a blog post (editor or admin only)
router.delete('/:postId', isAuthenticated, isEditor, async (req, res) => {
  try {
    const db = req.db;
    const postId = req.params.postId;
    
    await db.query('DELETE FROM blog_posts WHERE post_id = ?', [postId]);
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: true, message: 'Server error deleting blog post' });
  }
});

module.exports = router;
