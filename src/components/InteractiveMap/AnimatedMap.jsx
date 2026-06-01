import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getGPSForDay, convertGPSToPercentage, getMatchedCity, getRouteWaypoints } from '../../utils/mapUtils';
import newMapImg from '../../assets/New_Map.png';

const AnimatedMap = ({ days, activeDay, setActiveDay, setIsModalOpen }) => {
  const [pointsData, setPointsData] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // We don't need a single routePath anymore. 
  // We'll generate segments in the render loop.

  return (
    <div className="relative w-full h-full z-10 flex items-center justify-center">
      {/* Inner shrink-wrap container to match exact image dimensions */}
      <div className="relative max-w-full max-h-full h-full flex items-center justify-center">
        <img 
          src={newMapImg} 
          alt="Sri Lanka Map" 
          className="max-w-full max-h-full object-contain block drop-shadow-md rounded-[48px]" 
        />
        
        {/* Overlay SVG for Routes */}
        <svg 
          className="absolute top-0 left-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ zIndex: 2, filter: 'drop-shadow(0px 3px 3px rgba(176, 42, 48, 0.4))' }}
        >
          {/* Draw a single continuous smooth route line */}
          {(() => {
            const allWaypoints = [];
            pointsData.forEach(day => {
               const wps = day.routeWaypoints || [day.coords];
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

            // Helper to compute control points for smooth spline
            const getControlPoints = (x0, y0, x1, y1, x2, y2, t = 0.25) => {
              const d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
              const d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              const fa = t * d01 / (d01 + d12 || 1);
              const fb = t * d12 / (d01 + d12 || 1);
              const p1x = x1 - fa * (x2 - x0);
              const p1y = y1 - fa * (y2 - y0);
              const p2x = x1 + fb * (x2 - x0);
              const p2y = y1 + fb * (y2 - y0);
              return [{ x: p1x || x1, y: p1y || y1 }, { x: p2x || x1, y: p2y || y1 }];
            };

            // Generate organic smooth path through all points
            let pathString = `M ${allWaypoints[0].x} ${allWaypoints[0].y}`;
            if (allWaypoints.length === 2) {
              const p0 = allWaypoints[0];
              const p1 = allWaypoints[1];
              const dx = p1.x - p0.x;
              const dy = p1.y - p0.y;
              // slight organic curve
              pathString += ` Q ${p0.x + dx*0.5 - dy*0.1} ${p0.y + dy*0.5 + dx*0.1} ${p1.x} ${p1.y}`;
            } else {
              for (let i = 0; i < allWaypoints.length - 1; i++) {
                const p0 = i === 0 ? allWaypoints[0] : allWaypoints[i - 1];
                const p1 = allWaypoints[i];
                const p2 = allWaypoints[i + 1];
                const p3 = i + 2 < allWaypoints.length ? allWaypoints[i + 2] : p2;
                
                const cp1 = getControlPoints(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, 0.25)[1];
                const cp2 = getControlPoints(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, 0.25)[0];
                
                pathString += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;
              }
            }

            return (
              <motion.path
                d={pathString}
                fill="transparent"
                stroke="#e6192b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
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

            // Dynamically push the circle OUTWARDS from the center (50, 50)
            const isRight = day.coords.x > 50;
            const isBottom = day.coords.y > 50;
            
            let circleStyle = {};
            let labelStyle = {};
            
            if (isRight && !isBottom) { // Top Right
               circleStyle = { bottom: '100%', left: '100%', transform: 'translate(8px, -8px)' };
               labelStyle = { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px' };
            } else if (!isRight && !isBottom) { // Top Left
               circleStyle = { bottom: '100%', right: '100%', transform: 'translate(-8px, -8px)' };
               labelStyle = { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px' };
            } else if (isRight && isBottom) { // Bottom Right
               circleStyle = { top: '100%', left: '100%', transform: 'translate(8px, 8px)' };
               labelStyle = { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '4px' };
            } else { // Bottom Left
               circleStyle = { top: '100%', right: '100%', transform: 'translate(-8px, 8px)' };
               labelStyle = { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '4px' };
            }

            return (
              <motion.div
                key={day.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto cursor-pointer"
                style={{ 
                  left: `${day.coords.x}%`, 
                  top: `${day.coords.y}%`,
                  zIndex: isActive ? 30 : (isReached ? 20 : 10)
                }}
                initial={false}
                onClick={() => {
                  setHasInteracted(true);
                  setActiveDay(day.id);
                  if (window.innerWidth < 1024 && setIsModalOpen) {
                    setIsModalOpen(true);
                  }
                }}
              >

                {/* The Marker / Circle with Image */}
                <motion.div 
                  className={`absolute rounded-full overflow-hidden shadow-2xl transition-colors duration-300 ${isActive ? 'border-[3px] border-primary z-20' : 'border-[3px] border-white hover:border-primary/50 z-10'}`}
                  style={circleStyle}
                  animate={{
                    width: isReached ? (isActive ? (isMobile ? 40 : 56) : (isMobile ? 32 : 48)) : 16,
                    height: isReached ? (isActive ? (isMobile ? 40 : 56) : (isMobile ? 32 : 48)) : 16,
                    scale: isActive ? 1.1 : 1
                  }}
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
                  style={labelStyle}
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
