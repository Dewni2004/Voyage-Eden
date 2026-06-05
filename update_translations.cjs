const fs = require('fs');
const path = require('path');

const jsxFile = path.join(__dirname, 'src/pages/CustomTrip.jsx');
const localesDir = path.join(__dirname, 'src/locales');

const code = fs.readFileSync(jsxFile, 'utf8');
const regex = /t\('customTrip\.([^']+)',\s*(?:'([^']+)'|"([^"]+)")\)/g;

let match;
const customTripTranslations = {};

while ((match = regex.exec(code)) !== null) {
  const key = match[1];
  const defaultValue = match[2] || match[3];
  customTripTranslations[key] = defaultValue;
}

const locales = ['en', 'es', 'fr', 'it', 'de'];

locales.forEach(locale => {
  const translationFile = path.join(localesDir, locale, 'translation.json');
  if (fs.existsSync(translationFile)) {
    const data = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
    
    if (!data.customTrip) {
      data.customTrip = {};
    }
    
    // Merge new keys, don't overwrite existing ones if they exist
    for (const [key, value] of Object.entries(customTripTranslations)) {
      if (!data.customTrip[key]) {
        data.customTrip[key] = value;
      }
    }
    
    fs.writeFileSync(translationFile, JSON.stringify(data, null, 2));
    console.log(`Updated translations for ${locale}`);
  } else {
    console.log(`Translation file not found for ${locale}`);
  }
});
