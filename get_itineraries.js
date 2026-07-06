import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getFamilyTours() {
  const { data, error } = await supabase
    .from('itineraries')
    .select('id, title, category');
    
  if (error) {
    console.error('Error fetching:', error);
    return;
  }
  
  const familyTours = data.filter(t => t.category === 'family');
  console.log('Family Tours:');
  console.log(JSON.stringify(familyTours, null, 2));
}

getFamilyTours();
