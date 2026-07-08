import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const domains = {
  es: 'https://srilankaviajeseden.es',
  en: 'https://srilankaedentravels.com',
  fr: 'https://srilankavoyageeden.com',
  it: 'https://srilankaviaggieden.com',
  de: 'https://srilankaedenreisen.com'
};

const generateSlug = (text, id) => {
  if (!text) return id ? id.toString() : '';
  return text.toString().toLowerCase().trim().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

async function fetchAndGenerate() {
  console.log('Generating sitemaps...');
  
  for (const [lang, domain] of Object.entries(domains)) {
    const urls = [];
    urls.push(`${domain}/`);
    urls.push(`${domain}/itineraires`);
    urls.push(`${domain}/guia-practica`);
    urls.push(`${domain}/quienes-somos`);
    urls.push(`${domain}/contacto-viajes-eden`);
    urls.push(`${domain}/hoteles`);
    urls.push(`${domain}/restaurants`);
    
    // Fetch Itineraries
    const iterTable = lang === 'fr' ? 'itineraries' : `itineraries_${lang}`;
    const { data: itineraries, error: iterError } = await supabase.from(iterTable).select('id, title');
    if (!iterError && itineraries) {
      itineraries.forEach(it => {
        urls.push(`${domain}/itinerary/${generateSlug(it.title, it.id)}`);
      });
    }

    // Fetch Blogs
    const artTable = lang === 'fr' ? 'articles' : `articles_${lang}`;
    const { data: articles, error: artError } = await supabase.from(artTable).select('id, title');
    if (!artError && articles) {
      articles.forEach(art => {
        urls.push(`${domain}/blog/${generateSlug(art.title, art.id)}`);
      });
    }

    // Fetch Reviews
    const { data: reviews, error: revError } = await supabase.from('reviews').select('id, client_name');
    if (!revError && reviews) {
      reviews.forEach(rev => {
        urls.push(`${domain}/review/${generateSlug(rev.client_name, rev.id)}`);
      });
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(`./public/sitemap_${lang}.xml`, xml);
    console.log(`Created sitemap_${lang}.xml with ${urls.length} URLs`);
  }
}

fetchAndGenerate().catch(console.error);
