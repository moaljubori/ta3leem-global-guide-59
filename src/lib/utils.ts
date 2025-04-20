import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// API Client Configuration
// Use window.location to determine the API base URL dynamically
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (typeof window !== 'undefined' ? '/api' : "http://localhost:3001/api");

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
    
    try {
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
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `API request failed with status ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
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
  },

  // Pages endpoints
  pages: {
    getAllPages: async (publishedOnly = true) => {
      return apiClient.request(`/pages?published=${publishedOnly}`);
    },

    getPageById: async (pageId: string | number) => {
      return apiClient.request(`/pages/${pageId}`);
    },

    createPage: async (pageData: any) => {
      return apiClient.request('/pages', {
        method: 'POST',
        body: JSON.stringify(pageData)
      });
    },

    updatePage: async (pageId: string | number, pageData: any) => {
      return apiClient.request(`/pages/${pageId}`, {
        method: 'PUT',
        body: JSON.stringify(pageData)
      });
    },

    publishPage: async (pageId: string | number, isPublished: boolean) => {
      return apiClient.request(`/pages/${pageId}/publish`, {
        method: 'PATCH',
        body: JSON.stringify({ is_published: isPublished })
      });
    },

    deletePage: async (pageId: string | number) => {
      return apiClient.request(`/pages/${pageId}`, {
        method: 'DELETE'
      });
    }
  },

  // Settings endpoints
  settings: {
    getAllSettings: async (category?: string) => {
      const query = category ? `?category=${category}` : '';
      return apiClient.request(`/settings${query}`);
    },

    getSetting: async (name: string) => {
      return apiClient.request(`/settings/${name}`);
    },

    updateSettings: async (settingsData: any) => {
      return apiClient.request('/settings', {
        method: 'PUT',
        body: JSON.stringify({ settings: settingsData })
      });
    },

    deleteSetting: async (name: string) => {
      return apiClient.request(`/settings/${name}`, {
        method: 'DELETE'
      });
    }
  },

  // Consultations endpoints
  consultations: {
    getAllConsultations: async (params: any = {}) => {
      const queryParams = new URLSearchParams();
      
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return apiClient.request(`/consultations${query}`);
    },

    getConsultationById: async (id: string | number) => {
      return apiClient.request(`/consultations/${id}`);
    },

    createConsultation: async (data: any) => {
      return apiClient.request('/consultations', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    updateConsultationStatus: async (id: string | number, status: string) => {
      return apiClient.request(`/consultations/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    },

    deleteConsultation: async (id: string | number) => {
      return apiClient.request(`/consultations/${id}`, {
        method: 'DELETE'
      });
    }
  },

  // Advertisements endpoints
  advertisements: {
    getAllAdvertisements: async (activeOnly = false) => {
      return apiClient.request(`/advertisements?active=${activeOnly}`);
    },

    getAdvertisementById: async (id: string | number) => {
      return apiClient.request(`/advertisements/${id}`);
    },

    createAdvertisement: async (data: any) => {
      return apiClient.request('/advertisements', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    updateAdvertisement: async (id: string | number, data: any) => {
      return apiClient.request(`/advertisements/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    deleteAdvertisement: async (id: string | number) => {
      return apiClient.request(`/advertisements/${id}`, {
        method: 'DELETE'
      });
    }
  },

  // Users endpoints
  users: {
    getAllUsers: async () => {
      return apiClient.request('/users');
    },

    getUserById: async (id: string | number) => {
      return apiClient.request(`/users/${id}`);
    },

    createUser: async (userData: any) => {
      return apiClient.request('/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },

    updateUser: async (id: string | number, userData: any) => {
      return apiClient.request(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      });
    },

    deleteUser: async (id: string | number) => {
      return apiClient.request(`/users/${id}`, {
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
