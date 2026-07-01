import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGPSForDay, convertGPSToPercentage, getMatchedCity, getRouteWaypoints } from '../../utils/mapUtils';
import newMapImg from '../../assets/New_Map.png';
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

const AnimatedMap = ({ days, activeDay, setActiveDay, setIsModalOpen }) => {
  const [pointsData, setPointsData] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hoveredDayId, setHoveredDayId] = useState(null);

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
    <div className="relative w-full h-full z-10 flex items-center justify-center lg:justify-end px-2 md:px-0">
      {/* Inner shrink-wrap container to match exact image dimensions */}
      <div 
        className="relative flex items-center justify-center lg:justify-end"
        style={aspectRatio ? { 
          aspectRatio: aspectRatio, 
          maxWidth: '100%', 
          maxHeight: '100%' 
        } : { 
          maxWidth: '100%', 
          maxHeight: '100%' 
        }}
      >
        <img 
          src={newMapImg} 
          alt="Sri Lanka Map" 
          onLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.target;
            if (naturalWidth && naturalHeight) {
              setAspectRatio(naturalWidth / naturalHeight);
            }
          }}
          className="w-full h-full object-contain block drop-shadow-md rounded-[32px] md:rounded-[48px]" 
        />
        
        {/* Overlay SVG for Routes */}
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

        {/* Points and Images */}
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
      </div>
      
      {/* Mobile Interaction Hint (Global Top Right) */}
      {!hasInteracted && isMobile && (
        <motion.div 
          className="absolute top-[8%] right-[8%] z-50 pointer-events-none flex flex-col items-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="bg-white/95 text-primary text-[10px] font-bold px-3 py-1 rounded-full shadow-lg mb-0.5 whitespace-nowrap border border-primary/10">
            Appuyez pour voir
          </div>
          <svg className="w-5 h-5 text-primary drop-shadow-md rotate-[-15deg]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v.68a2 2 0 0 1 1.5-.68 2 2 0 0 1 2 2v.2a2.5 2.5 0 0 1 1.5 2.5V16c0 3.31-2.69 6-6 6h-2c-2.76 0-5-2.24-5-5v-3.5c0-1.1.9-2 2-2h.24l.76 2.24z"/>
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedMap;
