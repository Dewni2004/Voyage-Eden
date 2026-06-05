import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const translateIconText = (text, i18n) => {
  if (!text) return '';
  const lower = text.toLowerCase();
  const isEn = i18n.language && i18n.language.startsWith('en');
  if (!isEn) return text;
  
  if (lower.includes('étoile') || lower.includes('etoile')) {
    const num = lower.match(/\d+/);
    return num ? `${num[0]} Stars` : 'Stars';
  }
  if (lower.includes('demi-pension')) return 'Half-Board';
  if (lower.includes('pension complète')) return 'Full-Board';
  if (lower.includes('petit déjeuner')) return 'Breakfast';
  if (lower.includes('voiture')) return 'Car';
  if (lower.includes('train')) return 'Train';
  if (lower.includes('safari')) return 'Safari';
  if (lower.includes('guide')) return 'Guide';
  return text;
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

const ItineraryCard = ({ 
  id, 
  title, 
  duration, 
  description, 
  price, 
  image, 
  isGreen = false, 
  isDark = false,
  features = [],
  icons = [],
  tag = "Les plus populaires"
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const bgClass = isGreen 
    ? 'bg-[#064e3b] border-white/5 hover:border-luxury/80 shadow-2xl hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3),0_0_25px_3px_rgba(197,160,89,0.2)]' 
    : isDark 
      ? 'bg-[#0a152e] border-white/10 hover:border-luxury/80 shadow-2xl hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3),0_0_25px_3px_rgba(197,160,89,0.2)]' 
      : 'bg-white border-primary/20 hover:border-primary/55 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_45px_-12px_rgba(30,64,111,0.08)]';
  
  const textTitle = isGreen || isDark ? 'text-white' : 'text-primary';
  const textTag = isGreen ? 'text-green-300' : isDark ? 'text-luxury' : 'text-green-600';
  const textSecondary = isGreen || isDark ? 'text-white/80' : 'text-gray-500';
  const dividerClass = isGreen || isDark ? 'border-white/10' : 'border-gray-100';
  const iconBg = isGreen ? 'bg-black/20' : isDark ? 'bg-white/5' : 'bg-gray-50';
  const dotColor = isGreen || isDark ? 'bg-white/30' : 'bg-primary/30';
  const iconTextColor = isGreen || isDark ? 'text-white/90' : 'text-gray-500';

  return (
    <div className={`${bgClass} rounded-[1.75rem] overflow-hidden transition-all duration-500 border group flex flex-col h-full w-full`}>
      <div className="h-64 overflow-hidden relative flex-shrink-0">
        <img 
          src={image || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'; }}
        />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {tag && (
          <p className={`text-[10px] ${textTag} font-bold uppercase tracking-widest mb-2`}>{tag}</p>
        )}
        <h3 className={`text-xl font-bold mb-4 ${textTitle}`}>{formatItineraryTitle(title, duration, t)}</h3>
        
        {/* Icon Bar */}
        <div className={`flex items-center space-x-4 mb-6 py-2 px-3 ${iconBg} rounded-lg`}>
          {icons.map((icon, i) => (
            <div key={i} className="flex items-center space-x-1.5">
              {getIconSvg(icon, iconTextColor)}
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${iconTextColor}`}>{translateIconText(icon, i18n)}</span>
            </div>
          ))}
        </div>

        <p className={`text-[14px] leading-relaxed mb-8 flex-grow font-light ${textSecondary}`}>
          {description}
        </p>

        <div className={`pt-6 border-t flex items-center justify-between ${dividerClass} mt-auto`}>
          <div className="flex flex-col">
            <span className={`font-bold text-lg ${textTitle}`}>
              {price?.toString().toLowerCase().includes('€') ? price : `€ ${price}`}
              <span className={`${isGreen || isDark ? 'text-white/50' : 'text-gray-400'} text-[10px] font-normal uppercase ml-1`}>{t("itineraryCard.perPerson")}</span>
            </span>
          </div>
          <button 
            onClick={() => navigate(`/${i18n.language}/itinerary/${id}`)}
            className={`${
              isGreen 
                ? 'border border-white bg-transparent text-white hover:bg-white hover:text-green-800' 
                : isDark 
                  ? 'border border-white bg-transparent text-white hover:bg-white hover:text-primary' 
                  : 'btn-premium-primary'
            } px-6 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap min-w-[120px] text-center`}
          >{t("itineraryCard.book")}</button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
