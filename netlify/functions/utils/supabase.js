// Supabase Database Client Configuration
// This utility provides a configured Supabase client for all serverless functions

const { createClient } = require('@supabase/supabase-js');

// Get environment variables (set these in Netlify Dashboard)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not found. Using fallback mode.');
}

// Create and export the Supabase client
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Helper function to check if Supabase is configured
const isSupabaseConfigured = () => {
  return supabase !== null;
};

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// Helper to create API responses
const response = (statusCode, body) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(body)
});

// Success response
const success = (data, message = 'Success') => 
  response(200, { success: true, message, ...data });

// Created response
const created = (data, message = 'Created successfully') => 
  response(201, { success: true, message, ...data });

// Error response
const error = (statusCode, message) => 
  response(statusCode, { success: false, error: message });

// Common error responses
const badRequest = (message = 'Bad request') => error(400, message);
const unauthorized = (message = 'Unauthorized') => error(401, message);
const forbidden = (message = 'Forbidden') => error(403, message);
const notFound = (message = 'Not found') => error(404, message);
const serverError = (message = 'Internal server error') => error(500, message);

module.exports = {
  supabase,
  isSupabaseConfigured,
  corsHeaders,
  response,
  success,
  created,
  error,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError
};

