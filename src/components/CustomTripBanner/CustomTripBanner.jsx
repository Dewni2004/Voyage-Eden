import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/design your itinerary.jpeg';

const CustomTripBanner = () => {
  const { t, i18n } = useTranslation();

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
              backgroundImage: `url('${bannerImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>

          {/* Premium Gradient Overlay: Dark blue to transparent for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128]/90 via-[#0a1128]/60 to-transparent"></div>
          
          {/* Content - No more messy glass box, just clean typography directly on the overlay */}
          <div className="relative z-10 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-serif font-bold text-white mb-0 leading-snug drop-shadow-md whitespace-pre-line">
                {t('banner.title', 'DESIGN YOUR DREAM ITINERARY WITH US')}
              </h2>
            </div>
            
            <div className="flex-shrink-0">
              <Link 
                to={`/${i18n.language}/custom-trip`} 
                className="group/btn relative inline-flex items-center justify-center px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white bg-white/10 backdrop-blur-md border-2 border-blue-400/80 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-blue-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                  {t('banner.button', 'Design your personalized trip')}
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

export default CustomTripBanner;
