import React from 'react';
import sigiriya from '../../assets/Sigiriya.jpg';
import ella from '../../assets/Ella.jfif';
import kandy from '../../assets/Kandy.jpg';
import mirissa from '../../assets/Mirissa.webp';

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Sigiriya Lion Rock',
      description: 'The 8th Wonder of the World',
      image: sigiriya,
      size: 'large', // Left side full height
    },
    {
      id: 2,
      name: 'Ella Montagnes Brumeuses',
      description: 'Paysages pittoresques et plantations de thé',
      image: ella,
      size: 'medium', // Top right
    },
    {
      id: 3,
      name: 'Kandy',
      description: 'Cultural Heart',
      image: kandy,
      size: 'small', // Bottom right 1
    },
    {
      id: 4,
      name: 'Mirissa',
      description: 'Côte d’Or',
      image: mirissa,
      size: 'small', // Bottom right 2
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Destinations populaires</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Les lieux les plus emblématiques du Sri Lanka à ne surtout pas manquer.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[700px]">
          {/* Large Card (Sigiriya) */}
          <a 
            href="/travel-guide" 
            className="lg:col-span-2 lg:row-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-[400px] lg:h-full"
          >
            <img 
              src={destinations[0].image} 
              alt={destinations[0].name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{destinations[0].name}</h3>
              <p className="text-lg opacity-90 font-light italic">{destinations[0].description}</p>
            </div>
          </a>

          {/* Medium Card (Ella) */}
          <a 
            href="/travel-guide" 
            className="lg:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-[300px] lg:h-full"
          >
            <img 
              src={destinations[1].image} 
              alt={destinations[1].name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{destinations[1].name}</h3>
              <p className="text-sm opacity-90 font-light italic">{destinations[1].description}</p>
            </div>
          </a>

          {/* Small Card 1 (Kandy) */}
          <a 
            href="/travel-guide" 
            className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] lg:h-full"
          >
            <img 
              src={destinations[2].image} 
              alt={destinations[2].name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{destinations[2].name}</h3>
              <p className="text-xs opacity-90 font-light italic">{destinations[2].description}</p>
            </div>
          </a>

          {/* Small Card 2 (Mirissa) */}
          <a 
            href="/travel-guide" 
            className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] lg:h-full"
          >
            <img 
              src={destinations[3].image} 
              alt={destinations[3].name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{destinations[3].name}</h3>
              <p className="text-xs opacity-90 font-light italic">{destinations[3].description}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
