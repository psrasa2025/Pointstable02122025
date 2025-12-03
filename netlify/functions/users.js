// Netlify Serverless Function: User Profile Management
// Handles user profile CRUD operations

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// Simulated user database (replace with real database)
// In production, share this with auth.js via external database
let usersDb = new Map();

// Initialize with demo user
usersDb.set('demo', {
  id: 'demo-user-001',
  username: 'johndoe',
  email: 'john@example.com',
  name: 'John Doe',
  profile: {
    title: 'Software Engineer',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer with 5+ years of experience building scalable web applications.',
    avatar: null,
    stats: {
      posts: 127,
      followers: 1203,
      following: 342
    },
    contact: {
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      website: 'johndoe.dev'
    },
    social: {
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe'
    }
  },
  points: {
    total: 1500,
    donated: 250,
    utilized: 700,
    available: 550
  },
  settings: {
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
});

// Helper to verify token (simplified)
const verifyToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/users', '');
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    // For demo purposes, allow unauthenticated access to demo user
    // In production, always verify token
    const userId = path.split('/')[1] || 'demo';

    // GET /users/:id - Get user profile
    if (event.httpMethod === 'GET') {
      const user = usersDb.get(userId) || usersDb.get('demo');
      
      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'User not found' })
        };
      }

      // Return user without sensitive data
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            profile: user.profile,
            points: user.points,
            settings: user.settings
          }
        })
      };
    }

    // PUT /users/:id - Update user profile
    if (event.httpMethod === 'PUT') {
      let user = usersDb.get(userId) || usersDb.get('demo');
      
      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'User not found' })
        };
      }

      // Update profile fields
      const { name, profile, settings } = body;
      
      if (name) user.name = name;
      if (profile) {
        user.profile = { ...user.profile, ...profile };
      }
      if (settings) {
        user.settings = {
          ...user.settings,
          notifications: { ...user.settings.notifications, ...settings.notifications },
          privacy: { ...user.settings.privacy, ...settings.privacy },
          account: { ...user.settings.account, ...settings.account }
        };
      }

      usersDb.set(userId === 'demo' ? 'demo' : userId, user);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Profile updated successfully',
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            profile: user.profile,
            points: user.points,
            settings: user.settings
          }
        })
      };
    }

    // DELETE /users/:id - Delete user account
    if (event.httpMethod === 'DELETE') {
      const authPayload = verifyToken(event.headers.authorization);
      
      // Don't allow deleting demo user
      if (userId === 'demo') {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'Cannot delete demo user' })
        };
      }

      if (!usersDb.has(userId)) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'User not found' })
        };
      }

      usersDb.delete(userId);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'User deleted successfully' })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Users error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

