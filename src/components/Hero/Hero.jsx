import React from 'react';
import heroImage from '../../assets/Galle-Fort.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <h1 className="max-w-4xl mx-auto mb-6">
          Bienvenue au <br />
          <span className="text-luxury">Sri Lanka Voyage Eden</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed font-light">
          Des montagnes brumeuses aux plages dorées, découvrez une île aux merveilles infinies 
          avec les plus grands experts du voyage au Sri Lanka.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-primary/20">
            Explorer les forfaits
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Contactez Nous
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
