import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = Object.fromEntries(envContent.split('\n').filter(line => line.includes('=')).map(line => line.split('=')))

const supabaseUrl = env.VITE_SUPABASE_URL.trim()
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim()

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fetchHighlights() {
  const { data, error } = await supabase
    .from('itineraries')
    .select('days')
    .eq('id', '2a5b7db4-0300-41c2-a1b2-3984df3833e4')
    .single()

  if (error) {
    console.error('Error fetching itinerary:', error)
    return
  }

  data.days.forEach(day => {
     console.log(`Day ${day.id} highlight: '${day.highlights}'`);
  });
}

fetchHighlights()
