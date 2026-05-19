import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = Object.fromEntries(envContent.split('\n').filter(line => line.includes('=')).map(line => line.split('=')))

const supabaseUrl = env.VITE_SUPABASE_URL.trim()
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY.trim()

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function updateItinerary() {
  const itineraryId = '2a5b7db4-0300-41c2-a1b2-3984df3833e4';

  const { data, error } = await supabase
    .from('itineraries')
    .select('days')
    .eq('id', itineraryId)
    .single()

  if (error) {
    console.error('Error fetching itinerary:', error)
    return
  }

  const days = data.days;

  const coordinatesMap = {
    "Negombo": { x: 85, y: 290 },
    "Safari Minneriya": { x: 175, y: 210 },
    "Sigiriya": { x: 165, y: 215 },
    "Temple d'or de Dambulla": { x: 155, y: 225 },
    "Jardins royaux de Peradeniya": { x: 150, y: 285 },
    "Temple de la Dent ou Champs de Thé": { x: 155, y: 280 },
    "Ramboda Falls": { x: 160, y: 305 },
    "Ella": { x: 190, y: 325 },
    "Ferme aux tortues": { x: 100, y: 380 },
    "Colombo": { x: 85, y: 320 }
  };

  const updatedDays = days.map((day, index) => {
    const highlight = (day.highlights || '').trim();
    if (coordinatesMap[highlight]) {
        day.coords = coordinatesMap[highlight];
    } else {
        // Fallback checks
        if (highlight.includes('Negombo')) day.coords = coordinatesMap["Negombo"];
        if (highlight.includes('Minneriya')) day.coords = coordinatesMap["Safari Minneriya"];
        if (highlight.includes('Sigiriya')) day.coords = coordinatesMap["Sigiriya"];
        if (highlight.includes('Dambulla')) day.coords = coordinatesMap["Temple d'or de Dambulla"];
        if (highlight.includes('Peradeniya')) day.coords = coordinatesMap["Jardins royaux de Peradeniya"];
        if (highlight.includes('Temple de la Dent')) day.coords = coordinatesMap["Temple de la Dent ou Champs de Thé"];
        if (highlight.includes('Ramboda')) day.coords = coordinatesMap["Ramboda Falls"];
        if (highlight.includes('Ella')) day.coords = coordinatesMap["Ella"];
        if (highlight.includes('tortues')) day.coords = coordinatesMap["Ferme aux tortues"];
        if (highlight.includes('Colombo')) day.coords = coordinatesMap["Colombo"];
    }
    console.log(`Day ${day.id} mapped to coords:`, day.coords);
    return day;
  });

  const { error: updateError, data: updateData } = await supabase
    .from('itineraries')
    .update({ days: updatedDays })
    .eq('id', itineraryId)
    .select()

  if (updateError) {
    console.error('Error updating itinerary:', updateError)
  } else {
    console.log('Successfully updated itinerary map coordinates with fixed scale!');
  }
}

updateItinerary()
