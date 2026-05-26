import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const BookingForm = ({ itineraryTitle }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: '', text: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessageStatus({ type: '', text: '' });

    // IMPORTANT: replace these with actual IDs from emailjs.com
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
      }, (error) => {
          setMessageStatus({ 
            type: 'error', 
            text: "Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter directement." 
          });
          console.error('EmailJS Error:', error);
      })
      .finally(() => setIsSending(false));
  };

  const inputClass = "w-full bg-white border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400";
  const labelClass = "block text-xs font-bold text-gray-700 mb-1.5";

  return (
    <section id="booking-form" className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-primary text-3xl md:text-4xl font-bold font-serif mb-4">Demander un devis</h2>
          <p className="text-gray-500 text-sm md:text-base">Remplissez ce formulaire pour recevoir un devis personnalisé pour votre voyage.</p>
        </div>

        {messageStatus.text && (
          <div className={`p-4 rounded-xl text-sm font-bold mb-8 ${messageStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {messageStatus.text}
          </div>
        )}

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nom du circuit / itinéraire</label>
              <input type="text" name="tour_name" defaultValue={itineraryTitle} readOnly className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`} />
            </div>
            <div>
              <label className={labelClass}>Nom complet</label>
              <input type="text" name="full_name" required placeholder="Votre nom complet" className={inputClass} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Numéro de téléphone</label>
              <input type="tel" name="phone_number" required placeholder="Ex: +33 6 12 34 56 78" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nationalité (Passeport)</label>
              <select name="nationality" required className={inputClass} defaultValue="">
                <option value="" disabled>Sélectionner...</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Canada">Canada</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Nombre de voyageurs</label>
              <input type="number" name="num_travelers" min="1" required placeholder="2" className={inputClass} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Nombre de jours</label>
              <input type="number" name="num_days" min="1" required placeholder="7" className={inputClass} />
            </div>
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
              <label className={labelClass}>Date d'arrivée approximative</label>
              <input type="date" name="arrival_date" required className={inputClass} />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Date de départ approximative</label>
              <input type="date" name="departure_date" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nombre de chambres</label>
              <input type="number" name="num_rooms" min="1" required placeholder="1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Répartition des chambres</label>
              <input type="text" name="room_distribution" required placeholder="Ex: 1 Double, 2 Simples" className={inputClass} />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Préférence de repas</label>
              <select name="meal_plan" required className={inputClass} defaultValue="">
                <option value="" disabled>Sélectionner...</option>
                <option value="Petit-déjeuner uniquement">Petit-déjeuner uniquement</option>
                <option value="Demi-pension">Demi-pension</option>
                <option value="Pension complète">Pension complète</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Langue souhaitée pour le chauffeur</label>
              <select name="chauffeur_language" required className={inputClass} defaultValue="">
                <option value="" disabled>Sélectionner...</option>
                <option value="Francophone">Francophone</option>
                <option value="Anglophone">Anglophone</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Activités (Optionnel)</label>
              <input type="text" name="activities" placeholder="Plongée, Safari, etc." className={inputClass} />
            </div>
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Hôtels préférés (Optionnel)</label>
              <input type="text" name="preferred_hotels" placeholder="Noms des hôtels" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Budget approximatif (Optionnel)</label>
              <input type="text" name="budget" placeholder="Ex: 1500€ par personne" className={inputClass} />
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className={labelClass}>Exigences particulières</label>
            <textarea 
              name="special_requirements" 
              rows="4" 
              className={`${inputClass} resize-none`}
              placeholder="Allergies, accessibilité, occasions spéciales..."
            ></textarea>
          </div>

          {/* Footer / Submit */}
          <div className="pt-6 border-t border-gray-100 flex justify-center mt-8">
            <button 
              type="submit"
              disabled={isSending}
              className="btn-premium-primary py-4 px-12 rounded-full text-base w-full md:w-auto shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Envoi...
                </>
              ) : 'ENVOYER MA DEMANDE'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
