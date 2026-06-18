import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItineraryHero from '../components/ItineraryHero/ItineraryHero';
import ItineraryCategories from '../components/ItineraryCategories/ItineraryCategories';
import PopularItineraries from '../components/PopularItineraries/PopularItineraries';
import Newsletter from '../components/Newsletter/Newsletter';
import { getItineraries } from '../services/contentService';
import HotelOptions from '../components/HotelOptions/HotelOptions';
import RestaurantBanner from '../components/RestaurantBanner/RestaurantBanner';
import { FamilyTourSplitSection } from '../components/TourCards/TourCards';



const Itineraires = () => {
  const { t, i18n } = useTranslation();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const dynamicData = await getItineraries(i18n.language);
        setItineraries(dynamicData);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetch();
  }, [i18n.language]);

  const getByCategory = (category) => {
    const filtered = itineraries.filter(it => it.category?.toLowerCase() === category.toLowerCase());
    if (category.toLowerCase() === 'popular') {
      const customOrder = [
        '9be862d3-2cb3-424e-b56a-aaaf384bb8ef', // 8 días - Sri Lanka 8 días - La isla de los colores
        'f889e49c-89be-40fa-8f75-1a96be58664a', // 15 días - Sri Lanka en 15 días - El País de las Especias
        'e43b5dec-05c3-48a2-854e-45fef616675e', // 12 días - Sri Lanka en 12 días - Explora La Mítica Ceylán
        'ef67877f-92f9-4113-9880-94a03f79413f', // 15 días - Sri Lanka 15 Días - En Hoteles Superior
        'c9492146-5f0f-46b8-98b0-3575fc7b6e5a', // Srilanka 10 días Experiencia Ayurveda para tu bienestar
        'd3285989-25c1-4f88-b018-493d85751509'  // Sri Lanka 9 Días - Viaje Al Corazón De Ceilán
      ];
      return filtered.sort((a, b) => {
        const indexA = customOrder.indexOf(a.id);
        const indexB = customOrder.indexOf(b.id);
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });
    }
    return filtered;
  };

  const familyTours = getByCategory('family');
  const formattedFamilyTours = familyTours.map(it => ({
    id: it.id,
    title: it.title,
    duration: `${it.days?.length || 0} ${t("itineraryCard.days")}`,
    image: it.image,
    icons: it.icons || [],
    description: it.description || '',
    price: it.price || '',
    category: 'family',
    categoryTag: t('tours.familyTours')
  }));

  const isPremium = (title) => /luxur|lujo|luxe|luxus|lusso/i.test(title);
  const familyPremiumTours = formattedFamilyTours.filter(t => isPremium(t.title));
  const familyStandardTours = formattedFamilyTours.filter(t => !isPremium(t.title));

  return (
    <div>
      <ItineraryHero />
      <ItineraryCategories itineraries={itineraries} />
      
      {getByCategory('popular').length > 0 && (
        <PopularItineraries title={t('itineraries.popular')} id="popular" itineraries={getByCategory('popular')} />
      )}
      {getByCategory('honeymoon').length > 0 && (
        <PopularItineraries title={t('itineraries.honeymoon')} id="honeymoon" itineraries={getByCategory('honeymoon')} />
      )}
      {familyTours.length > 0 && (
        <section id="family" className="pt-6 pb-3 md:py-14 relative overflow-hidden bg-white">
          <div className="container mx-auto px-6 relative z-10">
            <FamilyTourSplitSection
              title={t('tours.familyTours')}
              subtitle={t('tours.familyToursSubtitle')}
              standardTours={familyStandardTours}
              premiumTours={familyPremiumTours}
              t={t}
            />
          </div>
        </section>
      )}
      {getByCategory('luxury').length > 0 && (
        <PopularItineraries title={t('itineraries.luxury')} id="luxury" itineraries={getByCategory('luxury')} isDark={true} />
      )}
      {getByCategory('golf').length > 0 && (
        <PopularItineraries title={t('itineraries.golf')} id="golf" itineraries={getByCategory('golf')} isGreen={true} />
      )}
      {getByCategory('surf').length > 0 && (
        <PopularItineraries title={t('itineraries.surf')} id="surf" itineraries={getByCategory('surf')} />
      )}
      {getByCategory('adventure').length > 0 && (
        <PopularItineraries title={t('itineraries.adventure')} id="adventure" itineraries={getByCategory('adventure')} />
      )}
      {getByCategory('perahera').length > 0 && (
        <PopularItineraries title={t('itineraries.perahera')} id="perahera" itineraries={getByCategory('perahera')} />
      )}
      {getByCategory('8days').length > 0 && (
        <PopularItineraries title={t('itineraries.days8')} id="8days" itineraries={getByCategory('8days')} />
      )}
      {getByCategory('interests').length > 0 && (
        <PopularItineraries title={t('itineraries.interests')} id="interests" itineraries={getByCategory('interests')} />
      )}

      {/* <HotelOptions /> */}
      {/* <RestaurantBanner /> */}
      <Newsletter />
    </div>
  );
};

export default Itineraires;
