
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tnakuqxgfetrnpjvkwnx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuYWt1cXhnZmV0cm5wanZrd254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyOTkzNTEsImV4cCI6MjAyODg3NTM1MX0.U-_5SvB0u1tdzA3E9KjaGulf1QWuemeXy7AMfc_85TY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})