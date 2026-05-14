import React from 'react';

const PaymentPolicy = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">Méthode de paiement et politique d'annulation</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner space-y-12">
        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Méthode de paiement :</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Option de virement bancaire sans frais.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Paiement par carte de crédit/débit – Des frais de traitement de carte de 2 % s'appliqueront.</span>
            </li>
          </ul>
        </div>

        {/* Booking Terms */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Conditions de réservation</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Un acompte de 40 % est requis au moment de la réservation pour confirmer votre séjour.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Le solde restant de 60 % doit être payé au plus tard 30 jours avant l'arrivée.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Dès réception de l'acompte, un reçu de confirmation sera émis. Une facture officielle suivra lors du paiement complet.</span>
            </li>
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Politique d'annulation</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Jusqu'à 45 jours : 100 % de l'acompte remboursé.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">De 44 à 31 jours : pénalité de 50 % sur l'acompte.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Moins de 30 jours : l'acompte est non remboursable.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Remarque : Toutes les annulations sont soumises à des frais administratifs de 120 € par personne.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PaymentPolicy;
