import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCategories } from '../../services/contentService';
import honeymoonImg from '../../assets/Honeymoon - Trips Card.webp';
import adventureImg from '../../assets/Adventure - Trips Card.webp';
import familyImg from '../../assets/Family - Trip Card.webp';
import luxuryImg from '../../assets/Luxury - Trip Card.webp';
import esalaImg from '../../assets/Perhera - Trip Card.webp';
import eightDaysImg from '../../assets/8Days - Trip Card.webp';
import popularImg from '../../assets/Popularies.jpg';
import interestsImg from '../../assets/Intrests.jpg';

const ItineraryCategories = ({ showTitle = false, itineraries = [] }) => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([
    { id: 'popular', title: 'Populaires', image: popularImg },
    { id: 'honeymoon', title: 'Voyages de noces', image: honeymoonImg },
    { id: 'family', title: 'Voyages en famille', image: familyImg },
    { id: 'luxury', title: 'Collection de luxe', image: luxuryImg },
    { id: 'golf', title: 'Séjours golfiques', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80' },
    { id: 'surf', title: 'Surf & Plongée', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80' },
    { id: 'adventure', title: 'Aventure', image: adventureImg },
    { id: 'pererahera', title: 'Esela Perahera', image: esalaImg },
    { id: '8days', title: '8 Jours', image: eightDaysImg },
    { id: 'interests', title: "Centres d'intérêt", image: interestsImg }
  ]);

  useEffect(() => {
    const fetch = async () => {
      const dynamicCats = await getCategories(i18n.language);
      if (dynamicCats && dynamicCats.length > 0) {
        const combined = [...categories];
        dynamicCats.forEach(dCat => {
          const idx = combined.findIndex(c => c.id === dCat.slug);
          if (idx !== -1) {
            combined[idx] = { ...combined[idx], ...dCat, id: dCat.slug };
          } else {
            combined.push({ ...dCat, id: dCat.slug });
          }
        });
        setCategories(combined);
      }
    };
    fetch();
  }, [i18n.language]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleCategories = itineraries.length > 0
    ? categories.filter(c => itineraries.some(it => it.category?.toLowerCase() === c.id.toLowerCase()))
    : categories;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{t("itinerariesPage.basedOnInterests")}</h2>
            <div className="w-24 h-1 bg-luxury mx-auto"></div>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {visibleCategories.map((category, index) => (
            <div 
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={category.image} 
                alt={t(`itinerariesPage.categories.${category.id}`, { defaultValue: category.title })}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-luxury transition-colors">
                  {t(`itinerariesPage.categories.${category.id}`, { defaultValue: category.title })}
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
