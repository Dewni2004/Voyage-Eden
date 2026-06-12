import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ItineraryCard from '../UI/ItineraryCard';
import swipeHandImg from '../../assets/swipe-hand-transparent.png';
import { getItineraries } from '../../services/contentService';
import CategoryPillsSection from './CategoryPillsSection';

const TourCategorySection = ({ title, subtitle, tours, hasScrolled, handleScroll, t }) => {
  const localScrollRef = useRef(null);
  
  if (!tours || tours.length === 0) return null;

  const onScroll = () => {
    if (!hasScrolled && localScrollRef.current) {
      if (localScrollRef.current.scrollLeft > 20) {
        handleScroll();
      }
    }
  };

  const getGridClass = (len) => {
    if (len === 1) return 'lg:grid-cols-1 lg:max-w-[400px] lg:mx-auto';
    if (len === 2) return 'lg:grid-cols-2 lg:max-w-[800px] lg:mx-auto';
    if (len === 3) return 'lg:grid-cols-3';
    return 'lg:grid-cols-4';
  };

  return (
    <div className="mb-12 md:mb-20">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="mb-4">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative">
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
          ref={localScrollRef}
          onScroll={onScroll}
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
  if ((!standardTours || standardTours.length === 0) && (!premiumTours || premiumTours.length === 0)) return null;

  return (
    <div className="mb-12 md:mb-20">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-primary">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
        
        {/* Left Column: 3/4 Star */}
        <div className="bg-white border shadow-xl p-4 md:p-6 flex flex-col rounded-xl">
          <h3 className="text-center text-lg md:text-xl font-bold uppercase tracking-wide text-primary mb-6 border-b pb-4">{t('tours.familyStandardHotels', 'RUTAS EN HOTELES 3/4*')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {standardTours && standardTours.map((tour) => (
              <ItineraryCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                image={tour.image}
                icons={tour.icons}
                description={tour.description}
                price={tour.price}
                duration={tour.duration}
                tag={tour.categoryTag}
              />
            ))}
          </div>
        </div>

        {/* Right Column: 4/5 Star Superior */}
        <div className="bg-white border shadow-xl p-4 md:p-6 flex flex-col rounded-xl">
          <h3 className="text-center text-lg md:text-xl font-bold uppercase tracking-wide text-primary mb-6 border-b pb-4">{t('tours.familyPremiumHotels', 'RUTAS EN HOTELES SUPERIOR 4/5*')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {premiumTours && premiumTours.map((tour) => (
              <ItineraryCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                image={tour.image}
                icons={tour.icons}
                description={tour.description}
                price={tour.price}
                duration={tour.duration}
                tag={tour.categoryTag}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const TourCards = () => {
  const { t, i18n } = useTranslation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = () => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
  };

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
  const familyPremiumTours = familyTours.filter(t => t.title.toLowerCase().includes('luxury') || t.title.toLowerCase().includes('luxurious') || t.title.toLowerCase().includes('lujo'));
  const familyStandardTours = familyTours.filter(t => !t.title.toLowerCase().includes('luxury') && !t.title.toLowerCase().includes('luxurious') && !t.title.toLowerCase().includes('lujo'));

  return (
    <section className="py-8 md:py-16 bg-gray-50 relative">
      <div className="container mx-auto px-6 relative z-10">
        


        {/* Sections */}
        <TourCategorySection 
          title={t('tours.mostSold')} 
          subtitle={t('tours.mostSoldSubtitle')}
          tours={popularTours} 
          hasScrolled={hasScrolled} 
          handleScroll={handleScroll} 
          t={t} 
        />
        <FamilyTourSplitSection
          title={t('tours.familyTours')}
          subtitle={t('tours.familyToursSubtitle')}
          standardTours={familyStandardTours}
          premiumTours={familyPremiumTours}
          t={t}
        />
        <TourCategorySection 
          title={t('tours.honeymoonTours')} 
          subtitle={t('tours.honeymoonToursSubtitle')}
          tours={honeymoonTours} 
          hasScrolled={hasScrolled} 
          handleScroll={handleScroll} 
          t={t} 
        />
        <TourCategorySection 
          title={t('tours.luxuryTours')} 
          subtitle={t('tours.luxuryToursSubtitle')}
          tours={luxuryTours} 
          hasScrolled={hasScrolled} 
          handleScroll={handleScroll} 
          t={t} 
        />


        {/* Category Pills Section */}
        <CategoryPillsSection />

        {/* View All Button */}
        <div className="mt-8 md:mt-12 text-center mb-12">
          <a 
            href="/itineraires" 
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
  );
};

export default TourCards;
