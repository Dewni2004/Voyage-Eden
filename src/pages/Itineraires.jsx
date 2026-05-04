import React from 'react';
import ItineraryHero from '../components/ItineraryHero/ItineraryHero';
import ItineraryCategories from '../components/ItineraryCategories/ItineraryCategories';
import PopularItineraries from '../components/PopularItineraries/PopularItineraries';
import Newsletter from '../components/Newsletter/Newsletter';

const Itineraires = () => {
  const allItineraries = {
    popular: [
      { id: 1, title: "L'île des couleurs (8 jours)", image: 'https://images.unsplash.com/photo-1552423158-efee1b2ff6b2?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Explore the highlights of Sri Lanka...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 2, title: "Lune de miel au paradis", image: 'https://images.unsplash.com/photo-1583275484611-5c4e9f583168?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'A romantic getaway...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 3, title: "The Island of Colours (8 Days)", image: 'https://images.unsplash.com/photo-1544616782-88641ebdf10c?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Classic Sri Lanka experience...', icons: ['4/5 Star', 'Full Board', 'Van'] },
    ],
    adventure: [
      { id: 4, title: "L'île des couleurs (8 jours)", image: 'https://images.unsplash.com/photo-1551041777-ed7783a9977c?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Experience the magic of the Esala Perahera...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 5, title: "Cultural Heritage Tour", image: 'https://images.unsplash.com/photo-1586714264313-e17b38d2bc2b?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Ancient cities and vibrant traditions...', icons: ['Boutique', 'B&B', 'Van'] },
      { id: 18, title: "Sacred Tooth Relic", image: 'https://images.unsplash.com/photo-1552423158-efee1b2ff6b2?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Journey to the heart of Kandy...', icons: ['Hotel', 'Half Board', 'Car'] },
    ],
    family: [
      { id: 6, title: "Coastal Family Fun", image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', price: '1,800', description: 'Perfect for all ages...', icons: ['Resort', 'Full Board', 'Van'] },
      { id: 7, title: "Heritage & Culture", image: 'https://images.unsplash.com/photo-1552423158-efee1b2ff6b2?auto=format&fit=crop&q=80&w=800', price: '1,650', description: 'History for the whole family...', icons: ['Hotel', 'Half Board', 'Car'] },
    ],
    luxury: [
      { id: 8, title: "Royal Ceylon Retreat", image: 'https://images.unsplash.com/photo-1544616782-88641ebdf10c?auto=format&fit=crop&q=80&w=800', price: '2,900', description: 'Ultimate luxury experience...', icons: ['5 Star', 'All Inc', 'Luxury Car'] },
    ],
    collection: [
      { id: 9, title: "L'île des couleurs (8 jours)", image: 'https://images.unsplash.com/photo-1552423158-efee1b2ff6b2?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Visitez Anuradhapura, Polonnaruwa, Sigiriya et Dambulla...', icons: ['4/5 Star', 'Half Board', 'Car'] },
      { id: 10, title: "Luxury Beach Escape", image: 'https://images.unsplash.com/photo-1583275484611-5c4e9f583168?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Exclusive resort stay...', icons: ['5 Star', 'Full Board', 'Van'] },
      { id: 11, title: "Golden Sands Tour", image: 'https://images.unsplash.com/photo-1544616782-88641ebdf10c?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'The best of Southern Sri Lanka...', icons: ['4/5 Star', 'Half Board', 'Car'] },
    ],
    golf: [
      { id: 12, title: "L'île des couleurs (8 jours)", image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Experience the best golf courses in Sri Lanka...', icons: ['Golf Resort', 'Half Board', 'Car'] },
      { id: 13, title: "Hill Country Golf", image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Play golf amidst the tea plantations...', icons: ['Boutique', 'B&B', 'Van'] },
      { id: 14, title: "Coastal Tee Time", image: 'https://images.unsplash.com/photo-1552423158-efee1b2ff6b2?auto=format&fit=crop&q=80&w=800', price: '1,260', description: 'Beachfront golf and luxury stay...', icons: ['Resort', 'Full Board', 'Car'] },
    ],
    surf: [
      { id: 15, title: "Surf's Up in Weligama", image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800', price: '1,150', description: 'Catch the best waves in the south coast...', icons: ['Surf Camp', 'B&B', 'TukTuk'] },
      { id: 16, title: "Deep Sea Diving", image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', price: '1,350', description: 'Explore coral reefs and shipwrecks...', icons: ['Diving Resort', 'Half Board', 'Boat'] },
      { id: 17, title: "Turtle Watch & Snorkel", image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&q=80&w=800', price: '980', description: 'Swim with turtles in Mirissa...', icons: ['Hotel', 'Full Board', 'Van'] },
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
