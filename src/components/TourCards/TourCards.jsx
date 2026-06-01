import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ItineraryCard from '../UI/ItineraryCard';
import swipeHandImg from '../../assets/swipe-hand-transparent.png';
import { getItineraries } from '../../services/contentService';

const TourCards = () => {
  const { t, i18n } = useTranslation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!hasScrolled && scrollRef.current) {
      if (scrollRef.current.scrollLeft > 20) {
        setHasScrolled(true);
      }
    }
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const allItineraries = await getItineraries(i18n.language);
        
        // Get 3 from popular
        const popular = allItineraries.filter(it => it.category?.toLowerCase() === 'popular').slice(0, 3);
        // Get 1 from honeymoon
        const honeymoon = allItineraries.filter(it => it.category?.toLowerCase() === 'honeymoon').slice(0, 1);
        
        // Combine them
        const combined = [...popular, ...honeymoon];
        
        // Map to format expected by ItineraryCard
        const formattedTours = combined.map(it => ({
          id: it.id,
          title: it.title,
          duration: `${it.days?.length || 0} ${t("itineraryCard.days")}`,
          image: it.image,
          icons: it.icons || [],
          description: it.description || '',
          price: it.price || '',
          categoryTag: it.category?.toLowerCase() === 'honeymoon' ? 'Voyages de noces' : 'Populaire'
        }));
        
        setTours(formattedTours);
      } catch (error) {
        console.error("Error fetching home itineraries:", error);
      }
      setLoading(false);
    };
    
    fetchTours();
  }, [i18n.language]);

  if (loading) {
    return <div className="py-16 text-center text-gray-500">Chargement des itinéraires...</div>;
  }

  return (
    <section className="py-8 md:py-16 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mb-4">{t('tours.title')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            {t('tours.subtitle')}
          </p>
        </div>

        {/* Mobile Swipe Hint Overlay */}
        {!hasScrolled && tours.length > 1 && (
          <div className="md:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
            <img 
              src={swipeHandImg} 
              alt="Swipe Gesture" 
              className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
            />
          </div>
        )}

        {/* Grid */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {tours.map((tour) => (
            <div key={tour.id} className="min-w-[280px] w-[85vw] sm:w-[45vw] md:w-auto shrink-0 snap-center flex">
              <ItineraryCard
                id={tour.id}
                title={tour.title}
                image={tour.image}
                icons={tour.icons}
                description={tour.description}
                price={tour.price}
                duration={tour.duration}
                tag={tour.categoryTag}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 md:mt-16 text-center">
          <a 
            href="/itineraires" 
            className="group inline-flex items-center gap-2 sm:gap-3 border border-primary bg-transparent text-primary hover:bg-primary hover:text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95"
          >
            <span>{t('tours.more')}</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-primary/5 group-hover:bg-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1.5 shadow-sm">
              <svg className="w-2.5 h-2.5 sm:w-3 h-3 md:w-4 md:h-4 text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TourCards;
