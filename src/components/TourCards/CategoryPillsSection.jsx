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

const CategoryPillsSection = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([
    { id: 'popular', title: 'Populaires', image: popularImg },
    { id: 'honeymoon', title: 'Voyages de noces', image: honeymoonImg },
    { id: 'family', title: 'Voyages en famille', image: familyImg },
    { id: 'luxury', title: 'Collection de luxe', image: luxuryImg },
    { id: 'golf', title: 'Séjours golfiques', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80' },
    { id: 'surf', title: 'Surf & Plongée', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80' },
    { id: 'adventure', title: 'Aventure', image: adventureImg },
    { id: 'perahera', title: 'Esela Perahera', image: esalaImg },
    { id: '8days', title: '8 Jours', image: eightDaysImg },
    { id: 'interests', title: "Centres d'intérêt", image: interestsImg }
  ]);

  useEffect(() => {
    const fetch = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetch();
  }, [i18n.language]);

  return (
    <div className="mt-4 pt-4 sm:mt-10 sm:pt-10 border-t border-gray-100">
      <div className="flex overflow-x-auto hide-scrollbar gap-4 lg:gap-2 xl:gap-4 2xl:gap-8 pb-6 sm:pb-12 px-4 max-w-[1400px] mx-auto justify-start lg:justify-center">
        {categories.map((category, idx) => (
          <a 
            key={category.id}
            href={`/${i18n.language?.split('-')[0] || 'fr'}/itineraires#${category.id === 'interests' ? 'popular' : category.id}`}
            className="group flex flex-col items-center gap-3 md:gap-4 shrink-0 mx-auto"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] 2xl:w-[90px] 2xl:h-[90px] rounded-full flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-gray-200 group-hover:border-luxury/50 group-hover:scale-110 transition-all duration-700 ease-out"></div>
              
              {/* Image container */}
              <div className="w-[88%] h-[88%] rounded-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:shadow-[0_15px_40px_rgb(0,0,0,0.12)] transition-all duration-500 z-10 relative bg-white">
                <img 
                  src={category.image || null} 
                  alt={t(`itinerariesPage.categories.${category.id}`, { defaultValue: category.title })}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
              </div>
            </div>
            
            <h4 className="text-gray-600 group-hover:text-primary font-sans text-[9px] sm:text-[10px] md:text-xs lg:text-[9px] xl:text-[10px] 2xl:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] text-center uppercase w-[70px] sm:w-[90px] md:w-[110px] lg:w-[85px] xl:w-[100px] 2xl:w-[110px] transition-colors duration-300">
              {t(`itinerariesPage.categories.${category.id}`, { defaultValue: category.title })}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryPillsSection;
