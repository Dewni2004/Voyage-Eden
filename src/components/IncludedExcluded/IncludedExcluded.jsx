import React from 'react';

const IncludedExcluded = () => {
  const inclusions = [
    "Hébergement à l'hôtel (selon le forfait sélectionné)",
    "Petit-déjeuner et dîner aux hôtels",
    "Véhicule privé climatisé",
    "Chauffeur-guide professionnel",
    "Transferts aéroport",
    "Essence, taxe routière, taxes gouvernementales, parking et assurance du véhicule"
  ];

  const exclusions = [
    "Vols internationaux",
    "Frais d'entrée aux attractions",
    "Excursions optionnelles et dépenses personnelles",
    "Pourboires, boissons alcoolisées ou boissons gazeuses",
    "Frais de visa pour le Sri Lanka"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">Ce qui est inclus et exclu</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Price Includes */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-black">Le prix comprend</h3>
          <ul className="space-y-5">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#769d7a] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-700 font-medium text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Excludes */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-black">Le prix ne comprend pas</h3>
          <ul className="space-y-5">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#b02a30] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-700 font-medium text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IncludedExcluded;
