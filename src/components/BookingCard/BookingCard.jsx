import React from 'react';
import luxuryBg from '../../assets/luxury-bg.png';

const BookingCard = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl group border border-white/5">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url(${luxuryBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-black/90"></div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white text-3xl md:text-5xl font-serif mb-4 md:mb-2 leading-tight">
              Réservez votre <span className="text-luxury">Voyage</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Dates flexibles disponibles. Nous adaptons chaque détail à votre rythme, garantissant une escapade inoubliable au Sri Lanka.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-luxury text-4xl md:text-6xl font-serif font-bold">€ 1,250</span>
              <span className="text-white/50 text-lg md:text-xl font-light">/ par personne</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button className="group/btn relative w-full sm:w-auto bg-luxury hover:bg-luxury/90 text-white font-bold px-10 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-base overflow-hidden whitespace-nowrap">
                <span className="relative z-10">Sécuriser ma réservation</span>
              </button>
            </div>
            
            <p className="text-white/30 text-xs font-light text-center md:text-right">
              *Le prix peut varier en fonction de la personnalisation et de la disponibilité saisonnière
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCard;
