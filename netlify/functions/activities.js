// Netlify Serverless Function: Activities Management with Supabase
// Handles activity CRUD operations with persistent storage

const { 
  supabase, 
  isSupabaseConfigured,
  corsHeaders,
  success,
  created,
  badRequest,
  forbidden,
  notFound,
  serverError
} = require('./utils/supabase');

// Fallback in-memory store
let fallbackActivities = new Map();

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
    max_participants: 20,
    current_participants: 12,
    points_reward: 50,
    status: 'approved',
    created_by: 'demo',
    created_at: '2024-11-01'
  },
  {
    id: 'act-002',
    name: 'Tech Meetup',
    description: 'Monthly tech enthusiasts gathering',
    type: 'social',
    date: '2024-12-15',
    time: '18:00',
    location: 'Community Center',
    max_participants: 50,
    current_participants: 35,
    points_reward: 75,
    status: 'approved',
    created_by: 'demo',
    created_at: '2024-11-05'
  },
  {
    id: 'act-003',
    name: 'Beach Cleanup',
    description: 'Help clean up the local beach and earn points!',
    type: 'volunteer',
    date: '2024-12-20',
    time: '09:00',
    location: 'Sunset Beach',
    max_participants: 30,
    current_participants: 18,
    points_reward: 100,
    status: 'pending',
    created_by: 'demo',
    created_at: '2024-11-10'
  },
  {
    id: 'act-004',
    name: 'Coding Workshop',
    description: 'Learn React basics in this hands-on workshop',
    type: 'education',
    date: '2024-12-25',
    time: '14:00',
    location: 'Online',
    max_participants: 100,
    current_participants: 67,
    points_reward: 150,
    status: 'approved',
    created_by: 'admin',
    created_at: '2024-11-15'
  }
];

sampleActivities.forEach(activity => {
  fallbackActivities.set(activity.id, activity);
});

// Helper to get user ID from token
const getUserIdFromToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return 'demo';
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

// Get all activities
const getAllActivities = async (filters = {}) => {
  if (isSupabaseConfigured()) {
    let query = supabase.from('activities').select('*');
    
    if (filters.type) query = query.eq('type', filters.type);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    query = query.order('date', { ascending: true });
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } else {
    let activities = Array.from(fallbackActivities.values());
    
    if (filters.type) {
      activities = activities.filter(a => a.type === filters.type);
    }
    if (filters.status) {
      activities = activities.filter(a => a.status === filters.status);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      activities = activities.filter(a => 
        a.name.toLowerCase().includes(search) ||
        a.description.toLowerCase().includes(search)
      );
    }
    
    activities.sort((a, b) => new Date(a.date) - new Date(b.date));
    return activities;
  }
};

// Get activity by ID
const getActivityById = async (activityId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', activityId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } else {
    return fallbackActivities.get(activityId);
  }
};

// Create activity
const createActivity = async (activity) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('activities')
      .insert([activity])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    fallbackActivities.set(activity.id, activity);
    return activity;
  }
};

// Update activity
const updateActivity = async (activityId, updates) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('activities')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', activityId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    const activity = fallbackActivities.get(activityId);
    if (activity) {
      const updated = { ...activity, ...updates };
      fallbackActivities.set(activityId, updated);
      return updated;
    }
    return null;
  }
};

// Delete activity
const deleteActivity = async (activityId) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', activityId);
    
    if (error) throw error;
    return true;
  } else {
    return fallbackActivities.delete(activityId);
  }
};

// Get user's activities
const getUserActivities = async (userId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } else {
    return Array.from(fallbackActivities.values())
      .filter(a => a.created_by === userId);
  }
};

// Get activity participants
const getParticipants = async (activityId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('activity_participants')
      .select('user_id')
      .eq('activity_id', activityId);
    
    if (error) throw error;
    return data?.map(p => p.user_id) || [];
  } else {
    return [];
  }
};

// Join activity
const joinActivity = async (activityId, userId) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('activity_participants')
      .insert([{ activity_id: activityId, user_id: userId }]);
    
    if (error) throw error;
    
    // Update participant count
    const { data: activity } = await supabase
      .from('activities')
      .select('current_participants')
      .eq('id', activityId)
      .single();
    
    await supabase
      .from('activities')
      .update({ current_participants: (activity?.current_participants || 0) + 1 })
      .eq('id', activityId);
  }
};

// Leave activity
const leaveActivity = async (activityId, userId) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('activity_participants')
      .delete()
      .eq('activity_id', activityId)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Update participant count
    const { data: activity } = await supabase
      .from('activities')
      .select('current_participants')
      .eq('id', activityId)
      .single();
    
    await supabase
      .from('activities')
      .update({ current_participants: Math.max(0, (activity?.current_participants || 1) - 1) })
      .eq('id', activityId);
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

  const path = event.path.replace('/.netlify/functions/activities', '');
  const body = event.body ? JSON.parse(event.body) : {};
  const userId = getUserIdFromToken(event.headers.authorization);
  const queryParams = event.queryStringParameters || {};

  try {
    // ========== GET /activities ==========
    if (event.httpMethod === 'GET' && (path === '' || path === '/')) {
      const activities = await getAllActivities({
        type: queryParams.type,
        status: queryParams.status,
        search: queryParams.search
      });

      return success({ activities, total: activities.length });
    }

    // ========== GET /activities/my ==========
    if (event.httpMethod === 'GET' && path === '/my') {
      const activities = await getUserActivities(userId);
      return success({ activities });
    }

    // ========== GET /activities/:id ==========
    if (event.httpMethod === 'GET' && path.startsWith('/')) {
      const activityId = path.split('/')[1];
      
      if (!activityId || activityId === 'my') {
        return badRequest('Activity ID required');
      }

      const activity = await getActivityById(activityId);

      if (!activity) {
        return notFound('Activity not found');
      }

      const participants = await getParticipants(activityId);

      return success({ activity: { ...activity, participants } });
    }

    // ========== POST /activities ==========
    if (event.httpMethod === 'POST' && (path === '' || path === '/')) {
      const { name, description, type, date, time, location, max_participants, points_reward } = body;

      if (!name || !date) {
        return badRequest('Name and date are required');
      }

      const newActivity = {
        id: `act-${Date.now()}`,
        name,
        description: description || '',
        type: type || 'general',
        date,
        time: time || '12:00',
        location: location || 'TBD',
        max_participants: max_participants || 10,
        current_participants: 0,
        points_reward: points_reward || 50,
        status: 'pending',
        created_by: userId,
        created_at: new Date().toISOString()
      };

      const createdActivity = await createActivity(newActivity);

      return created({ activity: createdActivity }, 'Activity created successfully');
    }

    // ========== PUT /activities/:id ==========
    if (event.httpMethod === 'PUT' && path.startsWith('/')) {
      const activityId = path.split('/')[1];
      const activity = await getActivityById(activityId);

      if (!activity) {
        return notFound('Activity not found');
      }

      if (activity.created_by !== userId && userId !== 'admin') {
        return forbidden('Not authorized to update this activity');
      }

      const updatableFields = ['name', 'description', 'type', 'date', 'time', 'location', 'max_participants', 'points_reward'];
      const updates = {};
      
      updatableFields.forEach(field => {
        if (body[field] !== undefined) {
          updates[field] = body[field];
        }
      });

      const updatedActivity = await updateActivity(activityId, updates);

      return success({ activity: updatedActivity }, 'Activity updated successfully');
    }

    // ========== POST /activities/:id/join ==========
    if (event.httpMethod === 'POST' && path.includes('/join')) {
      const activityId = path.split('/')[1];
      const activity = await getActivityById(activityId);

      if (!activity) {
        return notFound('Activity not found');
      }

      if (activity.current_participants >= activity.max_participants) {
        return badRequest('Activity is full');
      }

      const participants = await getParticipants(activityId);
      if (participants.includes(userId)) {
        return badRequest('Already joined this activity');
      }

      await joinActivity(activityId, userId);

      const updatedActivity = await getActivityById(activityId);
      return success({ activity: updatedActivity }, 'Successfully joined activity');
    }

    // ========== POST /activities/:id/leave ==========
    if (event.httpMethod === 'POST' && path.includes('/leave')) {
      const activityId = path.split('/')[1];
      const activity = await getActivityById(activityId);

      if (!activity) {
        return notFound('Activity not found');
      }

      await leaveActivity(activityId, userId);

      const updatedActivity = await getActivityById(activityId);
      return success({ activity: updatedActivity }, 'Successfully left activity');
    }

    // ========== POST /activities/:id/invite ==========
    if (event.httpMethod === 'POST' && path.includes('/invite')) {
      const activityId = path.split('/')[1];
      const { friendIds, message } = body;

      const activity = await getActivityById(activityId);

      if (!activity) {
        return notFound('Activity not found');
      }

      if (!friendIds || !Array.isArray(friendIds) || friendIds.length === 0) {
        return badRequest('Friend IDs are required');
      }

      // In production, create notifications for invited friends
      if (isSupabaseConfigured()) {
        const invitations = friendIds.map(friendId => ({
          activity_id: activityId,
          inviter_id: userId,
          invitee_id: friendId,
          message: message || '',
          created_at: new Date().toISOString()
        }));

        await supabase.from('activity_invitations').insert(invitations);
      }

      return success({ 
        invitedFriends: friendIds 
      }, `Invitations sent to ${friendIds.length} friends`);
    }

    // ========== DELETE /activities/:id ==========
    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
      const activityId = path.split('/')[1];
      const activity = await getActivityById(activityId);

      if (!activity) {
        return notFound('Activity not found');
      }

      if (activity.created_by !== userId && userId !== 'admin') {
        return forbidden('Not authorized to delete this activity');
      }

      await deleteActivity(activityId);

      return success({}, 'Activity deleted successfully');
    }

    return notFound('Route not found');

  } catch (error) {
    console.error('Activities error:', error);
    return serverError(error.message || 'Internal server error');
  }
};
