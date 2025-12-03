// API Service - Connects frontend to Netlify Serverless Functions
// This service provides a clean interface to all backend endpoints

const API_BASE = '/api';

// Helper to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper to set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Helper for making API requests
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const token = getAuthToken();

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  // Login user
  login: async (email, password) => {
    const response = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  // Logout user
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      setAuthToken(null);
    }
  },

  // Verify token
  verifyToken: async () => {
    return request('/auth/verify');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  }
};

// ============================================
// USERS API
// ============================================
export const usersAPI = {
  // Get current user profile
  getProfile: async (userId = 'demo') => {
    return request(`/users/${userId}`);
  },

  // Update user profile
  updateProfile: async (userId = 'demo', profileData) => {
    return request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  // Delete user account
  deleteAccount: async (userId) => {
    return request(`/users/${userId}`, {
      method: 'DELETE'
    });
  }
};

// ============================================
// POINTS API
// ============================================
export const pointsAPI = {
  // Get user's points
  getPoints: async () => {
    return request('/points/');
  },

  // Get points history
  getHistory: async () => {
    return request('/points/history');
  },

  // Get conversion rates
  getRates: async () => {
    return request('/points/rates');
  },

  // Add points (admin/system)
  addPoints: async (amount, description) => {
    return request('/points/add', {
      method: 'POST',
      body: JSON.stringify({ amount, description })
    });
  },

  // Donate points
  donate: async (amount, recipient, message) => {
    return request('/points/donate', {
      method: 'POST',
      body: JSON.stringify({ amount, recipient, message })
    });
  },

  // Transfer points
  transfer: async (amount, recipientId, note) => {
    return request('/points/transfer', {
      method: 'POST',
      body: JSON.stringify({ amount, recipientId, note })
    });
  },

  // Convert points to currency
  convert: async (amount, currency) => {
    return request('/points/convert', {
      method: 'POST',
      body: JSON.stringify({ amount, currency })
    });
  }
};

// ============================================
// ACTIVITIES API
// ============================================
export const activitiesAPI = {
  // Get all activities
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return request(`/activities/${params ? '?' + params : ''}`);
  },

  // Get user's activities
  getMine: async () => {
    return request('/activities/my');
  },

  // Get single activity
  getById: async (activityId) => {
    return request(`/activities/${activityId}`);
  },

  // Create activity
  create: async (activityData) => {
    return request('/activities/', {
      method: 'POST',
      body: JSON.stringify(activityData)
    });
  },

  // Update activity
  update: async (activityId, activityData) => {
    return request(`/activities/${activityId}`, {
      method: 'PUT',
      body: JSON.stringify(activityData)
    });
  },

  // Delete activity
  delete: async (activityId) => {
    return request(`/activities/${activityId}`, {
      method: 'DELETE'
    });
  },

  // Join activity
  join: async (activityId) => {
    return request(`/activities/${activityId}/join`, {
      method: 'POST'
    });
  },

  // Leave activity
  leave: async (activityId) => {
    return request(`/activities/${activityId}/leave`, {
      method: 'POST'
    });
  },

  // Invite friends to activity
  invite: async (activityId, friendIds, message) => {
    return request(`/activities/${activityId}/invite`, {
      method: 'POST',
      body: JSON.stringify({ friendIds, message })
    });
  },

  // Search activities
  search: async (query) => {
    return request(`/activities/?search=${encodeURIComponent(query)}`);
  }
};

// ============================================
// LEADERBOARD API
// ============================================
export const leaderboardAPI = {
  // Get world leaderboard
  getWorld: async (limit = 15, offset = 0) => {
    return request(`/leaderboard/world?limit=${limit}&offset=${offset}`);
  },

  // Get country leaderboard
  getCountry: async (countryCode) => {
    return request(`/leaderboard/country/${countryCode}`);
  },

  // Get list of countries
  getCountries: async () => {
    return request('/leaderboard/countries');
  },

  // Get user's rank
  getUserRank: async (userId) => {
    return request(`/leaderboard/user/${userId}`);
  }
};

// ============================================
// COMBINED API OBJECT
// ============================================
const api = {
  auth: authAPI,
  users: usersAPI,
  points: pointsAPI,
  activities: activitiesAPI,
  leaderboard: leaderboardAPI,
  setAuthToken
};

export default api;
