import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient<Database>;

if (supabaseUrl && supabaseAnonKey) {
  // Statically import and create the client when credentials are available
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  console.error(
    'CRITICAL: Supabase environment variables are not set. Please create a .env file in the project root and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Supabase features will be disabled.'
  );
  // Create a mock Supabase client to prevent the app from crashing.
  // All database operations will fail and log an error.
  const handler = {
    get(target: any, prop: string) {
      if (prop === 'from') {
        return () => {
          console.error('Supabase is not configured. Cannot perform database operations.');
          return new Proxy({}, handler); // Return a chainable dummy object
        };
      }
      return () => {
        console.error(`Supabase is not configured. Cannot call '${prop}'.`);
        return Promise.resolve({ error: { message: 'Supabase not configured' } });
      };
    }
  };
  supabase = new Proxy({}, handler) as SupabaseClient<Database>;
}

export { supabase };

// Types for our database tables can now be derived from the generated types.
// This makes your types always in sync with your database schema.
export type LoanPartner = Database['public']['Tables']['loan_partners']['Row'];
export type LoanPartnerInsert = Database['public']['Tables']['loan_partners']['Insert'];