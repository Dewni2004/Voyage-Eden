import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { generateSlug } from '../../utils/slugify';

const formatPrice = (price, t) => {
  if (!price) return '';
  const priceStr = price.toString().trim();
  const lowerPrice = priceStr.toLowerCase();
  if (
    lowerPrice === 'pide presupuesto' || 
    lowerPrice === 'precio a consultar' || 
    lowerPrice === 'a consultar' || 
    lowerPrice === 'consultar' || 
    lowerPrice === 'consultar precio'
  ) {
    return t ? t('itineraryCard.pidePresupuesto', 'Pide Presupuesto') : priceStr;
  }
  const isEn = i18n.language && i18n.language.startsWith('en');
  if (isEn) {
    if (priceStr.includes('USD') || priceStr.includes('$')) return priceStr;
    if (priceStr.includes('€')) return priceStr.replace('€', 'USD');
    if (/[a-zA-Z]/.test(priceStr)) return priceStr;
    return `USD ${priceStr}`;
  } else {
    if (priceStr.includes('€')) return priceStr;
    if (/[a-zA-Z]/.test(priceStr)) return priceStr;
    return `€ ${priceStr}`;
  }
};

const getIconSvg = (iconText, iconTextColorClass) => {
  const text = iconText.toLowerCase();
  
  // 1. Hotel / Accommodation / Superior Category
  if (text.includes('hotel') || text.includes('hôtel') || text.includes('boutique') || text.includes('resort') || text.includes('camp') || text.includes('superior') || text.includes('standard') || text.includes('premium') || text.includes('luxury') || text.includes('lodge') || text.includes('hebergement') || text.includes('hébergement')) {
    return (
      <svg className={`w-3.5 h-3.5 ${iconTextColorClass} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 16.5h1.5M13.5 16.5H15" />
      </svg>
    );
  }

  // 1b. Star Rating
  if (text.includes('étoile') || text.includes('star') || text.includes('*')) {
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
  const lang = i18n.language ? i18n.language.split('-')[0] : 'fr';
  const lower = text.toLowerCase();
  
  let key = '';
  if (lower.includes('star') || lower.includes('étoile') || lower.includes('etoile')) {
    const num = lower.match(/\d+/);
    key = num ? `${num[0]}_star` : 'star';
  } else if (lower.includes('half board') || lower.includes('demi-pension')) {
    key = 'half_board';
  } else if (lower.includes('full board') || lower.includes('pension complète')) {
    key = 'full_board';
  } else if (lower.includes('breakfast') || lower.includes('petit déjeuner')) {
    key = 'breakfast';
  } else if (lower.includes('car') || lower.includes('voiture')) {
    key = 'car';
  } else if (lower.includes('train')) {
    key = 'train';
  } else if (lower.includes('safari')) {
    key = 'safari';
  } else if (lower.includes('guide')) {
    key = 'guide';
  } else {
    return text;
  }

  switch (lang) {
    case 'fr':
      if (key.endsWith('_star')) return `${key.split('_')[0]} Étoiles`;
      if (key === 'star') return 'Étoiles';
      if (key === 'half_board') return 'Demi-Pension';
      if (key === 'full_board') return 'Pension Complète';
      if (key === 'breakfast') return 'Petit Déjeuner';
      if (key === 'car') return 'Voiture';
      if (key === 'train') return 'Train';
      if (key === 'safari') return 'Safari';
      if (key === 'guide') return 'Guide';
      break;
    case 'es':
      if (key.endsWith('_star')) return `${key.split('_')[0]} Estrellas`;
      if (key === 'star') return 'Estrellas';
      if (key === 'half_board') return 'Media Pensión';
      if (key === 'full_board') return 'Pensión Completa';
      if (key === 'breakfast') return 'Desayuno';
      if (key === 'car') return 'Coche';
      if (key === 'train') return 'Tren';
      if (key === 'safari') return 'Safari';
      if (key === 'guide') return 'Guía';
      break;
    case 'it':
      if (key.endsWith('_star')) return `${key.split('_')[0]} Stelle`;
      if (key === 'star') return 'Stelle';
      if (key === 'half_board') return 'Mezza Pensione';
      if (key === 'full_board') return 'Pensione Completa';
      if (key === 'breakfast') return 'Colazione';
      if (key === 'car') return 'Auto';
      if (key === 'train') return 'Treno';
      if (key === 'safari') return 'Safari';
      if (key === 'guide') return 'Guida';
      break;
    case 'de':
      if (key.endsWith('_star')) return `${key.split('_')[0]} Sterne`;
      if (key === 'star') return 'Sterne';
      if (key === 'half_board') return 'Halbpension';
      if (key === 'full_board') return 'Vollpension';
      if (key === 'breakfast') return 'Frühstück';
      if (key === 'car') return 'Auto';
      if (key === 'train') return 'Zug';
      if (key === 'safari') return 'Safari';
      if (key === 'guide') return 'Reiseführer';
      break;
    case 'en':
    default:
      if (key.endsWith('_star')) return `${key.split('_')[0]} Stars`;
      if (key === 'star') return 'Stars';
      if (key === 'half_board') return 'Half Board';
      if (key === 'full_board') return 'Full Board';
      if (key === 'breakfast') return 'Breakfast';
      if (key === 'car') return 'Car';
      if (key === 'train') return 'Train';
      if (key === 'safari') return 'Safari';
      if (key === 'guide') return 'Guide';
      break;
  }
  return text;
};

const parseItineraryTitleAndDays = (title, duration, t) => {
  if (!title) return { cleanTitle: '', daysText: '' };
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
  
  return { cleanTitle, daysText };
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
  const { cleanTitle, daysText } = parseItineraryTitleAndDays(title, duration, t);

  const bgClass = isGreen 
    ? 'bg-[#064e3b] border-white/5 hover:border-luxury/80 shadow-2xl hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3),0_0_25px_3px_rgba(197,160,89,0.2)]' 
    : isDark 
      ? 'bg-gradient-to-b from-[#16294d] to-[#0c1730] border-[#c5a059]/30 hover:border-[#c5a059]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.4),0_0_25px_3px_rgba(197,160,89,0.3)]' 
      : 'bg-white border-primary/20 hover:border-primary/55 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_45px_-12px_rgba(30,64,111,0.08)]';
  
  const textTitle = isGreen ? 'text-white' : isDark ? 'text-[#c5a059]' : 'text-primary';
  const textTag = isGreen ? 'text-green-300' : isDark ? 'text-luxury' : 'text-green-600';
  const textSecondary = isGreen || isDark ? 'text-white/80' : 'text-gray-500';
  const dividerClass = isGreen || isDark ? 'border-white/10' : 'border-gray-100';
  const iconBg = isGreen ? 'bg-black/20' : isDark ? 'bg-white/5' : 'bg-gray-50';
  const dotColor = isGreen || isDark ? 'bg-white/30' : 'bg-primary/30';
  const iconTextColor = isGreen || isDark ? 'text-white/90' : 'text-gray-500';

  const renderDescription = (descText) => {
    if (!descText) return null;
    
    const lines = descText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    
    const hasBullets = descText.includes('•') || 
                       descText.includes('●') || 
                       descText.includes('·') || 
                       descText.includes('\u2022') || 
                       descText.includes('\u25cf') || 
                       descText.includes('\u00b7') ||
                       lines.some(l => l.startsWith('-') || l.startsWith('*'));
    
    const hasPins = descText.includes('📍') || descText.includes('📌') || descText.includes('🗺️');
    
    // Treat as list if we have explicit bullets, pins, or multiple short lines representing route locations
    const isList = hasBullets || hasPins || (lines.length > 1 && lines.every(l => l.length < 35));
    
    if (isList) {
      const inclusions = [];
      const locations = [];
      
      lines.forEach(line => {
        if (/^[•●·\u2022\u25cf\u00b7\-\*]/.test(line)) {
          const clean = line.replace(/^[•●·\u2022\u25cf\u00b7\-\*]\s*/, '').trim();
          if (clean) inclusions.push(clean);
        } else {
          if (line.includes('📍') || line.includes('📌') || line.includes('🗺️')) {
            const parts = line.split(/[📍📌🗺️]/).map(p => p.trim()).filter(Boolean);
            locations.push(...parts);
          } else {
            const clean = line.replace(/[📍📌🗺️]/g, '').trim();
            if (clean) locations.push(clean);
          }
        }
      });
      
      const checkIconColor = isGreen ? 'text-green-300' : isDark ? 'text-[#c5a059]' : 'text-green-600';
      
      return (
        <div className="flex flex-col flex-grow mb-8 text-left">
          {/* Inclusions / Details */}
          {inclusions.length > 0 && (
            <ul className="space-y-2 text-[13px] leading-relaxed font-light mb-4">
              {inclusions.map((part, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg className={`w-4 h-4 ${checkIconColor} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className={textSecondary}>{part}</span>
                </li>
              ))}
            </ul>
          )}
          
          {/* Route Badges */}
          {locations.length > 0 && (
            <div className="mt-2">
              <p className={`text-[10px] uppercase tracking-wider font-bold mb-2 ${isGreen || isDark ? 'text-white/40' : 'text-gray-400'}`}>
                {t ? t("itineraryCard.route", "Ruta / Route") : "Ruta / Route"}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {locations.map((loc, i) => (
                  <span 
                    key={i} 
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      isGreen 
                        ? 'bg-white/10 text-white border border-white/10' 
                        : isDark 
                          ? 'bg-white/5 text-white/95 border border-white/5' 
                          : 'bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <svg className={`w-2.5 h-2.5 ${checkIconColor} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <p className={`text-[14px] leading-relaxed mb-8 flex-grow font-light whitespace-pre-line ${textSecondary}`}>
        {descText}
      </p>
    );
  };

  return (
    <div className={`${bgClass} rounded-[1.75rem] overflow-hidden transition-all duration-500 border group flex flex-col h-full w-full`}>
      <div className="h-64 overflow-hidden relative flex-shrink-0">
        <img 
          src={image || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'} 
          alt={cleanTitle} 
          className="w-full h-full object-cover"
          loading="lazy"
          width="800"
          height="600"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'; }}
        />
        {daysText && (
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md border border-white/20 flex items-center gap-1.5">
            <svg className={`w-3.5 h-3.5 ${isGreen ? 'text-green-600' : isDark ? 'text-[#c5a059]' : 'text-green-600'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {daysText}
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {tag && (
          <p className={`text-[10px] ${textTag} font-bold uppercase tracking-widest mb-2`}>{tag}</p>
        )}
        <h3 className={`text-xl font-bold mb-4 ${textTitle}`}>{cleanTitle}</h3>
        
        {/* Icon Bar */}
        <div className={`flex items-center space-x-4 mb-6 py-2 px-3 ${iconBg} rounded-lg`}>
          {icons.map((icon, i) => (
            <div key={i} className="flex items-center space-x-1.5">
              {getIconSvg(icon, iconTextColor)}
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${iconTextColor}`}>{translateIconText(icon, i18n)}</span>
            </div>
          ))}
        </div>

        {renderDescription(description)}

        <div className={`pt-6 border-t flex items-center justify-between ${dividerClass} mt-auto`}>
          <div className="flex flex-col">
            <span className={`font-bold text-lg ${textTitle}`}>
              {formatPrice(price, t)}
              <span className={`${isGreen || isDark ? 'text-white/50' : 'text-gray-400'} text-[10px] font-normal uppercase ml-1`}>{t("itineraryCard.perPerson")}</span>
            </span>
          </div>
          <button 
            onClick={() => navigate(`/${generateSlug(title, id)}`)}
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
