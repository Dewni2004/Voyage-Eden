import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const BookingModal = ({ isOpen, onClose, itineraryTitle }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: '', text: '' });

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  const inputClass = "w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400";
  const labelClass = "block text-[11px] font-bold text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Blurred overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in border border-primary/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="pt-6 pb-4 px-6 md:px-10 text-center border-b border-gray-100 flex-shrink-0">
          <h2 className="text-primary text-xl md:text-2xl font-bold font-serif">Demander un devis</h2>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 md:px-10 overflow-y-auto hide-scrollbar">
          
          {messageStatus.text && (
            <div className={`p-4 rounded-xl text-sm font-bold mb-6 ${messageStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
              {messageStatus.text}
            </div>
          )}

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Nom du circuit / itinéraire</label>
                <input type="text" name="tour_name" defaultValue={itineraryTitle} readOnly className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`} />
              </div>
              <div>
                <label className={labelClass}>Nom complet</label>
                <input type="text" name="full_name" required placeholder="Nom complet" className={inputClass} />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Numéro de téléphone</label>
                <input type="tel" name="phone_number" required placeholder="Ex: +33 6 12 34 56 78" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nationalité (Passeport)</label>
                <select name="nationality" required className={inputClass}>
                  <option value="" disabled selected>Sélectionner...</option>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Nombre de jours</label>
                <input type="number" name="num_days" min="1" required placeholder="7" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Catégorie d'hôtel souhaitée</label>
                <select name="hotel_category" required className={inputClass}>
                  <option value="" disabled selected>Sélectionner...</option>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Préférence de repas</label>
                <select name="meal_plan" required className={inputClass}>
                  <option value="" disabled selected>Sélectionner...</option>
                  <option value="Petit-déjeuner uniquement">Petit-déjeuner uniquement</option>
                  <option value="Demi-pension">Demi-pension</option>
                  <option value="Pension complète">Pension complète</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Langue souhaitée pour le chauffeur</label>
                <select name="chauffeur_language" required className={inputClass}>
                  <option value="" disabled selected>Sélectionner...</option>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <div className="pt-4 border-t border-gray-100 flex justify-start">
              <button 
                type="submit"
                disabled={isSending}
                className="border border-primary bg-transparent text-primary hover:bg-primary hover:text-white font-bold py-2.5 px-10 rounded-full text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Envoi...
                  </>
                ) : 'ENVOYER'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
