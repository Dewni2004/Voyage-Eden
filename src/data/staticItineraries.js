// Import local images for static dummy data
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

export const staticItineraries = [
  { 
    id: "static-1", 
    title: "L'île des couleurs (8 jours)", 
    image: tour1, 
    price: '1,260', 
    description: 'Une exploration vibrante des paysages les plus colorés du Sri Lanka, des plantations de thé aux plages dorées.', 
    duration: '08 Jours',
    group: 'Privé',
    effort: 'Modéré',
    category: 'popular',
    days: [
      { id: 1, location: 'Colombo', description: 'Arrivée à l\'aéroport et transfert à votre hôtel à Colombo.', image: tour1, coords: { x: 75, y: 220 }, highlights: 'City tour, Architecture colonial, Marché local', accommodation: 'The Kingsbury', meals: 'Breakfast' }
    ]
  },
  { 
    id: "static-2", 
    title: "Explorez le mythique Ceylan (12 jours)", 
    image: tour2, 
    price: '1,840', 
    description: 'Un voyage à travers le temps et la nature, découvrant les cités anciennes et les parcs nationaux.', 
    duration: '12 Jours',
    group: 'Privé',
    effort: 'Modéré',
    category: 'popular',
    days: [
      { id: 1, location: 'Sigiriya', description: 'Visite de l\'ancienne forteresse rocheuse.', image: tour2, coords: { x: 150, y: 150 }, highlights: 'Rock Fortress, Gardens, Sunset', accommodation: 'Aliya Resort', meals: 'Breakfast & Dinner' }
    ]
  },
  { 
    id: "static-3", 
    title: "Le pays des épices (15 jours)", 
    image: tour3, 
    price: '2,260', 
    description: 'Une immersion totale dans la culture et les traditions culinaires de l\'île.', 
    duration: '15 Jours',
    group: 'Privé',
    effort: 'Faible',
    category: 'popular',
    days: [
      { id: 1, location: 'Kandy', description: 'Temple de la Dent et spectacle culturel.', image: tour3, coords: { x: 160, y: 200 }, highlights: 'Temple, Dance, Lake', accommodation: 'Earl\'s Regency', meals: 'Half Board' }
    ]
  },
  { id: "static-4", title: "Perahera Spectacular", image: perheraCard, price: '1,450', description: 'Experience the magic of the Esala Perahera...', duration: '05 Jours', group: 'Groupe', effort: 'Modéré', category: 'adventure', icons: ['4/5 Star', 'Half Board', 'Car'] },
  { id: "static-5", title: "Adventure Expedition", image: adventureCard, price: '1,260', description: 'Ancient cities and vibrant traditions...', duration: '07 Jours', group: 'Privé', effort: 'Intense', category: 'adventure', icons: ['Boutique', 'B&B', 'Van'] },
  { id: "static-6", title: "Coastal Family Fun", image: familyBeach, price: '1,800', description: 'Perfect for all ages...', duration: '10 Jours', group: 'Famille', effort: 'Faible', category: 'family', icons: ['Resort', 'Full Board', 'Van'] },
  { id: "static-7", title: "Heritage & Culture", image: familyCard, price: '1,650', description: 'History for the whole family...', duration: '09 Jours', group: 'Famille', effort: 'Modéré', category: 'family', icons: ['Hotel', 'Half Board', 'Car'] },
  { id: "static-8", title: "Royal Ceylon Retreat", image: luxuryCard, price: '2,900', description: 'Ultimate luxury experience...', duration: '14 Jours', group: 'VIP', effort: 'Faible', category: 'luxury', icons: ['5 Star', 'All Inc', 'Luxury Car'] },
  { id: "static-9", title: "Luxury Beach Escape", image: beachSunset, price: '1,260', description: 'Exclusive resort stay...', duration: '08 Jours', group: 'VIP', effort: 'Faible', category: 'luxury', icons: ['5 Star', 'Full Board', 'Van'] },
  { id: "static-12", title: "Golf in Paradise", image: tour4, price: '1,260', description: 'Experience the best golf courses in Sri Lanka...', duration: '07 Jours', group: 'Privé', effort: 'Modéré', category: 'golf', icons: ['Golf Resort', 'Half Board', 'Car'] },
  { id: "static-15", title: "Surf's Up in Weligama", image: beachSunset, price: '1,150', description: 'Catch the best waves in the south coast...', duration: '05 Jours', group: 'Groupe', effort: 'Intense', category: 'surf', icons: ['Surf Camp', 'B&B', 'TukTuk'] }
];
