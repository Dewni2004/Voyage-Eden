import React from 'react';
import fitur1 from '../../assets/Fitur image 1.jpg';
import fitur2 from '../../assets/Fitur image 2.jpg';
import fitur3 from '../../assets/Fitur image 3.jpg';
import fitur4 from '../../assets/Fitur image 4.jpg';
import fitur5 from '../../assets/Fitur image 5.png';

const Salons = () => {
  const images = [fitur1, fitur2, fitur3, fitur4, fitur5];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Salons internationaux auxquels Sri Lanka Eden Travels a participé
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Découvrez les salons internationaux du tourisme où nous avons eu l’honneur de représenter notre organisation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {images.map((img, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group aspect-[4/3] md:aspect-auto md:h-64"
            >
              <img 
                src={img} 
                alt={`Fitur Salon ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Salons;
