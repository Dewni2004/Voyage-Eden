import React from 'react';

const BookingCard = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-primary rounded-[40px] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group">
        {/* Subtle Background Pattern/Glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-luxury/10 rounded-full blur-[100px] transition-all duration-700 group-hover:bg-luxury/20"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-white/5 rounded-full blur-[80px]"></div>

        <div className="relative z-10">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-tight">Reserve Your Journey</h2>
          <p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Flexible dates available. We tailor every detail to your pace.
          </p>

          <div className="mb-12">
            <span className="text-[#ff7a50] text-5xl md:text-6xl font-extrabold tracking-tight">$1,250</span>
            <span className="text-[#ff7a50] text-xl md:text-2xl font-bold ml-2">/ per guest</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary font-bold px-10 py-5 rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95 text-lg">
              Secure My Booking
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary font-bold px-10 py-5 rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95 text-lg">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCard;
