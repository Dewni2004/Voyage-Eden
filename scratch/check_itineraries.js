import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = Object.fromEntries(envContent.split('\n').map(line => line.split('=')))

const supabaseUrl = env.VITE_SUPABASE_URL.trim()
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim()

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkSchema() {
  console.log('Checking schema for itineraries table...')
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Error fetching itineraries:', error)
    return
  }

  if (data && data.length > 0) {
    console.log('Columns in itineraries table:', Object.keys(data[0]))
  } else {
    console.log('No itineraries found.')
  }
}

checkSchema()
