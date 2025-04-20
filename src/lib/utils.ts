import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// API Client Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Client-side API utilities
export const apiClient = {
  // Auth endpoints
  auth: {
    login: async (username: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      
      return data;
    },
    
    logout: () => {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_user');
    },
    
    getCurrentUser: () => {
      const userJson = localStorage.getItem('admin_user');
      return userJson ? JSON.parse(userJson) : null;
    },
    
    isAuthenticated: () => {
      return localStorage.getItem('admin_authenticated') === 'true';
    }
  },
  
  // Authenticated API request helper
  request: async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('admin_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (response.status === 401) {
      // Token expired or invalid, logout
      apiClient.auth.logout();
      window.location.href = '/admin';
      throw new Error('Authentication required');
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  },
  
  // File upload helper
  uploadFile: async (file: File, name?: string) => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    formData.append('file', file);
    
    if (name) {
      formData.append('name', name);
    }
    
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'File upload failed');
    }
    
    return response.json();
  },
  
  // Blog endpoints
  blog: {
    getAllPosts: async (publishedOnly = true) => {
      return apiClient.request(`/blog?published=${publishedOnly}`);
    },
    
    getPostById: async (postId: string | number) => {
      return apiClient.request(`/blog/${postId}`);
    },
    
    createPost: async (postData: any) => {
      return apiClient.request('/blog', {
        method: 'POST',
        body: JSON.stringify(postData)
      });
    },
    
    updatePost: async (postId: string | number, postData: any) => {
      return apiClient.request(`/blog/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(postData)
      });
    },
    
    deletePost: async (postId: string | number) => {
      return apiClient.request(`/blog/${postId}`, {
        method: 'DELETE'
      });
    }
  }
};

// Mock database configuration for client-side usage
// In a production app, this would be handled by an API
export const dbConfig = {
  name: "MyDatabase",
  host: "localhost",
  port: 3306,
  username: "dbuser",
  password: "dbpassword",
  database: "mydatabase"
};

// Client-side mock of database connection for development
// In a production app, database operations would be performed via API endpoints
export const createConnection = async () => {
  console.log('Client attempting to connect to database - this should be handled by an API in production');
  return {
    query: async (sql: string, params: any[] = []) => {
      console.log('Query executed:', sql, params);
      return [[], []]; // Mock empty result
    },
    end: () => console.log('Connection closed')
  };
};
