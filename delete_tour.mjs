import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qugmulicnoyvygdlfksm.supabase.co', 'sb_publishable_WWgk8pWpfgEDbrBItqIhIA_5FH9b3kQ');

async function run() {
  const langs = ['itineraries', 'itineraries_en', 'itineraries_de', 'itineraries_es', 'itineraries_it'];
  
  for (const table of langs) {
    const { data, error } = await supabase.from(table).select('id, title').ilike('title', '%color%'); // matches colors, colori, colores
    if (data && data.length > 0) {
      console.log(`Found in ${table} (color):`, data);
      for (const item of data) {
        const { error: delError } = await supabase.from(table).delete().eq('id', item.id);
        if (delError) console.error(delError);
        else console.log(`Deleted ${item.id} from ${table}`);
      }
    }
    
    const { data: d2, error: e2 } = await supabase.from(table).select('id, title').ilike('title', '%farben%'); // matches German
    if (d2 && d2.length > 0) {
      console.log(`Found in ${table} (farben):`, d2);
      for (const item of d2) {
        const { error: delError } = await supabase.from(table).delete().eq('id', item.id);
        if (delError) console.error(delError);
        else console.log(`Deleted ${item.id} from ${table}`);
      }
    }
  }
}

run();
