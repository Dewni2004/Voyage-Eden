import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopularItineraries = ({ title, id, itineraries, isDark, isGreen }) => {
  const navigate = useNavigate();
  
  return (
    <section id={id} className={`py-12 md:py-24 relative overflow-hidden ${isDark ? 'bg-[#050b18]' : 'bg-white'}`}>
      {/* Premium Background for Luxury Section */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e293b,transparent)] opacity-50"></div>
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[140px] opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-luxury/10 rounded-full blur-[140px] opacity-20"></div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h2 className={`text-3xl font-bold lowercase tracking-tight ${isDark ? 'text-white' : 'text-primary'}`}>{title}</h2>
          <div className={`flex-grow ml-12 h-[1px] hidden md:block ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}></div>
        </div>

        {/* Grid / Slider */}
        <div className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 -mx-6 px-6 md:mx-0 md:px-0">
          {itineraries.map((item) => (
            <div 
              key={item.id} 
              className={`min-w-[280px] w-[85vw] sm:w-[45vw] md:w-auto shrink-0 snap-center ${isGreen ? 'bg-[#064e3b] border-white/5 shadow-2xl' : isDark ? 'bg-[#0a152e] border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'} rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border group flex flex-col`}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'; }}
                />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className={`text-[10px] ${isGreen ? 'text-green-300' : isDark ? 'text-luxury' : 'text-green-600'} font-bold uppercase tracking-widest mb-2`}>Les plus populaires</p>
                <h3 className={`text-xl font-bold mb-4 ${isGreen || isDark ? 'text-white' : 'text-primary'}`}>{item.title}</h3>
                
                {/* Icon Bar */}
                <div className={`flex items-center space-x-4 mb-6 py-2 px-3 ${isGreen ? 'bg-black/20' : isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-lg`}>
                  {(item.icons || []).map((icon, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isGreen || isDark ? 'bg-white/30' : 'bg-primary/30'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${isGreen || isDark ? 'text-white/90' : 'text-gray-500'}`}>{icon}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-[13px] leading-relaxed mb-8 flex-grow font-light ${isGreen || isDark ? 'text-white/80' : 'text-gray-500'}`}>
                  {item.description}
                </p>

                <div className={`pt-6 border-t flex items-center justify-between ${isGreen || isDark ? 'border-white/10' : 'border-gray-100'}`}>
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg ${isGreen || isDark ? 'text-white' : 'text-primary'}`}>
                      {item.price?.toString().toLowerCase().includes('usd') ? item.price : `USD ${item.price}`}
                      <span className={`${isGreen || isDark ? 'text-white/50' : 'text-gray-400'} text-[10px] font-normal uppercase ml-1`}>/ Person</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/itinerary/${item.id}`)}
                    className={`${isGreen ? 'bg-white text-black hover:bg-black hover:text-white' : isDark ? 'bg-luxury text-white hover:bg-white hover:text-primary' : 'bg-primary text-white hover:bg-luxury'} px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-1`}
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
