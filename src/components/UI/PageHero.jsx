import React from 'react';

const PageHero = ({ title, description, image, overlayOpacity = 'bg-black/40', bgPosition = 'object-center' }) => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover ${bgPosition}`}
        />
        <div className={`absolute inset-0 ${overlayOpacity}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 mt-16">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight lowercase drop-shadow-lg">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
