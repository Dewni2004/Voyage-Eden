
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Read .env file manually
const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const csvFile = 'Avis-de-Voyageurs-Export-2026-May-15-0805.csv';

function parseCSV(content) {
    const results = [];
    let currentField = '';
    let row = [];
    let inQuotes = false;
    
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i+1];
        
        if (char === '"' && inQuotes && nextChar === '"') {
            currentField += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            row.push(currentField);
            currentField = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (currentField || row.length > 0) {
                row.push(currentField);
                results.push(row);
                currentField = '';
                row = [];
            }
            if (char === '\r' && nextChar === '\n') i++;
        } else {
            currentField += char;
        }
    }
    if (currentField || row.length > 0) {
        row.push(currentField);
        results.push(row);
    }

    const headers = results[0];
    const data = results.slice(1).map(r => {
        const obj = {};
        headers.forEach((h, idx) => {
            const cleanHeader = h.replace(/^"|"$/g, '').trim();
            obj[cleanHeader] = r[idx];
        });
        return obj;
    });
    return data;
}

function decodeHTMLEntities(text) {
    if (!text) return "";
    const entities = {
        '&#x1fa75;': '🫶',
        '&#xE934;': '⭐',
        '&nbsp;': ' ',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "'",
        '&#8211;': '-',
        '&#8230;': '...'
    };
    return text.replace(/&#?[a-zA-Z0-9]+;/g, (match) => entities[match] || match);
}

async function importReviews() {
    console.log("Reading CSV...");
    const content = fs.readFileSync(csvFile, 'utf8');
    const rows = parseCSV(content);
    console.log(`Found ${rows.length} rows.`);

    // Clear existing reviews first to avoid duplicates
    await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const reviewsToInsert = [];

    for (const row of rows) {
        try {
            const elementorDataStr = row['_elementor_data'];
            let elementorData = null;
            try {
                if (elementorDataStr) {
                    const fixedJson = elementorDataStr
                        .replace(/\\"/g, '"')
                        .replace(/\\'/g, "'")
                        .replace(/\\\\/g, '\\');
                    elementorData = JSON.parse(fixedJson);
                }
            } catch (e) {}
            
            let name = "";
            let text = "";
            let rating = 5;

            if (elementorData) {
                const findWidgets = (elements) => {
                    elements.forEach(el => {
                        if (el.widgetType === 'heading' && el.settings && el.settings.title) {
                            const title = el.settings.title.replace(/<[^>]*>?/gm, '').trim();
                            if (title && !title.includes('[elementor-tag')) {
                                if (!name) name = title;
                                else if (title.length > text.length) text = title;
                            }
                        }
                        if (el.widgetType === 'star-rating' && el.settings && el.settings.rating) {
                            rating = parseFloat(el.settings.rating) || 5;
                        }
                        if (el.elements) findWidgets(el.elements);
                    });
                };
                findWidgets(elementorData);
            }

            if (!name) {
                const titleMatch = row['Title'].match(/Voyage (.*?) en/);
                name = titleMatch ? titleMatch[1] : row['Title'];
            }
            
            if (!text && row['Content']) {
                text = row['Content'].replace(/<[^>]*>?/gm, '').trim();
            }

            // Cleanup text
            text = decodeHTMLEntities(text);
            text = text.replace(/Rated \d out of \d/g, '').trim();
            text = text.replace(/⭐/g, '').trim(); // Remove the stars from text as we have a rating field

            if (name && text) {
                reviewsToInsert.push({
                    name: decodeHTMLEntities(name),
                    text: text,
                    rating: rating,
                    img: "", // Set to empty as requested, user will update manually
                    date: row['Date'] || new Date().toISOString().split('T')[0],
                    headline: decodeHTMLEntities(row['Title'] || ""),
                    detailedtext: text,
                    tourdetails: {
                        date: row['Date'] || "",
                        travelertype: "Couple",
                        group: "Private"
                    }
                });
            }
        } catch (e) {
            console.error(`Error parsing row ${row.ID}:`, e.message);
        }
    }

    console.log(`Prepared ${reviewsToInsert.length} reviews for insertion.`);

    // Batch insert
    const { data, error } = await supabase
        .from('reviews')
        .insert(reviewsToInsert);

    if (error) {
        console.error("Error inserting into Supabase:", error);
    } else {
        console.log("Successfully imported reviews!");
    }
}

importReviews();
