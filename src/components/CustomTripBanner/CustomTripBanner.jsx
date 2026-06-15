import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/design your itinerary.jpeg';

const CustomTripBanner = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="w-full py-4 md:py-12">
      <div className="container mx-auto px-6">
        
        {/* Banner Container with Background Image */}
        <div 
          className="relative w-full rounded-[1.75rem] md:rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center min-h-[220px] md:min-h-[300px] group"
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
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0a1128]/95 via-[#0a1128]/85 to-[#0a1128]/60 md:to-transparent"></div>
          
          {/* Content - No more messy glass box, just clean typography directly on the overlay */}
          <div className="relative z-10 w-full p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-serif font-bold text-white mb-3 md:mb-4 leading-snug drop-shadow-md whitespace-pre-line">
                {t('banner.title', 'DESIGN YOUR DREAM ITINERARY WITH US')}
              </h2>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mt-4">
                {[
                  { num: '1', key: 'step1', default: 'Tell Us' },
                  { num: '2', key: 'step2', default: 'We Design' },
                  { num: '3', key: 'step3', default: 'Review' },
                  { num: '4', key: 'step4', default: 'Confirm' },
                  { num: '5', key: 'step5', default: 'Travel' }
                ].map((step, index) => (
                  <React.Fragment key={step.num}>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-200 text-[10px] md:text-xs font-bold backdrop-blur-sm">
                        {step.num}
                      </span>
                      <span className="text-white/90 text-[11px] md:text-xs font-medium tracking-wider uppercase hidden sm:block">
                        {t(`banner.steps.${step.key}`, step.default)}
                      </span>
                    </div>
                    {index < 4 && (
                      <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Link 
                to={`/${i18n.language}/custom-trip`} 
                className="group/btn relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-sm md:text-base font-semibold text-white bg-white/10 backdrop-blur-md border-2 border-blue-400/80 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-blue-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] hover:-translate-y-1 whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                  {t('banner.button', 'Design your personalized trip')}
                  <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
