import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';
import translationIT from './locales/it/translation.json';

const resources = {
  fr: { translation: translationFR.translation },
  en: { translation: translationEN.translation },
  de: { translation: translationDE.translation },
  es: { translation: translationES.translation },
  it: { translation: translationIT.translation }
};

i18n
  // Detects user language
  .use(LanguageDetector)
  // Passes i18n down to react-i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es', // Spanish is the default language
    supportedLngs: ['fr', 'en', 'de', 'es', 'it'],
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
