// Netlify Serverless Function: Leaderboard
// Handles country and world leaderboards

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};

// Simulated leaderboard data
const countryLeaders = {
  US: [
    { rank: 1, userId: 'us-001', name: 'Alex Johnson', points: 15420, avatar: null, badge: '🏆' },
    { rank: 2, userId: 'us-002', name: 'Sarah Williams', points: 14850, avatar: null, badge: '🥈' },
    { rank: 3, userId: 'us-003', name: 'Mike Brown', points: 13200, avatar: null, badge: '🥉' },
    { rank: 4, userId: 'us-004', name: 'Emily Davis', points: 12100, avatar: null },
    { rank: 5, userId: 'us-005', name: 'Chris Miller', points: 11500, avatar: null },
    { rank: 6, userId: 'us-006', name: 'Jessica Wilson', points: 10800, avatar: null },
    { rank: 7, userId: 'us-007', name: 'David Taylor', points: 9950, avatar: null },
    { rank: 8, userId: 'us-008', name: 'Amanda Moore', points: 9200, avatar: null },
    { rank: 9, userId: 'us-009', name: 'Ryan Anderson', points: 8750, avatar: null },
    { rank: 10, userId: 'us-010', name: 'Nicole Thomas', points: 8100, avatar: null }
  ],
  UK: [
    { rank: 1, userId: 'uk-001', name: 'James Smith', points: 14200, avatar: null, badge: '🏆' },
    { rank: 2, userId: 'uk-002', name: 'Emma Watson', points: 13500, avatar: null, badge: '🥈' },
    { rank: 3, userId: 'uk-003', name: 'Oliver Brown', points: 12800, avatar: null, badge: '🥉' },
    { rank: 4, userId: 'uk-004', name: 'Charlotte Davies', points: 11900, avatar: null },
    { rank: 5, userId: 'uk-005', name: 'Harry Wilson', points: 11200, avatar: null }
  ],
  IN: [
    { rank: 1, userId: 'in-001', name: 'Ravi Kumar', points: 16500, avatar: null, badge: '🏆' },
    { rank: 2, userId: 'in-002', name: 'Priya Sharma', points: 15800, avatar: null, badge: '🥈' },
    { rank: 3, userId: 'in-003', name: 'Amit Patel', points: 14500, avatar: null, badge: '🥉' },
    { rank: 4, userId: 'in-004', name: 'Sneha Reddy', points: 13200, avatar: null },
    { rank: 5, userId: 'in-005', name: 'Vikram Singh', points: 12100, avatar: null }
  ],
  CA: [
    { rank: 1, userId: 'ca-001', name: 'Liam Martin', points: 13800, avatar: null, badge: '🏆' },
    { rank: 2, userId: 'ca-002', name: 'Sophia Lee', points: 12900, avatar: null, badge: '🥈' },
    { rank: 3, userId: 'ca-003', name: 'Noah Thompson', points: 11700, avatar: null, badge: '🥉' }
  ],
  AU: [
    { rank: 1, userId: 'au-001', name: 'Jack Robinson', points: 14100, avatar: null, badge: '🏆' },
    { rank: 2, userId: 'au-002', name: 'Mia Johnson', points: 13400, avatar: null, badge: '🥈' },
    { rank: 3, userId: 'au-003', name: 'Ethan Williams', points: 12200, avatar: null, badge: '🥉' }
  ]
};

// World leaderboard (top from all countries)
const worldLeaders = [
  { rank: 1, userId: 'in-001', name: 'Ravi Kumar', country: 'IN', countryName: 'India', points: 16500, avatar: null, badge: '🏆' },
  { rank: 2, userId: 'in-002', name: 'Priya Sharma', country: 'IN', countryName: 'India', points: 15800, avatar: null, badge: '🥈' },
  { rank: 3, userId: 'us-001', name: 'Alex Johnson', country: 'US', countryName: 'United States', points: 15420, avatar: null, badge: '🥉' },
  { rank: 4, userId: 'us-002', name: 'Sarah Williams', country: 'US', countryName: 'United States', points: 14850, avatar: null },
  { rank: 5, userId: 'in-003', name: 'Amit Patel', country: 'IN', countryName: 'India', points: 14500, avatar: null },
  { rank: 6, userId: 'uk-001', name: 'James Smith', country: 'UK', countryName: 'United Kingdom', points: 14200, avatar: null },
  { rank: 7, userId: 'au-001', name: 'Jack Robinson', country: 'AU', countryName: 'Australia', points: 14100, avatar: null },
  { rank: 8, userId: 'ca-001', name: 'Liam Martin', country: 'CA', countryName: 'Canada', points: 13800, avatar: null },
  { rank: 9, userId: 'uk-002', name: 'Emma Watson', country: 'UK', countryName: 'United Kingdom', points: 13500, avatar: null },
  { rank: 10, userId: 'au-002', name: 'Mia Johnson', country: 'AU', countryName: 'Australia', points: 13400, avatar: null },
  { rank: 11, userId: 'us-003', name: 'Mike Brown', country: 'US', countryName: 'United States', points: 13200, avatar: null },
  { rank: 12, userId: 'in-004', name: 'Sneha Reddy', country: 'IN', countryName: 'India', points: 13200, avatar: null },
  { rank: 13, userId: 'ca-002', name: 'Sophia Lee', country: 'CA', countryName: 'Canada', points: 12900, avatar: null },
  { rank: 14, userId: 'uk-003', name: 'Oliver Brown', country: 'UK', countryName: 'United Kingdom', points: 12800, avatar: null },
  { rank: 15, userId: 'au-003', name: 'Ethan Williams', country: 'AU', countryName: 'Australia', points: 12200, avatar: null }
];

// Available countries
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' }
];

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/leaderboard', '');
  const queryParams = event.queryStringParameters || {};

  try {
    // GET /leaderboard/countries - Get list of countries
    if (event.httpMethod === 'GET' && path === '/countries') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ countries })
      };
    }

    // GET /leaderboard/country/:code - Get country leaderboard
    if (event.httpMethod === 'GET' && path.startsWith('/country/')) {
      const countryCode = path.split('/')[2].toUpperCase();
      const leaders = countryLeaders[countryCode];

      if (!leaders) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Country not found' })
        };
      }

      const country = countries.find(c => c.code === countryCode);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          country: country || { code: countryCode, name: countryCode },
          leaders,
          totalParticipants: leaders.length * 100 // Simulated
        })
      };
    }

    // GET /leaderboard/world - Get world leaderboard
    if (event.httpMethod === 'GET' && path === '/world') {
      const limit = parseInt(queryParams.limit) || 15;
      const offset = parseInt(queryParams.offset) || 0;

      const paginatedLeaders = worldLeaders.slice(offset, offset + limit);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          leaders: paginatedLeaders,
          total: worldLeaders.length,
          limit,
          offset
        })
      };
    }

    // GET /leaderboard/user/:id - Get user's rank
    if (event.httpMethod === 'GET' && path.startsWith('/user/')) {
      const userId = path.split('/')[2];
      
      // Find user in world leaderboard
      const worldRank = worldLeaders.findIndex(l => l.userId === userId);
      
      // Find user in their country leaderboard
      let countryRank = -1;
      let userCountry = null;
      
      for (const [code, leaders] of Object.entries(countryLeaders)) {
        const idx = leaders.findIndex(l => l.userId === userId);
        if (idx !== -1) {
          countryRank = idx;
          userCountry = code;
          break;
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          userId,
          worldRank: worldRank !== -1 ? worldRank + 1 : null,
          countryRank: countryRank !== -1 ? countryRank + 1 : null,
          country: userCountry
        })
      };
    }

    // GET /leaderboard - Default: return world leaderboard
    if (event.httpMethod === 'GET' && (path === '' || path === '/')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          leaders: worldLeaders.slice(0, 10),
          total: worldLeaders.length
        })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Leaderboard error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

