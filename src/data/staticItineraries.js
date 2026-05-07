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
import sigiriya from '../assets/Sigiriya.jpg';
import kandy from '../assets/Kandy.jpg';
import galle from '../assets/Galle-Fort.jpg';
import ella from '../assets/Ella.jfif';
import mirissa from '../assets/Mirissa.webp';
import honeymoonCard from '../assets/Honeymoon - Trips Card.webp';
import eightDaysCard from '../assets/8Days - Trip Card.webp';
import interestCard from '../assets/Half - Day offers card.webp';

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
      { id: 1, location: 'Colombo', description: 'Arrivée à l\'aéroport et transfert à votre hôtel à Colombo.', image: tour1, coords: { x: 75, y: 220 }, highlights: 'City tour, Architecture colonial, Marché local', accommodation: 'The Kingsbury', meals: 'Breakfast' },
      { id: 2, location: 'Sigiriya', description: 'Explorez l\'ancienne forteresse rocheuse.', image: sigiriya, coords: { x: 150, y: 150 }, highlights: 'Rock Fortress, Gardens, Sunset', accommodation: 'Aliya Resort', meals: 'Breakfast & Dinner' },
      { id: 3, location: 'Kandy', description: 'Visitez le Temple de la Dent.', image: kandy, coords: { x: 160, y: 200 }, highlights: 'Temple, Dance, Lake', accommodation: 'Earl\'s Regency', meals: 'Half Board' },
      { id: 4, location: 'Ella', description: 'Randonnée dans les montagnes.', image: ella, coords: { x: 180, y: 280 }, highlights: 'Nine Arch Bridge, Little Adams Peak', accommodation: '98 Acres', meals: 'Breakfast' },
      { id: 5, location: 'Mirissa', description: 'Détente sur la plage.', image: mirissa, coords: { x: 140, y: 380 }, highlights: 'Whale Watching, Beach, Surfing', accommodation: 'Mandara Resort', meals: 'Breakfast' },
      { id: 6, location: 'Galle', description: 'Découvrez le fort historique.', image: galle, coords: { x: 100, y: 380 }, highlights: 'Fort, Lighthouse, Shopping', accommodation: 'Le Grand', meals: 'Breakfast' }
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
      { id: 1, location: 'Sigiriya', description: 'Visite de l\'ancienne forteresse rocheuse.', image: tour2, coords: { x: 150, y: 150 }, highlights: 'Rock Fortress, Gardens, Sunset', accommodation: 'Aliya Resort', meals: 'Breakfast & Dinner' },
      { id: 2, location: 'Kandy', description: 'Temple de la Dent.', image: kandy, coords: { x: 160, y: 200 }, highlights: 'Temple, Lake', accommodation: 'Earl\'s Regency', meals: 'Breakfast' },
      { id: 3, location: 'Nuwara Eliya', description: 'Plantations de thé.', image: tour1, coords: { x: 170, y: 250 }, highlights: 'Tea Factory, Waterfalls', accommodation: 'Grand Hotel', meals: 'Breakfast' },
      { id: 4, location: 'Ella', description: 'Paysages de montagne.', image: ella, coords: { x: 180, y: 280 }, highlights: 'Nine Arch Bridge', accommodation: '98 Acres', meals: 'Breakfast' },
      { id: 5, location: 'Yala', description: 'Safari animalier.', image: tour2, coords: { x: 220, y: 350 }, highlights: 'Leopards, Elephants', accommodation: 'Chena Huts', meals: 'Full Board' },
      { id: 6, location: 'Galle', description: 'Fort historique.', image: galle, coords: { x: 100, y: 380 }, highlights: 'Lighthouse, Dutch Fort', accommodation: 'Amangalla', meals: 'Breakfast' }
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
      { id: 1, location: 'Kandy', description: 'Temple de la Dent et spectacle culturel.', image: tour3, coords: { x: 160, y: 200 }, highlights: 'Temple, Dance, Lake', accommodation: 'Earl\'s Regency', meals: 'Half Board' },
      { id: 2, location: 'Matale', description: 'Jardins d\'épices.', image: tour4, coords: { x: 155, y: 170 }, highlights: 'Spices, Cooking class', accommodation: 'Boutique Villa', meals: 'Breakfast' },
      { id: 3, location: 'Sigiriya', description: 'Forteresse rocheuse.', image: sigiriya, coords: { x: 150, y: 150 }, highlights: 'Rock Fortress', accommodation: 'Aliya Resort', meals: 'Breakfast' },
      { id: 4, location: 'Polonnaruwa', description: 'Cité ancienne.', image: tour2, coords: { x: 190, y: 140 }, highlights: 'Statues, Temples', accommodation: 'Deer Park', meals: 'Breakfast' },
      { id: 5, location: 'Passikudah', description: 'Plages immaculées.', image: tour3, coords: { x: 250, y: 160 }, highlights: 'Snorkeling, Beach', accommodation: 'Sunrise Resort', meals: 'Breakfast' },
      { id: 6, location: 'Trincomalee', description: 'Observation des baleines.', image: tour1, coords: { x: 230, y: 90 }, highlights: 'Whales, Temple', accommodation: 'Jungle Beach', meals: 'Breakfast' }
    ]
  },
  { id: "static-6", title: "Fun en famille sur la côte", image: familyBeach, price: '1,800', description: 'Parfait pour tous les âges avec des activités variées.', duration: '10 Jours', group: 'Famille', effort: 'Faible', category: 'family', icons: ['Resort', 'Full Board', 'Van'], days: [{ id: 1, location: 'Bentota', description: 'Sports nautiques et safari en rivière.', image: familyBeach, coords: { x: 80, y: 320 }, highlights: 'Jet ski, Turtle hatchery', accommodation: 'Cinnamon Bey', meals: 'Half Board' }] },
  { id: "static-7", title: "Patrimoine et Culture en Famille", image: familyCard, price: '1,650', description: 'Découvrez l\'histoire du Sri Lanka ensemble.', duration: '09 Jours', group: 'Famille', effort: 'Modéré', category: 'family', icons: ['Hotel', 'Half Board', 'Car'], days: [{ id: 1, location: 'Anuradhapura', description: 'Ruines anciennes et temples.', image: familyCard, coords: { x: 130, y: 100 }, highlights: 'Stupas, Ancient city', accommodation: 'Heritage Hotel', meals: 'Breakfast' }] },
  { id: "static-8", title: "Retraite Royale à Ceylan", image: luxuryCard, price: '2,900', description: 'L\'expérience de luxe ultime avec service VIP.', duration: '14 Jours', group: 'VIP', effort: 'Faible', category: 'luxury', icons: ['5 Star', 'All Inc', 'Luxury Car'], days: [{ id: 1, location: 'Colombo', description: 'Séjour de luxe en ville.', image: luxuryCard, coords: { x: 75, y: 220 }, highlights: 'Fine dining, Luxury spa', accommodation: 'Shangri-La', meals: 'Breakfast' }] },
  { id: "static-9", title: "Évasion Balnéaire de Luxe", image: beachSunset, price: '2,400', description: 'Séjour exclusif dans les meilleurs complexes.', duration: '08 Jours', group: 'VIP', effort: 'Faible', category: 'luxury', icons: ['5 Star', 'Full Board', 'Van'], days: [{ id: 1, location: 'Passikudah', description: 'Plage privée et luxe.', image: beachSunset, coords: { x: 250, y: 160 }, highlights: 'Private pool, Beach resort', accommodation: 'Anantaya', meals: 'Full Board' }] },
  { id: "static-10", title: "Golf au Paradis", image: tour4, price: '1,260', description: 'Découvrez les meilleurs terrains de golf du Sri Lanka.', duration: '07 Jours', group: 'Privé', effort: 'Modéré', category: 'golf', icons: ['Golf Resort', 'Half Board', 'Car'], days: [{ id: 1, location: 'Victoria Golf', description: 'Terrain de golf de classe mondiale.', image: tour4, coords: { x: 170, y: 190 }, highlights: 'Golf, Scenic views', accommodation: 'Victoria Resort', meals: 'Breakfast' }] },
  { id: "static-11", title: "Surf et Détente à Weligama", image: beachSunset, price: '1,150', description: 'Attrapez les meilleures vagues de la côte sud.', duration: '05 Jours', group: 'Groupe', effort: 'Intense', category: 'surf', icons: ['Surf Camp', 'B&B', 'TukTuk'], days: [{ id: 1, location: 'Weligama', description: 'Cours de surf et vie nocturne.', image: beachSunset, coords: { x: 130, y: 400 }, highlights: 'Surfing, Beach parties', accommodation: 'Hangtime Hostel', meals: 'Breakfast' }] },
  { id: "static-12", title: "Expédition d'Aventure", image: adventureCard, price: '1,260', description: 'Cités anciennes et traditions vibrantes.', duration: '07 Jours', group: 'Privé', effort: 'Intense', category: 'adventure', icons: ['Boutique', 'B&B', 'Van'], days: [{ id: 1, location: 'Knuckles', description: 'Trekking dans les Knuckles.', image: adventureCard, coords: { x: 170, y: 180 }, highlights: 'Trekking, Nature photography', accommodation: 'Camping', meals: 'All Inclusive' }] },
  { id: "static-13", title: "Spécial Esela Perahera", image: perheraCard, price: '1,450', description: 'Vivez la magie du festival le plus célèbre.', duration: '05 Jours', group: 'Groupe', effort: 'Modéré', category: 'pererahera', days: [{ id: 1, location: 'Kandy', description: 'Festival Esala Perahera.', image: perheraCard, coords: { x: 160, y: 200 }, highlights: 'Perahera parade, Elephants', accommodation: 'Queen\'s Hotel', meals: 'Breakfast' }] },
  { id: "static-14", title: "Épopée de 8 Jours", image: eightDaysCard, price: '1,100', description: 'Un condensé des merveilles de l\'île en une semaine.', duration: '08 Jours', group: 'Privé', effort: 'Modéré', category: '8days', days: [{ id: 1, location: 'Dambulla', description: 'Temples et grottes.', image: eightDaysCard, coords: { x: 145, y: 160 }, highlights: 'Cave temple, Golden Buddha', accommodation: 'Jetwing Lake', meals: 'Breakfast' }] },
  { id: "static-15", title: "Sri Lanka par Intérêt", image: interestCard, price: '950', description: 'Itinéraires personnalisés selon vos passions.', duration: '06 Jours', group: 'Privé', effort: 'Modéré', category: 'interest', days: [{ id: 1, location: 'Anuradhapura', description: 'Histoire ancienne.', image: interestCard, coords: { x: 130, y: 100 }, highlights: 'Ancient history, Archeology', accommodation: 'Heritage Hotel', meals: 'Breakfast' }] }
];
