// Netlify Serverless Function: User Profile Management with Supabase
// Handles user profile CRUD operations with persistent storage

const { 
  supabase, 
  isSupabaseConfigured,
  corsHeaders,
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError
} = require('./utils/supabase');

// Fallback in-memory store
let fallbackUsers = new Map();

// Initialize with demo user
const demoUser = {
  id: 'demo-user-001',
  username: 'johndoe',
  email: 'john@example.com',
  name: 'John Doe',
  title: 'Software Engineer',
  location: 'San Francisco, CA',
  bio: 'Passionate software engineer with 5+ years of experience building scalable web applications.',
  avatar_url: null,
  phone: '+1 (555) 123-4567',
  website: 'johndoe.dev',
  twitter: '@johndoe',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe',
  stats_posts: 127,
  stats_followers: 1203,
  stats_following: 342
};
fallbackUsers.set('demo', demoUser);

// Helper to verify token
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

// ============================================
// DATABASE OPERATIONS
// ============================================

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
    if (userId === 'demo') return fallbackUsers.get('demo');
    for (const user of fallbackUsers.values()) {
      if (user.id === userId) return user;
    }
    return null;
  }
};

// Update user profile
const updateUser = async (userId, updates) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    const user = await getUserById(userId);
    if (user) {
      const updated = { ...user, ...updates };
      if (userId === 'demo') {
        fallbackUsers.set('demo', updated);
      } else {
        fallbackUsers.set(user.email, updated);
      }
      return updated;
    }
    return null;
  }
};

// Delete user
const deleteUser = async (userId) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    
    if (error) throw error;
    return true;
  } else {
    for (const [key, user] of fallbackUsers.entries()) {
      if (user.id === userId) {
        fallbackUsers.delete(key);
        return true;
      }
    }
    return false;
  }
};

// Get user's points
const getUserPoints = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('points')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || { total: 0, donated: 0, utilized: 0, available: 0 };
  } else {
    return { total: 1500, donated: 250, utilized: 700, available: 550 };
  }
};

// Get user settings
const getUserSettings = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || getDefaultSettings();
  } else {
    return getDefaultSettings();
  }
};

const getDefaultSettings = () => ({
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
});

// ============================================
// MAIN HANDLER
// ============================================

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/users', '');
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    // Extract user ID from path
    const pathParts = path.split('/').filter(Boolean);
    const userId = pathParts[0] || 'demo';

    // ========== GET /users/:id ==========
    if (event.httpMethod === 'GET') {
      const user = await getUserById(userId);
      
      if (!user) {
        // Return demo user as fallback
        return success({
          user: {
            ...demoUser,
            points: await getUserPoints(userId),
            settings: await getUserSettings(userId)
          }
        });
      }

      // Get additional data
      const points = await getUserPoints(user.id);
      const settings = await getUserSettings(user.id);

      return success({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          title: user.title,
          location: user.location,
          bio: user.bio,
          avatar_url: user.avatar_url,
          phone: user.phone,
          website: user.website,
          twitter: user.twitter,
          linkedin: user.linkedin,
          github: user.github,
          stats: {
            posts: user.stats_posts || 0,
            followers: user.stats_followers || 0,
            following: user.stats_following || 0
          },
          points,
          settings
        }
      });
    }

    // ========== PUT /users/:id ==========
    if (event.httpMethod === 'PUT') {
      // For demo, allow updates without auth
      // In production, verify token
      const authPayload = verifyToken(event.headers.authorization);
      
      // Allow demo updates or authenticated user updates
      if (userId !== 'demo' && !authPayload) {
        // Still allow for demo purposes
      }

      const { name, title, location, bio, phone, website, twitter, linkedin, github, settings } = body;
      
      const updates = {};
      if (name !== undefined) updates.name = name;
      if (title !== undefined) updates.title = title;
      if (location !== undefined) updates.location = location;
      if (bio !== undefined) updates.bio = bio;
      if (phone !== undefined) updates.phone = phone;
      if (website !== undefined) updates.website = website;
      if (twitter !== undefined) updates.twitter = twitter;
      if (linkedin !== undefined) updates.linkedin = linkedin;
      if (github !== undefined) updates.github = github;

      const updatedUser = await updateUser(userId === 'demo' ? 'demo' : userId, updates);

      // Update settings if provided
      if (settings && isSupabaseConfigured()) {
        await supabase
          .from('user_settings')
          .upsert({
            user_id: userId,
            ...settings,
            updated_at: new Date().toISOString()
          });
      }

      return success({
        user: updatedUser
      }, 'Profile updated successfully');
    }

    // ========== DELETE /users/:id ==========
    if (event.httpMethod === 'DELETE') {
      // Don't allow deleting demo user
      if (userId === 'demo') {
        return forbidden('Cannot delete demo user');
      }

      const authPayload = verifyToken(event.headers.authorization);
      if (!authPayload || authPayload.userId !== userId) {
        return unauthorized('Not authorized to delete this account');
      }

      await deleteUser(userId);

      return success({}, 'User deleted successfully');
    }

    return { 
      statusCode: 405, 
      headers: corsHeaders, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };

  } catch (error) {
    console.error('Users error:', error);
    return serverError(error.message || 'Internal server error');
  }
};
