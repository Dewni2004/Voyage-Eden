import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ItineraryCard from '../UI/ItineraryCard';

import { getItineraries } from '../../services/contentService';
import CategoryPillsSection from './CategoryPillsSection';
import PopularItineraries from '../PopularItineraries/PopularItineraries';
import swipeHandImg from '../../assets/swipe-hand-transparent.png';

const TourCategorySection = ({ title, subtitle, tours, t, noBottomMargin }) => {
  const localScrollRef = useRef(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768 || !localScrollRef.current || !tours || tours.length <= 1) return;

    const container = localScrollRef.current;
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            setShowSwipeHint(true);
            setTimeout(() => {
              if (container) {
                container.style.scrollSnapType = 'none';
                container.scrollTo({ left: 70, behavior: 'smooth' });
                setTimeout(() => {
                  if (container) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      if (container) container.style.scrollSnapType = '';
                      setShowSwipeHint(false);
                    }, 500);
                  }
                }, 700);
              }
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
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
        {showSwipeHint && (
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

const FamilyTourSplitSection = ({ title, subtitle, standardTours, premiumTours, t }) => {
  const standardScrollRef = useRef(null);
  const premiumScrollRef = useRef(null);
  const [showStandardHint, setShowStandardHint] = useState(false);
  const [showPremiumHint, setShowPremiumHint] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 640 || !standardScrollRef.current || !standardTours || standardTours.length <= 1) return;

    const container = standardScrollRef.current;
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            setShowStandardHint(true);
            setTimeout(() => {
              if (container) {
                container.style.scrollSnapType = 'none';
                container.scrollTo({ left: 70, behavior: 'smooth' });
                setTimeout(() => {
                  if (container) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      if (container) container.style.scrollSnapType = '';
                      setShowStandardHint(false);
                    }, 500);
                  }
                }, 700);
              }
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [standardTours]);

  useEffect(() => {
    if (window.innerWidth >= 640 || !premiumScrollRef.current || !premiumTours || premiumTours.length <= 1) return;

    const container = premiumScrollRef.current;
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            setShowPremiumHint(true);
            setTimeout(() => {
              if (container) {
                container.style.scrollSnapType = 'none';
                container.scrollTo({ left: 70, behavior: 'smooth' });
                setTimeout(() => {
                  if (container) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      if (container) container.style.scrollSnapType = '';
                      setShowPremiumHint(false);
                    }, 500);
                  }
                }, 700);
              }
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [premiumTours]);

  if ((!standardTours || standardTours.length === 0) && (!premiumTours || premiumTours.length === 0)) return null;

  return (
    <div className="mb-8 md:mb-20">
      {/* Header */}
      <div className="text-center mb-6 md:mb-16">
        <h2 className="mb-4">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
        
        {/* Left Column: 3/4 Star */}
        <div className="bg-white border shadow-xl p-4 md:p-6 flex flex-col rounded-xl relative">
          <h3 className="text-center text-lg md:text-xl font-bold uppercase tracking-wide text-primary mb-6 border-b pb-4">{t('tours.familyStandardHotels', 'RUTAS EN HOTELES 3/4*')}</h3>
          
          <div className="relative flex-grow flex flex-col">
            {showStandardHint && (
              <div className="sm:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
                <img 
                  src={swipeHandImg} 
                  alt="Swipe Gesture" 
                  className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
                />
              </div>
            )}
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
            {showPremiumHint && (
              <div className="sm:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
                <img 
                  src={swipeHandImg} 
                  alt="Swipe Gesture" 
                  className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
                />
              </div>
            )}
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
        
        const formattedTours = allItineraries.map(it => ({
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
  const familyTours = allTours.filter(t => t.category === 'family');
  const honeymoonTours = allTours.filter(t => t.category === 'honeymoon');
  const luxuryTours = allTours.filter(t => t.category === 'luxury');

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
