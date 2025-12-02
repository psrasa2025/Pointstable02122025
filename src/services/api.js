/**
 * API Service for connecting to the backend
 * Update API_URL to match your backend server
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to save token
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Helper function to remove token
const removeToken = () => {
  localStorage.removeItem('token');
};

// Base request function
const request = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  // Add body if provided
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle 401 (unauthorized) - clear token and redirect to login
      if (response.status === 401) {
        removeToken();
        // You can add redirect logic here if needed
      }
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API methods
export const api = {
  // Authentication
  async register(email, password, name) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: { email, password, name }
    });
    
    if (data.token) {
      saveToken(data.token);
    }
    
    return data;
  },

  async login(email, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    if (data.token) {
      saveToken(data.token);
    }
    
    return data;
  },

  logout() {
    removeToken();
  },

  async getCurrentUser() {
    return request('/auth/me');
  },

  // User Profiles
  async getAllUsers() {
    return request('/users');
  },

  async getUserById(id) {
    return request(`/users/${id}`);
  },

  async getProfile() {
    return request('/users/me/profile');
  },

  async updateProfile(profileData) {
    return request('/users/me/profile', {
      method: 'PUT',
      body: profileData
    });
  },

  async updateSettings(settings) {
    return request('/users/me/settings', {
      method: 'PUT',
      body: settings
    });
  },

  async updateStats(stats) {
    return request('/users/me/stats', {
      method: 'PUT',
      body: stats
    });
  },

  async deleteAccount() {
    const data = await request('/users/me', {
      method: 'DELETE'
    });
    removeToken();
    return data;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

export default api;


