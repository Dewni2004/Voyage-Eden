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
 * Gets the GPS coordinate for a given day by searching its highlights.
 * Uses exact database fallback if available and no name matches.
 */
export const getGPSForDay = (day) => {
  if (day.highlights) {
    const lowerValue = day.highlights.toLowerCase();
    let bestMatch = null;
    for (const city of Object.keys(CITY_GPS_COORDINATES)) {
      if (lowerValue.includes(city)) {
        if (!bestMatch || city.length > bestMatch.length) {
          bestMatch = city;
        }
      }
    }
    
    if (bestMatch) {
      return CITY_GPS_COORDINATES[bestMatch];
    }
  }

  // Fallback to searching the location string if highlights yield nothing
  if (day.location) {
    const lowerValue = day.location.toLowerCase();
    let bestMatch = null;
    for (const city of Object.keys(CITY_GPS_COORDINATES)) {
      if (lowerValue.includes(city)) {
        if (!bestMatch || city.length > bestMatch.length) {
          bestMatch = city;
        }
      }
    }
    if (bestMatch) {
      return CITY_GPS_COORDINATES[bestMatch];
    }
  }

  return DEFAULT_CENTER;
};
