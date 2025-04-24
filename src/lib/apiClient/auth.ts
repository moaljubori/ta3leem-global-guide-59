
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? '/api' : "http://localhost:3001/api");

export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_refresh_token', data.refreshToken);
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_user', JSON.stringify(data.user));
    
    return data;
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_user');
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('admin_refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_user');
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_refresh_token', data.refreshToken);
    
    return data;
  },

  getCurrentUser: () => {
    const userJson = localStorage.getItem('admin_user');
    return userJson ? JSON.parse(userJson) : null;
  },

  isAuthenticated: () => {
    return localStorage.getItem('admin_authenticated') === 'true';
  },

  registerUser: async (userData: {
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  }) => {
    const token = localStorage.getItem('admin_token');
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'User registration failed');
    }

    return response.json();
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('admin_token');
    
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password change failed');
    }

    return response.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem('admin_token');
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }

    return response.json();
  }
};
