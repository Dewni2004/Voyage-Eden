import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
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

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [loading, location.hash]);

  const getByCategory = (category) => {
    const filtered = itineraries.filter(it => it.category?.toLowerCase() === category.toLowerCase());
    if (category.toLowerCase() === 'popular') {
      const customOrder = [
        '9be862d3-2cb3-424e-b56a-aaaf384bb8ef', // 8 días - Sri Lanka 8 días - La isla de los colores
        'e43b5dec-05c3-48a2-854e-45fef616675e', // 12 días - Sri Lanka en 12 días - Explora La Mítica Ceylán
        'f889e49c-89be-40fa-8f75-1a96be58664a', // 15 días - Sri Lanka en 15 días - El País de las Especias
        'd3285989-25c1-4f88-b018-493d85751509', // Sri Lanka 9 Días - Viaje Al Corazón De Ceilán
        'c9492146-5f0f-46b8-98b0-3575fc7b6e5a', // Srilanka 10 días Experiencia Ayurveda para tu bienestar
        'ef67877f-92f9-4113-9880-94a03f79413f'  // Sri Lanka 15 Días - En Hoteles Superior
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
    if (category.toLowerCase() === 'honeymoon') {
      const customOrder = [
        '5786c88e-6e80-404c-9e67-c7c8b9594f4f', // 9-Day Honeymoon in Paradise in Sri Lanka
        '6b5bdec5-93a6-4f5d-8f55-4de8b0637f17', // Sri Lanka: 11-Day Honeymoon in Paradise
        'e6ed3219-8240-47aa-bc18-2e30ab4aa8c1'  // Sri Lanka: 14-Day Honeymoon in Paradise
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
    if (category.toLowerCase() === 'luxury') {
      const customOrder = [
        'c1264913-ac00-4e83-acfd-73e139efd628', // 10-Day Ultra-Luxury Family Adventure in Sri Lanka
        '8c630a0f-b4e0-44f6-9a38-af954d0d8cf8'  // Sri Lanka: 12 Days – An Exclusive Luxury Tour
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
    if (category.toLowerCase() === 'golf') {
      const customOrder = [
        '3ff5c7a9-f8cd-455a-b8bd-66d56431f299', // 10 Days at Asia's Best Golf Courses
        '78eeebc2-6926-4ffa-8826-1d61570b0ab6', // 14 Days of Golf Heading East
        'fd4ec913-9f0c-4a17-9b0e-9d25ebb6880f'  // 21 Days of Golf in Sri Lanka
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
    if (category.toLowerCase() === 'surf') {
      const customOrder = [
        '37b1b6e1-c1f9-4260-bc2c-6351305ab197', // Sri Lanka: 7 Days in a Diver's Paradise
        '268f9c88-4fe4-4d37-ad6e-e4b1f0c40923', // Sri Lanka: 11 Days of Diving on the Mythical Island
        '8517ac5e-d6dc-4c9d-9879-b1f8203f4290', // Sri Lanka: 12 Days – Surfing, Sun, Safaris, and Beaches
        'd9fa26f8-7ba8-483f-a942-7c1f130004ca'  // Sri Lanka: 15 Days – Adventure, Surfing, and Hiking
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
    if (category.toLowerCase() === 'adventure') {
      const customOrder = [
        '9b6c3e5a-e6ed-4219-ae82-b9535cf3a048', // Trekking and Sightseeing in 17 Days
        '5b039c8f-8955-44de-9788-2b8ef2f958df', // Especially relaxing! in 18 days
        '8882bc3e-7338-47cc-b4aa-3573a1efad31', // Sri Lanka in 19 Days - All of Sri Lanka
        'e20e7213-a43e-48dc-92b8-4d7dff732774'  // Sri Lanka in 20 Days - An Unparalleled Adventure
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
    if (category.toLowerCase() === 'perahera') {
      const customOrder = [
        '1921a084-239d-43e7-be83-a64e029ec9a3', // Sri Lanka in 9 Days - Esala Perahera Special
        'bf91c1df-7027-42b9-8918-1e5033fb9fa8', // Sri Lanka in 10 Days – Esala Perahera
        '8fc7a86b-90f9-4736-8d79-81da76a86879'  // Sri Lanka 11 Days – Including the Perahera
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
              isPage={true}
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
