// Netlify Serverless Function: Authentication
// Handles login, register, and token verification

const crypto = require('crypto');

// Simple in-memory store (replace with real database in production)
// For production, use: FaunaDB, Supabase, MongoDB Atlas, or PlanetScale
let users = new Map();

// Helper to hash passwords
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Helper to generate a simple token
const generateToken = (userId) => {
  const payload = {
    userId,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

// Helper to verify token
const verifyToken = (token) => {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/auth', '');
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    // POST /auth/register
    if (event.httpMethod === 'POST' && path === '/register') {
      const { username, email, password, name } = body;

      if (!username || !email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Username, email, and password are required' })
        };
      }

      // Check if user exists
      if (users.has(email)) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: 'User already exists' })
        };
      }

      // Create new user
      const userId = crypto.randomUUID();
      const user = {
        id: userId,
        username,
        email,
        password: hashPassword(password),
        name: name || username,
        createdAt: new Date().toISOString(),
        profile: {
          title: '',
          location: '',
          bio: '',
          avatar: null
        },
        points: {
          total: 100, // Welcome bonus
          donated: 0,
          utilized: 0,
          available: 100
        },
        settings: {
          notifications: { email: true, push: false, sms: false },
          privacy: { profileVisibility: 'public', showEmail: false }
        }
      };

      users.set(email, user);

      // Generate token
      const token = generateToken(userId);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          message: 'User registered successfully',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            profile: user.profile,
            points: user.points
          }
        })
      };
    }

    // POST /auth/login
    if (event.httpMethod === 'POST' && path === '/login') {
      const { email, password } = body;

      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email and password are required' })
        };
      }

      const user = users.get(email);

      if (!user || user.password !== hashPassword(password)) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Invalid email or password' })
        };
      }

      // Generate token
      const token = generateToken(user.id);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            profile: user.profile,
            points: user.points,
            settings: user.settings
          }
        })
      };
    }

    // GET /auth/verify - Verify token
    if (event.httpMethod === 'GET' && path === '/verify') {
      const authHeader = event.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'No token provided' })
        };
      }

      const token = authHeader.split(' ')[1];
      const payload = verifyToken(token);

      if (!payload) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Invalid or expired token' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ valid: true, userId: payload.userId })
      };
    }

    // POST /auth/logout
    if (event.httpMethod === 'POST' && path === '/logout') {
      // For stateless JWT, logout is handled client-side
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Logged out successfully' })
      };
    }

    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

