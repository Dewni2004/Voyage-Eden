import React from 'react';
import { useTranslation } from 'react-i18next';
import itineraryBanner from '../../assets/Itinerari - Banner.webp';

const ItineraryHero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={itineraryBanner} 
          alt="Sri Lanka Itineraries" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{t("itinerariesPage.heroTitle")}</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">{t("itinerariesPage.heroDesc")}</p>
      </div>
    </section>
  );
};

export default ItineraryHero;
