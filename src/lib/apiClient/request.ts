
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? '/api' : "http://localhost:3001/api");
import { authApi } from "./auth";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = {
    ...(options.headers || {}),
  };
  
  // Only set Content-Type to application/json if:
  // 1. We're not sending FormData
  // 2. Content-Type isn't already set
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  
  // Add authorization token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const cacheBuster = endpoint.includes('?') ? `&_cb=${Date.now()}` : `?_cb=${Date.now()}`;
    const url = `${API_BASE_URL}${endpoint}${endpoint.toLowerCase().includes('status') ? '' : cacheBuster}`;

    // Don't stringify FormData objects, leave them as is
    const finalOptions = {
      ...options,
      headers,
    };
    
    // Only stringify the body if it's not FormData and it's not already a string
    if (
      finalOptions.body && 
      !(finalOptions.body instanceof FormData) && 
      typeof finalOptions.body !== 'string'
    ) {
      finalOptions.body = JSON.stringify(finalOptions.body);
    }
    
    console.log(`API Request: ${url}`, finalOptions);
    const response = await fetch(url, finalOptions);
    console.log(`API Response status: ${response.status}`);

    if (response.status === 401) {
      authApi.logout();
      window.location.href = '/admin';
      throw new Error('Authentication required');
    }

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log('API Response data:', data);
      if (!response.ok) throw new Error(data.message || `API request failed with status ${response.status}`);
      return data;
    } else {
      if (!response.ok) {
        const text = await response.text();
        console.error('API Error text:', text);
        throw new Error(`API request failed with status ${response.status}`);
      }
      return { success: true, message: 'Operation completed successfully' };
    }
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}
