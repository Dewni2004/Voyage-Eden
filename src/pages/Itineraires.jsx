import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItineraryHero from '../components/ItineraryHero/ItineraryHero';
import ItineraryCategories from '../components/ItineraryCategories/ItineraryCategories';
import PopularItineraries from '../components/PopularItineraries/PopularItineraries';
import Newsletter from '../components/Newsletter/Newsletter';
import { getItineraries } from '../services/contentService';
import HotelOptions from '../components/HotelOptions/HotelOptions';


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

  const getByCategory = (category) => itineraries.filter(it => it.category?.toLowerCase() === category.toLowerCase());

  return (
    <div>
      <ItineraryHero />
      <ItineraryCategories />
      
      <PopularItineraries title={t('itineraries.popular')} id="popular" itineraries={getByCategory('popular')} />
      <PopularItineraries title={t('itineraries.honeymoon')} id="honeymoon" itineraries={getByCategory('honeymoon')} />
      <PopularItineraries title={t('itineraries.family')} id="family" itineraries={getByCategory('family')} />
      <PopularItineraries title={t('itineraries.luxury')} id="luxury" itineraries={getByCategory('luxury')} isDark={true} />
      <PopularItineraries title={t('itineraries.golf')} id="golf" itineraries={getByCategory('golf')} isGreen={true} />
      <PopularItineraries title={t('itineraries.surf')} id="surf" itineraries={getByCategory('surf')} />
      <PopularItineraries title={t('itineraries.adventure')} id="adventure" itineraries={getByCategory('adventure')} />
      <PopularItineraries title={t('itineraries.perahera')} id="perahera" itineraries={getByCategory('perahera')} />
      <PopularItineraries title={t('itineraries.days8')} id="8days" itineraries={getByCategory('8days')} />
      
      <PopularItineraries title={t('itineraries.interests')} id="interests" itineraries={getByCategory('interests')} />

      <HotelOptions />
      <Newsletter />
    </div>
  );
};

export default Itineraires;
