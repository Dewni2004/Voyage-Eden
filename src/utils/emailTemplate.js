const emailTitles = {
  "New Booking Request": {
    en: "New Booking Request",
    es: "Nueva solicitud de reserva",
    fr: "Nouvelle demande de réservation",
    de: "Neue Buchungsanfrage",
    it: "Nuova richiesta di prenotazione"
  },
  "New Contact Message": {
    en: "New Contact Message",
    es: "Nuevo mensaje de contacto",
    fr: "Nouveau message de contact",
    de: "Neue Kontaktanfrage",
    it: "Nuovo messaggio di contatto"
  },
  "Custom Trip Request": {
    en: "Custom Trip Request",
    es: "Solicitud de viaje a medida",
    fr: "Demande de voyage sur mesure",
    de: "Maßgeschneiderte Reiseanfrage",
    it: "Richiesta di viaggio su misura"
  },
  "New B2B Partner Request": {
    en: "New B2B Partner Request",
    es: "Nueva solicitud de socio B2B",
    fr: "Nouvelle demande de partenaire B2B",
    de: "Neue B2B-Partneranfrage",
    it: "Nuova richiesta per partner B2B"
  }
};

export const getTranslatedTitle = (title, lang = 'en') => {
  const language = lang.toLowerCase().split('-')[0];
  if (emailTitles[title] && emailTitles[title][language]) {
    return emailTitles[title][language];
  }
  return title; // Fallback to English/original
};

const translations = {
  en: {
    brandName: "Sri Lanka Eden Travels",
    receivedMsg: (title, brandName) => `You have received a new <strong>${title}</strong> from <strong>${brandName}</strong>. Below are the submitted details:`,
    automatedMsg: "This is an automated message sent from your Voyage Eden website. <br>Please reply directly to this email to contact the sender.",
    keys: {
      fullName: "Full Name", full_name: "Full Name",
      whatsapp: "WhatsApp", whatsapp_number: "WhatsApp",
      nationality: "Nationality", email: "Email", user_email: "Email",
      whoWith: "Traveling With", whereAt: "Planning Stage", planeTickets: "Has Plane Tickets",
      numTravelers: "No. of Travelers", num_travelers: "No. of Travelers",
      adults: "Adults", teens: "Teens", children: "Children", infants: "Infants",
      numDays: "No. of Days", num_days: "No. of Days",
      arrivalDate: "Arrival Date", arrival_date: "Arrival Date",
      departureDate: "Departure Date", departure_date: "Departure Date",
      interests: "Interests", accommodation: "Accommodation", hotel_category: "Accommodation",
      singleRooms: "Single Rooms", doubleRooms: "Double Rooms", tripleRooms: "Triple Rooms",
      room_distribution: "Room Distribution", mealPlan: "Meal Plan", meal_plan: "Meal Plan",
      accompaniment: "Accompaniment", chauffeur_language: "Chauffeur Language",
      langPref: "Language Preference", otherLanguage: "Other Language",
      comments: "Comments", special_requirements: "Special Requirements", tour_name: "Tour Name",
      group_composition: "Group composition", adults_count: "Adults count",
      teens_count: "Teens count", children_count: "Children count", infants_count: "Infants count",
      accommodation_type: "Accommodation type", agency_name: "Agency name", agent_name: "Agent name",
      client_name: "Client name", interest_monuments: "Interest: Monuments", interest_temples: "Interest: Temples",
      interest_nature: "Interest: Nature", interest_beach: "Interest: Beach", interest_adventure: "Interest: Adventure",
      interest_hiking: "Interest: Hiking", couple: "Couple", honeymoon: "Honeymoon", family: "Family", group: "Group",
      standard: "Standard", superior: "Superior", luxury: "Luxury", superLuxury: "Super Luxury", driverEnglish: "English Driver",
      driverSpanish: "Spanish Driver", guideSpanish: "Spanish Guide", yes: "Yes", no: "No",
      bb: "Bed & Breakfast", hb: "Half Board", fb: "Full Board",
      info: "Looking for information", organize: "Starting to organize",
      driver: "Tourist Driver", chauffeur: "Chauffeur Guide", nationalGuide: "National Guide",
      monuments: "Monuments", temples: "Temples", nature: "Nature", beach: "Beach", adventure: "Adventure", hiking: "Hiking"
    }
  },
  es: {
    brandName: "Sri Lanka Viajes Eden",
    receivedMsg: (title, brandName) => `Ha recibido una nueva <strong>${title}</strong> de <strong>${brandName}</strong>. A continuación se muestran los detalles enviados:`,
    automatedMsg: "Este es un mensaje automatizado enviado desde su sitio web Voyage Eden. <br>Por favor, responda directamente a este correo electrónico para contactar al remitente.",
    keys: {
      fullName: "Nombre completo", full_name: "Nombre completo",
      whatsapp: "WhatsApp", whatsapp_number: "WhatsApp",
      nationality: "Nacionalidad", email: "Correo electrónico", user_email: "Correo electrónico",
      whoWith: "Con quien viaja", whereAt: "Etapa de planificación", planeTickets: "Tiene billetes de avión",
      numTravelers: "Nº de viajeros", num_travelers: "Nº de viajeros",
      adults: "Adultos", teens: "Adolescentes", children: "Niños", infants: "Bebés",
      numDays: "Nº de días", num_days: "Nº de días",
      arrivalDate: "Fecha de llegada", arrival_date: "Fecha de llegada",
      departureDate: "Fecha de salida", departure_date: "Fecha de salida",
      interests: "Intereses", accommodation: "Alojamiento", hotel_category: "Alojamiento",
      singleRooms: "Habitaciones individuales", doubleRooms: "Habitaciones dobles", tripleRooms: "Habitaciones triples",
      room_distribution: "Distribución de habitaciones", mealPlan: "Plan de comidas", meal_plan: "Plan de comidas",
      accompaniment: "Acompañamiento", chauffeur_language: "Idioma del chófer",
      langPref: "Preferencia de idioma", otherLanguage: "Otro idioma",
      comments: "Comentarios", special_requirements: "Requisitos especiales", tour_name: "Nombre del tour",
      group_composition: "Composición del grupo", adults_count: "Nº de adultos",
      teens_count: "Nº de adolescentes", children_count: "Nº de niños", infants_count: "Nº de bebés",
      accommodation_type: "Tipo de alojamiento", agency_name: "Nombre de la agencia", agent_name: "Nombre del agente",
      client_name: "Nombre del cliente", interest_monuments: "Interés: Monumentos", interest_temples: "Interés: Templos",
      interest_nature: "Interés: Naturaleza", interest_beach: "Interés: Playa", interest_adventure: "Interés: Aventura",
      interest_hiking: "Interés: Senderismo", couple: "Pareja", honeymoon: "Luna de miel", family: "Familia", group: "Grupo",
      standard: "Estándar (3 estrellas aprox.)", superior: "Superior (4/5 estrellas aprox.)", luxury: "Hoteles de Lujo", superLuxury: "Súper Lujo", driverEnglish: "Chofer en inglés",
      driverSpanish: "Chofer en español", guideSpanish: "Guía en español", yes: "Sí", no: "No",
      bb: "Alojamiento y desayuno", hb: "Media Pensión", fb: "Pensión Completa",
      info: "Actualmente busco información", organize: "Empiezo a organizar mi viaje",
      driver: "Conductor Profesional", chauffeur: "Chófer guía", nationalGuide: "Guía Nacional",
      monuments: "Monumentos", temples: "Templos", nature: "Naturaleza", beach: "Playa", adventure: "Aventura", hiking: "Senderismo"
    }
  },
  fr: {
    brandName: "Sri Lanka Voyage Eden",
    receivedMsg: (title, brandName) => `Vous avez reçu une nouvelle <strong>${title}</strong> de <strong>${brandName}</strong>. Voici les détails soumis :`,
    automatedMsg: "Ceci est un message automatisé envoyé depuis votre site Voyage Eden. <br>Veuillez répondre directement à cet e-mail pour contacter l'expéditeur.",
    keys: {
      fullName: "Nom complet", full_name: "Nom complet",
      whatsapp: "WhatsApp", whatsapp_number: "WhatsApp",
      nationality: "Nationalité", email: "E-mail", user_email: "E-mail",
      whoWith: "Voyage avec", whereAt: "Étape de planification", planeTickets: "A des billets d'avion",
      numTravelers: "Nbre de voyageurs", num_travelers: "Nbre de voyageurs",
      adults: "Adultes", teens: "Adolescents", children: "Enfants", infants: "Bébés",
      numDays: "Nbre de jours", num_days: "Nbre de jours",
      arrivalDate: "Date d'arrivée", arrival_date: "Date d'arrivée",
      departureDate: "Date de départ", departure_date: "Date de départ",
      interests: "Intérêts", accommodation: "Hébergement", hotel_category: "Hébergement",
      singleRooms: "Chambres simples", doubleRooms: "Chambres doubles", tripleRooms: "Chambres triples",
      room_distribution: "Répartition des chambres", mealPlan: "Plan de repas", meal_plan: "Plan de repas",
      accompaniment: "Accompagnement", chauffeur_language: "Langue du chauffeur",
      langPref: "Préférence de langue", otherLanguage: "Autre langue",
      comments: "Commentaires", special_requirements: "Besoins spéciaux", tour_name: "Nom de l'excursion",
      group_composition: "Composition du groupe", adults_count: "Nombre d'adultes",
      teens_count: "Nombre d'adolescents", children_count: "Nombre d'enfants", infants_count: "Nombre de bébés",
      accommodation_type: "Type d'hébergement", agency_name: "Nom de l'agence", agent_name: "Nom de l'agent",
      client_name: "Nom du client", interest_monuments: "Intérêt : Monuments", interest_temples: "Intérêt : Temples",
      interest_nature: "Intérêt : Nature", interest_beach: "Intérêt : Plage", interest_adventure: "Intérêt : Aventure",
      interest_hiking: "Intérêt : Randonnée", couple: "Couple", honeymoon: "Lune de miel", family: "Famille", group: "Groupe",
      standard: "Standard", superior: "Supérieur", luxury: "Luxe", driverEnglish: "Chauffeur anglophone",
      driverSpanish: "Chauffeur hispanophone", guideSpanish: "Guide hispanophone", yes: "Oui"
    }
  },
  de: {
    brandName: "Sri Lanka Eden Reisen",
    receivedMsg: (title, brandName) => `Sie haben eine neue <strong>${title}</strong> von <strong>${brandName}</strong> erhalten. Nachfolgend finden Sie die übermittelten Details:`,
    automatedMsg: "Dies ist eine automatische Nachricht, die von Ihrer Voyage Eden Website gesendet wurde. <br>Bitte antworten Sie direkt auf diese E-Mail, um den Absender zu kontaktieren.",
    keys: {
      fullName: "Vollständiger Name", full_name: "Vollständiger Name",
      whatsapp: "WhatsApp", whatsapp_number: "WhatsApp",
      nationality: "Nationalität", email: "E-Mail", user_email: "E-Mail",
      whoWith: "Reist mit", whereAt: "Planungsphase", planeTickets: "Hat Flugtickets",
      numTravelers: "Anzahl der Reisenden", num_travelers: "Anzahl der Reisenden",
      adults: "Erwachsene", teens: "Jugendliche", children: "Kinder", infants: "Kleinkinder",
      numDays: "Anzahl der Tage", num_days: "Anzahl der Tage",
      arrivalDate: "Ankunftsdatum", arrival_date: "Ankunftsdatum",
      departureDate: "Abreisedatum", departure_date: "Abreisedatum",
      interests: "Interessen", accommodation: "Unterkunft", hotel_category: "Unterkunft",
      singleRooms: "Einzelzimmer", doubleRooms: "Doppelzimmer", tripleRooms: "Dreibettzimmer",
      room_distribution: "Zimmeraufteilung", mealPlan: "Verpflegungsplan", meal_plan: "Verpflegungsplan",
      accompaniment: "Begleitung", chauffeur_language: "Fahrersprache",
      langPref: "Sprachpräferenz", otherLanguage: "Andere Sprache",
      comments: "Kommentare", special_requirements: "Spezielle Anforderungen", tour_name: "Tourname",
      group_composition: "Gruppenzusammensetzung", adults_count: "Anzahl Erwachsene",
      teens_count: "Anzahl Jugendliche", children_count: "Anzahl Kinder", infants_count: "Anzahl Kleinkinder",
      accommodation_type: "Unterkunftsart", agency_name: "Name der Agentur", agent_name: "Name des Agenten",
      client_name: "Name des Kunden", interest_monuments: "Interesse: Denkmäler", interest_temples: "Interesse: Tempel",
      interest_nature: "Interesse: Natur", interest_beach: "Interesse: Strand", interest_adventure: "Interesse: Abenteuer",
      interest_hiking: "Interesse: Wandern", couple: "Paar", honeymoon: "Flitterwochen", family: "Familie", group: "Gruppe",
      standard: "Standard", superior: "Superior", luxury: "Luxus", driverEnglish: "Englischsprachiger Fahrer",
      driverSpanish: "Spanischsprachiger Fahrer", guideSpanish: "Spanischsprachiger Guide", yes: "Ja"
    }
  },
  it: {
    brandName: "Sri Lanka Viaggi Eden",
    receivedMsg: (title, brandName) => `Hai ricevuto una nuova <strong>${title}</strong> da <strong>${brandName}</strong>. Di seguito sono riportati i dettagli inviati:`,
    automatedMsg: "Questo è un messaggio automatico inviato dal tuo sito web Voyage Eden. <br>Si prega di rispondere direttamente a questa e-mail per contattare il mittente.",
    keys: {
      fullName: "Nome completo", full_name: "Nome completo",
      whatsapp: "WhatsApp", whatsapp_number: "WhatsApp",
      nationality: "Nazionalità", email: "E-mail", user_email: "E-mail",
      whoWith: "In viaggio con", whereAt: "Fase di pianificazione", planeTickets: "Ha i biglietti aerei",
      numTravelers: "N. di viaggiatori", num_travelers: "N. di viaggiatori",
      adults: "Adulti", teens: "Adolescenti", children: "Bambini", infants: "Neonati",
      numDays: "N. di giorni", num_days: "N. di giorni",
      arrivalDate: "Data di arrivo", arrival_date: "Data di arrivo",
      departureDate: "Data di partenza", departure_date: "Data di partenza",
      interests: "Interessi", accommodation: "Alloggio", hotel_category: "Alloggio",
      singleRooms: "Camere singole", doubleRooms: "Camere doppie", tripleRooms: "Camere triple",
      room_distribution: "Distribuzione camere", mealPlan: "Piano pasti", meal_plan: "Piano pasti",
      accompaniment: "Accompagnamento", chauffeur_language: "Lingua autista",
      langPref: "Preferenza lingua", otherLanguage: "Altra lingua",
      comments: "Commenti", special_requirements: "Requisiti speciali", tour_name: "Nome del tour",
      group_composition: "Composizione del gruppo", adults_count: "N. di adulti",
      teens_count: "N. di adolescenti", children_count: "N. di bambini", infants_count: "N. di neonati",
      accommodation_type: "Tipo di alloggio", agency_name: "Nome dell'agenzia", agent_name: "Nome dell'agente",
      client_name: "Nome del cliente", interest_monuments: "Interesse: Monumenti", interest_temples: "Interesse: Templi",
      interest_nature: "Interesse: Natura", interest_beach: "Interesse: Spiaggia", interest_adventure: "Interesse: Avventura",
      interest_hiking: "Interesse: Trekking", couple: "Coppia", honeymoon: "Luna di miele", family: "Famiglia", group: "Gruppo",
      standard: "Standard (circa 3 stelle)", superior: "Superior (circa 4/5 stelle)", luxury: "Hotel di lusso", superLuxury: "Super Lusso", driverEnglish: "Autista che parla inglese",
      driverSpanish: "Con autista-accompagnatore di lingua italiana (con supplemento)", guideSpanish: "Con guida ufficiale di lingua italiana (con supplemento)", yes: "Sì", no: "No",
      bb: "AC – Alloggio e colazione", hb: "MP – Mezza pensione", fb: "PC – Pensione completa",
      info: "Sto cercando informazioni", organize: "Sto iniziando a organizzare",
      driver: "Autista turistico", chauffeur: "Autista-guida", nationalGuide: "Guida Nazionale",
      monuments: "Monumenti", temples: "Templi", nature: "Natura", beach: "Spiaggia", adventure: "Avventura", hiking: "Trekking"
    }
  }
};

export const generateEmailTemplate = (title, formDataObj, lang = 'en') => {
  const language = lang.toLowerCase().split('-')[0];
  const t = translations[language] || translations['en'];
  
  const translatedTitle = getTranslatedTitle(title, language);

  // Convert to array of entries. Handles both FormData and plain objects.
  const entries = formDataObj instanceof FormData 
    ? Array.from(formDataObj.entries()) 
    : Object.entries(formDataObj);
  
  // Helper to format keys if not found in translations
  const formatKey = (key) => {
    if (t.keys[key]) return t.keys[key];
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper to format values
  const formatValue = (val) => {
    if (typeof val === 'string' && t.keys[val]) return t.keys[val];
    return val;
  };

  let rowsHtml = '';
  for (let [key, value] of entries) {
    if (!value || value.toString().trim() === '') continue;
    // Skip hidden or internal fields if needed, e.g. agent_email
    if (key === 'agent_email') continue;
    
    // Format array values (like interests) and translate individual values
    const displayValue = Array.isArray(value) 
      ? value.map(v => formatValue(v)).join(', ') 
      : formatValue(value);
    
    rowsHtml += `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e406f; width: 40%; vertical-align: top;">${formatKey(key)}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; color: #334155; vertical-align: top; white-space: pre-wrap;">${displayValue}</td>
      </tr>
    `;
  }

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
      <div style="background-color: #1e406f; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;">${t.brandName}</h1>
        <p style="color: #bae6fd; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">${translatedTitle}</p>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <p style="margin-top: 0; margin-bottom: 25px; color: #475569; font-size: 16px; line-height: 1.6;">
          ${t.receivedMsg(translatedTitle, t.brandName)}
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 15px; text-align: left; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #64748b; font-size: 13px;">
          ${t.automatedMsg}
        </p>
      </div>
    </div>
  `;
};

export const getAgentEmail = (language) => {
  const currentLang = language?.split('-')[0] || 'fr';
  let agentEmail = import.meta.env.VITE_AGENT_EMAIL_FR;
  if (currentLang === 'en') agentEmail = import.meta.env.VITE_AGENT_EMAIL_EN;
  else if (currentLang === 'de') agentEmail = import.meta.env.VITE_AGENT_EMAIL_DE;
  else if (currentLang === 'es') agentEmail = import.meta.env.VITE_AGENT_EMAIL_ES;
  else if (currentLang === 'it') agentEmail = import.meta.env.VITE_AGENT_EMAIL_IT;
  
  if (!agentEmail) {
    agentEmail = import.meta.env.VITE_AGENT_EMAIL || "info@voyageeden.com";
  }
  return agentEmail.split(',').map(e => e.trim());
};

export const getBrandName = (language = 'en') => {
  const langCode = language.toLowerCase().split('-')[0];
  const t = translations[langCode] || translations['en'];
  return t.brandName;
};
