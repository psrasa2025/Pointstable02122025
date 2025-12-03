// Netlify Serverless Function: Activities Management
// Handles activity CRUD, search, and invitations

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// Simulated activities database
let activitiesDb = new Map();

// Initialize with sample activities
const sampleActivities = [
  {
    id: 'act-001',
    name: 'Morning Yoga Session',
    description: 'A refreshing 30-minute yoga session to start the day',
    type: 'fitness',
    date: '2024-12-10',
    time: '07:00',
    location: 'Central Park',
    maxParticipants: 20,
    currentParticipants: 12,
    pointsReward: 50,
    status: 'approved',
    createdBy: 'demo',
    participants: ['user-001', 'user-002', 'user-003']
  },
  {
    id: 'act-002',
    name: 'Tech Meetup',
    description: 'Monthly tech enthusiasts gathering',
    type: 'social',
    date: '2024-12-15',
    time: '18:00',
    location: 'Community Center',
    maxParticipants: 50,
    currentParticipants: 35,
    pointsReward: 75,
    status: 'approved',
    createdBy: 'demo',
    participants: []
  },
  {
    id: 'act-003',
    name: 'Beach Cleanup',
    description: 'Help clean up the local beach and earn points!',
    type: 'volunteer',
    date: '2024-12-20',
    time: '09:00',
    location: 'Sunset Beach',
    maxParticipants: 30,
    currentParticipants: 18,
    pointsReward: 100,
    status: 'pending',
    createdBy: 'demo',
    participants: []
  },
  {
    id: 'act-004',
    name: 'Coding Workshop',
    description: 'Learn React basics in this hands-on workshop',
    type: 'education',
    date: '2024-12-25',
    time: '14:00',
    location: 'Online',
    maxParticipants: 100,
    currentParticipants: 67,
    pointsReward: 150,
    status: 'approved',
    createdBy: 'admin',
    participants: []
  }
];

// Initialize activities
sampleActivities.forEach(activity => {
  activitiesDb.set(activity.id, activity);
});

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/activities', '');
  const body = event.body ? JSON.parse(event.body) : {};
  const userId = 'demo'; // In production, extract from auth token

  try {
    // GET /activities - List all activities
    if (event.httpMethod === 'GET' && (path === '' || path === '/')) {
      const queryParams = event.queryStringParameters || {};
      let activities = Array.from(activitiesDb.values());

      // Filter by type
      if (queryParams.type) {
        activities = activities.filter(a => a.type === queryParams.type);
      }

      // Filter by status
      if (queryParams.status) {
        activities = activities.filter(a => a.status === queryParams.status);
      }

      // Search by name
      if (queryParams.search) {
        const search = queryParams.search.toLowerCase();
        activities = activities.filter(a => 
          a.name.toLowerCase().includes(search) ||
          a.description.toLowerCase().includes(search)
        );
      }

      // Sort by date (upcoming first)
      activities.sort((a, b) => new Date(a.date) - new Date(b.date));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          activities,
          total: activities.length
        })
      };
    }

    // GET /activities/my - Get user's activities
    if (event.httpMethod === 'GET' && path === '/my') {
      const activities = Array.from(activitiesDb.values())
        .filter(a => a.createdBy === userId || a.participants.includes(userId));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ activities })
      };
    }

    // GET /activities/:id - Get single activity
    if (event.httpMethod === 'GET' && path.startsWith('/')) {
      const activityId = path.split('/')[1];
      const activity = activitiesDb.get(activityId);

      if (!activity) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Activity not found' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ activity })
      };
    }

    // POST /activities - Create new activity
    if (event.httpMethod === 'POST' && (path === '' || path === '/')) {
      const { name, description, type, date, time, location, maxParticipants, pointsReward } = body;

      if (!name || !date) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name and date are required' })
        };
      }

      const newActivity = {
        id: `act-${Date.now()}`,
        name,
        description: description || '',
        type: type || 'general',
        date,
        time: time || '12:00',
        location: location || 'TBD',
        maxParticipants: maxParticipants || 10,
        currentParticipants: 0,
        pointsReward: pointsReward || 50,
        status: 'pending', // Needs approval
        createdBy: userId,
        participants: [],
        createdAt: new Date().toISOString()
      };

      activitiesDb.set(newActivity.id, newActivity);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ 
          message: 'Activity created successfully',
          activity: newActivity 
        })
      };
    }

    // PUT /activities/:id - Update activity
    if (event.httpMethod === 'PUT' && path.startsWith('/')) {
      const activityId = path.split('/')[1];
      let activity = activitiesDb.get(activityId);

      if (!activity) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Activity not found' })
        };
      }

      // Only creator can update
      if (activity.createdBy !== userId) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'Not authorized to update this activity' })
        };
      }

      // Update fields
      const updatableFields = ['name', 'description', 'type', 'date', 'time', 'location', 'maxParticipants', 'pointsReward'];
      updatableFields.forEach(field => {
        if (body[field] !== undefined) {
          activity[field] = body[field];
        }
      });

      activitiesDb.set(activityId, activity);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Activity updated successfully',
          activity 
        })
      };
    }

    // POST /activities/:id/join - Join an activity
    if (event.httpMethod === 'POST' && path.includes('/join')) {
      const activityId = path.split('/')[1];
      let activity = activitiesDb.get(activityId);

      if (!activity) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Activity not found' })
        };
      }

      if (activity.participants.includes(userId)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Already joined this activity' })
        };
      }

      if (activity.currentParticipants >= activity.maxParticipants) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Activity is full' })
        };
      }

      activity.participants.push(userId);
      activity.currentParticipants++;
      activitiesDb.set(activityId, activity);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Successfully joined activity',
          activity 
        })
      };
    }

    // POST /activities/:id/leave - Leave an activity
    if (event.httpMethod === 'POST' && path.includes('/leave')) {
      const activityId = path.split('/')[1];
      let activity = activitiesDb.get(activityId);

      if (!activity) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Activity not found' })
        };
      }

      const participantIndex = activity.participants.indexOf(userId);
      if (participantIndex === -1) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Not a participant of this activity' })
        };
      }

      activity.participants.splice(participantIndex, 1);
      activity.currentParticipants--;
      activitiesDb.set(activityId, activity);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Successfully left activity',
          activity 
        })
      };
    }

    // POST /activities/:id/invite - Invite friends to activity
    if (event.httpMethod === 'POST' && path.includes('/invite')) {
      const activityId = path.split('/')[1];
      const { friendIds, message } = body;

      const activity = activitiesDb.get(activityId);

      if (!activity) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Activity not found' })
        };
      }

      if (!friendIds || !Array.isArray(friendIds) || friendIds.length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Friend IDs are required' })
        };
      }

      // In production, send actual notifications
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: `Invitations sent to ${friendIds.length} friends`,
          invitedFriends: friendIds
        })
      };
    }

    // DELETE /activities/:id - Delete activity
    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
      const activityId = path.split('/')[1];
      const activity = activitiesDb.get(activityId);

      if (!activity) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Activity not found' })
        };
      }

      if (activity.createdBy !== userId) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'Not authorized to delete this activity' })
        };
      }

      activitiesDb.delete(activityId);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Activity deleted successfully' })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Activities error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

