import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON

console.log('VITE_SUPABASE_URL:', url)   
console.log('VITE_SUPABASE_ANON present:', !!anon)

export const supabase = createClient(url, anon)