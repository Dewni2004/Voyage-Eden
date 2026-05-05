import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopularItineraries = ({ title, id, itineraries, isDark, isGreen }) => {
  const navigate = useNavigate();
  
  return (
    <section id={id} className={`py-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h2 className={`text-3xl font-bold lowercase tracking-tight ${isDark ? 'text-white' : 'text-primary'}`}>{title}</h2>
          <div className={`flex-grow ml-12 h-[1px] hidden md:block ${isDark ? 'bg-white/20' : 'bg-gray-200'}`}></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {itineraries.map((item) => (
            <div 
              key={item.id} 
              className={`${isGreen ? 'bg-[#2d5a3f]' : 'bg-white'} rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col`}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className={`text-[10px] ${isGreen ? 'text-white/70' : 'text-green-600'} font-bold uppercase tracking-widest mb-2`}>Les plus populaires</p>
                <h3 className={`text-xl font-bold mb-4 ${isGreen ? 'text-white' : 'text-primary'}`}>{item.title}</h3>
                
                {/* Icon Bar */}
                <div className={`flex items-center space-x-4 mb-6 py-2 px-3 ${isGreen ? 'bg-white/10' : 'bg-gray-50'} rounded-lg`}>
                  {(item.icons || []).map((icon, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-white/50' : 'bg-primary/30'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${isGreen ? 'text-white/90' : 'text-gray-500'}`}>{icon}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-[13px] leading-relaxed mb-8 flex-grow font-light ${isGreen ? 'text-white/80' : 'text-gray-500'}`}>
                  {item.description}
                </p>

                <div className={`pt-6 border-t flex items-center justify-between ${isGreen ? 'border-white/10' : 'border-gray-100'}`}>
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg ${isGreen ? 'text-white' : 'text-primary'}`}>USD {item.price} <span className={`${isGreen ? 'text-white/50' : 'text-gray-400'} text-[10px] font-normal uppercase`}>/ Person</span></span>
                  </div>
                  <button 
                    onClick={() => navigate(`/itinerary/${item.id}`)}
                    className={`${isGreen ? 'bg-[#102a43] hover:bg-black' : 'bg-primary hover:bg-luxury'} text-white px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItineraries;
