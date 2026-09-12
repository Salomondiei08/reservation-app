import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isAvailable = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isAvailable
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (null as unknown as ReturnType<typeof createClient>)