import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getGPSForDay, convertGPSToPercentage } from '../../utils/mapUtils';
import newMapImg from '../../assets/New_Map.png';

const AnimatedMap = ({ days, activeDay, setActiveDay, setIsModalOpen }) => {
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    if (!days || days.length === 0) return;
    
    // Process days to get screen coordinates
    const processed = days.map((day, index) => {
      const gps = getGPSForDay(day);
      const coords = convertGPSToPercentage(gps, day);
      return {
        ...day,
        gps,
        coords, // this is { x: percentage, y: percentage }
        index
      };
    });
    setPointsData(processed);
  }, [days]);

  // We don't need a single routePath anymore. 
  // We'll generate segments in the render loop.

  return (
    <div className="relative w-full h-full bg-[#eef5fa] rounded-[48px] overflow-hidden border border-gray-100 shadow-2xl z-10 flex items-center justify-center p-2 md:p-4">
      {/* Inner shrink-wrap container to match exact image dimensions */}
      <div className="relative max-w-full max-h-full h-full flex items-center justify-center">
        <img 
          src={newMapImg} 
          alt="Sri Lanka Map" 
          className="max-w-full max-h-full object-contain block drop-shadow-md rounded-[32px]" 
        />
        
        {/* Overlay SVG for Routes */}
        <svg 
          className="absolute top-0 left-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ zIndex: 2 }}
        >
          {pointsData.map((day, i, arr) => {
            if (i === 0) return null;
            const prev = arr[i - 1];
            // Calculate a control point for a subtle curve
            const dx = day.coords.x - prev.coords.x;
            const dy = day.coords.y - prev.coords.y;
            const cx = prev.coords.x + dx * 0.5 - dy * 0.2;
            const cy = prev.coords.y + dy * 0.5 + dx * 0.2;
            
            const segmentPath = `M ${prev.coords.x} ${prev.coords.y} Q ${cx} ${cy} ${day.coords.x} ${day.coords.y}`;
            
            const isReached = day.id <= activeDay;

            return (
              <motion.path
                key={`path-${day.id}`}
                d={segmentPath}
                fill="transparent"
                stroke="#b02a30"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isReached ? 1 : 0, 
                  opacity: isReached ? 1 : 0 
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {/* Points and Images */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          {pointsData.map((day, i) => {
            // Fallback image if day.image doesn't exist
            const destinationImg = day.image || 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=150&h=150';
            
            const isReached = day.id <= activeDay;
            const isActive = day.id === activeDay;

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
                  setActiveDay(day.id);
                  if (window.innerWidth < 1024 && setIsModalOpen) {
                    setIsModalOpen(true);
                  }
                }}
              >
                {/* The Marker / Circle with Image */}
                <motion.div 
                  className={`rounded-full overflow-hidden shadow-xl transition-colors duration-300 ${isActive ? 'border-[3px] border-primary' : (isReached ? 'border-[3px] border-white hover:border-primary/50' : 'bg-primary/50 hover:bg-primary border-2 border-white')}`}
                  animate={{
                    width: isReached ? (isActive ? 56 : 48) : 16,
                    height: isReached ? (isActive ? 56 : 48) : 16,
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
                  className={`mt-1.5 text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur-sm text-gray-800'}`}
                  animate={{
                    opacity: isReached ? 1 : 0,
                    y: isReached ? 0 : -5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Jour {day.id}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedMap;
