// Netlify Serverless Function: Points Management
// Handles points operations: view, add, deduct, transfer, donate

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Content-Type': 'application/json'
};

// Simulated points database
let pointsDb = new Map();

// Initialize with demo user's points
pointsDb.set('demo', {
  userId: 'demo',
  total: 1500,
  donated: 250,
  utilized: 700,
  available: 550,
  history: [
    { id: 1, type: 'earned', amount: 500, description: 'Welcome bonus', date: '2024-01-01' },
    { id: 2, type: 'earned', amount: 1000, description: 'Activity completion', date: '2024-01-15' },
    { id: 3, type: 'donated', amount: 250, description: 'Donated to charity', date: '2024-02-01' },
    { id: 4, type: 'utilized', amount: 700, description: 'Redeemed rewards', date: '2024-02-15' }
  ]
});

// Conversion rates (points to currency)
const conversionRates = {
  USD: 0.01,  // 100 points = $1
  EUR: 0.009, // 100 points = €0.90
  GBP: 0.008, // 100 points = £0.80
  INR: 0.83   // 100 points = ₹83
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/points', '');
  const body = event.body ? JSON.parse(event.body) : {};
  const userId = 'demo'; // In production, extract from auth token

  try {
    // GET /points - Get user's points
    if (event.httpMethod === 'GET' && (path === '' || path === '/')) {
      const points = pointsDb.get(userId) || {
        userId,
        total: 0,
        donated: 0,
        utilized: 0,
        available: 0,
        history: []
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ points })
      };
    }

    // GET /points/history - Get points history
    if (event.httpMethod === 'GET' && path === '/history') {
      const points = pointsDb.get(userId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          history: points ? points.history : [] 
        })
      };
    }

    // GET /points/rates - Get conversion rates
    if (event.httpMethod === 'GET' && path === '/rates') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ rates: conversionRates })
      };
    }

    // POST /points/add - Add points (admin/system only)
    if (event.httpMethod === 'POST' && path === '/add') {
      const { amount, description } = body;

      if (!amount || amount <= 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid amount is required' })
        };
      }

      let points = pointsDb.get(userId) || {
        userId,
        total: 0,
        donated: 0,
        utilized: 0,
        available: 0,
        history: []
      };

      points.total += amount;
      points.available += amount;
      points.history.push({
        id: Date.now(),
        type: 'earned',
        amount,
        description: description || 'Points added',
        date: new Date().toISOString().split('T')[0]
      });

      pointsDb.set(userId, points);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: `Added ${amount} points`,
          points 
        })
      };
    }

    // POST /points/donate - Donate points
    if (event.httpMethod === 'POST' && path === '/donate') {
      const { amount, recipient, message } = body;

      if (!amount || amount <= 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid amount is required' })
        };
      }

      let points = pointsDb.get(userId);
      
      if (!points || points.available < amount) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Insufficient points' })
        };
      }

      points.available -= amount;
      points.donated += amount;
      points.history.push({
        id: Date.now(),
        type: 'donated',
        amount,
        description: `Donated to ${recipient || 'charity'}${message ? ': ' + message : ''}`,
        date: new Date().toISOString().split('T')[0]
      });

      pointsDb.set(userId, points);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: `Donated ${amount} points`,
          points 
        })
      };
    }

    // POST /points/transfer - Transfer points to another user
    if (event.httpMethod === 'POST' && path === '/transfer') {
      const { amount, recipientId, note } = body;

      if (!amount || amount <= 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid amount is required' })
        };
      }

      if (!recipientId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Recipient is required' })
        };
      }

      let senderPoints = pointsDb.get(userId);
      
      if (!senderPoints || senderPoints.available < amount) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Insufficient points' })
        };
      }

      // Deduct from sender
      senderPoints.available -= amount;
      senderPoints.utilized += amount;
      senderPoints.history.push({
        id: Date.now(),
        type: 'transferred',
        amount: -amount,
        description: `Transferred to ${recipientId}${note ? ': ' + note : ''}`,
        date: new Date().toISOString().split('T')[0]
      });

      // Add to recipient (create if doesn't exist)
      let recipientPoints = pointsDb.get(recipientId) || {
        userId: recipientId,
        total: 0,
        donated: 0,
        utilized: 0,
        available: 0,
        history: []
      };

      recipientPoints.total += amount;
      recipientPoints.available += amount;
      recipientPoints.history.push({
        id: Date.now(),
        type: 'received',
        amount,
        description: `Received from ${userId}${note ? ': ' + note : ''}`,
        date: new Date().toISOString().split('T')[0]
      });

      pointsDb.set(userId, senderPoints);
      pointsDb.set(recipientId, recipientPoints);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: `Transferred ${amount} points to ${recipientId}`,
          points: senderPoints 
        })
      };
    }

    // POST /points/convert - Convert points to currency
    if (event.httpMethod === 'POST' && path === '/convert') {
      const { amount, currency } = body;

      if (!amount || amount <= 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid amount is required' })
        };
      }

      if (!currency || !conversionRates[currency]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid currency is required (USD, EUR, GBP, INR)' })
        };
      }

      let points = pointsDb.get(userId);
      
      if (!points || points.available < amount) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Insufficient points' })
        };
      }

      const currencyAmount = (amount * conversionRates[currency]).toFixed(2);

      points.available -= amount;
      points.utilized += amount;
      points.history.push({
        id: Date.now(),
        type: 'converted',
        amount: -amount,
        description: `Converted to ${currency} ${currencyAmount}`,
        date: new Date().toISOString().split('T')[0]
      });

      pointsDb.set(userId, points);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: `Converted ${amount} points to ${currency} ${currencyAmount}`,
          convertedAmount: parseFloat(currencyAmount),
          currency,
          points 
        })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Points error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

