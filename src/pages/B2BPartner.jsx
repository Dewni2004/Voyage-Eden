import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { generateEmailTemplate, getAgentEmail } from '../utils/emailTemplate';
import PageHero from '../components/UI/PageHero';
import officeStaff2 from '../assets/Office - staff 2.webp';

const localTranslations = {
  es: {
    title: "Diseñar viajes a medida – Para Agencias Afiliadas",
    subtitle: "Completa este formulario detallado para solicitar un presupuesto a medida para tus clientes.",
    groupComposition: "¿Composición del grupo? *",
    couple: "En pareja",
    honeymoon: "Luna de Miel",
    family: "En familia",
    group: "En un grupo",
    numTravelers: "¿Número de viajeros? *",
    adults: "Nº Adultos",
    teens: "Jóvenes < 16 años",
    children: "Niños < 11 años",
    infants: "Bebés < 2 años",
    numDays: "Número de días *",
    departureDate: "Fecha de salida aproximada *",
    interests: "Intereses del cliente (Varias opciones son posibles)",
    monuments: "Monumentos",
    temples: "Templos",
    nature: "Naturaleza / Vida animal",
    beach: "Playa",
    adventure: "Aventura",
    hiking: "Senderismo",
    accommodationType: "Tipo de alojamiento *",
    standard: "Standard (3 estrellas aprox.)",
    superior: "Superior (4/5 estrellas aprox.)",
    luxury: "Hoteles de Lujo (Hoteles Boutique etc..)",
    accompaniment: "Acompañamiento *",
    driverEnglish: "Conductor habla inglesa",
    driverSpanish: "Con un conductor acompañante que hable español (Este servicio tiene suplemento)",
    guideSpanish: "Con un guía oficial español (Este servicio tiene suplemento)",
    agencyName: "Nombre de la Agencia *",
    agentName: "Nombre del Agente *",
    clientName: "Nombre y Apellido del Cliente",
    whatsapp: "WhatsApp *",
    email: "Email *",
    comments: "Comentarios o requerimientos especiales del cliente",
    commentsPlaceholder: "Vacaciones, Viaje de fotografía, Ornitología, Trekking etc...",
    submit: "ENVIAR",
    sending: "Enviando...",
    success: "¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.",
    error: "Ocurrió un error. Por favor, inténtelo de nuevo o contáctenos por WhatsApp."
  },
  en: {
    title: "Design Tailor-Made Trips – For Affiliated Agencies",
    subtitle: "Complete this detailed form to request a custom quote for your clients.",
    groupComposition: "Group composition? *",
    couple: "As a couple",
    honeymoon: "Honeymoon",
    family: "As a family",
    group: "In a group",
    numTravelers: "Number of travelers? *",
    adults: "No. of Adults",
    teens: "Teens < 16 years",
    children: "Children < 11 years",
    infants: "Infants < 2 years",
    numDays: "Number of days *",
    departureDate: "Approximate departure date *",
    interests: "Client interests (Multiple options possible)",
    monuments: "Monuments",
    temples: "Temples",
    nature: "Nature / Wildlife",
    beach: "Beach",
    adventure: "Adventure",
    hiking: "Hiking",
    accommodationType: "Preferred accommodation type *",
    standard: "Standard (approx. 3 stars)",
    superior: "Superior (approx. 4/5 stars)",
    luxury: "Luxury Hotels (Boutique hotels, etc.)",
    accompaniment: "Guidance / Support *",
    driverEnglish: "English-speaking driver",
    driverSpanish: "With a Spanish-speaking escort driver (Surcharge applies)",
    guideSpanish: "With an official Spanish-speaking guide (Surcharge applies)",
    agencyName: "Agency Name *",
    agentName: "Agent Name *",
    clientName: "Client's First and Last Name",
    whatsapp: "WhatsApp *",
    email: "Email *",
    comments: "Client's comments or special requirements",
    commentsPlaceholder: "Vacation, photography trip, bird watching, trekking, etc...",
    submit: "SEND",
    sending: "Sending...",
    success: "Your request has been successfully submitted! We will contact you soon.",
    error: "An error occurred. Please try again or contact us via WhatsApp."
  },
  fr: {
    title: "Concevoir des Voyages sur Mesure – Pour les Agences Affiliées",
    subtitle: "Remplissez ce formulaire détaillé pour demander un devis sur mesure pour vos clients.",
    groupComposition: "Composition du groupe? *",
    couple: "En couple",
    honeymoon: "Lune de miel",
    family: "En famille",
    group: "En groupe",
    numTravelers: "Nombre de voyageurs? *",
    adults: "Nb Adultes",
    teens: "Adolescents < 16 ans",
    children: "Enfants < 11 ans",
    infants: "Bébés < 2 ans",
    numDays: "Nombre de jours *",
    departureDate: "Date de départ approximative *",
    interests: "Intérêts du client (Plusieurs options possibles)",
    monuments: "Monuments",
    temples: "Temples",
    nature: "Nature / Faune sauvage",
    beach: "Plage",
    adventure: "Aventure",
    hiking: "Randonnée",
    accommodationType: "Catégorie d'hébergement souhaitée *",
    standard: "Standard (approx. 3 étoiles)",
    superior: "Supérieur (approx. 4/5 étoiles)",
    luxury: "Hôtels de Luxe (Hôtels Boutique, etc.)",
    accompaniment: "Accompagnement *",
    driverEnglish: "Chauffeur anglophone",
    driverSpanish: "Chauffeur accompagnateur hispanophone (Supplément applicable)",
    guideSpanish: "Guide officiel hispanophone (Supplément applicable)",
    agencyName: "Nom de l'Agence *",
    agentName: "Nom de l'Agent *",
    clientName: "Nom et Prénom du Client",
    whatsapp: "WhatsApp *",
    email: "Email *",
    comments: "Commentaires ou exigences particulières du client",
    commentsPlaceholder: "Vacances, voyage photo, observation des oiseaux, trekking, etc...",
    submit: "ENVIAR",
    sending: "Envoi en cours...",
    success: "Votre demande a été envoyée avec succès! Nous vous contacterons bientôt.",
    error: "Une erreur est survenue. Veuillez réessayer ou nous contacter par WhatsApp."
  },
  it: {
    title: "Crea Viaggi su Misura – Per Agenzie Affiliate",
    subtitle: "Compila questo modulo dettagliato per richiedere un preventivo personalizzato per i tuoi clienti.",
    groupComposition: "Composizione del gruppo? *",
    couple: "In coppia",
    honeymoon: "Luna di miele",
    family: "In famiglia",
    group: "In gruppo",
    numTravelers: "Numero di viaggiatori? *",
    adults: "N. Adulti",
    teens: "Ragazzi < 16 anni",
    children: "Bambini < 11 anni",
    infants: "Neonati < 2 anni",
    numDays: "Numero di giorni *",
    departureDate: "Data di partenza approssimativa *",
    interests: "Interessi del cliente (Sono possibili più opzioni)",
    monuments: "Monumenti",
    temples: "Templi",
    nature: "Natura / Fauna selvatica",
    beach: "Spiaggia",
    adventure: "Avventura",
    hiking: "Trekking",
    accommodationType: "Tipo di alloggio preferito *",
    standard: "Standard (circa 3 stelle)",
    superior: "Superior (circa 4/5 stelle)",
    luxury: "Hotel di Lusso (Boutique hotel, ecc.)",
    accompaniment: "Accompagnamento *",
    driverEnglish: "Autista parlante inglese",
    driverSpanish: "Con autista accompagnatore parlante spagnolo (Con supplemento)",
    guideSpanish: "Con guida ufficiale parlante spagnolo (Con supplemento)",
    agencyName: "Nome dell'Agenzia *",
    agentName: "Nome dell'Agente *",
    clientName: "Nome e Cognome del Cliente",
    whatsapp: "WhatsApp *",
    email: "Email *",
    comments: "Commenti o requisiti speciali del cliente",
    commentsPlaceholder: "Vacanze, viaggio fotografico, bird watching, trekking, ecc...",
    submit: "INVIA",
    sending: "Invio...",
    success: "La tua richiesta è stata inviata con successo! Ti contatteremo presto.",
    error: "Si è verificato un errore. Riprova o contattaci su WhatsApp."
  },
  de: {
    title: "Maßgeschneiderte Reisen – Für Partner-Agenturen",
    subtitle: "Füllen Sie dieses detaillierte Formular aus, um ein individuelles Angebot für Ihre Kunden anzufordern.",
    groupComposition: "Zusammensetzung der Gruppe? *",
    couple: "Als Paar",
    honeymoon: "Flitterwochen",
    family: "Als Familie",
    group: "In einer Gruppe",
    numTravelers: "Anzahl der Reisenden? *",
    adults: "Anzahl Erwachsene",
    teens: "Jugendliche < 16 Jahre",
    children: "Kinder < 11 Jahre",
    infants: "Babys < 2 Jahre",
    numDays: "Anzahl der Tage *",
    departureDate: "Ungefähres Abreisedatum *",
    interests: "Kundeninteressen (Mehrere Optionen möglich)",
    monuments: "Denkmäler",
    temples: "Tempel",
    nature: "Natur / Tierwelt",
    beach: "Strand",
    adventure: "Abenteuer",
    hiking: "Wandern",
    accommodationType: "Bevorzugte Unterkunftsart *",
    standard: "Standard (ca. 3 Sterne)",
    superior: "Superior (ca. 4/5 Sterne)",
    luxury: "Luxushotels (Boutique-Hotels usw.)",
    accompaniment: "Begleitung *",
    driverEnglish: "Englischsprachiger Fahrer",
    driverSpanish: "Mit spanischsprachigem Begleitfahrer (Gegen Aufpreis)",
    guideSpanish: "Mit offiziellem spanischsprachigen Guide (Gegen Aufpreis)",
    agencyName: "Name der Agentur *",
    agentName: "Name des Agenten *",
    clientName: "Vor- und Nachname des Kunden",
    whatsapp: "WhatsApp *",
    email: "E-Mail *",
    comments: "Kommentare oder besondere Wünsche des Kunden",
    commentsPlaceholder: "Urlaub, Fotoreise, Vogelbeobachtung, Trekking usw...",
    submit: "SENDEN",
    sending: "Wird gesendet...",
    success: "Ihre Anfrage wurde erfolgreich übermittelt! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.",
    error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns über WhatsApp."
  }
};

const B2BPartner = () => {
  const formRef = useRef();
  const { i18n } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: '', text: '' });
  const [counts, setCounts] = useState({
    adults_count: 0,
    teens_count: 0,
    children_count: 0,
    infants_count: 0
  });

  const updateCount = (key, delta) => {
    setCounts(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const lang = ['fr', 'en', 'de', 'es', 'it'].includes(i18n.language) ? i18n.language : 'es';
  const text = localTranslations[lang] || localTranslations.es;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessageStatus({ type: '', text: '' });

    try {
      const formData = new FormData(formRef.current);
      const htmlContent = generateEmailTemplate('New B2B Partner Request', formData, i18n.language);

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: getAgentEmail(i18n.language), 
          reply_to: formData.get('email'),
          subject: `[${i18n.language.toUpperCase()}] New B2B Partner Request`,
          html: htmlContent
        }
      });

      if (error) throw error;

      setMessageStatus({
        type: 'success',
        text: text.success
      });
      formRef.current.reset();
      setCounts({
        adults_count: 0,
        teens_count: 0,
        children_count: 0,
        infants_count: 0
      });
    } catch (error) {
      console.error('Edge Function Error:', error);
      setMessageStatus({
        type: 'error',
        text: text.error
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <PageHero
        title={text.title}
        description={text.subtitle}
        image={officeStaff2}
        overlayOpacity="bg-black/60"
        bgPosition="object-[center_20%]"
      />

      <div className="py-12 md:py-16 bg-[#f8fbff]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="bg-white p-6 sm:p-12 rounded-[32px] sm:rounded-[40px] shadow-xl border border-gray-100">
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {messageStatus.text && (
                <div className={`p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-500 ${messageStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                  {messageStatus.text}
                </div>
              )}

              {/* Group Composition */}
              <div className="space-y-3">
                <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.groupComposition}</label>
                <div className="flex flex-wrap gap-4 sm:gap-6 ml-1">
                  {['couple', 'honeymoon', 'family', 'group'].map((comp) => (
                    <label key={comp} className="inline-flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="group_composition"
                        value={comp}
                        required
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 focus:ring-primary/50 mr-2"
                      />
                      {text[comp]}
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.numTravelers}</label>
                  <input
                    name="num_travelers"
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>

                {/* Sub-traveler categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-1">
                  {[
                    { key: 'adults', name: 'adults_count' },
                    { key: 'teens', name: 'teens_count' },
                    { key: 'children', name: 'children_count' },
                    { key: 'infants', name: 'infants_count' }
                  ].map((cat) => (
                    <div key={cat.key} className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 ml-1 block">{text[cat.key]}</label>
                      <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-1.5 flex items-center justify-between h-[48px]">
                        <button
                          type="button"
                          onClick={() => updateCount(cat.name, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all font-bold text-base select-none"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold text-gray-800 w-8 text-center select-none">
                          {counts[cat.name]}
                        </span>
                        <input
                          type="hidden"
                          name={cat.name}
                          value={counts[cat.name]}
                        />
                        <button
                          type="button"
                          onClick={() => updateCount(cat.name, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all font-bold text-base select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Number of Days and Departure Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.numDays}</label>
                  <input
                    name="num_days"
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.departureDate}</label>
                  <input
                    name="departure_date"
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.interests}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-1">
                  {['monuments', 'temples', 'nature', 'beach', 'adventure', 'hiking'].map((interest) => (
                    <label key={interest} className="inline-flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`interest_${interest}`}
                        value="yes"
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded focus:ring-primary/50 mr-2"
                      />
                      {text[interest]}
                    </label>
                  ))}
                </div>
              </div>

              {/* Accommodation Type */}
              <div className="space-y-3">
                <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.accommodationType}</label>
                <div className="flex flex-col gap-3 ml-1">
                  {['standard', 'superior', 'luxury'].map((acc) => (
                    <label key={acc} className="inline-flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="accommodation_type"
                        value={acc}
                        required
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 focus:ring-primary/50 mr-2"
                      />
                      {text[acc]}
                    </label>
                  ))}
                </div>
              </div>

              {/* Accompaniment */}
              <div className="space-y-3">
                <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.accompaniment}</label>
                <div className="flex flex-col gap-3 ml-1">
                  {['driverEnglish', 'driverSpanish', 'guideSpanish'].map((acc) => (
                    <label key={acc} className="inline-flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="accompaniment"
                        value={acc}
                        required
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 focus:ring-primary/50 mr-2"
                      />
                      {text[acc]}
                    </label>
                  ))}
                </div>
              </div>

              {/* Agency Name */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.agencyName}</label>
                <input
                  name="agency_name"
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                />
              </div>

              {/* Agent Name and Client Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.agentName}</label>
                  <input
                    name="agent_name"
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.clientName}</label>
                  <input
                    name="client_name"
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.whatsapp}</label>
                  <input
                    name="whatsapp"
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.email}</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-bold text-primary ml-1 block">{text.comments}</label>
                <textarea
                  name="comments"
                  rows="5"
                  placeholder={text.commentsPlaceholder}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all resize-none text-sm md:text-base"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full md:w-auto btn-premium-primary py-4 px-12 rounded-2xl text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none font-bold"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      {text.sending}
                    </>
                  ) : text.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BPartner;
