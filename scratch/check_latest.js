import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = Object.fromEntries(envContent.split('\n').map(line => line.split('=')))

const supabaseUrl = env.VITE_SUPABASE_URL.trim()
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim()

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkLatestReview() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Latest Review:', JSON.stringify(data[0], null, 2))
}

checkLatestReview()
