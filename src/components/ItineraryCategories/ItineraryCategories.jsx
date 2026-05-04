import React from 'react';

const ItineraryCategories = () => {
  const categories = [
    { id: 'adventure', title: 'Adventure Trips', image: 'https://images.unsplash.com/photo-1552423158-efee1b2ff6b2?auto=format&fit=crop&q=80&w=400' },
    { id: 'honeymoon', title: 'Honeymoon Trips', image: 'https://images.unsplash.com/photo-1583275484611-5c4e9f583168?auto=format&fit=crop&q=80&w=400' },
    { id: 'family', title: 'Family Trips', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400' },
    { id: 'luxury', title: 'Super Luxury', image: 'https://images.unsplash.com/photo-1544616782-88641ebdf10c?auto=format&fit=crop&q=80&w=400' },
    { id: 'golf', title: 'Golf Trips', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400' },
    { id: 'esala', title: 'Esala', image: 'https://images.unsplash.com/photo-1551041777-ed7783a9977c?auto=format&fit=crop&q=80&w=400' },
    { id: '8days', title: '8 Days Trips', image: 'https://images.unsplash.com/photo-1586714264313-e17b38d2bc2b?auto=format&fit=crop&q=80&w=400' },
    { id: 'offers', title: 'Half Board Offers', image: 'https://images.unsplash.com/photo-1565413328340-47436220039e?auto=format&fit=crop&q=80&w=400' },
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
              className="relative h-64 rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
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
