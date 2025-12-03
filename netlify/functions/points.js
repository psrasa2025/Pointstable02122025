// Netlify Serverless Function: Points Management with Supabase
// Handles points operations with persistent storage

const { 
  supabase, 
  isSupabaseConfigured,
  corsHeaders,
  success,
  badRequest,
  serverError
} = require('./utils/supabase');

// Fallback in-memory store
let fallbackPoints = new Map();
fallbackPoints.set('demo', {
  userId: 'demo',
  total: 1500,
  donated: 250,
  utilized: 700,
  available: 550,
  history: [
    { id: 1, type: 'earned', amount: 500, description: 'Welcome bonus', created_at: '2024-01-01' },
    { id: 2, type: 'earned', amount: 1000, description: 'Activity completion', created_at: '2024-01-15' },
    { id: 3, type: 'donated', amount: 250, description: 'Donated to charity', created_at: '2024-02-01' },
    { id: 4, type: 'utilized', amount: 700, description: 'Redeemed rewards', created_at: '2024-02-15' }
  ]
});

// Conversion rates (points to currency)
const conversionRates = {
  USD: 0.01,
  EUR: 0.009,
  GBP: 0.008,
  INR: 0.83
};

// Helper to verify token and get user ID
const getUserIdFromToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return 'demo'; // Default to demo for unauthenticated requests
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    return payload.userId || 'demo';
  } catch {
    return 'demo';
  }
};

// ============================================
// DATABASE OPERATIONS
// ============================================

// Get user points
const getPoints = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('points')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || { user_id: userId, total: 0, donated: 0, utilized: 0, available: 0 };
  } else {
    return fallbackPoints.get(userId) || fallbackPoints.get('demo');
  }
};

// Update points
const updatePoints = async (userId, updates) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('points')
      .upsert({
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    const current = fallbackPoints.get(userId) || fallbackPoints.get('demo');
    const updated = { ...current, ...updates };
    fallbackPoints.set(userId, updated);
    return updated;
  }
};

// Add to points history
const addToHistory = async (userId, entry) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('points_history')
      .insert([{
        user_id: userId,
        type: entry.type,
        amount: entry.amount,
        description: entry.description,
        created_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
  } else {
    const points = fallbackPoints.get(userId) || fallbackPoints.get('demo');
    points.history = points.history || [];
    points.history.push({
      id: Date.now(),
      ...entry,
      created_at: new Date().toISOString()
    });
  }
};

// Get points history
const getHistory = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('points_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    return data || [];
  } else {
    const points = fallbackPoints.get(userId) || fallbackPoints.get('demo');
    return points.history || [];
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

  const path = event.path.replace('/.netlify/functions/points', '');
  const body = event.body ? JSON.parse(event.body) : {};
  const userId = getUserIdFromToken(event.headers.authorization);

  try {
    // ========== GET /points ==========
    if (event.httpMethod === 'GET' && (path === '' || path === '/')) {
      const points = await getPoints(userId);
      return success({ points });
    }

    // ========== GET /points/history ==========
    if (event.httpMethod === 'GET' && path === '/history') {
      const history = await getHistory(userId);
      return success({ history });
    }

    // ========== GET /points/rates ==========
    if (event.httpMethod === 'GET' && path === '/rates') {
      return success({ rates: conversionRates });
    }

    // ========== POST /points/add ==========
    if (event.httpMethod === 'POST' && path === '/add') {
      const { amount, description } = body;

      if (!amount || amount <= 0) {
        return badRequest('Valid amount is required');
      }

      const current = await getPoints(userId);
      const updated = await updatePoints(userId, {
        total: (current.total || 0) + amount,
        available: (current.available || 0) + amount
      });

      await addToHistory(userId, {
        type: 'earned',
        amount,
        description: description || 'Points added'
      });

      return success({ 
        message: `Added ${amount} points`,
        points: updated 
      });
    }

    // ========== POST /points/donate ==========
    if (event.httpMethod === 'POST' && path === '/donate') {
      const { amount, recipient, message } = body;

      if (!amount || amount <= 0) {
        return badRequest('Valid amount is required');
      }

      const current = await getPoints(userId);
      
      if ((current.available || 0) < amount) {
        return badRequest('Insufficient points');
      }

      const updated = await updatePoints(userId, {
        available: current.available - amount,
        donated: (current.donated || 0) + amount
      });

      await addToHistory(userId, {
        type: 'donated',
        amount: -amount,
        description: `Donated to ${recipient || 'charity'}${message ? ': ' + message : ''}`
      });

      return success({ 
        message: `Donated ${amount} points`,
        points: updated 
      });
    }

    // ========== POST /points/transfer ==========
    if (event.httpMethod === 'POST' && path === '/transfer') {
      const { amount, recipientId, note } = body;

      if (!amount || amount <= 0) {
        return badRequest('Valid amount is required');
      }

      if (!recipientId) {
        return badRequest('Recipient is required');
      }

      const senderPoints = await getPoints(userId);
      
      if ((senderPoints.available || 0) < amount) {
        return badRequest('Insufficient points');
      }

      // Deduct from sender
      const updatedSender = await updatePoints(userId, {
        available: senderPoints.available - amount,
        utilized: (senderPoints.utilized || 0) + amount
      });

      await addToHistory(userId, {
        type: 'transferred',
        amount: -amount,
        description: `Transferred to ${recipientId}${note ? ': ' + note : ''}`
      });

      // Add to recipient
      const recipientPoints = await getPoints(recipientId);
      await updatePoints(recipientId, {
        total: (recipientPoints.total || 0) + amount,
        available: (recipientPoints.available || 0) + amount
      });

      await addToHistory(recipientId, {
        type: 'received',
        amount,
        description: `Received from ${userId}${note ? ': ' + note : ''}`
      });

      return success({ 
        message: `Transferred ${amount} points to ${recipientId}`,
        points: updatedSender 
      });
    }

    // ========== POST /points/convert ==========
    if (event.httpMethod === 'POST' && path === '/convert') {
      const { amount, currency } = body;

      if (!amount || amount <= 0) {
        return badRequest('Valid amount is required');
      }

      if (!currency || !conversionRates[currency]) {
        return badRequest('Valid currency is required (USD, EUR, GBP, INR)');
      }

      const current = await getPoints(userId);
      
      if ((current.available || 0) < amount) {
        return badRequest('Insufficient points');
      }

      const currencyAmount = (amount * conversionRates[currency]).toFixed(2);

      const updated = await updatePoints(userId, {
        available: current.available - amount,
        utilized: (current.utilized || 0) + amount
      });

      await addToHistory(userId, {
        type: 'converted',
        amount: -amount,
        description: `Converted to ${currency} ${currencyAmount}`
      });

      return success({ 
        message: `Converted ${amount} points to ${currency} ${currencyAmount}`,
        convertedAmount: parseFloat(currencyAmount),
        currency,
        points: updated 
      });
    }

    return { 
      statusCode: 404, 
      headers: corsHeaders, 
      body: JSON.stringify({ error: 'Route not found' }) 
    };

  } catch (error) {
    console.error('Points error:', error);
    return serverError(error.message || 'Internal server error');
  }
};
