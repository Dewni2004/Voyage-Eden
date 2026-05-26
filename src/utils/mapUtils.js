export const CITY_GPS_COORDINATES = {
  'colombo': [6.9271, 79.8612],
  'kandy': [7.2906, 80.6337],
  'galle': [6.0535, 80.2210],
  'sigiriya': [7.9570, 80.7603],
  'anuradhapura': [8.3114, 80.4037],
  'polonnaruwa': [7.9403, 81.0188],
  'trincomalee': [8.5874, 81.2152],
  'jaffna': [9.6615, 80.0255],
  'nuwara eliya': [6.9497, 80.7828],
  'ella': [6.8667, 81.0466],
  'yala': [6.3683, 81.5186],
  'mirissa': [5.9483, 80.4531],
  'negombo': [7.2008, 79.8737],
  'bentota': [6.4212, 79.9984],
  'arugam bay': [6.8407, 81.8267],
  'dambulla': [7.8592, 80.6517],
  'minneriya': [8.0384, 80.8920],
  'udawalawe': [6.4475, 80.8872],
  'hikkaduwa': [6.1388, 80.1037],
  'tangalle': [6.0232, 80.7960],
  'weligama': [5.9739, 80.4286],
  'kataragama': [6.4137, 81.3325],
  'matara': [5.9496, 80.5353],
  'habarana': [8.0315, 80.7491],
  'kurunegala': [7.4863, 80.3647],
  'pinnawala': [7.3008, 80.3860],
  'matale': [7.4675, 80.6234],
  'badulla': [6.9890, 81.0560],
  'batticaloa': [7.7102, 81.6924],
  'pasikudah': [7.9250, 81.5644],
  'unawatuna': [6.0125, 80.2483],
  'kitulgala': [6.9942, 80.4147],
  'sinharaja': [6.3980, 80.4633],
  "adam's peak": [6.8096, 80.4994],
  'sri pada': [6.8096, 80.4994],
  'horton plains': [6.8028, 80.8147],
  'wilpattu': [8.4358, 80.0055],
  'kalpitiya': [8.2323, 79.7610],
  'puttalam': [8.0330, 79.8261],
  'ahangama': [5.9687, 80.3663],
  'koggala': [5.9928, 80.3235],
  'mount lavinia': [6.8379, 79.8631],
  'aéroport': [7.1804, 79.8833],
  'airport': [7.1804, 79.8833],
};

const DEFAULT_CENTER = [7.8731, 80.7718]; // Center of Sri Lanka

/**
 * Finds the most relevant city for a given day by searching its highlights first, then location.
 * It prioritizes the FIRST city mentioned in the text.
 */
export const getMatchedCity = (day) => {
  if (!day) return null;
  // User specifically requested to use Highlights (Points Forts) as the primary source for the map
  const searchFields = [day.highlights, day.location];
  
  for (const field of searchFields) {
    if (!field) continue;
    const lowerField = field.toLowerCase();
    
    let firstCity = null;
    let firstIndex = 999999;
    
    for (const city of Object.keys(CITY_PERCENTAGE_COORDINATES)) {
      const idx = lowerField.indexOf(city);
      if (idx !== -1 && idx < firstIndex) {
        firstIndex = idx;
        firstCity = city;
      }
    }
    
    if (firstCity) return firstCity;
  }
  return null;
};

/**
 * Gets the GPS coordinate for a given day.
 */
export const getGPSForDay = (day) => {
  const matchedCity = getMatchedCity(day);
  if (matchedCity && CITY_GPS_COORDINATES[matchedCity]) {
    return CITY_GPS_COORDINATES[matchedCity];
  }
  return DEFAULT_CENTER;
};

/**
 * Precise X/Y percentage coordinates for cities that are manually illustrated on New Map.png.
 * These perfectly align the markers with the custom artwork.
 */
export const CITY_PERCENTAGE_COORDINATES = {
  // Cities marked by User in the reference image
  'jaffna': { x: 30, y: 18 },
  'anuradhapura': { x: 37, y: 31 },
  'trincomalee': { x: 66, y: 35 },
  'puttalam': { x: 21, y: 41 },
  'kurunegala': { x: 36, y: 53 },
  'sigiriya': { x: 47, y: 39 },
  'polonnaruwa': { x: 60, y: 42 },
  'dambulla': { x: 47, y: 49 },
  'minneriya': { x: 62, y: 50 },
  'negombo': { x: 19, y: 58 },
  'aéroport': { x: 19, y: 58 },
  'airport': { x: 19, y: 58 },
  'kandy': { x: 46, y: 60 },
  'colombo': { x: 21, y: 65 },
  'mount lavinia': { x: 21.5, y: 70 },
  "adam's peak": { x: 39, y: 69 },
  'sri pada': { x: 39, y: 69 },
  'nuwara eliya': { x: 50, y: 69 },
  'ella': { x: 64, y: 70 },
  'arugam bay': { x: 87, y: 71 },
  'horton plains': { x: 43, y: 78 },
  'yala': { x: 69, y: 77 },
  'kataragama': { x: 71, y: 82 },
  'galle': { x: 33, y: 85 },

  // Additional anchors to ensure the IDW fallback works perfectly for un-illustrated cities
  'kalpitiya': { x: 19, y: 35 },
  'wilpattu': { x: 28, y: 35 },
  'habarana': { x: 54, y: 49 },
  'matale': { x: 46, y: 55 },
  'pinnawala': { x: 40, y: 56 },
  'kitulgala': { x: 35, y: 66 },
  'badulla': { x: 60, y: 67 },
  'udawalawe': { x: 55, y: 79 },
  'sinharaja': { x: 40, y: 80 },
  'bentota': { x: 25, y: 76 },
  'hikkaduwa': { x: 28, y: 81 },
  'unawatuna': { x: 35, y: 86 },
  'weligama': { x: 40, y: 87 },
  'mirissa': { x: 43, y: 87 },
  'matara': { x: 47, y: 87 },
  'tangalle': { x: 55, y: 86 },
  'batticaloa': { x: 75, y: 47 },
  'pasikudah': { x: 73, y: 44 },
};

export const convertGPSToPercentage = ([lat, lng], day = null) => {
  // First, check if we have a perfect manual coordinate for this day's location
  const matchedCity = getMatchedCity(day);
  if (matchedCity && CITY_PERCENTAGE_COORDINATES[matchedCity]) {
    return CITY_PERCENTAGE_COORDINATES[matchedCity];
  }

  // Fallback to Smart Interpolation (Inverse Distance Weighting)
  let sumWeightX = 0;
  let sumWeightY = 0;
  let sumWeight = 0;

  for (const city of Object.keys(CITY_GPS_COORDINATES)) {
    if (CITY_PERCENTAGE_COORDINATES[city]) {
      const cityGPS = CITY_GPS_COORDINATES[city];
      const cityPct = CITY_PERCENTAGE_COORDINATES[city];
      
      const dLat = lat - cityGPS[0];
      const dLng = lng - cityGPS[1];
      const distSq = dLat * dLat + dLng * dLng;

      if (distSq < 0.000001) {
        return { x: cityPct.x, y: cityPct.y };
      }

      const weight = 1 / (distSq * distSq);
      
      sumWeightX += cityPct.x * weight;
      sumWeightY += cityPct.y * weight;
      sumWeight += weight;
    }
  }

  if (sumWeight > 0) {
    return {
      x: sumWeightX / sumWeight,
      y: sumWeightY / sumWeight
    };
  }

  return { x: 50, y: 50 };
};
