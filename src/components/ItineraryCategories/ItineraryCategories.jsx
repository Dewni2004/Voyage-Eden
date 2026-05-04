import React from 'react';
import adventureImg from '../../assets/Adventure - Trips Card.webp';
import honeymoonImg from '../../assets/Honeymoon - Trips Card.webp';
import familyImg from '../../assets/Family - Trip Card.webp';
import luxuryImg from '../../assets/Luxury - Trip Card.webp';
import esalaImg from '../../assets/Perhera - Trip Card.webp';
import eightDaysImg from '../../assets/8Days - Trip Card.webp';
import offersImg from '../../assets/Half - Day offers card.webp';

const ItineraryCategories = () => {
  const categories = [
    { id: 'adventure', title: 'Adventure Trips', image: adventureImg },
    { id: 'honeymoon', title: 'Honeymoon Trips', image: honeymoonImg },
    { id: 'family', title: 'Family Trips', image: familyImg },
    { id: 'luxury', title: 'Super Luxury', image: luxuryImg },
    { id: 'golf', title: 'Golf Trips', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400' },
    { id: 'esala', title: 'Esala', image: esalaImg },
    { id: '8days', title: '8 Days Trips', image: eightDaysImg },
    { id: 'offers', title: 'Half Board Offers', image: offersImg },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className="relative h-64 rounded-[2rem] overflow-hidden cursor-pointer shadow-sm"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <h3 className="text-white text-xl font-bold tracking-wide drop-shadow-lg text-center px-4">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItineraryCategories;
