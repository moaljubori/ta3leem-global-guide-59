
/**
 * Example API Usage
 * 
 * This file demonstrates how to interact with the API endpoints
 * using both vanilla JavaScript and React.
 */

// ===========================================
// Vanilla JavaScript Examples
// ===========================================

// Authentication
async function loginUser(username, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Get user's blog posts
async function getUserPosts() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/blog?author=me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch posts');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Create a new blog post
async function createPost(postData) {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create post');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Update a blog post
async function updatePost(postId, postData) {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`/api/blog/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update post');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Delete a blog post
async function deletePost(postId) {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`/api/blog/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete post');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// ===========================================
// React Examples with Hooks
// ===========================================

/**
 * Example React Authentication Hook
 * 
 * Usage:
 * const { user, login, logout, isLoading, error } = useAuth();
 */
function useAuthExample() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    // Check if user is already logged in on component mount
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (token && userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch (e) {
        console.error('Failed to parse stored user data');
      }
    }
  }, []);
  
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await loginUser(username, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return { user, login, logout, isLoading, error };
}

/**
 * Example React Blog Posts Hook
 * 
 * Usage:
 * const { posts, isLoading, error, fetchPosts, createPost, updatePost, deletePost } = useBlogPosts();
 */
function useBlogPostsExample() {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  const fetchPosts = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getUserPosts();
      setPosts(data.posts || []);
      return data.posts;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const createNewPost = React.useCallback(async (postData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await createPost(postData);
      fetchPosts(); // Refresh posts after creating new one
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchPosts]);
  
  const updateExistingPost = React.useCallback(async (postId, postData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await updatePost(postId, postData);
      fetchPosts(); // Refresh posts after update
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchPosts]);
  
  const deleteExistingPost = React.useCallback(async (postId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await deletePost(postId);
      fetchPosts(); // Refresh posts after deletion
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchPosts]);
  
  // Fetch posts on component mount
  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost: createNewPost,
    updatePost: updateExistingPost,
    deletePost: deleteExistingPost
  };
}
