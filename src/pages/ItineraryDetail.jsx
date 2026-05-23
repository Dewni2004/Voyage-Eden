import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItineraries } from '../services/contentService';

import { Helmet } from 'react-helmet-async';
import IncludedExcluded from '../components/IncludedExcluded/IncludedExcluded';
import PaymentPolicy from '../components/PaymentPolicy/PaymentPolicy';
import BookingCard from '../components/BookingCard/BookingCard';
import map from '../assets/Tra.png';

const ItineraryDetail = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const dynamicData = await getItineraries();
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
  }, [id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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
      <section className="relative h-[80vh] flex items-center justify-center">
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
        <div className="relative z-10 flex flex-col items-center w-full text-white text-center px-6 -mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-xl mb-6 leading-tight">
            {itinerary.title}
          </h1>
        </div>

        {/* Info Bar (Floating Half-on-Half) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-20">
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
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">Durée</p>
                  <p className="text-primary text-sm md:text-xl font-bold whitespace-nowrap">{itinerary.duration}</p>
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
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">Groupe</p>
                  <p className="text-primary text-sm md:text-xl font-bold whitespace-nowrap">{itinerary.group}</p>
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
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1">Effort</p>
                  <p className="text-primary text-sm md:text-xl font-bold whitespace-nowrap">{itinerary.effort}</p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full flex items-center gap-4 my-6">
              <div className="flex-grow h-px bg-gray-100"></div>
              <p className="text-gray-400 text-[8px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Points forts et visites</p>
              <div className="flex-grow h-px bg-gray-100"></div>
            </div>

            {/* Highlights Thumbnails */}
            <div className="flex flex-wrap justify-center items-start gap-y-10 gap-x-6 md:gap-x-8">
              {itinerary.days?.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`relative group cursor-pointer transition-all duration-300 ${activeDay === day.id ? 'scale-110' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
                  onClick={() => { 
                    setActiveDay(day.id); 
                    if (window.innerWidth < 1024) {
                      setIsModalOpen(true); 
                    } else {
                      document.getElementById('itinerary-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${activeDay === day.id ? 'border-primary shadow-lg' : 'border-white shadow-md'}`}>
                    <img 
                      src={day.image} 
                      alt={day.location} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white transition-colors duration-300 ${activeDay === day.id ? 'bg-primary' : 'bg-gray-400 group-hover:bg-primary'}`}>
                    <span className="text-white text-[9px] font-bold">{day.id}</span>
                  </div>

                  {/* Image Preview on Hover */}
                  <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-64 h-44 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[60] scale-50 group-hover:scale-100 origin-bottom">
                    <img 
                      src={day.image} 
                      alt={day.location} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4">
                      <p className="text-white text-xs font-bold truncate leading-tight">{day.location.split(' - ')[0]}</p>
                      <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider">{day.displayLabel || `Jour ${day.id}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for the floating info bar */}
      <div className="h-40 md:h-48"></div>

      {/* Interactive Itinerary Section */}
      <section id="itinerary-section" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          
          {/* Left Column: Interactive Map */}
          <div className="relative group/map h-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-luxury/5 rounded-[48px] blur-2xl opacity-0 group-hover/map:opacity-100 transition-duration-700"></div>
            <div className="bg-white rounded-[48px] p-2 flex items-center justify-center h-full border border-gray-100 shadow-2xl relative z-10 overflow-hidden group/map-inner">
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
              
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-[450px] aspect-[3/4]">
                  <svg viewBox="0 0 300 450" className="w-full h-full drop-shadow-2xl">
                    <image href={map} x="0" y="0" width="300" height="450" preserveAspectRatio="xMidYMid meet" className="opacity-100" />
                    
                    {/* Route Lines */}
                    <g className="route-lines">
                      {days.map((day, index) => {
                        if (index === 0) return null;
                        const prevDay = days[index - 1];
                        return (
                          <line 
                            key={`line-${day.id}`}
                            x1={prevDay.coords.x} y1={prevDay.coords.y} x2={day.coords.x} y2={day.coords.y} 
                            stroke="#b02a30" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round"
                            className={`transition-all duration-1000 ${activeDay >= day.id ? 'opacity-40' : 'opacity-0'}`}
                          />
                        );
                      })}
                    </g>

                    {/* Day Markers */}
                    {days.map((day) => (
                      <g 
                        key={day.id} 
                        onClick={() => { setActiveDay(day.id); if (window.innerWidth < 1024) setIsModalOpen(true); }} 
                        className="cursor-pointer group/marker"
                      >
                        {/* Marker Shadow */}
                        <circle cx={day.coords.x} cy={day.coords.y} r="14" className="fill-black/5" transform="translate(1,1)" />
                        
                        {/* Main Marker Circle */}
                        <circle 
                          cx={day.coords.x} cy={day.coords.y} 
                          r={activeDay === day.id ? "14" : "12"} 
                          className={`transition-all duration-300 ${activeDay === day.id ? 'fill-primary shadow-lg' : 'fill-primary/70 group-hover/marker:fill-primary'}`} 
                        />
                        
                        {/* Day Number */}
                        <text 
                          x={day.coords.x} y={day.coords.y} dy=".35em" textAnchor="middle" 
                          className="fill-white text-[9px] font-bold pointer-events-none select-none"
                        >
                          {day.id}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Map Label Overlay */}
              <div className="absolute top-8 left-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Live Route</span>
                </div>
              </div>

              {/* Interaction Guide */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-sm opacity-0 group-hover/map-inner:opacity-100 transition-opacity duration-300">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Cliquez sur un jour pour explorer</p>
              </div>
            </div>
          </div>

          {/* Right Column: Day Details Card */}
          <div className="bg-[#e9ecef] rounded-[40px] p-8 md:p-10 shadow-2xl border border-white h-full hidden lg:flex flex-col transition-all duration-500">
            {/* Day Image */}
            <div className="relative h-80 rounded-[32px] overflow-hidden mb-10 shadow-xl group/img">
              <img 
                src={days[activeDay - 1].image} 
                alt={days[activeDay - 1].location} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 flex flex-col items-start gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                  {days[activeDay - 1].displayLabel || `Jour ${days[activeDay - 1].id}`}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-xl leading-tight">
                  {days[activeDay - 1].location.split(' - ')[0]}
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
                  <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-0.5">Points forts</h4>
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
                    <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-0.5">Hébergement</h4>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">{days[activeDay - 1].accommodation}</p>
                  </div>
                </div>

                {days[activeDay - 1].accommodationImages && days[activeDay - 1].accommodationImages.some(img => img) && (
                  <div className="mt-4 w-full">
                    <div className="grid grid-cols-2 gap-3">
                      {days[activeDay - 1].accommodationImages.map((img, idx) => img ? (
                        <div key={idx} onClick={() => setSelectedGalleryImage(img)} className="h-32 rounded-2xl overflow-hidden shadow-md group/acc-img cursor-pointer relative">
                          <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover/acc-img:scale-110" />
                          <div className="absolute inset-0 bg-black/10 group-hover/acc-img:bg-transparent transition-colors"></div>
                        </div>
                      ) : null)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Day Button */}
            <button 
              onClick={() => activeDay < days.length && setActiveDay(activeDay + 1)}
              className="mt-12 w-full btn-premium-primary py-4 rounded-2xl shadow-sm disabled:opacity-40 disabled:pointer-events-none"
              disabled={activeDay === days.length}
            >
              {activeDay === days.length ? 'Tour terminé' : 'Jour suivant'}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-h-[85dvh] overflow-y-auto rounded-t-[40px] shadow-2xl p-6 pb-10">
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            
            {/* Image & Close Button Overlay */}
            <div className="relative h-44 rounded-3xl overflow-hidden mb-6 shadow-md">
              <img src={days[activeDay - 1].image} alt="" className="w-full h-full object-cover" />
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:bg-black/60"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <span className="text-luxury text-[10px] font-bold uppercase tracking-widest mb-2 block">{days[activeDay - 1].displayLabel || `Jour ${days[activeDay - 1].id}`}</span>
            <h3 className="text-primary text-2xl font-bold mb-3">{days[activeDay - 1].location}</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">{days[activeDay - 1].description}</p>
            <button onClick={() => { if (activeDay < days.length) setActiveDay(activeDay + 1); else setIsModalOpen(false); }} className="w-full btn-premium-primary py-3.5 rounded-2xl shadow-sm">
              {activeDay === days.length ? 'Fermer' : 'Jour suivant'}
            </button>
          </div>
        </div>
      )}

      <IncludedExcluded />
      <PaymentPolicy />
      <BookingCard price={itinerary.price} itineraryTitle={itinerary.title} />
      
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
