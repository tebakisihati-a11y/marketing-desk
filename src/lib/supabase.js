import { createClient } from '@supabase/supabase-js';

// Ambil dari Netlify env vars atau build-time define
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[supabase] VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY belum di-set. Mode lokal (localStorage) aktif.');
}

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const isConfigured = Boolean(supabase);
