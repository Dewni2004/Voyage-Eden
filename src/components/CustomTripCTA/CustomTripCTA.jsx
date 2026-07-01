import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/custom-trip-bg.webp';

const CustomTripCTA = ({ 
  title = "CONCEVEZ VOTRE ITINÉRAIRE DE RÊVE AVEC NOUS", 
  subtitle = "Simplement en remplissant un formulaire. Sans frais supplémentaires.", 
  buttonText = "Créez votre voyage personnalisé",
  buttonLink = "/contact"
}) => {
  return (
    <section className="py-10 md:py-12 px-4 md:px-8 max-w-[90rem] mx-auto">
      <div className="relative rounded-[32px] overflow-hidden shadow-2xl group">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={bgImage} 
            alt="Sri Lanka Custom Trip" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-luxury/60"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 px-6 py-10 md:py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-white mb-3 leading-tight drop-shadow-md">
              {title}
            </h2>
            <p className="text-gray-100 text-base md:text-lg font-medium drop-shadow-sm opacity-90">
              {subtitle}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link 
              to={buttonLink} 
              className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full text-sm md:text-base font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {buttonText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomTripCTA;
