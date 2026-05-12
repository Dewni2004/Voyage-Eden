import React, { useEffect, useState } from 'react';
import ItineraryHero from '../components/ItineraryHero/ItineraryHero';
import ItineraryCategories from '../components/ItineraryCategories/ItineraryCategories';
import PopularItineraries from '../components/PopularItineraries/PopularItineraries';
import Newsletter from '../components/Newsletter/Newsletter';
import { getItineraries } from '../services/contentService';
import { staticItineraries } from '../data/staticItineraries';

const Itineraires = () => {
  const [itineraries, setItineraries] = useState(staticItineraries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const dynamicData = await getItineraries();
        // Merge static and dynamic, dynamic takes priority if ID matches (though unlikely with Firestore IDs)
        setItineraries([...staticItineraries, ...dynamicData]);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const getByCategory = (category) => itineraries.filter(it => it.category === category);

  return (
    <div>
      <ItineraryHero />
      <ItineraryCategories />
      
      <PopularItineraries title="Nos itinéraires les plus populaires" id="popular" itineraries={getByCategory('popular')} />
      <PopularItineraries title="Voyages de noces" id="honeymoon" itineraries={getByCategory('honeymoon')} />
      <PopularItineraries title="Voyages en famille" id="family" itineraries={getByCategory('family')} />
      <PopularItineraries title="Collection de luxe" id="luxury" itineraries={getByCategory('luxury')} isDark={true} />
      <PopularItineraries title="Séjours golfiques" id="golf" itineraries={getByCategory('golf')} isGreen={true} />
      <PopularItineraries title="Voyages de surf et de plongée" id="surf" itineraries={getByCategory('surf')} />
      <PopularItineraries title="Voyages d'aventure" id="adventure" itineraries={getByCategory('adventure')} />
      <PopularItineraries title="Spéciaux d'Esela Perahera" id="pererahera" itineraries={getByCategory('pererahera')} />
      <PopularItineraries title="Itinéraires de 8 jours" id="8days" itineraries={getByCategory('8days')} />
      
      <PopularItineraries title="itinéraires basés sur les centres d'intérêt" id="interests" itineraries={getByCategory('interests')} />

      <Newsletter />
    </div>
  );
};

export default Itineraires;
