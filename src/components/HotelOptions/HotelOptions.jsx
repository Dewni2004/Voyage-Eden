import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';

import standardImg from '../../assets/standard.png';
import superiorImg from '../../assets/superior.jpg';
import luxuryImg from '../../assets/luxury.webp';
import superLuxuryImg from '../../assets/super luxury.jfif';
import eastCoastImg from '../../assets/east coast.webp';

const HotelOptions = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'fr';

  const categories = [
    { 
      id: 'standard', 
      title: "standard", 
      subtitle: 'Authentique & Agréable',
      description: 'Des hébergements confortables avec un excellent rapport qualité-prix.',
      image: standardImg
    },
    { 
      id: 'superior', 
      title: "superior", 
      subtitle: 'Confort Premium',
      description: 'Une alliance parfaite entre authenticité et confort moderne.',
      image: superiorImg
    },
    { 
      id: 'luxury', 
      title: "luxury", 
      subtitle: 'Expériences Inoubliables',
      description: 'Découvrez le raffinement avec notre sélection des hôtels les plus prestigieux.',
      image: luxuryImg
    },
    { 
      id: 'super-luxury', 
      title: "superLuxury", 
      subtitle: 'Le Sommet de l\'Élégance',
      description: 'Des établissements d\'exception offrant un service et des prestations hors normes.',
      image: superLuxuryImg
    },
    { 
      id: 'east-south-coast', 
      title: "eastSouthCoast", 
      subtitle: 'Merveilles Côtières',
      description: 'Découvrez les plus beaux resorts le long de la magnifique côte du Sri Lanka.',
      image: eastCoastImg
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-luxury text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3 block">{t("hotelOptions.sectionTag")}</span>
        <h2 className="text-primary text-3xl md:text-5xl font-bold font-serif mb-6">{t("hotelOptions.sectionTitle")}</h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">{t("hotelOptions.sectionDesc")}</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 w-full">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => navigate(`/${lang}/hotels/${cat.id}`)}
            className="group relative h-[300px] md:h-[350px] lg:h-[400px] xl:h-[420px] rounded-[32px] overflow-hidden cursor-pointer shadow-xl border border-gray-100"
          >
            <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
              <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {t(`hotelOptions.categories.${cat.title}.subtitle`)}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-serif mb-2 leading-tight">{t(`hotelOptions.categories.${cat.title}.title`)}</h3>
              <p className="text-white/80 text-xs md:text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                {t(`hotelOptions.categories.${cat.title}.description`)}
              </p>
              
              <div className="flex items-center gap-2 text-white font-bold text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                {t("hotelOptions.discoverBtn")}
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelOptions;
