import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import swipeHandImg from '../../assets/swipe-hand-transparent.png';

const getIconSvg = (iconText, iconTextColorClass) => {
  const text = iconText.toLowerCase();
  
  // 1. Star / Hotel / Rating / Luxury
  if (text.includes('étoile') || text.includes('hotel') || text.includes('hôtel') || text.includes('boutique') || text.includes('resort') || text.includes('camp') || text.includes('*')) {
    return (
      <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    );
  }
  
  // 2. Dining / Meals / B&B
  if (text.includes('pension') || text.includes('inclus') || text.includes('b&b') || text.includes('b & b') || text.includes('déjeuner') || text.includes('repas') || text.includes('board')) {
    return (
      <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v7a4 4 0 004 4h1v8h2v-8h1a4 4 0 004-4V3M21 3v18M18 3v5a3 3 0 003 3" />
      </svg>
    );
  }

  // 3. Transport / Vehicle
  if (text.includes('voiture') || text.includes('van') || text.includes('tuktuk') || text.includes('tuk tuk') || text.includes('transport') || text.includes('jeep') || text.includes('vehicle')) {
    return (
      <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a2 2 0 11-4 0 2 2 0 014 0zM18 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h10m4 0h2a2 2 0 002-2V9a2 2 0 00-2-2h-3.172a2 2 0 00-1.414.586L15 9M4 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2m4-3h4a2 2 0 012 2v3H7V6a2 2 0 012-2z" />
      </svg>
    );
  }

  // 4. Wildlife / Safari / Whale / Exploring / Sights
  if (text.includes('safari') || text.includes('baleine') || text.includes('sauvage') || text.includes('entrée') || text.includes('visite') || text.includes('tour') || text.includes('golf') || text.includes('surf') || text.includes('plongée') || text.includes('view') || text.includes('vue')) {
    return (
      <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" />
      </svg>
    );
  }

  // 5. Group Size
  if (text.includes('groupe') || text.includes('person') || text.includes('pax')) {
    return (
      <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }

  // Fallback Location Pin
  return (
    <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
};

const formatItineraryTitle = (title, duration, t) => {
  if (!title) return '';
  const daysRegex = /\s*\(\s*(\d+)\s*[jJ]ours?\s*\)\s*$/;
  const match = title.match(daysRegex);
  let cleanTitle = title;
  let daysText = '';
  
  if (match) {
    const days = parseInt(match[1], 10);
    daysText = `${days} ${t("itineraryCard.days")}`;
    cleanTitle = title.replace(daysRegex, '').trim();
  } else if (duration) {
    const numMatch = duration.match(/(\d+)/);
    if (numMatch) {
      const days = parseInt(numMatch[1], 10);
      daysText = `${days} ${t("itineraryCard.days")}`;
    } else {
      daysText = duration;
    }
  }
  
  return daysText ? `${daysText} - ${cleanTitle}` : cleanTitle;
};

const PopularItineraries = ({ title, id, itineraries, isDark, isGreen }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!hasScrolled && scrollRef.current) {
      if (scrollRef.current.scrollLeft > 20) {
        setHasScrolled(true);
      }
    }
  };
  
  return (
    <section id={id} className={`py-10 md:py-16 relative overflow-hidden ${isDark ? 'bg-[#050b18]' : 'bg-white'}`}>
      {/* Premium Background for Luxury Section */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e293b,transparent)] opacity-50"></div>
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[140px] opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-luxury/10 rounded-full blur-[140px] opacity-20"></div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h2 className={`text-3xl font-bold capitalize tracking-tight ${isDark ? 'text-luxury' : isGreen ? 'text-green-600' : 'text-primary'}`}>{title}</h2>
          <div className={`flex-grow ml-12 h-[1px] hidden md:block ${isDark ? 'bg-luxury/40' : isGreen ? 'bg-green-600/30' : 'bg-gray-200'}`}></div>
        </div>

        {/* Mobile Swipe Hint Overlay */}
        {!hasScrolled && itineraries.length > 1 && (
          <div className="md:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
            <img 
              src={swipeHandImg} 
              alt="Swipe Gesture" 
              className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
            />
          </div>
        )}

        {/* Grid / Slider */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {itineraries.map((item) => (
            <div 
              key={item.id} 
              className={`min-w-[280px] w-[85vw] sm:w-[45vw] md:w-auto shrink-0 snap-center ${
                isGreen 
                  ? 'bg-[#064e3b] border-white/5 hover:border-luxury/80 shadow-2xl hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3),0_0_25px_3px_rgba(197,160,89,0.2)]' 
                  : isDark 
                    ? 'bg-[#0a152e] border-white/10 hover:border-luxury/80 shadow-2xl hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3),0_0_25px_3px_rgba(197,160,89,0.2)]' 
                    : 'bg-white border-primary/20 hover:border-primary/55 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_45px_-12px_rgba(30,64,111,0.08)]'
              } rounded-[1.75rem] overflow-hidden transition-all duration-500 border group flex flex-col`}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'; }}
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className={`text-[10px] ${isGreen ? 'text-green-300' : isDark ? 'text-luxury' : 'text-green-600'} font-bold uppercase tracking-widest mb-2`}>{t("popularItin.mostPopular")}</p>
                <h3 className={`text-xl font-bold mb-4 ${isGreen || isDark ? 'text-white' : 'text-primary'}`}>{formatItineraryTitle(item.title, item.duration, t)}</h3>
                
                {/* Icon Bar */}
                <div className={`flex items-center space-x-4 mb-6 py-2 px-3 ${isGreen ? 'bg-black/20' : isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-lg`}>
                  {(item.icons || []).map((icon, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      {getIconSvg(icon, isGreen || isDark ? 'text-white/90' : 'text-gray-500')}
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${isGreen || isDark ? 'text-white/90' : 'text-gray-500'}`}>{icon}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-[14px] leading-relaxed mb-8 flex-grow font-light ${isGreen || isDark ? 'text-white/80' : 'text-gray-500'}`}>
                  {item.description}
                </p>

                <div className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isGreen || isDark ? 'border-white/10' : 'border-gray-100'}`}>
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg ${isGreen || isDark ? 'text-white' : 'text-primary'}`}>
                      €{item.price}
                      <span className={`${isGreen || isDark ? 'text-white/50' : 'text-gray-400'} text-[10px] font-normal uppercase ml-1`}>{t("popularItin.perPerson")}</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/${i18n.language}/itinerary/${item.id}`)}
                    className={`${
                      isGreen 
                        ? 'border border-white bg-transparent text-white hover:bg-white hover:text-green-800' 
                        : isDark 
                          ? 'border border-white bg-transparent text-white hover:bg-white hover:text-primary' 
                          : 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
                    } w-full sm:w-auto px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 group/btn`}
                  >
                    {t("popularItin.book")}
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItineraries;
