import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client (API routes, getServerSideProps)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Browser client factory — call once per component tree
export const createBrowserClient = () =>
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, storageKey: 'edupath-auth' },
  });
