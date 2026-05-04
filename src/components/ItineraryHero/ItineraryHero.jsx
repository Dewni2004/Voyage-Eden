import React from 'react';

const ItineraryHero = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1544616782-88641ebdf10c?auto=format&fit=crop&q=80&w=1600" 
          alt="Sri Lanka Itineraries" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight lowercase">
          itinéraires
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Des voyages personnalisés, conçus selon vos envies. Découvrez les plus belles expériences du Sri Lanka, pensées pour le voyageur exigeant.
        </p>
      </div>
    </section>
  );
};

export default ItineraryHero;
