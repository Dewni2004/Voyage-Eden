import luxuryImg from '../assets/luxury.webp';
import standardImg from '../assets/standard.png';
import superiorImg from '../assets/superior.jpg';
import eastCoastImg from '../assets/east coast.webp';
import customTripImg from '../assets/custom-trip-bg.jpg';
import beachSunsetImg from '../assets/beach-sunset.png';

export const cuisines = [
  "All Cuisines",
  "Sri Lankan",
  "Seafood",
  "Asian Fusion",
  "Italian",
  "International",
  "European"
];

export const cities = [
  "All Cities",
  "Colombo",
  "Galle",
  "Kandy",
  "Dambulla",
  "Mirissa"
];

export const amenitiesList = [
  "Free WiFi",
  "Valet Parking",
  "Outdoor Seating",
  "Private Dining",
  "Wheelchair Access",
  "Liquor Served"
];

export const restaurants = [
  {
    id: 1,
    name: "Ministry of Crab",
    city: "Colombo",
    cuisines: ["Seafood", "Sri Lankan"],
    rating: 4.8,
    hours: "12:00 PM - 10:30 PM",
    amenities: ["Outdoor Seating", "Liquor Served", "Free WiFi"],
    image: standardImg,
    description: "Experience the finest Sri Lankan mud crab in a historic setting.",
    address: "No. 4, Old Dutch Hospital Complex, Hospital Street, Colombo 01, Sri Lanka, Colombo",
    email: "reservations@ministryofcrab.com",
    phone: "+94 77 002 4823",
    website: "https://www.ministryofcrab.com",
    gallery: [standardImg, superiorImg, luxuryImg, beachSunsetImg, eastCoastImg]
  },
  {
    id: 2,
    name: "Nuga Gama",
    city: "Colombo",
    cuisines: ["Sri Lankan"],
    rating: 4.5,
    hours: "7:00 PM - 10:30 PM",
    amenities: ["Free WiFi", "Valet Parking", "Outdoor Seating"],
    image: superiorImg,
    description: "A rustic village in the city offering authentic Sri Lankan cuisine.",
    address: "Cinnamon Grand, 77 Galle Road, Colombo 03, Sri Lanka",
    email: "dining@cinnamongrand.com",
    phone: "+94 11 243 7437",
    website: "https://www.cinnamonhotels.com",
    gallery: [superiorImg, customTripImg, standardImg, luxuryImg]
  },
  {
    id: 3,
    name: "Cafe Nuwara",
    city: "Galle",
    cuisines: ["Sri Lankan", "Asian Fusion", "International"],
    rating: 4.6,
    hours: "8:00 AM - 11:00 PM",
    amenities: ["Free WiFi", "Outdoor Seating"],
    image: customTripImg,
    description: "Delightful fusion of flavors in the heart of Galle Fort.",
    address: "Light House Street, Galle Fort, Galle, Sri Lanka",
    email: "info@cafenuwara.lk",
    phone: "+94 91 223 4567",
    website: "https://www.cafenuwara.lk",
    gallery: [customTripImg, beachSunsetImg, standardImg, eastCoastImg, luxuryImg]
  },
  {
    id: 4,
    name: "Rangiri Luvv Restaurant",
    city: "Dambulla",
    cuisines: ["Italian", "Asian Fusion", "Sri Lankan"],
    rating: 4.8,
    hours: "7:00 AM - 10:00 PM",
    amenities: ["Free WiFi"],
    image: eastCoastImg,
    description: "A blend of traditional Sri Lankan and Italian dishes.",
    address: "Kandy Road, Dambulla 21100, Sri Lanka",
    email: "contact@rangiriluvv.com",
    phone: "+94 66 228 3921",
    website: "https://www.rangiriluvv.com",
    gallery: [eastCoastImg, luxuryImg, superiorImg, customTripImg]
  },
  {
    id: 5,
    name: "Helga's Folly Kitchen",
    city: "Kandy",
    cuisines: ["Sri Lankan", "European"],
    rating: 4.4,
    hours: "7:00 PM - 10:00 PM",
    amenities: ["Valet Parking", "Outdoor Seating", "Liquor Served"],
    image: luxuryImg,
    description: "An eccentric and luxurious dining experience in Kandy.",
    address: "70 Rajapihilla Mawatha, Kandy 20000, Sri Lanka",
    email: "helga@helgasfolly.com",
    phone: "+94 81 223 4571",
    website: "https://www.helgasfolly.com",
    gallery: [luxuryImg, superiorImg, standardImg, eastCoastImg, beachSunsetImg]
  },
  {
    id: 6,
    name: "Mirissa Beach Club",
    city: "Mirissa",
    cuisines: ["Seafood", "International"],
    rating: 4.7,
    hours: "11:00 AM - 12:00 AM",
    amenities: ["Outdoor Seating", "Liquor Served", "Free WiFi"],
    image: beachSunsetImg,
    description: "Enjoy fresh seafood while watching the sunset on the beach.",
    address: "Beach Road, Mirissa 81740, Sri Lanka",
    email: "hello@mirissabeachclub.com",
    phone: "+94 77 123 4567",
    website: "https://www.mirissabeachclub.com",
    gallery: [beachSunsetImg, eastCoastImg, customTripImg, superiorImg]
  }
];
