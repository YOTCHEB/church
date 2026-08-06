import { createClient } from '@supabase/supabase-js';

// Supabase credentials from environment variables
// Create a .env file in the frontend directory with:
// VITE_SUPABASE_URL=https://your-project-id.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key-here
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id');

if (!isConfigured) {
  console.warn('⚠️ Supabase not configured. Create a .env file in frontend/ directory with your credentials.');
  console.warn('Copy .env.example to .env and update with your Supabase project details.');
}

const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default supabase;
