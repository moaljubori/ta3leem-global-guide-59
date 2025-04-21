
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
};
