import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const siteUrl = process.env.NODE_ENV === 'production'
  ? 'https://notekeeper-lec-beta.vercel.app'
  : 'http://localhost:3001';

// Ensure environment variables are loaded
if (typeof supabaseUrl === 'undefined' || typeof supabaseAnonKey === 'undefined') {
  console.error('Environment variables not loaded. Please check your .env file and Vite configuration.');
  throw new Error('Missing Supabase environment variables. Check .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    site_url: siteUrl
  }
});