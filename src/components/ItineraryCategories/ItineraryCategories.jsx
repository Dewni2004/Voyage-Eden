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
    { id: 'popular', title: 'Populaires', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=400' },
    { id: 'honeymoon', title: 'Voyages de noces', image: honeymoonImg },
    { id: 'family', title: 'Voyages en famille', image: familyImg },
    { id: 'luxury', title: 'Collection de luxe', image: luxuryImg },
    { id: 'golf', title: 'Séjours golfiques', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400' },
    { id: 'surf', title: 'Surf & Plongée', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=400' },
    { id: 'adventure', title: 'Aventure', image: adventureImg },
    { id: 'pererahera', title: 'Esela Perahera', image: esalaImg },
    { id: '8days', title: '8 Jours', image: eightDaysImg },
    { id: 'interest', title: 'Par Intérêt', image: offersImg },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className="relative h-64 rounded-[2rem] overflow-hidden cursor-pointer shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
