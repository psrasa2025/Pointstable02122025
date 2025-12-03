// LocalStorage utility for persisting user data

const STORAGE_KEYS = {
  USER: 'user_profile',
  NOTIFICATIONS: 'notifications',
  ACTIVITIES: 'activities',
  POINTS: 'points_data',
  SETTINGS: 'user_settings',
  FRIEND_REQUESTS: 'friend_requests',
  ACTIVITY_HISTORY: 'activity_history'
}

// Generic storage functions
export const storage = {
  // Get data from localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return null
    }
  },

  // Set data in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
      return false
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
      return false
    }
  },

  // Clear all app data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// User-specific storage functions
export const userStorage = {
  // Save user profile
  saveProfile: (userData) => {
    return storage.set(STORAGE_KEYS.USER, userData)
  },

  // Get user profile
  getProfile: () => {
    return storage.get(STORAGE_KEYS.USER) || {
      name: 'John Doe',
      title: 'Software Engineer',
      location: 'San Francisco, CA',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate software engineer with 5+ years of experience.',
      avatar: null,
      stats: {
        posts: 127,
        followers: 1203,
        following: 342
      }
    }
  },

  // Update specific profile fields
  updateProfile: (updates) => {
    const currentProfile = userStorage.getProfile()
    const updatedProfile = { ...currentProfile, ...updates }
    return storage.set(STORAGE_KEYS.USER, updatedProfile)
  }
}

// Points storage functions
export const pointsStorage = {
  savePoints: (pointsData) => {
    return storage.set(STORAGE_KEYS.POINTS, pointsData)
  },

  getPoints: () => {
    return storage.get(STORAGE_KEYS.POINTS) || {
      total: 1500,
      donated: 250,
      utilized: 700,
      available: 550
    }
  },

  updatePoints: (updates) => {
    const currentPoints = pointsStorage.getPoints()
    const updatedPoints = { ...currentPoints, ...updates }
    return storage.set(STORAGE_KEYS.POINTS, updatedPoints)
  },

  addPoints: (amount) => {
    const points = pointsStorage.getPoints()
    points.total += amount
    points.available += amount
    return pointsStorage.savePoints(points)
  },

  deductPoints: (amount, type = 'utilized') => {
    const points = pointsStorage.getPoints()
    if (points.available >= amount) {
      points.available -= amount
      points[type] += amount
      return pointsStorage.savePoints(points)
    }
    return false
  }
}

// Notifications storage
export const notificationsStorage = {
  save: (notifications) => {
    return storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications)
  },

  get: () => {
    return storage.get(STORAGE_KEYS.NOTIFICATIONS) || []
  },

  add: (notification) => {
    const notifications = notificationsStorage.get()
    notifications.unshift({ ...notification, id: Date.now(), read: false })
    return storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications)
  },

  markAsRead: (id) => {
    const notifications = notificationsStorage.get()
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
    return storage.set(STORAGE_KEYS.NOTIFICATIONS, updated)
  },

  delete: (id) => {
    const notifications = notificationsStorage.get()
    const updated = notifications.filter(n => n.id !== id)
    return storage.set(STORAGE_KEYS.NOTIFICATIONS, updated)
  }
}

// Activities storage
export const activitiesStorage = {
  save: (activities) => {
    return storage.set(STORAGE_KEYS.ACTIVITIES, activities)
  },

  get: () => {
    return storage.get(STORAGE_KEYS.ACTIVITIES) || []
  },

  add: (activity) => {
    const activities = activitiesStorage.get()
    activities.push({ ...activity, id: Date.now() })
    return storage.set(STORAGE_KEYS.ACTIVITIES, activities)
  },

  update: (id, updates) => {
    const activities = activitiesStorage.get()
    const updated = activities.map(a =>
      a.id === id ? { ...a, ...updates } : a
    )
    return storage.set(STORAGE_KEYS.ACTIVITIES, updated)
  },

  delete: (id) => {
    const activities = activitiesStorage.get()
    const updated = activities.filter(a => a.id !== id)
    return storage.set(STORAGE_KEYS.ACTIVITIES, updated)
  }
}

// Settings storage
export const settingsStorage = {
  save: (settings) => {
    return storage.set(STORAGE_KEYS.SETTINGS, settings)
  },

  get: () => {
    return storage.get(STORAGE_KEYS.SETTINGS) || {
      notifications: {
        email: true,
        push: false,
        sms: false,
        weeklyDigest: true,
        marketingEmails: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false
      },
      account: {
        language: 'en',
        timezone: 'UTC',
        theme: 'light'
      }
    }
  },

  update: (updates) => {
    const current = settingsStorage.get()
    const updated = { ...current, ...updates }
    return storage.set(STORAGE_KEYS.SETTINGS, updated)
  }
}

// Export all storage keys for reference
export { STORAGE_KEYS }


