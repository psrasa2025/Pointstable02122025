// Netlify Serverless Function: Authentication with Supabase
// Handles login, register, and token verification with persistent storage

const crypto = require('crypto');
const { 
  supabase, 
  isSupabaseConfigured,
  corsHeaders,
  success,
  created,
  badRequest,
  unauthorized,
  notFound,
  serverError
} = require('./utils/supabase');

// Fallback in-memory store (used when Supabase is not configured)
let fallbackUsers = new Map();

// Helper to hash passwords
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + (process.env.PASSWORD_SALT || 'default-salt')).digest('hex');
};

// Helper to generate a simple token
const generateToken = (userId, email) => {
  const payload = {
    userId,
    email,
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

// ============================================
// DATABASE OPERATIONS
// ============================================

// Create user in database
const createUser = async (userData) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    // Fallback to in-memory
    fallbackUsers.set(userData.email, userData);
    return userData;
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } else {
    return fallbackUsers.get(email) || null;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } else {
    for (const user of fallbackUsers.values()) {
      if (user.id === userId) return user;
    }
    return null;
  }
};

// Initialize user points
const initializeUserPoints = async (userId) => {
  if (isSupabaseConfigured()) {
    const pointsData = {
      user_id: userId,
      total: 100,
      donated: 0,
      utilized: 0,
      available: 100
    };
    
    await supabase.from('points').insert([pointsData]);
    
    // Add welcome bonus to history
    await supabase.from('points_history').insert([{
      user_id: userId,
      type: 'earned',
      amount: 100,
      description: 'Welcome bonus',
      created_at: new Date().toISOString()
    }]);
  }
};

// ============================================
// MAIN HANDLER
// ============================================

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/auth', '');
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    // ========== POST /auth/register ==========
    if (event.httpMethod === 'POST' && path === '/register') {
      const { username, email, password, name } = body;

      if (!username || !email || !password) {
        return badRequest('Username, email, and password are required');
      }

      // Check if user exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return { 
          statusCode: 409, 
          headers: corsHeaders, 
          body: JSON.stringify({ error: 'User already exists' }) 
        };
      }

      // Create new user
      const userId = crypto.randomUUID();
      const newUser = {
        id: userId,
        username,
        email,
        password: hashPassword(password),
        name: name || username,
        title: '',
        location: '',
        bio: '',
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await createUser(newUser);
      
      // Initialize points
      await initializeUserPoints(userId);

      // Generate token
      const token = generateToken(userId, email);

      return created({
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name
        }
      }, 'User registered successfully');
    }

    // ========== POST /auth/login ==========
    if (event.httpMethod === 'POST' && path === '/login') {
      const { email, password } = body;

      if (!email || !password) {
        return badRequest('Email and password are required');
      }

      const user = await getUserByEmail(email);

      if (!user || user.password !== hashPassword(password)) {
        return unauthorized('Invalid email or password');
      }

      // Generate token
      const token = generateToken(user.id, user.email);

      return success({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          title: user.title,
          location: user.location,
          bio: user.bio,
          avatar_url: user.avatar_url
        }
      }, 'Login successful');
    }

    // ========== GET /auth/verify ==========
    if (event.httpMethod === 'GET' && path === '/verify') {
      const authHeader = event.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return unauthorized('No token provided');
      }

      const token = authHeader.split(' ')[1];
      const payload = verifyToken(token);

      if (!payload) {
        return unauthorized('Invalid or expired token');
      }

      // Get fresh user data
      const user = await getUserById(payload.userId);
      
      if (!user) {
        return unauthorized('User not found');
      }

      return success({
        valid: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name
        }
      });
    }

    // ========== POST /auth/logout ==========
    if (event.httpMethod === 'POST' && path === '/logout') {
      return success({}, 'Logged out successfully');
    }

    // ========== POST /auth/forgot-password ==========
    if (event.httpMethod === 'POST' && path === '/forgot-password') {
      const { email } = body;
      
      if (!email) {
        return badRequest('Email is required');
      }

      // In production, send password reset email
      // For now, just return success
      return success({}, 'If an account exists, a password reset link will be sent');
    }

    // Route not found
    return notFound('Route not found');

  } catch (error) {
    console.error('Auth error:', error);
    return serverError(error.message || 'Internal server error');
  }
};
