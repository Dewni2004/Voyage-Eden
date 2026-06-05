const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const locales = ['en', 'es', 'fr', 'it', 'de'];

const newButtons = {
  en: { nextBtn: "Next", backBtn: "Back", startPlanningBtn: "Start Planning" },
  es: { nextBtn: "Siguiente", backBtn: "Atrás", startPlanningBtn: "Comenzar a planificar" },
  fr: { nextBtn: "Suivant", backBtn: "Retour", startPlanningBtn: "Commencer la planification" },
  it: { nextBtn: "Avanti", backBtn: "Indietro", startPlanningBtn: "Inizia a pianificare" },
  de: { nextBtn: "Weiter", backBtn: "Zurück", startPlanningBtn: "Planung beginnen" }
};

locales.forEach(locale => {
  const translationFile = path.join(localesDir, locale, 'translation.json');
  if (fs.existsSync(translationFile)) {
    const data = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
    
    if (data.translation && data.translation.customTrip) {
      Object.assign(data.translation.customTrip, newButtons[locale]);
    }
    
    fs.writeFileSync(translationFile, JSON.stringify(data, null, 2));
    console.log(`Added button translations for ${locale}`);
  }
});
