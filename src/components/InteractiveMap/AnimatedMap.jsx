import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGPSForDay, convertGPSToPercentage, getMatchedCity, getRouteWaypoints } from '../../utils/mapUtils';
import newMapImg from '../../assets/New_Map.webp';
import map8DaysColors from '../../assets/Sri Lanka 8 días - La isla de los colores.jpg';
import map12DaysColors from '../../assets/Sri Lanka en 12 días - Explora La Mítica Ceylán.png';
import map15DaysColors from '../../assets/Sri Lanka en 15 días - El País de las Especias.jpg';
import map9DaysHoneymoon from '../../assets/Sri Lanka 9 días Luna de Miel en el Paraíso.jpg';
import map11DaysHoneymoon from '../../assets/Sri Lanka 11 días Luna de Miel en el paraíso.jpg';
import map14DaysHoneymoon from '../../assets/Sri Lanka 14 días Luna de Miel en el Paraíso.jpg';
import map9DaysFamilyDiv from '../../assets/Sri Lanka 9 Días Diversión En Familia.jpg';
import map10DaysFamilyElef from '../../assets/Sri Lanka 10 días - La Ruta del Elefante.jpg';
import map9DaysFamilyLux from '../../assets/Sri Lanka 9 Días Vacaciones De Lujo En Familia.jpg';
import map12DaysFamilyLux from '../../assets/Sri Lanka en 12 Días - Verano de lujo en familia.jpg';
import map10DaysAventuraLux from '../../assets/Sri Lanka 10 Días Aventura En Familia Superlujo.jpg';
import map12DaysGranViajeLux from '../../assets/Sri Lanka 12 días - Gran Viaje en lujo exclusivo.jpg';
import map17DaysAdv from '../../assets/Trekking y Monumentos en 17 Días.jpg';
import map18DaysAdv from '../../assets/Especialmente relajado! en 18 Días.jpg';
import map19DaysAdv from '../../assets/Sri Lanka En 19 Días - Toda Sri Lanka.jpg';
import map20DaysAdv from '../../assets/Sri Lanka en 20 días - Aventura sin igual.jpg';
import map11DaysPerahera from '../../assets/Sri Lanka 11 Días – Con Perahera.jpg';
import map10DaysPerahera from '../../assets/Sri Lanka En 10 Días – Esala Perahera.jpg';
import map9DaysPerahera from '../../assets/Sri Lanka En 9 Días - Especial Esala Perahera.jpg';
import map15DaysSurf from '../../assets/Sri Lanka 15 Días - Aventura, Surf Y Senderismo.jpg';
import map12DaysSurf from '../../assets/Sri Lanka 12 Días - Surf, Sol, Safaris Y Playa.jpg';
import map11DaysDive from '../../assets/Sri Lanka 11 Días El Buceo En La Mítica Isla.jpg';
import map7DaysDive from '../../assets/Sri Lanka 7 Días El Edén Del Submarinismo.jpg';
import map10DaysGolf from '../../assets/10 Días En Los Mejores Campos De Golf De Asia.jpg';
import map14DaysGolf from '../../assets/14 Días de golf apuntando al Este.jpg';
import map21DaysGolf from '../../assets/21 Días de Golf en Sri Lanka.jpg';
import map8DaysSafaris from '../../assets/Sri Lanka 8 días - Safaris sin límites.jpg';
import map8DaysColores2 from '../../assets/Sri Lanka 8 días - La isla de los colores (2).jpg';
import map8DaysNorte from '../../assets/Norte de SriLanka 8 días con Playas del Este.jpg';
import map8DaysSur from '../../assets/Sólo Sur de Sri Lanka en 8 días.jpg';
import map15DaysSuperior from '../../assets/Sri Lanka 15 Días - En Hoteles Superior.jpg';
import map10DaysAyurveda from '../../assets/Srilanka 10 días Experiencia Ayurveda para tu bienestar.jpg';
import map9DaysCorazon from '../../assets/Sri Lanka 9 Días - Viaje Al Corazón De Ceilán.jpg';
const CUSTOM_CITY_OFFSETS = {
  'negombo': { x: -8, y: -4 },
  'aéroport': { x: -8, y: -4 },
  'airport': { x: -8, y: -4 },
  'colombo': { x: -8, y: 4 },
  'mount lavinia': { x: -8, y: 4 },
  'galle': { x: -8, y: 8 },
  'unawatuna': { x: -8, y: 8 },
  'hikkaduwa': { x: -8, y: 8 },
  'weligama': { x: -4, y: 8 },
  'mirissa': { x: 0, y: 8 },
  'matara': { x: 4, y: 8 },
  'bentota': { x: -8, y: 4 },
  'anuradhapura': { x: -8, y: -8 },
  'sigiriya': { x: -7, y: -8 },
  'dambulla': { x: -8, y: 0 },
  'habarana': { x: 8, y: -8 },
  'polonnaruwa': { x: 8, y: 2 },
  'minneriya': { x: 8, y: 2 },
  'trincomalee': { x: 8, y: -8 },
  'kandy': { x: -8, y: 4 },
  'nuwara eliya': { x: 8, y: 6 },
  'ella': { x: 8, y: -4 },
  'yala': { x: 8, y: 4 },
  'kataragama': { x: 8, y: 4 },
  'tangalle': { x: 8, y: 8 },
};

const getCityOffset = (day) => {
  const matchedCity = getMatchedCity(day);
  if (matchedCity && CUSTOM_CITY_OFFSETS[matchedCity]) {
    return CUSTOM_CITY_OFFSETS[matchedCity];
  }
  const isRight = day.coords?.x > 50;
  const isBottom = day.coords?.y > 50;
  return {
    x: isRight ? 5 : -5,
    y: isBottom ? 6 : -6
  };
};

const AnimatedMap = ({ days, activeDay, setActiveDay, setIsModalOpen, itineraryTitle, itineraryId }) => {
  const [pointsData, setPointsData] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hoveredDayId, setHoveredDayId] = useState(null);


  const isCustomMap8Days = itineraryId === '9be862d3-2cb3-424e-b56a-aaaf384bb8ef';
  const isCustomMap12Days = itineraryId === 'e43b5dec-05c3-48a2-854e-45fef616675e';
  const isCustomMap15Days = itineraryId === 'f889e49c-89be-40fa-8f75-1a96be58664a';
  const isCustomMap9DaysHoneymoon = itineraryId === '5786c88e-6e80-404c-9e67-c7c8b9594f4f';
  const isCustomMap11DaysHoneymoon = itineraryId === '6b5bdec5-93a6-4f5d-8f55-4de8b0637f17';
  const isCustomMap14DaysHoneymoon = itineraryId === 'e6ed3219-8240-47aa-bc18-2e30ab4aa8c1';
  const isCustomMap9DaysFamilyDiv = itineraryId === 'f9087bed-98d7-473f-8981-f7222f662958';
  const isCustomMap10DaysFamilyElef = itineraryId === 'acaecf14-07bc-4bdd-ba6c-8f1f3146b3a4';
  const isCustomMap9DaysFamilyLux = itineraryId === '19e84602-a2cc-4cc8-88f3-bbbf311b74ba';
  const isCustomMap12DaysFamilyLux = itineraryId === '7e2b6fa2-a297-4376-933d-ecdbac951183';
  const isCustomMap10DaysAventuraLux = itineraryId === 'c1264913-ac00-4e83-acfd-73e139efd628';
  const isCustomMap12DaysGranViajeLux = itineraryId === '8c630a0f-b4e0-44f6-9a38-af954d0d8cf8';
  const isCustomMap17DaysAdv = itineraryId === '9b6c3e5a-e6ed-4219-ae82-b9535cf3a048';
  const isCustomMap18DaysAdv = itineraryId === '5b039c8f-8955-44de-9788-2b8ef2f958df';
  const isCustomMap19DaysAdv = itineraryId === '8882bc3e-7338-47cc-b4aa-3573a1efad31';
  const isCustomMap20DaysAdv = itineraryId === 'e20e7213-a43e-48dc-92b8-4d7dff732774';
  const isCustomMap11DaysPerahera = itineraryId === '8fc7a86b-90f9-4736-8d79-81da76a86879';
  const isCustomMap10DaysPerahera = itineraryId === 'bf91c1df-7027-42b9-8918-1e5033fb9fa8';
  const isCustomMap9DaysPerahera = itineraryId === '1921a084-239d-43e7-be83-a64e029ec9a3';
  const isCustomMap15DaysSurf = itineraryId === 'd9fa26f8-7ba8-483f-a942-7c1f130004ca';
  const isCustomMap12DaysSurf = itineraryId === '8517ac5e-d6dc-4c9d-9879-b1f8203f4290';
  const isCustomMap11DaysDive = itineraryId === '268f9c88-4fe4-4d37-ad6e-e4b1f0c40923';
  const isCustomMap7DaysDive = itineraryId === '37b1b6e1-c1f9-4260-bc2c-6351305ab197';
  const isCustomMap10DaysGolf = itineraryId === '3ff5c7a9-f8cd-455a-b8bd-66d56431f299';
  const isCustomMap14DaysGolf = itineraryId === '78eeebc2-6926-4ffa-8826-1d61570b0ab6';
  const isCustomMap21DaysGolf = itineraryId === 'fd4ec913-9f0c-4a17-9b0e-9d25ebb6880f';
  const isCustomMap8DaysSafaris = itineraryId === 'db5ed07a-1c15-4ec4-9081-57bb092c42d9';
  const isCustomMap8DaysColores2 = itineraryId === 'e96a035f-0d5f-4d3f-bb1b-d0524c5c78c9';
  const isCustomMap8DaysNorte = itineraryId === 'b6b8b207-f55c-4c83-a7d8-3caa5284c73b';
  const isCustomMap8DaysSur = itineraryId === 'b9fc78bc-c766-4b08-8a84-ef4224c143d4';
  const isCustomMap15DaysSuperior = itineraryId === 'ef67877f-92f9-4113-9880-94a03f79413f';
  const isCustomMap10DaysAyurveda = itineraryId === 'c9492146-5f0f-46b8-98b0-3575fc7b6e5a';
  const isCustomMap9DaysCorazon = itineraryId === 'd3285989-25c1-4f88-b018-493d85751509';

  const isCustomMap = isCustomMap8Days || isCustomMap12Days || isCustomMap15Days || isCustomMap9DaysHoneymoon || isCustomMap11DaysHoneymoon || isCustomMap14DaysHoneymoon || isCustomMap9DaysFamilyDiv || isCustomMap10DaysFamilyElef || isCustomMap9DaysFamilyLux || isCustomMap12DaysFamilyLux || isCustomMap10DaysAventuraLux || isCustomMap12DaysGranViajeLux || isCustomMap17DaysAdv || isCustomMap18DaysAdv || isCustomMap19DaysAdv || isCustomMap20DaysAdv || isCustomMap11DaysPerahera || isCustomMap10DaysPerahera || isCustomMap9DaysPerahera || isCustomMap15DaysSurf || isCustomMap12DaysSurf || isCustomMap11DaysDive || isCustomMap7DaysDive || isCustomMap10DaysGolf || isCustomMap14DaysGolf || isCustomMap21DaysGolf || isCustomMap8DaysSafaris || isCustomMap8DaysColores2 || isCustomMap8DaysNorte || isCustomMap8DaysSur || isCustomMap15DaysSuperior || isCustomMap10DaysAyurveda || isCustomMap9DaysCorazon;

  let currentMapImg = newMapImg;
  if (isCustomMap8Days) currentMapImg = map8DaysColors;
  if (isCustomMap12Days) currentMapImg = map12DaysColors;
  if (isCustomMap15Days) currentMapImg = map15DaysColors;
  if (isCustomMap9DaysHoneymoon) currentMapImg = map9DaysHoneymoon;
  if (isCustomMap11DaysHoneymoon) currentMapImg = map11DaysHoneymoon;
  if (isCustomMap14DaysHoneymoon) currentMapImg = map14DaysHoneymoon;
  if (isCustomMap9DaysFamilyDiv) currentMapImg = map9DaysFamilyDiv;
  if (isCustomMap10DaysFamilyElef) currentMapImg = map10DaysFamilyElef;
  if (isCustomMap9DaysFamilyLux) currentMapImg = map9DaysFamilyLux;
  if (isCustomMap12DaysFamilyLux) currentMapImg = map12DaysFamilyLux;
  if (isCustomMap10DaysAventuraLux) currentMapImg = map10DaysAventuraLux;
  if (isCustomMap12DaysGranViajeLux) currentMapImg = map12DaysGranViajeLux;
  if (isCustomMap17DaysAdv) currentMapImg = map17DaysAdv;
  if (isCustomMap18DaysAdv) currentMapImg = map18DaysAdv;
  if (isCustomMap19DaysAdv) currentMapImg = map19DaysAdv;
  if (isCustomMap20DaysAdv) currentMapImg = map20DaysAdv;
  if (isCustomMap11DaysPerahera) currentMapImg = map11DaysPerahera;
  if (isCustomMap10DaysPerahera) currentMapImg = map10DaysPerahera;
  if (isCustomMap9DaysPerahera) currentMapImg = map9DaysPerahera;
  if (isCustomMap15DaysSurf) currentMapImg = map15DaysSurf;
  if (isCustomMap12DaysSurf) currentMapImg = map12DaysSurf;
  if (isCustomMap11DaysDive) currentMapImg = map11DaysDive;
  if (isCustomMap7DaysDive) currentMapImg = map7DaysDive;
  if (isCustomMap10DaysGolf) currentMapImg = map10DaysGolf;
  if (isCustomMap14DaysGolf) currentMapImg = map14DaysGolf;
  if (isCustomMap21DaysGolf) currentMapImg = map21DaysGolf;
  if (isCustomMap8DaysSafaris) currentMapImg = map8DaysSafaris;
  if (isCustomMap8DaysColores2) currentMapImg = map8DaysColores2;
  if (isCustomMap8DaysNorte) currentMapImg = map8DaysNorte;
  if (isCustomMap8DaysSur) currentMapImg = map8DaysSur;
  if (isCustomMap15DaysSuperior) currentMapImg = map15DaysSuperior;
  if (isCustomMap10DaysAyurveda) currentMapImg = map10DaysAyurveda;
  if (isCustomMap9DaysCorazon) currentMapImg = map9DaysCorazon;

  useEffect(() => {
    if (!days || days.length === 0) return;
    
    // Process days to get screen coordinates
    const processed = days.map((day, index) => {
      const gps = getGPSForDay(day);
      const coords = convertGPSToPercentage(gps, day);
      const routeWaypoints = getRouteWaypoints(day.location);
      // Ensure the main destination is always at the end of the route
      if (routeWaypoints.length === 0) {
        routeWaypoints.push(coords);
      } else {
        const lastWp = routeWaypoints[routeWaypoints.length - 1];
        if (lastWp.x !== coords.x || lastWp.y !== coords.y) {
          routeWaypoints.push(coords);
        }
      }
      return {
        ...day,
        gps,
        coords, // main destination
        routeWaypoints, // detailed path
        index
      };
    });
    setPointsData(processed);
  }, [days]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // We don't need a single routePath anymore. 
  // We'll generate segments in the render loop.

  return (
    <div className="relative w-full h-full z-10 flex items-center justify-center px-6 md:px-0">
      {/* Inner shrink-wrap container to match exact image dimensions */}
      <div 
        className={`relative flex items-center justify-center ${isCustomMap ? 'w-full h-full' : ''}`}
        style={isCustomMap ? {} : (aspectRatio ? { 
          aspectRatio: aspectRatio, 
          maxWidth: '100%', 
          maxHeight: '100%' 
        } : { 
          maxWidth: '100%', 
          maxHeight: '100%' 
        })}
      >
        <img 
          src={currentMapImg} 
          alt="Sri Lanka Map" 
          onLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.target;
            if (naturalWidth && naturalHeight) {
              setAspectRatio(naturalWidth / naturalHeight);
            }
          }}
          className={`w-full h-full object-contain block rounded-[32px] md:rounded-[48px] ${!isCustomMap ? 'drop-shadow-md' : ''}`} 
        />
        
        {/* Overlay SVG for Routes */}
        {!isCustomMap && (
          <svg 
            className="absolute top-0 left-0 w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ zIndex: 2, filter: 'drop-shadow(0px 3px 3px rgba(176, 42, 48, 0.4))' }}
          >
            {/* Draw a single continuous route line */}
            {(() => {
              const allWaypoints = [];
              pointsData.forEach(day => {
                 const wps = (day.routeWaypoints && day.routeWaypoints.length > 0) ? day.routeWaypoints : [day.coords];
                 wps.forEach(wp => {
                    if (allWaypoints.length === 0) {
                       allWaypoints.push(wp);
                    } else {
                       const last = allWaypoints[allWaypoints.length - 1];
                       // avoid duplicates
                       if (Math.abs(last.x - wp.x) > 0.1 || Math.abs(last.y - wp.y) > 0.1) {
                          allWaypoints.push(wp);
                       }
                    }
                 });
              });

              if (allWaypoints.length < 2) return null;

              // Generate path using simple straight lines for stability
              let pathString = `M ${allWaypoints[0].x} ${allWaypoints[0].y}`;
              for (let i = 1; i < allWaypoints.length; i++) {
                pathString += ` L ${allWaypoints[i].x} ${allWaypoints[i].y}`;
              }

              return (
                <motion.path
                  d={pathString}
                  fill="transparent"
                  stroke="#e6192b"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                  initial={{ opacity: 0, strokeDashoffset: 40 }}
                  animate={{ opacity: 1, strokeDashoffset: 0 }}
                  transition={{ 
                    opacity: { duration: 1.5 },
                    strokeDashoffset: { repeat: Infinity, duration: 4, ease: "linear" }
                  }}
                />
              );
            })()}
            {/* Blue dots for all waypoints */}
            {(() => {
              const allWaypoints = [];
              pointsData.forEach(day => {
                 const wps = day.routeWaypoints || [day.coords];
                 wps.forEach(wp => {
                    if (allWaypoints.length === 0) {
                       allWaypoints.push(wp);
                    } else {
                       const last = allWaypoints[allWaypoints.length - 1];
                       if (Math.abs(last.x - wp.x) > 0.1 || Math.abs(last.y - wp.y) > 0.1) {
                          allWaypoints.push(wp);
                       }
                    }
                 });
              });

              return allWaypoints.map((wp, i) => (
                <circle 
                  key={`wp-dot-${i}`}
                  cx={wp.x} 
                  cy={wp.y} 
                  r="1.2" 
                  fill="#0056b3" 
                  stroke="#ffffff" 
                  strokeWidth="0.4" 
                />
              ));
            })()}

            {/* Connector Lines for Images */}
            {pointsData.map((day, i) => {
               const offset = getCityOffset(day);
               return (
                 <line 
                   key={`conn-${i}`}
                   x1={day.coords.x} 
                   y1={day.coords.y}
                   x2={day.coords.x + offset.x}
                   y2={day.coords.y + offset.y}
                   stroke="#1f2937"
                   strokeWidth="0.3"
                   strokeDasharray="0.8 0.8"
                 />
               );
            })}
            {/* Colored Region for Yala (only if Yala is in itinerary) */}
            {pointsData.some(day => getMatchedCity(day) === 'yala') && (
              <g>
                <motion.path 
                  d="M 82 72 C 75 68, 65 74, 63 83 C 70 85, 77 80, 82 72 Z" 
                  fill="rgba(74, 222, 128, 0.25)" 
                  stroke="#15803d" 
                  strokeWidth="0.4"
                  strokeDasharray="2 1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.text
                  x="73"
                  y="80"
                  fontSize="1.8"
                  fontWeight="bold"
                  fill="#1f2937"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Yala
                </motion.text>
                <motion.text
                  x="73"
                  y="82"
                  fontSize="1.8"
                  fontWeight="bold"
                  fill="#1f2937"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  National Park
                </motion.text>
              </g>
            )}
          </svg>
        )}

        {/* Points and Images */}
        {!isCustomMap && (
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
            {pointsData.map((day, i) => {
              // Fallback image if day.image doesn't exist
              const destinationImg = day.image || 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=150&h=150';
              
              const isReached = true; // Always visible
              const isActive = day.id === activeDay;

              const offset = getCityOffset(day);
              const targetX = day.coords.x + offset.x;
              const targetY = day.coords.y + offset.y;

              return (
                <motion.div
                  key={day.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto cursor-pointer"
                  style={{ 
                    left: `${targetX}%`, 
                    top: `${targetY}%`,
                    zIndex: hoveredDayId === day.id ? 50 : (isActive ? 30 : (isReached ? 20 : 10))
                  }}
                  initial={false}
                  onClick={() => {
                    setHasInteracted(true);
                    setActiveDay(day.id);
                    if (window.innerWidth < 1024 && setIsModalOpen) {
                      setIsModalOpen(true);
                    }
                  }}
                  onMouseEnter={() => setHoveredDayId(day.id)}
                  onMouseLeave={() => setHoveredDayId(null)}
                >
                  
                  {/* Hover Tooltip */}
                  <AnimatePresence>
                    {hoveredDayId === day.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 bg-[#102a43]/95 text-white text-[11px] md:text-xs font-bold py-2 px-3.5 rounded-xl shadow-2xl border border-white/10 whitespace-nowrap flex flex-col items-center gap-0.5"
                        style={{ bottom: '115%', left: '50%' }}
                      >
                        <span className="text-[9px] uppercase tracking-widest text-[#f0f4f9]/60">
                          {day.displayLabel || `Day ${day.id}`}
                        </span>
                        <span>{day.location}</span>
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#102a43]/95"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* The Marker / Circle with Image */}
                  <motion.div 
                    className={`relative rounded-full overflow-hidden shadow-2xl transition-colors duration-300 ${isActive ? 'border-[3px] border-primary z-20' : 'border-[3px] border-white hover:border-primary/50 z-10'}`}
                    animate={{
                      width: isReached ? (isActive ? (isMobile ? 40 : 56) : (isMobile ? 32 : 48)) : 16,
                      height: isReached ? (isActive ? (isMobile ? 40 : 56) : (isMobile ? 32 : 48)) : 16,
                      scale: isActive ? 1.1 : 1
                    }}
                    whileHover={{ scale: 1.18 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {isReached && (
                      <img 
                        src={destinationImg} 
                        alt={day.location || 'Destination'} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                  
                  {/* Day label */}
                  <motion.div 
                    className={`absolute text-[10px] md:text-xs font-bold px-1 whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-primary scale-110' : 'text-gray-900 bg-white/60 rounded backdrop-blur-sm'}`}
                    style={{ top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px' }}

                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      if (day.displayLabel) return day.displayLabel;
                      const matched = getMatchedCity(day);
                      if (matched) {
                        return matched.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      }
                      return `Jour ${day.id}`;
                    })()}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default AnimatedMap;
