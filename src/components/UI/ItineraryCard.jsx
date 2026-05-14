import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItineraryCard = ({ 
  id, 
  title, 
  image, 
  description, 
  price, 
  icons = [], 
  tag = "Les plus populaires", 
  isDark = false, 
  isGreen = false 
}) => {
  const navigate = useNavigate();

  const bgClass = isGreen 
    ? 'bg-[#064e3b] border-white/5 shadow-2xl' 
    : isDark 
      ? 'bg-[#0a152e] border-white/10 shadow-2xl' 
      : 'bg-white border-gray-100 shadow-sm';
  
  const textTitle = isGreen || isDark ? 'text-white' : 'text-primary';
  const textTag = isGreen ? 'text-green-300' : isDark ? 'text-luxury' : 'text-green-600';
  const textSecondary = isGreen || isDark ? 'text-white/80' : 'text-gray-500';
  const dividerClass = isGreen || isDark ? 'border-white/10' : 'border-gray-100';
  const iconBg = isGreen ? 'bg-black/20' : isDark ? 'bg-white/5' : 'bg-gray-50';
  const dotColor = isGreen || isDark ? 'bg-white/30' : 'bg-primary/30';
  const iconTextColor = isGreen || isDark ? 'text-white/90' : 'text-gray-500';

  return (
    <div className={`${bgClass} rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border group flex flex-col h-full`}>
      <div className="h-64 overflow-hidden relative flex-shrink-0">
        <img 
          src={image || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'; }}
        />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {tag && (
          <p className={`text-[10px] ${textTag} font-bold uppercase tracking-widest mb-2`}>{tag}</p>
        )}
        <h3 className={`text-xl font-bold mb-4 ${textTitle}`}>{title}</h3>
        
        {/* Icon Bar */}
        <div className={`flex items-center space-x-4 mb-6 py-2 px-3 ${iconBg} rounded-lg`}>
          {icons.map((icon, i) => (
            <div key={i} className="flex items-center space-x-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${iconTextColor}`}>{icon}</span>
            </div>
          ))}
        </div>

        <p className={`text-[13px] leading-relaxed mb-8 flex-grow font-light ${textSecondary}`}>
          {description}
        </p>

        <div className={`pt-6 border-t flex items-center justify-between ${dividerClass} mt-auto`}>
          <div className="flex flex-col">
            <span className={`font-bold text-lg ${textTitle}`}>
              {price?.toString().toLowerCase().includes('usd') ? price : `USD ${price}`}
              <span className={`${isGreen || isDark ? 'text-white/50' : 'text-gray-400'} text-[10px] font-normal uppercase ml-1`}>/ Person</span>
            </span>
          </div>
          <button 
            onClick={() => navigate(`/itinerary/${id}`)}
            className={`${isGreen ? 'bg-white text-[#064e3b] hover:bg-black hover:text-white' : isDark ? 'bg-luxury hover:bg-white hover:text-primary' : 'bg-primary hover:bg-luxury'} text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap min-w-[120px] text-center`}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
