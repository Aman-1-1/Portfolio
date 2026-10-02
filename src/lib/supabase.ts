import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (clientInstance) return clientInstance;
  if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'YOUR_ANON_KEY_HERE') {
    return null;
  }
  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
    return clientInstance;
  } catch (err) {
    console.error('[Supabase Init Error]:', err);
    return null;
  }
}

// Fallback dummy client for direct exports if needed without throwing
export const supabase = {
  from: (table: string) => {
    const client = getSupabase();
    if (!client) {
      throw new Error(`Supabase client is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.`);
    }
    return client.from(table);
  },
  storage: {
    from: (bucket: string) => {
      const client = getSupabase();
      if (!client) {
        throw new Error(`Supabase client is not configured.`);
      }
      return client.storage.from(bucket);
    },
  },
};
