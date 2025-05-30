
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? '/api' : "http://localhost:3001/api");
import { authApi } from "./auth";

let isRefreshing = false;
let failedQueue: {resolve: (value: unknown) => void; reject: (reason?: any) => void}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  
  failedQueue = [];
};

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
    let response = await fetch(url, finalOptions);
    console.log(`API Response status: ${response.status}`);

    // Handle token expiration
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      
      // Check if token expired error
      if (errorData.code === 'token_expired') {
        // If already refreshing, wait until refresh completes
        if (isRefreshing) {
          try {
            await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            // After refresh completes, retry the original request
            return apiRequest(endpoint, options);
          } catch (err) {
            authApi.logout();
            window.location.href = '/admin';
            throw new Error('Authentication required');
          }
        }

        // Start refreshing
        isRefreshing = true;
        
        try {
          // Try to refresh the token
          const refreshResult = await authApi.refreshToken();
          isRefreshing = false;
          
          if (refreshResult && refreshResult.token) {
            // Update the auth header with new token
            headers['Authorization'] = `Bearer ${refreshResult.token}`;
            
            // Process the queue with the new token
            processQueue(null, refreshResult.token);
            
            // Retry the original request with new token
            const retryOptions = {
              ...finalOptions,
              headers
            };
            
            // Retry the request
            response = await fetch(url, retryOptions);
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error) {
          isRefreshing = false;
          processQueue(new Error('Failed to refresh token'));
          authApi.logout();
          window.location.href = '/admin';
          throw new Error('Authentication required');
        }
      } else {
        // For other 401 errors, logout
        authApi.logout();
        window.location.href = '/admin';
        throw new Error('Authentication required');
      }
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
