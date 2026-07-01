import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

import standardImg from '../assets/standard.webp';
import superiorImg from '../assets/superior.webp';
import luxuryImg from '../assets/luxury.webp';
import superLuxuryImg from '../assets/super luxury.webp';
import eastCoastImg from '../assets/east coast.webp';

const getCategoriesInfo = (t) => [
  { id: 'standard', title: t('hotels.categories.standard.title', 'Standard'), subtitle: t('hotels.categories.standard.subtitle', 'Authentique & Agréable'), description: t('hotels.categories.standard.desc', 'Des hébergements confortables avec un excellent rapport qualité-prix.'), image: standardImg },
  { id: 'superior', title: t('hotels.categories.superior.title', 'Superior'), subtitle: t('hotels.categories.superior.subtitle', 'Confort Premium'), description: t('hotels.categories.superior.desc', 'Une alliance parfaite entre authenticité et confort moderne.'), image: superiorImg },
  { id: 'luxury', title: t('hotels.categories.luxury.title', 'Luxury'), subtitle: t('hotels.categories.luxury.subtitle', 'Expériences Inoubliables'), description: t('hotels.categories.luxury.desc', 'Découvrez le raffinement avec notre sélection des hôtels les plus prestigieux.'), image: luxuryImg },
  { id: 'super-luxury', title: t('hotels.categories.superLuxury.title', 'Super luxury'), subtitle: t('hotels.categories.superLuxury.subtitle', "Le Sommet de l'Élégance"), description: t('hotels.categories.superLuxury.desc', "Des établissements d'exception offrant un service et des prestations hors normes."), image: superLuxuryImg },
  { id: 'east-south-coast', title: t('hotels.categories.eastSouth.title', 'Eastcoast & South coast'), subtitle: t('hotels.categories.eastSouth.subtitle', 'Merveilles Côtières'), description: t('hotels.categories.eastSouth.desc', 'Découvrez les plus beaux resorts le long de la magnifique côte du Sri Lanka.'), image: eastCoastImg }
];

const amenitiesList = [
  { id: 'pool', label: 'Piscine', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
  { id: 'spa', label: 'Spa & Bien-être', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'restaurant', label: 'Restaurant', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'wifi', label: 'Wi-Fi Gratuit', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
];

const getExtendedIcon = (type) => {
  if (!type) return null;
  const t = type.toLowerCase().trim();
  
  if (t.includes('bain') || t.includes('bath')) return <span className="text-xl leading-none" role="img" aria-label="bath">🛁</span>;
  if (t.includes('chambre') || t.includes('bed') || t.includes('room')) return <span className="text-xl leading-none" role="img" aria-label="bed">🛏️</span>;
  if (t.includes('bien-être') || t.includes('spa') || t.includes('wellness') || t.includes('massage')) return <span className="text-xl leading-none" role="img" aria-label="spa">💆‍♀️</span>;
  if (t.includes('nourriture') || t.includes('food') || t.includes('boisson') || t.includes('restaurant') || t.includes('dining')) return <span className="text-xl leading-none" role="img" aria-label="food">🍽️</span>;
  if (t.includes('wifi') || t.includes('internet')) return <span className="text-xl leading-none" role="img" aria-label="wifi">📶</span>;
  if (t.includes('pool') || t.includes('piscine')) return <span className="text-xl leading-none" role="img" aria-label="pool">🏊‍♂️</span>;
  if (t.includes('bar') || t.includes('drink')) return <span className="text-xl leading-none" role="img" aria-label="bar">🍸</span>;
  if (t.includes('vue') || t.includes('view') || t.includes('panorama')) return <span className="text-xl leading-none" role="img" aria-label="view">🏞️</span>;
  if (t.includes('gym') || t.includes('fitness') || t.includes('sport')) return <span className="text-xl leading-none" role="img" aria-label="gym">🏋️‍♂️</span>;

  switch(t) {
    case 'pool': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
    case 'wifi': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
    case 'family': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'restaurant': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'bar': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>; // Cocktail glass approx
    case 'bath': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    case 'food': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>; // changed to a food/cake icon
    case 'spa': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
    case 'bed': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case 'activity': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    default: return type.match(/\p{Emoji}/u) ? <span className="text-xl leading-none" role="img" aria-label="icon">{type}</span> : null;
  }
};

const HotelCategoryPage = () => {
  const { lang, category } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState('All');

  const catInfo = getCategoriesInfo(t).find(c => c.id === category) || getCategoriesInfo(t)[0];
  const getGalleryTabs = (t) => [{id:'All', label: t('hotels.galleryTabs.all', 'All')}, {id:'Bedroom', label: t('hotels.galleryTabs.room', 'Room')}, {id:'Restaurant', label: t('hotels.galleryTabs.restaurant', 'Restaurant')}, {id:'Panorama', label: t('hotels.galleryTabs.panorama', 'Panorama')}];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHotels = async () => {
      try {
        let tableName = 'hotels';
        if (lang && lang !== 'fr') {
          tableName = `hotels_${lang}`;
        }
        let { data, error } = await supabase.from(tableName).select('*');
        if (error || !data || data.length === 0) {
          console.warn(`Fallback to French for hotels due to empty data or error in ${tableName}`);
          const fallback = await supabase.from('hotels').select('*');
          data = fallback.data;
          error = fallback.error;
        }
        if (error) throw error;
        
        let categoryHotels = [];
        if (data) {
          data.forEach(hotel => {
            let cat = hotel.category?.toLowerCase().trim() || 'standard';
            
            if (cat.includes('super luxury') || cat.includes('exclusive')) cat = 'super-luxury';
            else if (cat.includes('east') || cat.includes('south')) cat = 'east-south-coast';
            else if (cat.includes('lux')) cat = 'luxury';
            else if (cat.includes('sup')) cat = 'superior';
            else cat = 'standard';

            if (cat === category) {
              categoryHotels.push({
                ...hotel,
                extendedAmenities: hotel.extended_amenities || { popular: [], categories: [] },
                categorizedGallery: hotel.categorized_gallery || []
              });
            }
          });
        }
        setHotels(categoryHotels);
      } catch (err) {
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [category, lang]);

  // Lock body scroll when hotel detail modal is open
  useEffect(() => {
    if (selectedHotel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedHotel]);

  const filteredGallery = selectedHotel?.categorizedGallery 
    ? (activeGalleryTab === 'All' ? selectedHotel.categorizedGallery : selectedHotel.categorizedGallery.filter(img => img.type === activeGalleryTab)).filter(img => img.url && img.url.trim() !== '')
    : [];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img src={catInfo.image} alt={catInfo.title} className="absolute inset-0 w-full h-full object-cover object-center" width="1920" height="1080" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm mb-6 w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            Retour
          </button>
          <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">
            {catInfo.subtitle}
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-bold font-serif mb-4 leading-tight">{catInfo.title}</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            {catInfo.description}
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <div className="text-center py-20 text-gray-500">{t('hotels.loading', 'Chargement...')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {hotels.map((hotel, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedHotel(hotel)}
                className="bg-white rounded-[32px] overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full cursor-pointer"
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width="800" height="600" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-primary font-serif mb-2">{hotel.name}</h3>
                  <span className="text-luxury text-xs font-bold uppercase tracking-widest mb-4 block">{hotel.location}</span>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {hotel.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-primary hover:text-luxury transition-colors font-bold text-sm flex items-center gap-2 group/btn">
                      {t('hotels.viewDetails', 'Voir les détails')}
                      <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Detail Modal */}
      <AnimatePresence>
        {selectedHotel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95%] max-w-[1400px] h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="relative flex-shrink-0 bg-white z-20 px-6 py-4 md:px-12 md:py-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-luxury text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1">{t('hotels.details', "Détails de l'hôtel")}</span>
                  <h2 className="text-primary text-xl md:text-3xl font-bold font-serif pr-4">{selectedHotel.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedHotel(null)}
                  className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-none scroll-smooth bg-white pb-16">
                {/* Hero Image */}
                <div className="relative h-[40vh] md:h-[50vh] w-full">
                  <img src={selectedHotel.image} alt={selectedHotel.name} draggable={false} className="w-full h-full object-cover select-none" loading="lazy" width="1200" height="800" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-6 md:left-12 max-w-3xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/30">
                        {selectedHotel.location}
                      </span>
                      <div className="flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                        {Array.from({ length: selectedHotel.stars }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>
                    <h2 className="text-white text-3xl md:text-5xl font-bold font-serif drop-shadow-xl">{selectedHotel.name}</h2>
                  </div>
                </div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-16 flex flex-col gap-6 md:gap-8 items-start">
                  <div className="w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-[1px] bg-primary"></div>
                      <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">{t('hotels.history', "L'Histoire")}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-primary font-serif leading-tight">
                      {t('hotels.about', "À propos")} <span className="text-gray-400 italic font-light">{t('hotels.aboutSuffix', "de l'hôtel")}</span>
                    </h3>
                  </div>

                  <div className="w-full max-w-5xl">
                    <div className="relative pt-2 pl-10 md:pl-12">
                      <span className="absolute -top-6 left-0 text-[6rem] md:text-[7rem] text-primary/10 font-serif leading-none select-none">“</span>
                      <p className="text-gray-700 text-lg md:text-xl leading-[2.2rem] font-medium relative z-10 first-letter:text-6xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
                        {selectedHotel.description}
                      </p>
                    </div>
                    
                    {/* Fallback Basic Amenities & Gallery */}
                    {!selectedHotel.extendedAmenities && selectedHotel.amenities && (
                      <div className="pt-8 border-t border-gray-100">
                        <h4 className="text-xl font-bold text-primary font-serif mb-6">{t('hotels.mainAmenities', "Équipements Principaux")}</h4>
                        <div className="flex flex-wrap gap-4 mb-10">
                          {selectedHotel.amenities.map((amId) => {
                            const amenity = amenitiesList.find(a => a.id === amId);
                            if (!amenity) return null;
                            return (
                              <div key={amId} className="flex items-center gap-3 bg-[#f8f9fa] px-4 py-2.5 rounded-full border border-gray-100">
                                <span className="text-luxury">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={amenity.icon} /></svg>
                                </span>
                                <span className="text-gray-700 font-medium text-sm">{amenity.label}</span>
                              </div>
                            );
                          })}
                        </div>

                        {selectedHotel.gallery && selectedHotel.gallery.filter(img => img && img.trim() !== '').length > 0 && (
                          <div>
                            <h4 className="text-xl font-bold text-primary font-serif mb-6">{t('hotels.preview', "Aperçu")}</h4>
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 hide-scrollbar">
                              {selectedHotel.gallery.filter(img => img && img.trim() !== '').map((img, idx) => (
                                <div key={idx} className="w-[85vw] sm:w-[60vw] md:w-full flex-shrink-0 snap-center rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] relative group shadow-sm">
                                  <img src={img} alt={`${selectedHotel.name} - Vue ${idx + 1}`} draggable={false} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none" loading="lazy" width="800" height="600" />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Extended Details */}
                {selectedHotel.extendedAmenities && (
                  <div className="max-w-7xl mx-auto px-6 pb-12 md:px-12 md:pb-24 space-y-16">
                    <div>
                      <h3 className="text-2xl font-bold text-primary font-serif mb-2">{t('hotels.amenities', "Équipements")} - {selectedHotel.location}</h3>
                      <div className="mb-10">
                        <p className="text-gray-500 font-medium mb-4 text-sm">{t('hotels.popularServices', "Services les plus populaires")}</p>
                        <div className="flex flex-wrap items-center gap-6">
                          {selectedHotel.extendedAmenities.popular && selectedHotel.extendedAmenities.popular.filter(pop => pop != null && pop.label).map((pop, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-700 font-medium text-base capitalize">
                              <span className="text-green-600">{getExtendedIcon(pop.icon)}</span>
                              {pop.label}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                        {selectedHotel.extendedAmenities.categories.map((cat, idx) => (
                          <div key={idx} className="space-y-4">
                            <div className="flex items-center gap-3 mb-5">
                              <span className="text-gray-800">{getExtendedIcon(cat.icon || cat.title)}</span>
                              <h4 className="font-bold text-gray-800 text-lg capitalize">{cat.title}</h4>
                            </div>
                            <ul className="space-y-3">
                              {cat.items && cat.items.filter(item => item != null && item.trim() !== '').map((item, i) => {
                                const tagRegex = /\[([^\]]+)\]/g;
                                let baseText = item;
                                const tags = [];
                                let match;
                                while ((match = tagRegex.exec(item)) !== null) {
                                  tags.push(match[1]);
                                }
                                baseText = baseText.replace(tagRegex, '').trim();

                                return (
                                  <li key={i} className="flex items-start gap-3 text-base text-gray-700">
                                    <svg className="w-4 h-4 text-gray-800 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span className="flex-1 flex flex-wrap items-center gap-1.5 leading-tight capitalize">
                                      {baseText}
                                      {tags.map((tag, tagIdx) => (
                                        <span key={tagIdx} className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-medium">
                                          {tag}
                                        </span>
                                      ))}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedHotel.categorizedGallery && (
                      <div className="text-center pt-8">
                        <h3 className="text-3xl font-bold text-primary font-serif mb-8">{t('hotels.photoGallery', "Galerie de photos")}</h3>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-10 border-b border-gray-100 pb-2">
                          {getGalleryTabs(t).map(tab => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveGalleryTab(tab.id)}
                              className={`px-4 py-2 text-sm md:text-base font-bold transition-all relative ${
                                activeGalleryTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              {tab.label}
                              {activeGalleryTab === tab.id && (
                                <motion.div layoutId="galleryTab" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary" />
                              )}
                            </button>
                          ))}
                        </div>

                        <motion.div 
                          layout
                          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                          <AnimatePresence>
                            {filteredGallery.map((img, idx) => (
                              <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={`${img.type}-${idx}`}
                                className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                              >
                                <img src={img.url} alt={img.type} draggable={false} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none" loading="lazy" width="800" height="600" />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelCategoryPage;
