
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? '/api' : "http://localhost:3001/api");
import { authApi } from "./auth";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const cacheBuster = endpoint.includes('?') ? `&_cb=${Date.now()}` : `?_cb=${Date.now()}`;
    const url = `${API_BASE_URL}${endpoint}${endpoint.toLowerCase().includes('status') ? '' : cacheBuster}`;

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      authApi.logout();
      window.location.href = '/admin';
      throw new Error('Authentication required');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `API request failed with status ${response.status}`);
      return data;
    } else {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API request failed with status ${response.status}`);
      }
      return { success: true, message: 'Operation completed successfully' };
    }
  } catch (error) {
    throw error;
  }
}
