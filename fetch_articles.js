import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qugmulicnoyvygdlfksm.supabase.co';
const supabaseKey = 'sb_publishable_WWgk8pWpfgEDbrBItqIhIA_5FH9b3kQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const generateSlug = (text, id) => {
  if (!text) return id ? id.toString() : '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // remove accents
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};

async function getLinks() {
  const { data, error } = await supabase.from('articles_es').select('id, title');
  if (error) {
    console.error(error);
    return;
  }
  
  data.forEach(it => {
    console.log(`SLUG: ${generateSlug(it.title, it.id)} | TITLE: ${it.title}`);
  });
}
getLinks();
