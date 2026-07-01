import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import heroImage from '../../assets/hero-image.webp';

const Hero = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[#0a192f]"
        style={{
          backgroundImage: `url("${heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center text-white mt-16">
        <h1 className="home-hero-title max-w-4xl mx-auto mb-6 text-[32px] sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
          {t('hero.welcome')} <br />
          <span className="text-[#c5a059]">{t('hero.brandName')}</span>
        </h1>

        <p className="text-sm md:text-xl max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed font-light">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button 
            onClick={() => navigate(`/${i18n.language}/itineraires`)}
            className="w-full sm:w-auto border border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all duration-300 transform active:scale-95 px-8 md:px-10 py-3 md:py-3.5 rounded-full text-base md:text-lg font-semibold"
          >
            {t('hero.explore')}
          </button>
          <button 
            onClick={() => navigate(`/${i18n.language}/contact`)}
            className="w-full sm:w-auto border border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all duration-300 transform active:scale-95 px-8 md:px-10 py-3 md:py-3.5 rounded-full text-base md:text-lg font-semibold"
          >
            {t('hero.contact')}
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
