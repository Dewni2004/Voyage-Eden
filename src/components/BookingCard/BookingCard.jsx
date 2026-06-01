import React from 'react';
import { useTranslation } from 'react-i18next';
import luxuryBg from '../../assets/luxury-bg.png';

const BookingCard = ({ price = "1,250" }) => {
  const { t } = useTranslation();
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
              {t("bookingCard.bookYour")} <span className="text-luxury">{t("bookingCard.trip")}</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg font-light max-w-xl leading-relaxed">{t("bookingCard.desc")}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-luxury text-4xl md:text-6xl font-serif font-bold">€ {price}</span>
              <span className="text-white/50 text-lg md:text-xl font-light">{t("bookingCard.perPerson")}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto btn-premium-white px-10 py-3.5 rounded-xl text-base whitespace-nowrap"
              >
                <span>{t("bookingCard.secure")}</span>
              </button>
            </div>
            
            <p className="text-white/30 text-xs font-light text-center md:text-right">{t("bookingCard.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCard;
