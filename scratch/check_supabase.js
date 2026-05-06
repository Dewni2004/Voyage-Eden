import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = Object.fromEntries(envContent.split('\n').map(line => line.split('=')))

const supabaseUrl = env.VITE_SUPABASE_URL.trim()
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim()

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkSchema() {
  console.log('Checking schema for reviews table...')
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Error fetching reviews:', error)
    // Try to list columns by inspecting a dummy insert error
    const { error: insertError } = await supabase
      .from('reviews')
      .insert([{ non_existent_column: 'test' }])
    
    console.log('Insert error with non-existent column:', insertError?.message)
    return
  }

  if (data && data.length > 0) {
    console.log('Columns in reviews table:', Object.keys(data[0]))
  } else {
    console.log('No reviews found. Attempting a simple insert to get columns...')
    const { data: insertData, error: insertError } = await supabase
      .from('reviews')
      .insert([{ name: 'Test Schema Check' }])
      .select()
    
    if (insertError) {
      console.error('Insert error:', insertError.message)
    } else {
      console.log('Successfully inserted test row. Columns:', Object.keys(insertData[0]))
      await supabase.from('reviews').delete().eq('id', insertData[0].id)
    }
  }
}

checkSchema()
