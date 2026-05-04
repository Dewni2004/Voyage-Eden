import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/Galle-Fort.jpg';

const Hero = () => {
  const navigate = useNavigate();
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
        <h1 className="max-w-4xl mx-auto mb-6 text-4xl md:text-5xl lg:text-7xl leading-tight">
          Bienvenue au <br />
          <span className="text-luxury">Sri Lanka Voyage Eden</span>
        </h1>

        <p className="text-base md:text-xl max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed font-light">
          Nos experts locaux du Sri Lanka vous proposent des voyages privés et sur mesure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button 
            onClick={() => navigate('/itineraires')}
            className="w-full sm:w-auto bg-primary text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-base md:text-lg font-semibold"
          >
            Explorer les forfaits
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 md:px-10 py-3.5 md:py-4 rounded-full text-base md:text-lg font-semibold"
          >
            Contactez Nous
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
