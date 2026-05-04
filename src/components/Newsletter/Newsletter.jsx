import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-[#7d93a8] rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Background Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Abonnez-vous à la newsletter
            </h2>
            <p className="text-white/80 text-lg mb-10 font-light italic">
              Pour recevoir nos meilleures offres mensuelles
            </p>

            {/* Form */}
            <form className="relative max-w-lg mx-auto flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter Your Email Address..." 
                className="w-full bg-white/90 backdrop-blur-md border-none px-8 py-5 rounded-2xl text-primary focus:ring-2 focus:ring-luxury outline-none shadow-inner text-sm font-medium"
                required
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-[#102a43] text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
