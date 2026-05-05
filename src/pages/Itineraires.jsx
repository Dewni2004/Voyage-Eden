import React from 'react';
import ItineraryHero from '../components/ItineraryHero/ItineraryHero';
import ItineraryCategories from '../components/ItineraryCategories/ItineraryCategories';
import PopularItineraries from '../components/PopularItineraries/PopularItineraries';
import Newsletter from '../components/Newsletter/Newsletter';

// Import local images
import tour1 from '../assets/L\'île des couleurs (8 jours).webp';
import tour2 from '../assets/Explorez le mythique Ceylan (12 jours).png';
import tour3 from '../assets/Le pays des épices (15 jours).png';
import adventureCard from '../assets/Adventure - Trips Card.webp';
import familyCard from '../assets/Family - Trip Card.webp';
import luxuryCard from '../assets/Luxury - Trip Card.webp';
import perheraCard from '../assets/Perhera - Trip Card.webp';
import tour4 from '../assets/Tour Card 4.png';
import familyBeach from '../assets/family-beach.png';
import beachSunset from '../assets/beach-sunset.png';

const Itineraires = () => {
  const allItineraries = {
    popular: [
      { id: 1, title: "L'île des couleurs (8 jours)", image: tour1, price: '1,260', description: 'Explore the highlights of Sri Lanka...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 2, title: "Explorez le mythique Ceylan (12 jours)", image: tour2, price: '1,840', description: 'A romantic getaway...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 3, title: "Le pays des épices (15 jours)", image: tour3, price: '2,260', description: 'Classic Sri Lanka experience...', icons: ['4/5 Star', 'Full Board', 'Van'] },
    ],
    adventure: [
      { id: 4, title: "Perahera Spectacular", image: perheraCard, price: '1,450', description: 'Experience the magic of the Esala Perahera...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 5, title: "Adventure Expedition", image: adventureCard, price: '1,260', description: 'Ancient cities and vibrant traditions...', icons: ['Boutique', 'B&B', 'Van'] },
      { id: 18, title: "Sacred Tooth Relic", image: tour4, price: '1,260', description: 'Journey to the heart of Kandy...', icons: ['Hotel', 'Half Board', 'Car'] },
    ],
    family: [
      { id: 6, title: "Coastal Family Fun", image: familyBeach, price: '1,800', description: 'Perfect for all ages...', icons: ['Resort', 'Full Board', 'Van'] },
      { id: 7, title: "Heritage & Culture", image: familyCard, price: '1,650', description: 'History for the whole family...', icons: ['Hotel', 'Half Board', 'Car'] },
    ],
    luxury: [
      { id: 8, title: "Royal Ceylon Retreat", image: luxuryCard, price: '2,900', description: 'Ultimate luxury experience...', icons: ['5 Star', 'All Inc', 'Luxury Car'] },
    ],
    collection: [
      { id: 9, title: "L'île des couleurs (8 jours)", image: tour1, price: '1,260', description: 'Visitez Anuradhapura, Polonnaruwa, Sigiriya et Dambulla...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 10, title: "Luxury Beach Escape", image: beachSunset, price: '1,260', description: 'Exclusive resort stay...', icons: ['5 Star', 'Full Board', 'Van'] },
      { id: 11, title: "Golden Sands Tour", image: tour3, price: '1,260', description: 'The best of Southern Sri Lanka...', icons: ['4/5 Star', 'Half Board', 'Car'] },
    ],
    golf: [
      { id: 12, title: "Golf in Paradise", image: tour4, price: '1,260', description: 'Experience the best golf courses in Sri Lanka...', icons: ['Golf Resort', 'Half Board', 'Car'] },
      { id: 13, title: "Hill Country Golf", image: adventureCard, price: '1,260', description: 'Play golf amidst the tea plantations...', icons: ['Boutique', 'B&B', 'Van'] },
      { id: 14, title: "Coastal Tee Time", image: familyBeach, price: '1,260', description: 'Beachfront golf and luxury stay...', icons: ['Resort', 'Full Board', 'Car'] },
    ],
    surf: [
      { id: 15, title: "Surf's Up in Weligama", image: beachSunset, price: '1,150', description: 'Catch the best waves in the south coast...', icons: ['Surf Camp', 'B&B', 'TukTuk'] },
      { id: 16, title: "Deep Sea Diving", image: tour2, price: '1,350', description: 'Explore coral reefs and shipwrecks...', icons: ['Diving Resort', 'Half Board', 'Boat'] },
      { id: 17, title: "Turtle Watch & Snorkel", image: familyBeach, price: '980', description: 'Swim with turtles in Mirissa...', icons: ['Hotel', 'Full Board', 'Van'] },
    ]
  };

  return (
    <div>
      <ItineraryHero />
      <ItineraryCategories />
      <PopularItineraries title="Nos Itinéraires les Plus Populaires" id="popular" itineraries={allItineraries.popular} />
      <PopularItineraries title="Voyages d'aventure" id="adventure" itineraries={allItineraries.adventure} />
      <PopularItineraries title="Voyages en famille" id="family" itineraries={allItineraries.family} />
      <PopularItineraries title="Collection de luxe" id="luxury" itineraries={allItineraries.collection} isDark={true} />
      <PopularItineraries title="Voyages de golf" id="golf" itineraries={allItineraries.golf} isGreen={true} />
      <PopularItineraries title="Voyages de surf et de plongée" id="surf" itineraries={allItineraries.surf} />
      <Newsletter />
    </div>
  );
};

export default Itineraires;
