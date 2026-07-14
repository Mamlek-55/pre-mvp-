import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const isConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn(
    'Supabase environment variables are not set. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env'
  )
}

// Client fictif pour éviter les crashes au chargement si Supabase n'est pas configuré
const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ 
      data: { session: null }, 
      error: { message: "Supabase n'est pas configuré. Veuillez ajouter VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env" } 
    }),
    signUp: async () => ({ 
      data: { session: null }, 
      error: { message: "Supabase n'est pas configuré. Veuillez ajouter VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env" } 
    }),
    signOut: async () => {},
  }
};

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : (mockSupabase as any);

export default supabase;
