import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getLocalizedPath } from '../../utils/routeMap';

const RestaurantBanner = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'fr';

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-6">
        
        {/* Banner Container with Background Image */}
        <div 
          className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center min-h-[250px] md:min-h-[300px] group"
        >
          {/* Background Image with slight zoom effect on hover */}
          <div 
            className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>

          {/* Clean Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            
            <div className="flex-1 text-center md:text-left">
              <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest mb-2 block">
                {t('restaurants.subtitle', 'Gastronomie')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                {t('restaurants.bannerTitle', 'Discover Our Restaurants')}
              </h2>
              <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto md:mx-0 leading-relaxed">
                {t('restaurants.bannerDesc', 'Experience authentic flavors and culinary masterpieces during your journey. Explore our curated selection of dining destinations.')}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Link 
                to={getLocalizedPath('restaurants', i18n.language)} 
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 text-sm md:text-base font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('restaurants.bannerBtn', 'View Restaurants')}
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantBanner;
