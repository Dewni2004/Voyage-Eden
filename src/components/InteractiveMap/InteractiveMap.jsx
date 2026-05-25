import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getGPSForDay } from '../../utils/mapUtils';

// Helper component to auto-fit bounds
const MapBounds = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
    }
  }, [map, points]);
  return null;
};

const InteractiveMap = ({ days, activeDay, setActiveDay, setIsModalOpen }) => {
  // Convert days to GPS points
  const pointsData = days.map(day => ({
    ...day,
    gps: getGPSForDay(day)
  }));

  const routePoints = pointsData.map(d => d.gps);

  const createIcon = (number, isActive) => {
    return L.divIcon({
      className: `custom-map-marker ${isActive ? 'active' : ''}`,
      html: `<span>${number}</span>`,
      iconSize: isActive ? [36, 36] : [28, 28],
      iconAnchor: isActive ? [18, 18] : [14, 14]
    });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-white rounded-[48px] overflow-hidden border border-gray-100 shadow-2xl z-10 group/map-inner">
      <MapContainer 
        center={[7.8731, 80.7718]} 
        zoom={7} 
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        
        {routePoints.length > 0 && <MapBounds points={routePoints} />}

        <Polyline 
          positions={routePoints} 
          color="#b02a30" 
          weight={3} 
          dashArray="6, 6" 
          opacity={0.6}
        />

        {pointsData.map((day) => (
          <Marker 
            key={day.id}
            position={day.gps}
            icon={createIcon(day.id, activeDay === day.id)}
            eventHandlers={{
              click: () => {
                setActiveDay(day.id);
                if (window.innerWidth < 1024 && setIsModalOpen) {
                  setIsModalOpen(true);
                }
              }
            }}
          />
        ))}
      </MapContainer>

      {/* Map Label Overlay */}
      <div className="absolute top-8 left-8 z-[400] pointer-events-none">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Itinéraire en direct</span>
        </div>
      </div>

      {/* Interaction Guide */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-100 shadow-lg opacity-0 group-hover/map-inner:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Naviguez sur la carte</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
