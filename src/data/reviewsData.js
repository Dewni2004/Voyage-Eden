import blogSafari from '../assets/blog-safari.png';
import blogCity from '../assets/blog-city.png';
import blogBoat from '../assets/blog-boat.png';

export const staticTextReviews = [
  {
    id: 1,
    name: "Elena Martinez",
    date: "Jan 2024",
    text: "Le Sri Lanka est un pays magnifique et l'organisation d'Eden Travels a rendu notre séjour encore plus spécial. Les hôtels étaient de grande qualité.",
    img: blogSafari,
    rating: 5,
    headline: "Un voyage inoubliable en famille",
    detailedText: "Notre voyage au Sri Lanka avec Eden Travels a surpassé toutes nos attentes. Dès notre arrivée à l'aéroport, nous avons été accueillis avec une chaleur incroyable. L'itinéraire était parfaitement équilibré entre aventure, culture et détente.",
    gallery: [blogSafari, blogCity, blogBoat, blogSafari],
    tourDetails: { date: "15 Jan 2024", travelerType: "Family", group: "Private" },
    guide: { name: "Hasindu", photo: "", rating: 5, quote: "C'était un plaisir de guider la famille Martinez." }
  },
  {
    id: 2,
    name: "James Wilson",
    date: "Dec 2023",
    text: "Un voyage sur mesure parfait. Notre guide était exceptionnel et nous a fait découvrir des endroits secrets loin des foules touristiques.",
    img: blogCity,
    rating: 5,
    headline: "Perfect tailor-made journey",
    detailedText: "Everything was perfectly organized. The selection of boutique hotels was excellent, and our guide's knowledge of local history was impressive.",
    gallery: [blogCity, blogSafari, blogBoat, blogCity],
    tourDetails: { date: "10 Dec 2023", travelerType: "Couple", group: "Private" },
    guide: { name: "Tharindu", photo: "", rating: 5, quote: "James and his wife were very curious about our culture." }
  },
  {
    id: 3,
    name: "Sophie Laurent",
    date: "Nov 2023",
    text: "Expérience incroyable ! Le safari à Yala était le point fort. Nous avons vu des léopards et des éléphants de très près.",
    img: blogBoat,
    rating: 5,
    headline: "Wildlife and Nature at its best",
    detailedText: "The Yala safari was breathtaking. We were lucky enough to see a leopard within the first hour! Eden Travels made sure we had the best jeep and driver.",
    gallery: [blogBoat, blogSafari, blogCity, blogBoat],
    tourDetails: { date: "22 Nov 2023", travelerType: "Friends", group: "Small Group" },
    guide: { name: "Nimal", photo: "", rating: 5, quote: "Sophie's group was full of energy!" }
  },
  {
    id: 4,
    name: "Marco Rossi",
    date: "Oct 2023",
    text: "La nourriture, les gens, les paysages... tout était parfait. Merci à l'équipe pour ce voyage inoubliable.",
    img: blogSafari,
    rating: 5,
    headline: "A culinary and cultural dream",
    detailedText: "As a chef, I was mostly interested in the local cuisine. Eden Travels organized several cooking classes that were the highlight of my trip.",
    gallery: [blogSafari, blogBoat, blogCity, blogSafari],
    tourDetails: { date: "05 Oct 2023", travelerType: "Solo", group: "Private" },
    guide: { name: "Hasindu", photo: "", rating: 5, quote: "Marco taught me a few things about Italian coffee!" }
  }
];
