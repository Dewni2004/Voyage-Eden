import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItineraries } from '../services/contentService';
import { staticItineraries } from '../data/staticItineraries';
import IncludedExcluded from '../components/IncludedExcluded/IncludedExcluded';
import PaymentPolicy from '../components/PaymentPolicy/PaymentPolicy';
import BookingCard from '../components/BookingCard/BookingCard';

const ItineraryDetail = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const dynamicData = await getItineraries();
        const all = [...staticItineraries, ...dynamicData];
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Loading Tour Details...</div>;
  if (!itinerary) return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Tour Not Found</div>;

  const days = itinerary.days || [];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={itinerary.image} 
            alt={itinerary.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content & Info Bar Container */}
        <div className="relative z-10 flex flex-col items-center w-full mt-20 md:mt-0 text-white">
          <div className="text-center px-6 max-w-5xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight drop-shadow-xl mb-6 leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-white/90 text-base md:text-xl font-medium max-w-3xl mx-auto drop-shadow-lg">
              {itinerary.description}
            </p>
          </div>

          {/* Info Bar */}
          <div className="relative md:absolute bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full max-w-5xl px-4 z-20">
            <div className="bg-white rounded-[32px] shadow-2xl py-8 px-12 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Duration */}
              <div className="flex flex-row md:flex-col items-center md:text-center space-x-4 md:space-x-0 md:space-y-2">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Duration</p>
                  <p className="text-primary text-lg font-black">{itinerary.duration}</p>
                </div>
              </div>

              {/* Group */}
              <div className="flex flex-row md:flex-col items-center md:text-center space-x-4 md:space-x-0 md:space-y-2">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Group</p>
                  <p className="text-primary text-lg font-black">{itinerary.group}</p>
                </div>
              </div>

              {/* Effort */}
              <div className="flex flex-row md:flex-col items-center md:text-center space-x-4 md:space-x-0 md:space-y-2">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/></svg>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Effort</p>
                  <p className="text-primary text-lg font-black">{itinerary.effort}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for the floating info bar */}
      <div className="hidden md:block h-48"></div>

      {/* Interactive Itinerary Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Interactive Map */}
          <div className="relative">
            <div className="bg-[#f8fbff] rounded-[40px] p-6 sm:p-12 flex items-center justify-center min-h-[500px] border border-gray-100 shadow-inner">
              <div className="relative w-full max-w-[450px] aspect-[3/4]">
                <svg viewBox="0 0 300 450" className="w-full h-full filter drop-shadow-2xl">
                  <path d="M142 432C128 428 111 416 100 405C85 390 73 370 65 348C58 328 55 303 58 278C60 258 64 240 70 223C75 210 78 198 78 185C78 172 75 160 70 148C65 135 62 120 62 105C62 85 68 65 78 50C88 35 105 25 125 22C140 20 155 22 170 28C185 35 198 48 208 65C218 82 223 100 223 120C223 140 218 160 208 178C198 195 185 208 170 218C155 228 145 240 142 255C140 265 142 278 148 290C155 305 165 318 178 328C195 342 210 360 218 380C225 400 225 420 215 435C205 450 185 455 165 450C155 448 148 440 142 432Z" fill="#769d7a" />
                  
                  {/* Route Lines */}
                  <g className="route-lines">
                    {days.map((day, index) => {
                      if (index === 0) return null;
                      const prevDay = days[index - 1];
                      return (
                        <line 
                          key={`line-${day.id}`}
                          x1={prevDay.coords.x} y1={prevDay.coords.y} x2={day.coords.x} y2={day.coords.y} 
                          stroke="white" strokeWidth="4" strokeDasharray="8,6" strokeLinecap="round"
                          className={`transition-all duration-1000 ${activeDay >= day.id ? 'opacity-100' : 'opacity-0'}`}
                        />
                      );
                    })}
                  </g>

                  {/* Day Markers */}
                  {days.map((day) => (
                    <g key={day.id} onClick={() => { setActiveDay(day.id); if (window.innerWidth < 1024) setIsModalOpen(true); }} className="cursor-pointer group">
                      <circle cx={day.coords.x} cy={day.coords.y} r="20" className="fill-transparent" />
                      <circle cx={day.coords.x} cy={day.coords.y} r="14" className={`transition-all duration-300 ${activeDay === day.id ? 'fill-[#b02a30] scale-110' : 'fill-gray-400 group-hover:fill-gray-500'}`} />
                      <text x={day.coords.x} y={day.coords.y} dy=".35em" textAnchor="middle" className="fill-white text-[10px] font-black pointer-events-none">{day.id}</text>
                    </g>
                  ))}
                </svg>
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
              <div className="absolute bottom-6 left-8">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/30">
                  Day {days[activeDay - 1].id}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10 px-2">
              <h3 className="text-primary text-2xl font-bold mb-4">{days[activeDay - 1].location}</h3>
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
                  <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-0.5">Highlights</h4>
                  <p className="text-gray-500 text-xs font-medium leading-relaxed">{days[activeDay - 1].highlights}</p>
                </div>
              </div>

              {/* Accommodation */}
              <div className="flex items-center gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-0.5">Accommodation</h4>
                  <p className="text-gray-500 text-xs font-medium leading-relaxed">{days[activeDay - 1].accommodation}</p>
                </div>
              </div>
            </div>

            {/* Next Day Button */}
            <button 
              onClick={() => activeDay < days.length && setActiveDay(activeDay + 1)}
              className="mt-12 w-full bg-primary hover:bg-luxury text-white font-bold py-5 rounded-2xl shadow-xl transition-all"
              disabled={activeDay === days.length}
            >
              {activeDay === days.length ? 'Tour Concluded' : `Next Day ${activeDay + 1} - ${days[activeDay].location}`}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-[40px] shadow-2xl p-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="h-48 rounded-[32px] overflow-hidden mb-8">
              <img src={days[activeDay - 1].image} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-primary text-2xl font-bold mb-4">{days[activeDay - 1].location}</h3>
            <p className="text-gray-700 mb-8">{days[activeDay - 1].description}</p>
            <button onClick={() => { if (activeDay < days.length) setActiveDay(activeDay + 1); else setIsModalOpen(false); }} className="w-full bg-primary text-white font-bold py-4 rounded-2xl">
              {activeDay === days.length ? 'Close' : `Next: ${days[activeDay].location}`}
            </button>
          </div>
        </div>
      )}

      <IncludedExcluded />
      <PaymentPolicy />
      <BookingCard />
    </div>
  );
};

export default ItineraryDetail;
