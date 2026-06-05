const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const locales = ['en', 'es', 'fr', 'it', 'de'];

const translations = {
  es: {
    heroTitle: "DISEÑA TU VIAJE A MEDIDA",
    fullName: "Nombre completo",
    whatsapp: "Número de contacto de Whatsapp",
    nationality: "Nacionalidad",
    email: "Correo electrónico",
    whoWith: "¿Con quién viajas?",
    couple: "En pareja",
    family: "En familia",
    group: "En grupo",
    whereAt: "¿En qué punto te encuentras?",
    lookingForInfo: "Actualmente busco información",
    startingToOrganize: "Estoy empezando a organizar mi viaje",
    boughtTickets: "Ya he comprado los billetes de avión",
    yes: "Sí",
    no: "No",
    numTravelers: "¿Número de viajeros?",
    adults: "Nº de adultos",
    teens: "Adolescentes <16 años",
    children: "Niños <11 años",
    infants: "Bebés <2 años",
    numDays: "Número de días",
    arrivalDate: "Fecha de llegada",
    departureDate: "Fecha de salida",
    interestsTitle: "¿Qué te interesa especialmente? (Puedes marcar varias opciones)",
    accommodationType: "Categoría de hoteles preferida",
    standard: "Estándar (3 estrellas aprox.)",
    superior: "Superior (4/5 estrellas aprox.)",
    luxury: "Hoteles de Lujo",
    superLuxury: "Súper Lujo",
    roomDist: "Distribución de habitaciones",
    singleRooms: "Habitaciones Individuales",
    doubleRooms: "Habitaciones Dobles",
    tripleRooms: "Habitaciones Triples",
    mealPlan: "Plan de comidas",
    bb: "Alojamiento y desayuno",
    hb: "Media Pensión",
    fb: "Pensión Completa",
    accompaniment: "Tipo de acompañamiento:",
    driver: "Conductor turístico",
    chauffeur: "Chófer guía",
    nationalGuide: "Guía Nacional",
    comments: "Comentarios",
    commentsPlaceholder: "Vacaciones, viajes de fotografía, observación de aves, senderismo, etc...",
    sending: "Enviando...",
    send: "ENVIAR SOLICITUD"
  },
  fr: {
    heroTitle: "CRÉEZ VOTRE VOYAGE SUR MESURE",
    fullName: "Nom complet",
    whatsapp: "Numéro de contact WhatsApp",
    nationality: "Nationalité",
    email: "E-mail",
    whoWith: "Avec qui voyagez-vous ?",
    couple: "En couple",
    family: "En famille",
    group: "En groupe",
    whereAt: "Où en êtes-vous ?",
    lookingForInfo: "Je cherche actuellement des informations",
    startingToOrganize: "Je commence à organiser mon voyage",
    boughtTickets: "J'ai déjà acheté les billets d'avion",
    yes: "Oui",
    no: "Non",
    numTravelers: "Nombre de voyageurs ?",
    adults: "Nb. d'adultes",
    teens: "Adolescents <16 ans",
    children: "Enfants <11 ans",
    infants: "Bébés <2 ans",
    numDays: "Nombre de jours",
    arrivalDate: "Date d'arrivée",
    departureDate: "Date de départ",
    interestsTitle: "Qu'est-ce qui vous intéresse particulièrement ? (Plusieurs choix possibles)",
    accommodationType: "Type d'hébergement",
    standard: "Standard (environ 3 étoiles)",
    superior: "Supérieur (environ 4/5 étoiles)",
    luxury: "Hôtels de Luxe",
    superLuxury: "Super Luxe",
    roomDist: "Répartition des chambres",
    singleRooms: "Chambres simples",
    doubleRooms: "Chambres doubles",
    tripleRooms: "Chambres triples",
    mealPlan: "Formule repas",
    bb: "Chambre et petit-déjeuner",
    hb: "Demi-pension",
    fb: "Pension complète",
    accompaniment: "Type d'accompagnement :",
    driver: "Chauffeur touristique",
    chauffeur: "Chauffeur-guide",
    nationalGuide: "Guide National",
    comments: "Commentaires",
    commentsPlaceholder: "Vacances, voyages photographiques, observation des oiseaux, trekking, etc...",
    sending: "Envoi en cours...",
    send: "ENVOYER LA DEMANDE"
  },
  it: {
    heroTitle: "CREA IL TUO VIAGGIO SU MISURA",
    fullName: "Nome e cognome",
    whatsapp: "Numero WhatsApp",
    nationality: "Nazionalità",
    email: "E-mail",
    whoWith: "Con chi viaggi?",
    couple: "In coppia",
    family: "In famiglia",
    group: "In gruppo",
    whereAt: "A che punto sei?",
    lookingForInfo: "Sto cercando informazioni",
    startingToOrganize: "Sto iniziando a organizzare il viaggio",
    boughtTickets: "Ho già comprato i biglietti aerei",
    yes: "Sì",
    no: "No",
    numTravelers: "Numero di viaggiatori?",
    adults: "N. Adulti",
    teens: "Adolescenti <16 anni",
    children: "Bambini <11 anni",
    infants: "Neonati <2 anni",
    numDays: "Numero di giorni",
    arrivalDate: "Data di arrivo",
    departureDate: "Data di partenza",
    interestsTitle: "Cosa ti interessa in particolare? (Sono possibili più scelte)",
    accommodationType: "Tipo di alloggio",
    standard: "Standard (circa 3 stelle)",
    superior: "Superior (circa 4/5 stelle)",
    luxury: "Hotel di lusso",
    superLuxury: "Super Lusso",
    roomDist: "Distribuzione camere",
    singleRooms: "Camere singole",
    doubleRooms: "Camere doppie",
    tripleRooms: "Camere triple",
    mealPlan: "Piani pasto",
    bb: "Pernottamento e colazione",
    hb: "Mezza pensione",
    fb: "Pensione completa",
    accompaniment: "Tipo di accompagnamento:",
    driver: "Autista turistico",
    chauffeur: "Autista-guida",
    nationalGuide: "Guida Nazionale",
    comments: "Commenti",
    commentsPlaceholder: "Vacanze, viaggi fotografici, birdwatching, trekking ecc...",
    sending: "Invio in corso...",
    send: "INVIA RICHIESTA"
  },
  de: {
    heroTitle: "GESTALTEN SIE IHRE MASSGESCHNEIDERTE REISE",
    fullName: "Vollständiger Name",
    whatsapp: "WhatsApp-Kontaktnummer",
    nationality: "Nationalität",
    email: "E-Mail",
    whoWith: "Mit wem reisen Sie?",
    couple: "Als Paar",
    family: "Mit der Familie",
    group: "In einer Gruppe",
    whereAt: "Wo stehen Sie gerade?",
    lookingForInfo: "Ich suche derzeit nach Informationen",
    startingToOrganize: "Ich beginne meine Reise zu organisieren",
    boughtTickets: "Ich habe bereits Flugtickets gekauft",
    yes: "Ja",
    no: "Nein",
    numTravelers: "Anzahl der Reisenden?",
    adults: "Anz. Erwachsene",
    teens: "Teenager <16 Jahre",
    children: "Kinder <11 Jahre",
    infants: "Kleinkinder <2 Jahre",
    numDays: "Anzahl der Tage",
    arrivalDate: "Ankunftsdatum",
    departureDate: "Abreisedatum",
    interestsTitle: "Was interessiert Sie besonders? (Mehrere Optionen möglich)",
    accommodationType: "Unterkunftsart",
    standard: "Standard (ca. 3 Sterne)",
    superior: "Superior (ca. 4/5 Sterne)",
    luxury: "Luxushotels",
    superLuxury: "Super-Luxus",
    roomDist: "Zimmeraufteilung",
    singleRooms: "Einzelzimmer",
    doubleRooms: "Doppelzimmer",
    tripleRooms: "Dreibettzimmer",
    mealPlan: "Verpflegungsplan",
    bb: "Übernachtung und Frühstück",
    hb: "Halbpension",
    fb: "Vollpension",
    accompaniment: "Art der Begleitung:",
    driver: "Touristischer Fahrer",
    chauffeur: "Chauffeur-Reiseleiter",
    nationalGuide: "Nationaler Reiseleiter",
    comments: "Kommentare",
    commentsPlaceholder: "Urlaub, Fotoreisen, Vogelbeobachtung, Trekking etc...",
    sending: "Senden...",
    send: "ANFRAGE ABSENDEN"
  }
};

locales.forEach(locale => {
  const translationFile = path.join(localesDir, locale, 'translation.json');
  if (fs.existsSync(translationFile)) {
    const data = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
    
    // Remove accidentally added root-level customTrip
    if (data.customTrip && !data.translation) {
       // if there is no translation object, this is weird.
    }
    if (data.customTrip) {
      delete data.customTrip;
    }

    if (data.translation && data.translation.customTrip) {
      // Apply translated values
      if (translations[locale]) {
        for (const [key, value] of Object.entries(translations[locale])) {
          data.translation.customTrip[key] = value;
        }
      }
    }
    
    fs.writeFileSync(translationFile, JSON.stringify(data, null, 2));
    console.log(`Translated values for ${locale}`);
  }
});
