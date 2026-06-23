import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getItineraries } from '../services/contentService';

import { Helmet } from 'react-helmet-async';
import IncludedExcluded from '../components/IncludedExcluded/IncludedExcluded';
import BookingCard from '../components/BookingCard/BookingCard';
import BookingForm from '../components/BookingForm/BookingForm';
import AnimatedMap from '../components/InteractiveMap/AnimatedMap';

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const translateDuration = (duration, lang, t) => {
  if (!duration) return '';
  const numMatch = duration.match(/(\d+)/);
  if (numMatch) {
    const days = parseInt(numMatch[1], 10);
    const unit = t("itineraryCard.days") || 'days';
    return `${days} ${capitalizeFirstLetter(unit)}`;
  }
  return duration;
};

const translateGroup = (group, lang) => {
  if (!group) return '';
  const clean = group.trim().toLowerCase();
  if (['private', 'privé', 'privat', 'privato', 'privado'].includes(clean)) {
    const cleanLang = lang?.split('-')[0] || 'fr';
    switch (cleanLang) {
      case 'fr': return 'Privé';
      case 'de': return 'Privat';
      case 'it': return 'Privato';
      case 'es': return 'Privado';
      case 'en':
      default:
        return 'Private';
    }
  }
  return group;
};

const translateEffort = (effort, lang) => {
  if (!effort) return '';
  const clean = effort.trim().toLowerCase();
  if (['moderate', 'modéré', 'mäßig', 'maessig', 'moderato', 'moderado'].includes(clean)) {
    const cleanLang = lang?.split('-')[0] || 'fr';
    switch (cleanLang) {
      case 'fr': return 'Modéré';
      case 'de': return 'Mäßig';
      case 'it': return 'Moderato';
      case 'es': return 'Moderado';
      case 'en':
      default:
        return 'Moderate';
    }
  }
  if (['easy', 'facile', 'einfach', 'fácil', 'facil'].includes(clean)) {
    const cleanLang = lang?.split('-')[0] || 'fr';
    switch (cleanLang) {
      case 'fr': return 'Facile';
      case 'de': return 'Einfach';
      case 'it': return 'Facile';
      case 'es': return 'Fácil';
      case 'en':
      default:
        return 'Easy';
    }
  }
  if (['hard', 'difficult', 'difficile', 'schwer', 'difícil', 'dificil'].includes(clean)) {
    const cleanLang = lang?.split('-')[0] || 'fr';
    switch (cleanLang) {
      case 'fr': return 'Difficile';
      case 'de': return 'Schwer';
      case 'it': return 'Difficile';
      case 'es': return 'Difícil';
      case 'en':
      default:
        return 'Difficult';
    }
  }
  return effort;
};

const ItineraryDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const dynamicData = await getItineraries(i18n.language);
        const all = dynamicData;
        // ID can be string or number depending on source
        const found = all.find(it => it.id.toString() === id.toString());
        setItinerary(found);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchItinerary();
  }, [id, i18n.language]);

  useEffect(() => {
    // No longer lock body scroll since the card floats over the map
  }, [isModalOpen]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Chargement des détails du voyage...</div>;
  if (!itinerary) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Voyage non trouvé</div>;

  const days = itinerary.days || [];

  return (
    <div className="bg-white">
      <Helmet>
        <title>{itinerary.seo_title || `${itinerary.title} | Eden Travels`}</title>
        <meta name="description" content={itinerary.seo_description || itinerary.description?.substring(0, 160)} />
        {itinerary.seo_keywords && <meta name="keywords" content={itinerary.seo_keywords} />}
        <meta property="og:title" content={itinerary.seo_title || itinerary.title} />
        <meta property="og:description" content={itinerary.seo_description || itinerary.description?.substring(0, 160)} />
        <meta property="og:image" content={itinerary.image} />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={itinerary.image || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200'} 
            alt={itinerary.title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200'; }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center w-full text-white text-center px-6 -mt-20 md:-mt-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-xl mb-6 leading-tight">
            {itinerary.title}
          </h1>
        </div>
      </section>

      {/* Info Bar (Floating overlapping via negative margin) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 -mt-24 md:-mt-40 mb-4 md:mb-8">
          <div className="bg-white rounded-[40px] shadow-2xl py-6 md:py-8 px-6 md:px-12 border border-gray-50 flex flex-col items-center">
            {/* Stats Row */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 w-full text-center">
              {/* Duration */}
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#f0f4f9] rounded-full flex items-center justify-center text-primary mx-auto">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">{t("itineraryDetail.duration")}</p>
                  <p className="text-primary text-sm md:text-xl font-bold whitespace-nowrap">{translateDuration(itinerary.duration, i18n.language, t)}</p>
                </div>
              </div>

              {/* Group */}
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#f0f4f9] rounded-full flex items-center justify-center text-primary mx-auto">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">{t("itineraryDetail.group")}</p>
                  <p className="text-primary text-sm md:text-xl font-bold whitespace-nowrap">{translateGroup(itinerary.group, i18n.language)}</p>
                </div>
              </div>

              {/* Effort */}
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#f0f4f9] rounded-full flex items-center justify-center text-primary mx-auto">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">{t("itineraryDetail.effort")}</p>
                  <p className="text-primary text-sm md:text-xl font-bold whitespace-nowrap">{translateEffort(itinerary.effort, i18n.language)}</p>
                </div>
              </div>
            </div>

          </div>
      </div>

      {/* Interactive Itinerary Section */}
      <section id="itinerary-section" className="max-w-7xl mx-auto px-0 md:px-6 pb-6 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          
          {/* Left Column: Interactive Map */}
          <div className="relative group/map h-[450px] sm:h-[550px] md:h-[600px] lg:h-[850px]">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-luxury/5 rounded-[48px] blur-2xl opacity-0 group-hover/map:opacity-100 transition-duration-700"></div>
            <AnimatedMap 
              days={days} 
              activeDay={activeDay} 
              setActiveDay={setActiveDay} 
              setIsModalOpen={setIsModalOpen} 
            />

            {/* Mobile Floating Card */}
            {isModalOpen && (
              <div className="absolute bottom-4 left-4 right-4 z-[100] lg:hidden animate-fade-in-up">
                <div className="bg-white/95 backdrop-blur-xl w-full max-h-[75vh] overflow-y-auto rounded-[32px] shadow-2xl p-4 border border-white/50 hide-scrollbar">
                  {/* Image & Close Button Overlay */}
                  <div className="relative h-36 rounded-[24px] overflow-hidden mb-4 shadow-sm">
                    <img src={days[activeDay - 1].image} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setIsModalOpen(false)} 
                      className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:bg-black/60"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <span className="text-luxury text-[10px] font-bold uppercase tracking-widest mb-1 block">{days[activeDay - 1].displayLabel || `${t("itineraryDetail.day")} ${days[activeDay - 1].id}`}</span>
                  <h3 className="text-primary text-xl font-bold mb-2 leading-tight">{days[activeDay - 1].location}</h3>
                  
                  {/* Full Description */}
                  <p className="text-gray-600 text-[13px] leading-relaxed mb-5">{days[activeDay - 1].description}</p>
                  
                  {/* Additional Details for Mobile */}
                  <div className="flex-grow space-y-5 mb-5">
                    {/* Highlights */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" /></svg>
                      </div>
                      <div>
                        <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-0.5">{t("itineraryDetail.highlights")}</h4>
                        <p className="text-gray-500 text-[11px] font-medium leading-relaxed">{days[activeDay - 1].highlights}</p>
                      </div>
                    </div>

                    {/* Accommodation */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div>
                          <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-0.5">{t("itineraryDetail.accommodation")}</h4>
                          <p className="text-gray-500 text-[11px] font-medium leading-relaxed">{days[activeDay - 1].accommodation}</p>
                        </div>
                      </div>

                      {days[activeDay - 1].accommodationImages && days[activeDay - 1].accommodationImages.some(img => img) && (
                        <div className="w-full mt-2">
                          <div className="grid grid-cols-4 gap-2">
                            {days[activeDay - 1].accommodationImages.map((img, idx) => img ? (
                              <div key={idx} onClick={() => setSelectedGalleryImage(img)} className="h-14 sm:h-20 rounded-xl overflow-hidden shadow-sm relative cursor-pointer hover:opacity-90 transition-opacity">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </div>
                            ) : null)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full">
                    {activeDay > 1 && (
                      <button onClick={() => setActiveDay(activeDay - 1)} className="w-1/2 bg-transparent border-2 border-primary text-primary py-3 rounded-[20px] shadow-sm flex items-center justify-center gap-2 text-sm font-bold hover:bg-primary/5 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        {t("itineraryDetail.prevDay", "Jour précédent")} 
                      </button>
                    )}
                    <button onClick={() => { 
                      if (activeDay < days.length) {
                        setActiveDay(activeDay + 1); 
                      } else { 
                        setIsModalOpen(false); 
                        setTimeout(() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      } 
                    }} className={`${activeDay === 1 ? 'w-full' : 'w-1/2'} btn-premium-primary py-3 rounded-[20px] shadow-sm flex items-center justify-center gap-2 text-sm font-bold transition-all`}>
                      {activeDay === days.length ? t("itineraryDetail.close") : (
                        <>
                          {t("itineraryDetail.nextDay", "Jour suivant")} 
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Day Details Card */}
          <div className="bg-[#e9ecef] rounded-[40px] p-8 md:p-10 shadow-2xl border border-white h-[850px] overflow-y-auto hidden lg:flex flex-col transition-all duration-500 hide-scrollbar">
            {/* Day Image */}
            <div className="relative h-60 rounded-[32px] overflow-hidden mb-6 shadow-xl group/img flex-shrink-0">
              <img 
                src={days[activeDay - 1].image} 
                alt={days[activeDay - 1].location} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 flex flex-col items-start gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                  {days[activeDay - 1].displayLabel || `${t("itineraryDetail.day")} ${days[activeDay - 1].id}`}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-xl leading-tight">
                  {days[activeDay - 1].location}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10 px-2">
              <p className="text-gray-700 text-[15px] leading-relaxed font-medium">
                {days[activeDay - 1].description}
              </p>
            </div>

            <div className="flex-grow space-y-8 px-2">
              {/* Highlights */}
              <div className="flex items-center gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-0.5">{t("itineraryDetail.highlights")}</h4>
                  <p className="text-gray-500 text-xs font-medium leading-relaxed">{days[activeDay - 1].highlights}</p>
                </div>
              </div>

              {/* Accommodation */}
              <div className="flex flex-col gap-4 group/item">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-0.5">{t("itineraryDetail.accommodation")}</h4>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">{days[activeDay - 1].accommodation}</p>
                  </div>
                </div>

                {days[activeDay - 1].accommodationImages && days[activeDay - 1].accommodationImages.some(img => img) && (
                  <div className="mt-4 w-full">
                    <div className="grid grid-cols-4 gap-3">
                      {days[activeDay - 1].accommodationImages.map((img, idx) => img ? (
                        <div key={idx} onClick={() => setSelectedGalleryImage(img)} className="h-20 sm:h-24 md:h-28 rounded-2xl overflow-hidden shadow-md group/acc-img cursor-pointer relative">
                          <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/acc-img:scale-110" />
                          <div className="absolute inset-0 bg-black/10 group-hover/acc-img:bg-transparent transition-colors"></div>
                        </div>
                      ) : null)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 flex gap-4 w-full">
              {activeDay > 1 && (
                <button 
                  onClick={() => setActiveDay(activeDay - 1)}
                  className="w-1/2 bg-transparent border-2 border-primary text-primary py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 font-bold hover:bg-primary/5 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  {t("itineraryDetail.prevDay", "Jour précédent")} 
                </button>
              )}
              <button 
                onClick={() => {
                  if (activeDay < days.length) {
                    setActiveDay(activeDay + 1);
                  } else {
                    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${activeDay === 1 ? 'w-full' : 'w-1/2'} btn-premium-primary py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all font-bold`}
              >
                {activeDay === days.length ? t("itineraryDetail.tourFinished") : (
                  <>
                    {t("itineraryDetail.nextDay", "Jour suivant")} 
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Modal Removed - Now a floating card inside map container */}

      <BookingForm itineraryTitle={itinerary.title} itineraryDuration={itinerary.duration} />
      <IncludedExcluded />
      <BookingCard price={itinerary.price} />
      
      {/* Lightbox Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            onClick={() => setSelectedGalleryImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={selectedGalleryImage} 
            alt="Gallery preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ItineraryDetail;
