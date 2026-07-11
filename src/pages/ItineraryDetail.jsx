import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getItineraries } from '../services/contentService';
import { generateSlug } from '../utils/slugify';

import { Helmet } from 'react-helmet-async';
import IncludedExcluded from '../components/IncludedExcluded/IncludedExcluded';
import BookingCard from '../components/BookingCard/BookingCard';
import BookingForm from '../components/BookingForm/BookingForm';
import AnimatedMap from '../components/InteractiveMap/AnimatedMap';
import PopularItineraries from '../components/PopularItineraries/PopularItineraries';
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
  const [allItineraries, setAllItineraries] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        const dynamicData = await getItineraries(i18n.language);
        const all = dynamicData;
        
        // Find itinerary by slug or fallback to ID
        const found = all.find(it => {
          const generatedSlug = generateSlug(it.title, it.id);
          return it.id.toString() === id.toString() || generatedSlug === id.toString();
        });
        
        setItinerary(found);
        setAllItineraries(all);
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

  const l = i18n.language || 'fr';
  const loadingText = l === 'es' ? "Cargando detalles del viaje..." : l === 'it' ? "Caricamento dei dettagli del viaggio..." : l === 'de' ? "Lade Reisedetails..." : l === 'en' ? "Loading trip details..." : "Chargement des détails du voyage...";
  const notFoundText = l === 'es' ? "Viaje no encontrado" : l === 'it' ? "Viaggio non trovato" : l === 'de' ? "Reise nicht gefunden" : l === 'en' ? "Trip not found" : "Voyage non trouvé";

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">{loadingText}</div>;
  if (!itinerary) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">{notFoundText}</div>;

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
            width="1200"
            height="800"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200'; }}
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
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 -mt-[48px] md:-mt-[62px] mb-4 md:mb-8">
          <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl py-3.5 md:py-4 px-6 md:px-12 border border-gray-50 flex flex-col items-center">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full text-center">
              {/* Duration */}
              <div className="flex flex-col items-center text-center space-y-1 md:space-y-1.5">
                <div className="w-8 h-8 md:w-11 md:h-11 bg-[#f0f4f9] rounded-full flex items-center justify-center text-primary mx-auto">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] mb-0.5">{t("itineraryDetail.duration")}</p>
                  <p className="text-primary text-sm md:text-lg font-bold whitespace-nowrap">{translateDuration(itinerary.duration, i18n.language, t)}</p>
                </div>
              </div>

              {/* Group */}
              <div className="flex flex-col items-center text-center space-y-1 md:space-y-1.5">
                <div className="w-8 h-8 md:w-11 md:h-11 bg-[#f0f4f9] rounded-full flex items-center justify-center text-primary mx-auto">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] mb-0.5">{t("itineraryDetail.group")}</p>
                  <p className="text-primary text-sm md:text-lg font-bold whitespace-nowrap">{translateGroup(itinerary.group, i18n.language)}</p>
                </div>
              </div>

              {/* Effort */}
              <div className="flex flex-col items-center text-center space-y-1 md:space-y-1.5">
                <div className="w-8 h-8 md:w-11 md:h-11 bg-[#f0f4f9] rounded-full flex items-center justify-center text-primary mx-auto">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] mb-0.5">{t("itineraryDetail.effort")}</p>
                  <p className="text-primary text-sm md:text-lg font-bold whitespace-nowrap">{translateEffort(itinerary.effort, i18n.language)}</p>
                </div>
              </div>
            </div>

          </div>
      </div>

      {/* Interactive Itinerary Section */}
      <section id="itinerary-section" className="max-w-[1360px] mx-auto px-4 sm:px-5 md:px-6 pb-6 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          
          {/* Left Column: Interactive Map (Styled as a Card) */}
          <div className={`relative group/map rounded-[40px] shadow-2xl h-[450px] sm:h-[550px] md:h-[600px] lg:h-[750px] flex flex-col justify-center items-center overflow-hidden ${(itinerary.id === '9be862d3-2cb3-424e-b56a-aaaf384bb8ef' || itinerary.id === 'e43b5dec-05c3-48a2-854e-45fef616675e' || itinerary.id === 'f889e49c-89be-40fa-8f75-1a96be58664a' || itinerary.id === '5786c88e-6e80-404c-9e67-c7c8b9594f4f' || itinerary.id === '6b5bdec5-93a6-4f5d-8f55-4de8b0637f17' || itinerary.id === 'e6ed3219-8240-47aa-bc18-2e30ab4aa8c1' || itinerary.id === 'f9087bed-98d7-473f-8981-f7222f662958' || itinerary.id === 'acaecf14-07bc-4bdd-ba6c-8f1f3146b3a4' || itinerary.id === '19e84602-a2cc-4cc8-88f3-bbbf311b74ba' || itinerary.id === '7e2b6fa2-a297-4376-933d-ecdbac951183' || itinerary.id === 'c1264913-ac00-4e83-acfd-73e139efd628' || itinerary.id === '8c630a0f-b4e0-44f6-9a38-af954d0d8cf8' || itinerary.id === '9b6c3e5a-e6ed-4219-ae82-b9535cf3a048' || itinerary.id === '5b039c8f-8955-44de-9788-2b8ef2f958df' || itinerary.id === '8882bc3e-7338-47cc-b4aa-3573a1efad31' || itinerary.id === 'e20e7213-a43e-48dc-92b8-4d7dff732774' || itinerary.id === '8fc7a86b-90f9-4736-8d79-81da76a86879' || itinerary.id === 'bf91c1df-7027-42b9-8918-1e5033fb9fa8' || itinerary.id === '1921a084-239d-43e7-be83-a64e029ec9a3' || itinerary.id === 'd9fa26f8-7ba8-483f-a942-7c1f130004ca' || itinerary.id === '8517ac5e-d6dc-4c9d-9879-b1f8203f4290' || itinerary.id === '268f9c88-4fe4-4d37-ad6e-e4b1f0c40923' || itinerary.id === '37b1b6e1-c1f9-4260-bc2c-6351305ab197' || itinerary.id === '3ff5c7a9-f8cd-455a-b8bd-66d56431f299' || itinerary.id === '78eeebc2-6926-4ffa-8826-1d61570b0ab6' || itinerary.id === 'fd4ec913-9f0c-4a17-9b0e-9d25ebb6880f' || itinerary.id === 'db5ed07a-1c15-4ec4-9081-57bb092c42d9' || itinerary.id === 'e96a035f-0d5f-4d3f-bb1b-d0524c5c78c9' || itinerary.id === 'b6b8b207-f55c-4c83-a7d8-3caa5284c73b' || itinerary.id === 'b9fc78bc-c766-4b08-8a84-ef4224c143d4' || itinerary.id === 'ef67877f-92f9-4113-9880-94a03f79413f' || itinerary.id === 'c9492146-5f0f-46b8-98b0-3575fc7b6e5a' || itinerary.id === 'd3285989-25c1-4f88-b018-493d85751509') ? 'bg-[#1a1e44] border-0 p-0' : 'bg-[#e9ecef] border border-white p-5 md:p-6'}`}>
            {itinerary.id !== '9be862d3-2cb3-424e-b56a-aaaf384bb8ef' && itinerary.id !== 'e43b5dec-05c3-48a2-854e-45fef616675e' && itinerary.id !== 'f889e49c-89be-40fa-8f75-1a96be58664a' && itinerary.id !== '5786c88e-6e80-404c-9e67-c7c8b9594f4f' && itinerary.id !== '6b5bdec5-93a6-4f5d-8f55-4de8b0637f17' && itinerary.id !== 'e6ed3219-8240-47aa-bc18-2e30ab4aa8c1' && itinerary.id !== 'f9087bed-98d7-473f-8981-f7222f662958' && itinerary.id !== 'acaecf14-07bc-4bdd-ba6c-8f1f3146b3a4' && itinerary.id !== '19e84602-a2cc-4cc8-88f3-bbbf311b74ba' && itinerary.id !== '7e2b6fa2-a297-4376-933d-ecdbac951183' && itinerary.id !== 'c1264913-ac00-4e83-acfd-73e139efd628' && itinerary.id !== '8c630a0f-b4e0-44f6-9a38-af954d0d8cf8' && itinerary.id !== '9b6c3e5a-e6ed-4219-ae82-b9535cf3a048' && itinerary.id !== '5b039c8f-8955-44de-9788-2b8ef2f958df' && itinerary.id !== '8882bc3e-7338-47cc-b4aa-3573a1efad31' && itinerary.id !== 'e20e7213-a43e-48dc-92b8-4d7dff732774' && itinerary.id !== '8fc7a86b-90f9-4736-8d79-81da76a86879' && itinerary.id !== 'bf91c1df-7027-42b9-8918-1e5033fb9fa8' && itinerary.id !== '1921a084-239d-43e7-be83-a64e029ec9a3' && itinerary.id !== 'd9fa26f8-7ba8-483f-a942-7c1f130004ca' && itinerary.id !== '8517ac5e-d6dc-4c9d-9879-b1f8203f4290' && itinerary.id !== '268f9c88-4fe4-4d37-ad6e-e4b1f0c40923' && itinerary.id !== '37b1b6e1-c1f9-4260-bc2c-6351305ab197' && itinerary.id !== '3ff5c7a9-f8cd-455a-b8bd-66d56431f299' && itinerary.id !== '78eeebc2-6926-4ffa-8826-1d61570b0ab6' && itinerary.id !== 'fd4ec913-9f0c-4a17-9b0e-9d25ebb6880f' && itinerary.id !== 'db5ed07a-1c15-4ec4-9081-57bb092c42d9' && itinerary.id !== 'e96a035f-0d5f-4d3f-bb1b-d0524c5c78c9' && itinerary.id !== 'b6b8b207-f55c-4c83-a7d8-3caa5284c73b' && itinerary.id !== 'b9fc78bc-c766-4b08-8a84-ef4224c143d4' && itinerary.id !== 'ef67877f-92f9-4113-9880-94a03f79413f' && itinerary.id !== 'c9492146-5f0f-46b8-98b0-3575fc7b6e5a' && itinerary.id !== 'd3285989-25c1-4f88-b018-493d85751509' && (
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-luxury/5 rounded-[48px] blur-2xl opacity-0 group-hover/map:opacity-100 transition-duration-700 pointer-events-none"></div>
            )}
            <AnimatedMap 
              days={days} 
              activeDay={activeDay} 
              setActiveDay={setActiveDay} 
              setIsModalOpen={setIsModalOpen} 
              itineraryTitle={itinerary.title}
              itineraryId={itinerary.id}
            />

          </div>

          {/* Right Column: Day Details Card */}
          <div className="bg-[#e9ecef] rounded-[28px] md:rounded-[40px] p-4 pb-24 md:p-6 md:pb-6 shadow-2xl border border-white lg:h-[750px] overflow-y-auto flex flex-col transition-all duration-500 hide-scrollbar">
            {/* Day Image */}
            <div className="relative h-36 md:h-48 lg:h-52 rounded-[24px] md:rounded-[32px] overflow-hidden mb-4 md:mb-5 shadow-xl group/img flex-shrink-0">
              <img 
                src={days[activeDay - 1].image} 
                alt={days[activeDay - 1].location} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-110"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-8 flex flex-col items-start gap-1 md:gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-white/30">
                  {days[activeDay - 1].displayLabel || `${t("itineraryDetail.day")} ${days[activeDay - 1].id}`}
                </span>
                <h3 className="text-white text-xl md:text-3xl font-bold drop-shadow-xl leading-tight">
                  {days[activeDay - 1].location}
                </h3>
              </div>
            </div>

            <div className="mb-4 md:mb-6 px-1 md:px-2">
              <p className="text-gray-700 text-[13px] md:text-[14px] leading-relaxed font-medium">
                {days[activeDay - 1].description}
              </p>
            </div>

            <div className="flex-grow space-y-4 md:space-y-6 px-1 md:px-2">
              {/* Highlights */}
              <div className="flex items-center gap-4 md:gap-6 group/item">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-[14px] md:rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-[11px] md:text-sm uppercase tracking-wider mb-0.5">{t("itineraryDetail.highlights")}</h4>
                  <p className="text-gray-500 text-[11px] md:text-xs font-medium leading-relaxed">{days[activeDay - 1].highlights}</p>
                </div>
              </div>

              {/* Accommodation */}
              <div className="flex flex-col gap-3 md:gap-4 group/item">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-[14px] md:rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold text-[11px] md:text-sm uppercase tracking-wider mb-0.5">{t("itineraryDetail.accommodation")}</h4>
                    <p className="text-gray-500 text-[11px] md:text-xs font-medium leading-relaxed">{days[activeDay - 1].accommodation}</p>
                  </div>
                </div>

                {days[activeDay - 1].accommodationImages && days[activeDay - 1].accommodationImages.some(img => img) && (
                  <div className="mt-2 md:mt-4 w-full">
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                      {days[activeDay - 1].accommodationImages.map((img, idx) => img ? (
                        <div key={idx} onClick={() => setSelectedGalleryImage(img)} className="h-16 md:h-20 sm:h-24 md:h-28 rounded-xl md:rounded-2xl overflow-hidden shadow-md group/acc-img cursor-pointer relative">
                          <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/acc-img:scale-110" loading="lazy" width="400" height="300" />
                          <div className="absolute inset-0 bg-black/10 group-hover/acc-img:bg-transparent transition-colors"></div>
                        </div>
                      ) : null)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 md:mt-8 flex gap-3 md:gap-4 w-full">
              {activeDay > 1 && (
                <button 
                  onClick={() => setActiveDay(activeDay - 1)}
                  className="w-1/2 bg-transparent border-2 border-primary text-primary py-3 md:py-4 rounded-[14px] md:rounded-2xl shadow-sm flex items-center justify-center gap-1 md:gap-2 font-bold hover:bg-primary/5 transition-all text-sm md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
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
                className={`${activeDay === 1 ? 'w-full' : 'w-1/2'} btn-premium-primary py-3 md:py-4 rounded-[14px] md:rounded-2xl shadow-sm flex items-center justify-center gap-1 md:gap-2 transition-all font-bold text-sm md:text-base`}
              >
                {activeDay === days.length ? t("itineraryDetail.tourFinished") : (
                  <>
                    {t("itineraryDetail.nextDay", "Jour suivant")} 
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
      
      {/* Other Itineraries */}
      {allItineraries && allItineraries.length > 1 && (
        <PopularItineraries 
          title={t('itineraries.otherItineraries', "Other Itineraries")} 
          id="related-itineraries" 
          itineraries={allItineraries.filter(it => it.id.toString() !== itinerary.id.toString()).slice(0, 4)} 
          isDark={false}
        />
      )}
      
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
