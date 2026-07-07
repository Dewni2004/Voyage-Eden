export const routeMap = {
  fr: {
    home: '',
    itineraries: 'itineraires',
    about: 'a-propos',
    guide: 'guide-de-voyage',
    contact: 'contact',
    customTrip: 'voyage-sur-mesure',
    reviews: 'avis',
    hotels: 'hotels',
    restaurants: 'restaurants',
    b2b: 'b2b',
    reviewDetail: 'avis'
  },
  es: {
    home: '',
    itineraries: 'itinerarios',
    about: 'quienes-somos',
    guide: 'guia-practica-de-sri-lanka',
    contact: 'contacto-viajes-eden',
    customTrip: 'viaje-a-medida',
    reviews: 'opiniones-sobre-sri-lanka-viajes-eden',
    hotels: 'hoteles',
    restaurants: 'restaurantes',
    b2b: 'b2b',
    reviewDetail: 'opiniones'
  },
  it: {
    home: '',
    itineraries: 'itinerari',
    about: 'chi-siamo',
    guide: 'guida-di-viaggio',
    contact: 'contatti',
    customTrip: 'viaggio-su-misura',
    reviews: 'recensioni',
    hotels: 'hotel',
    restaurants: 'ristoranti',
    b2b: 'b2b',
    reviewDetail: 'recensioni'
  },
  de: {
    home: '',
    itineraries: 'reiserouten',
    about: 'uber-uns',
    guide: 'reisefuhrer',
    contact: 'kontakt',
    customTrip: 'massgeschneiderte-reise',
    reviews: 'bewertungen',
    hotels: 'hotels',
    restaurants: 'restaurants',
    b2b: 'b2b',
    reviewDetail: 'bewertungen'
  },
  en: {
    home: '',
    itineraries: 'itineraries',
    about: 'about',
    guide: 'travel-guide',
    contact: 'contact',
    customTrip: 'custom-trip',
    reviews: 'reviews',
    hotels: 'hotels',
    restaurants: 'restaurants',
    b2b: 'b2b',
    reviewDetail: 'review'
  }
};

export const getLocalizedPath = (pageKey, lang) => {
  const language = lang?.split('-')[0] || 'fr';
  const paths = routeMap[language] || routeMap['fr'];
  // Use hasOwnProperty to distinguish between a missing key and an intentional empty string (home route = '')
  const route = Object.prototype.hasOwnProperty.call(paths, pageKey) ? paths[pageKey] : pageKey;
  return route === '' ? '/' : `/${route}`;
};
