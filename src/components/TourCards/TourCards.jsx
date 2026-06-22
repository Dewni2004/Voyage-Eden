import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ItineraryCard from '../UI/ItineraryCard';

import { getItineraries } from '../../services/contentService';
import CategoryPillsSection from './CategoryPillsSection';
import PopularItineraries from '../PopularItineraries/PopularItineraries';

const TourCategorySection = ({ title, subtitle, tours, t, noBottomMargin }) => {
  const localScrollRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 768 || !localScrollRef.current) return;

    const container = localScrollRef.current;
    let observerActive = true;
    let isAutoScrolling = false;
    let currentIndex = 0;
    let autoplayInterval = null;

    const handleScroll = () => {
      if (isAutoScrolling) return;
      clearInterval(autoplayInterval);
      container.removeEventListener('scroll', handleScroll);
    };

    const startAutoplay = () => {
      const totalCards = container.children.length;
      if (totalCards <= 1) return;

      container.addEventListener('scroll', handleScroll, { passive: true });

      autoplayInterval = setInterval(() => {
        const firstCard = container.firstElementChild;
        if (!firstCard) return;

        isAutoScrolling = true;
        currentIndex = (currentIndex + 1) % totalCards;
        const cardWidth = firstCard.clientWidth;
        const gap = 24; // gap-6 is 24px
        container.scrollTo({ left: currentIndex * (cardWidth + gap), behavior: 'smooth' });

        setTimeout(() => {
          isAutoScrolling = false;
        }, 600);
      }, 3000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && observerActive) {
            setTimeout(() => {
              if (observerActive) {
                startAutoplay();
              }
            }, 1000);

            observer.unobserve(entry.target);
            observerActive = false;
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
        container.removeEventListener('scroll', handleScroll);
      }
      clearInterval(autoplayInterval);
    };
  }, [tours]);
  
  if (!tours || tours.length === 0) return null;

  const getGridClass = (len) => {
    if (len === 1) return 'lg:grid-cols-1 lg:max-w-[400px] lg:mx-auto';
    if (len === 2) return 'lg:grid-cols-2';
    if (len === 3) return 'lg:grid-cols-3';
    return 'lg:grid-cols-4';
  };

  return (
    <div className={noBottomMargin ? "" : "mb-8 md:mb-20"}>
      {/* Header */}
      <div className="text-center mb-6 md:mb-16">
        <h2 className="mb-4">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative">
        {/* Grid */}
        <div 
          ref={localScrollRef}
          className={`flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 md:grid-cols-2 ${getGridClass(tours.length)} gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0`}
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
      </div>
    </div>
  );
};

export const FamilyTourSplitSection = ({ title, subtitle, standardTours, premiumTours, t, isPage = false }) => {
  const standardScrollRef = useRef(null);
  const premiumScrollRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 640 || !standardScrollRef.current) return;

    const container = standardScrollRef.current;
    let observerActive = true;
    let isAutoScrolling = false;
    let currentIndex = 0;
    let autoplayInterval = null;

    const handleScroll = () => {
      if (isAutoScrolling) return;
      clearInterval(autoplayInterval);
      container.removeEventListener('scroll', handleScroll);
    };

    const startAutoplay = () => {
      const totalCards = container.children.length;
      if (totalCards <= 1) return;

      container.addEventListener('scroll', handleScroll, { passive: true });

      autoplayInterval = setInterval(() => {
        const firstCard = container.firstElementChild;
        if (!firstCard) return;

        isAutoScrolling = true;
        currentIndex = (currentIndex + 1) % totalCards;
        const cardWidth = firstCard.clientWidth;
        const gap = 16; // gap-4 is 16px
        container.scrollTo({ left: currentIndex * (cardWidth + gap), behavior: 'smooth' });

        setTimeout(() => {
          isAutoScrolling = false;
        }, 600);
      }, 3000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && observerActive) {
            setTimeout(() => {
              if (observerActive) {
                startAutoplay();
              }
            }, 1000);

            observer.unobserve(entry.target);
            observerActive = false;
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
        container.removeEventListener('scroll', handleScroll);
      }
      clearInterval(autoplayInterval);
    };
  }, [standardTours]);

  useEffect(() => {
    if (window.innerWidth >= 640 || !premiumScrollRef.current) return;

    const container = premiumScrollRef.current;
    let observerActive = true;
    let isAutoScrolling = false;
    let currentIndex = 0;
    let autoplayInterval = null;

    const handleScroll = () => {
      if (isAutoScrolling) return;
      clearInterval(autoplayInterval);
      container.removeEventListener('scroll', handleScroll);
    };

    const startAutoplay = () => {
      const totalCards = container.children.length;
      if (totalCards <= 1) return;

      container.addEventListener('scroll', handleScroll, { passive: true });

      autoplayInterval = setInterval(() => {
        const firstCard = container.firstElementChild;
        if (!firstCard) return;

        isAutoScrolling = true;
        currentIndex = (currentIndex + 1) % totalCards;
        const cardWidth = firstCard.clientWidth;
        const gap = 16; // gap-4 is 16px
        container.scrollTo({ left: currentIndex * (cardWidth + gap), behavior: 'smooth' });

        setTimeout(() => {
          isAutoScrolling = false;
        }, 600);
      }, 3000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && observerActive) {
            setTimeout(() => {
              if (observerActive) {
                startAutoplay();
              }
            }, 1000);

            observer.unobserve(entry.target);
            observerActive = false;
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
        container.removeEventListener('scroll', handleScroll);
      }
      clearInterval(autoplayInterval);
    };
  }, [premiumTours]);

  if ((!standardTours || standardTours.length === 0) && (!premiumTours || premiumTours.length === 0)) return null;

  return (
    <div className="mb-8 md:mb-20">
      {/* Header */}
      {isPage ? (
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h2 className="text-3xl font-bold capitalize tracking-tight text-primary">{title}</h2>
          <div className="flex-grow ml-12 h-[1px] hidden md:block bg-gray-200"></div>
        </div>
      ) : (
        <div className="text-center mb-6 md:mb-16">
          <h2 className="mb-4">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
        
        {/* Left Column: 3/4 Star */}
        <div className="bg-white border shadow-xl p-4 md:p-6 flex flex-col rounded-xl relative">
          <h3 className="text-center text-lg md:text-xl font-bold uppercase tracking-wide text-primary mb-6 border-b pb-4">{t('tours.familyStandardHotels', 'RUTAS EN HOTELES 3/4*')}</h3>
          
          <div className="relative flex-grow flex flex-col">
            <div 
              ref={standardScrollRef}
              className="flex sm:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar sm:overflow-visible pb-4 sm:pb-0 grid-cols-1 sm:grid-cols-2 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 flex-grow"
            >
              {standardTours && standardTours.map((tour) => (
                <div key={tour.id} className="min-w-[280px] w-[85vw] sm:w-auto shrink-0 snap-center flex">
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
          </div>
        </div>

        {/* Right Column: 4/5 Star Superior */}
        <div className="bg-white border shadow-xl p-4 md:p-6 flex flex-col rounded-xl relative">
          <h3 className="text-center text-lg md:text-xl font-bold uppercase tracking-wide text-primary mb-6 border-b pb-4">{t('tours.familyPremiumHotels', 'RUTAS EN HOTELES SUPERIOR 4/5*')}</h3>
          
          <div className="relative flex-grow flex flex-col">
            <div 
              ref={premiumScrollRef}
              className="flex sm:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar sm:overflow-visible pb-4 sm:pb-0 grid-cols-1 sm:grid-cols-2 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 flex-grow"
            >
              {premiumTours && premiumTours.map((tour) => (
                <div key={tour.id} className="min-w-[280px] w-[85vw] sm:w-auto shrink-0 snap-center flex">
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
          </div>
        </div>

      </div>
    </div>
  );
};

const TourCards = () => {
  const { t, i18n } = useTranslation();
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const allItineraries = await getItineraries(i18n.language);
        
        // Hide specific itineraries from home page
        const hiddenHomeItineraryIds = [
          'ef67877f-92f9-4113-9880-94a03f79413f', // Sri Lanka 15 Días - En Hoteles Superior
          'c9492146-5f0f-46b8-98b0-3575fc7b6e5a', // Srilanka 10 días Experiencia Ayurveda para tu bienestar
          'd3285989-25c1-4f88-b018-493d85751509'  // Sri Lanka 9 Días - Viaje Al Corazón De Ceilán
        ];
        
        const filteredItineraries = allItineraries.filter(it => !hiddenHomeItineraryIds.includes(it.id));
        
        const formattedTours = filteredItineraries.map(it => ({
          id: it.id,
          title: it.title,
          duration: `${it.days?.length || 0} ${t("itineraryCard.days")}`,
          image: it.image,
          icons: it.icons || [],
          description: it.description || '',
          price: it.price || '',
          category: it.category?.toLowerCase() || 'popular', // fallback to popular if empty
          categoryTag: it.category?.toLowerCase() === 'honeymoon' ? t('tours.honeymoonTours') : 
                       it.category?.toLowerCase() === 'family' ? t('tours.familyTours') : 
                       it.category?.toLowerCase() === 'luxury' ? t('tours.luxuryTours') : 
                       t('tours.mostSold')
        }));
        
        setAllTours(formattedTours);
      } catch (error) {
        console.error("Error fetching home itineraries:", error);
      }
      setLoading(false);
    };
    
    fetchTours();
  }, [i18n.language, t]);

  if (loading) {
    return <div className="py-16 text-center text-gray-500">Chargement des itinéraires...</div>;
  }

  // Filter tours by categories
  const popularTours = allTours.filter(t => t.category === 'popular');
  const customOrder = [
    '9be862d3-2cb3-424e-b56a-aaaf384bb8ef', // 8 días - Sri Lanka 8 días - La isla de los colores
    'e43b5dec-05c3-48a2-854e-45fef616675e', // 12 días - Sri Lanka en 12 días - Explora La Mítica Ceylán
    'f889e49c-89be-40fa-8f75-1a96be58664a', // 15 días - Sri Lanka en 15 días - El País de las Especias
    'd3285989-25c1-4f88-b018-493d85751509', // Sri Lanka 9 Días - Viaje Al Corazón De Ceilán
    'c9492146-5f0f-46b8-98b0-3575fc7b6e5a', // Srilanka 10 días Experiencia Ayurveda para tu bienestar
    'ef67877f-92f9-4113-9880-94a03f79413f'  // Sri Lanka 15 Días - En Hoteles Superior
  ];
  popularTours.sort((a, b) => {
    const indexA = customOrder.indexOf(a.id);
    const indexB = customOrder.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });
  const familyTours = allTours.filter(t => t.category === 'family');
  const honeymoonTours = allTours.filter(t => t.category === 'honeymoon');
  const honeymoonOrder = [
    '5786c88e-6e80-404c-9e67-c7c8b9594f4f', // 9-Day Honeymoon in Paradise in Sri Lanka
    '6b5bdec5-93a6-4f5d-8f55-4de8b0637f17', // Sri Lanka: 11-Day Honeymoon in Paradise
    'e6ed3219-8240-47aa-bc18-2e30ab4aa8c1'  // Sri Lanka: 14-Day Honeymoon in Paradise
  ];
  honeymoonTours.sort((a, b) => {
    const indexA = honeymoonOrder.indexOf(a.id);
    const indexB = honeymoonOrder.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });
  const luxuryTours = allTours.filter(t => t.category === 'luxury');
  const luxuryOrder = [
    'c1264913-ac00-4e83-acfd-73e139efd628', // 10-Day Ultra-Luxury Family Adventure in Sri Lanka
    '8c630a0f-b4e0-44f6-9a38-af954d0d8cf8'  // Sri Lanka: 12 Days – An Exclusive Luxury Tour
  ];
  luxuryTours.sort((a, b) => {
    const indexA = luxuryOrder.indexOf(a.id);
    const indexB = luxuryOrder.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  // Split family tours
  // Using title to split because currently all family tours have the "5 STAR" icon in the DB
  const isPremium = (title) => /luxur|lujo|luxe|luxus|lusso/i.test(title);
  const familyPremiumTours = familyTours.filter(t => isPremium(t.title));
  const familyStandardTours = familyTours.filter(t => !isPremium(t.title));
  return (
    <>
      <section className="py-6 md:py-16 bg-gray-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          {/* Sections */}
          <TourCategorySection 
            title={t('tours.mostSold')} 
            subtitle={t('tours.mostSoldSubtitle')}
            tours={popularTours} 
            t={t} 
          />
          <FamilyTourSplitSection
            title={t('tours.familyTours')}
            subtitle={t('tours.familyToursSubtitle')}
            standardTours={familyStandardTours}
            premiumTours={familyPremiumTours}
            t={t}
          />
          <div className="pt-10 md:pt-0">
            <TourCategorySection 
              title={t('tours.honeymoonTours')} 
              subtitle={t('tours.honeymoonToursSubtitle')}
              tours={honeymoonTours} 
              t={t} 
              noBottomMargin={true}
            />
          </div>
        </div>
      </section>

      {luxuryTours && luxuryTours.length > 0 && (
        <PopularItineraries 
          title={t('tours.luxuryTours')} 
          subtitle={t('tours.luxuryToursSubtitle')}
          id="home-luxury" 
          itineraries={luxuryTours} 
          isDark={true} 
        />
      )}

      <section className="py-6 md:py-16 bg-gray-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          {/* Category Pills Section */}
          <CategoryPillsSection />

          {/* View All Button */}
          <div className="mt-1 md:mt-6 text-center mb-0 md:mb-6">
            <a 
              href={`/${i18n.language}/itineraires`} 
              className="group inline-flex items-center gap-2 sm:gap-3 border border-primary bg-white text-primary hover:bg-primary hover:text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95"
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
    </>
  );
};

export default TourCards;
