import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SectionIcon = ({ d }) => (
  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-md">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
    </svg>
  </div>
);

const BookingForm = ({ itineraryTitle }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: '', text: '' });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const numDays = (startDate && endDate) 
    ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 
    : '';

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessageStatus({ type: '', text: '' });

    // Validate that dates are selected
    if (!startDate || !endDate) {
      setMessageStatus({ 
        type: 'error', 
        text: 'Veuillez sélectionner vos dates d\'arrivée et de départ.' 
      });
      setIsSending(false);
      return;
    }

    const SERVICE_ID = "service_xxxxxx"; 
    const TEMPLATE_ID = "template_xxxxxx";
    const PUBLIC_KEY = "xxxxxxxxxxxx";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setMessageStatus({ 
            type: 'success', 
            text: 'Merci ! Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.' 
          });
          form.current.reset();
          setDateRange([null, null]);
      }, (error) => {
          setMessageStatus({ 
            type: 'error', 
            text: "Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter directement." 
          });
          console.error('EmailJS Error:', error);
      })
      .finally(() => setIsSending(false));
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm";
  const labelClass = "block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider";

  return (
    <section id="booking-form" className="max-w-7xl mx-auto px-6 py-16">
      <style dangerouslySetInnerHTML={{__html: `
        .react-datepicker-wrapper { width: 100%; }
        .react-datepicker__input-container input { width: 100%; }
      `}} />
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 lg:p-16 border border-gray-100 relative overflow-hidden">
        
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="text-center mb-16 relative z-10">
          <span className="text-luxury text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Votre voyage sur mesure</span>
          <h2 className="text-primary text-4xl md:text-5xl font-bold font-serif mb-4">Demander un devis</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Remplissez ce formulaire détaillé et laissez-nous concevoir l'escapade parfaite pour vous au Sri Lanka.
          </p>
        </div>

        {messageStatus.text && (
          <div className={`p-4 rounded-2xl text-sm font-bold mb-10 text-center shadow-sm relative z-10 ${messageStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {messageStatus.text}
          </div>
        )}

        <form ref={form} onSubmit={sendEmail} className="space-y-10 relative z-10">
          
          {/* Hidden inputs for DateRange to pass to EmailJS */}
          <input type="hidden" name="arrival_date" value={startDate ? startDate.toLocaleDateString('fr-FR') : ''} />
          <input type="hidden" name="departure_date" value={endDate ? endDate.toLocaleDateString('fr-FR') : ''} />

          {/* Section 1: Informations Personnelles */}
          <div className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center gap-5">
              <SectionIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">Informations Personnelles</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Vos coordonnées pour vous recontacter</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Nom complet</label>
                <input type="text" name="full_name" required placeholder="Votre nom complet" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Numéro Whatsapp</label>
                <input type="tel" name="whatsapp_number" required placeholder="Ex: +33 6 12 34 56 78" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nationalité</label>
                <input 
                  type="text" 
                  name="nationality" 
                  list="nationalities" 
                  required 
                  placeholder="Tapez ou sélectionnez..." 
                  className={inputClass} 
                  autoComplete="off"
                />
                <datalist id="nationalities">
                  <option value="France" />
                  <option value="Belgique" />
                  <option value="Suisse" />
                  <option value="Canada" />
                  <option value="Royaume-Uni" />
                  <option value="Allemagne" />
                </datalist>
              </div>
            </div>
          </div>

          {/* Section 2: Détails du Voyage */}
          <div className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center gap-5">
              <SectionIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">Détails du Voyage</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Dates et nombre de participants</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Nom du circuit / itinéraire</label>
                <input type="text" name="tour_name" defaultValue={itineraryTitle} readOnly className={`${inputClass} bg-gray-100 text-gray-500 font-medium cursor-not-allowed`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Dates d'arrivée et de départ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    isClearable={true}
                    placeholderText="Sélectionnez la période"
                    className={`${inputClass} pl-11`}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Nombre de jours</label>
                <input 
                  type="text" 
                  name="num_days" 
                  value={numDays ? `${numDays} jours` : ''} 
                  readOnly 
                  className={`${inputClass} bg-gray-100 text-gray-500 font-medium cursor-not-allowed`} 
                  placeholder="Auto-calculé" 
                />
              </div>
              <div>
                <label className={labelClass}>Nombre de voyageurs</label>
                <input type="number" name="num_travelers" min="1" required placeholder="Ex: 2" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Section 3: Hébergement & Logistique */}
          <div className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center gap-5">
              <SectionIcon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">Hébergement & Logistique</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Vos préférences de séjour</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className={labelClass}>Catégorie d'hôtel souhaitée</label>
                <select name="hotel_category" required className={inputClass} defaultValue="">
                  <option value="" disabled>Sélectionner...</option>
                  <option value="3 Étoiles">3 Étoiles</option>
                  <option value="4 Étoiles">4 Étoiles</option>
                  <option value="5 Étoiles">5 Étoiles</option>
                  <option value="Boutique Hôtel">Boutique Hôtel</option>
                  <option value="Mixte">Mixte</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Répartition des chambres</label>
                <input type="text" name="room_distribution" required placeholder="Ex: 1 Double, 2 Simples" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Préférence de repas (Meal Plan)</label>
                <select name="meal_plan" required className={inputClass} defaultValue="">
                  <option value="" disabled>Sélectionner...</option>
                  <option value="BB - Bed & Breakfast">BB - Bed & Breakfast</option>
                  <option value="HB - Breakfast & Dinner">HB - Breakfast & Dinner</option>
                  <option value="FB - Breakfast + Lunch + Dinner">FB - Breakfast + Lunch + Dinner</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Langue du chauffeur</label>
                <select name="chauffeur_language" required className={inputClass} defaultValue="">
                  <option value="" disabled>Sélectionner...</option>
                  <option value="Francophone">Francophone</option>
                  <option value="Anglophone">Anglophone</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Exigences particulières (Optionnel)</label>
                <textarea 
                  name="special_requirements" 
                  rows="4"
                  className={`${inputClass} resize-none`}
                  placeholder="Avez-vous des allergies, des besoins d'accessibilité, ou célébrez-vous une occasion spéciale ?"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer / Submit */}
          <div className="pt-8 flex justify-center">
            <button 
              type="submit"
              disabled={isSending}
              className="btn-premium-primary py-5 px-14 rounded-full text-base md:text-lg font-bold w-full md:w-auto shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  ENVOYER MA DEMANDE
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
