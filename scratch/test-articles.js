import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const processEnv = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const match = trimmed.match(/^([^=]+)=(.*)$/);
  if (match) {
    processEnv[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabaseUrl = processEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = processEnv.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('articles_es').select('id, title, category, excerpt').limit(10);
  if (error) {
    console.error(error);
  } else {
    data.forEach(art => {
      console.log(`Title: "${art.title}" | Category: "${art.category}" | Excerpt: "${art.excerpt ? art.excerpt.substring(0, 30) : ''}..."`);
    });
  }
}

test();
