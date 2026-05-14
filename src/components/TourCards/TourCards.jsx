import React from 'react';
import ItineraryCard from '../UI/ItineraryCard';
import tour1 from '../../assets/L\'île des couleurs (8 jours).webp';
import tour2 from '../../assets/Explorez le mythique Ceylan (12 jours).png';
import tour3 from '../../assets/Le pays des épices (15 jours).png';
import tour4 from '../../assets/Tour Card 4.png';

const TourCards = () => {
  const tours = [
    {
      id: 1,
      title: "L'île des couleurs (8 jours)",
      duration: "8 Jours",
      image: tour1,
      icons: ["4/5 Stars", "Safari", "Group of 4"],
      description: "Explore Sri Lanka in 8 days: visit Anuradhapura, Polonnaruwa, Sigiriya, and Dambulla; continue through Kandy and Nuwara Eliya, take the scenic train to Ella, enjoy a Yala safari, and conclude your journey at Galle Fort and Unawatuna Beach.",
      price: "1,260",
    },
    {
      id: 2,
      title: "Explore the Mythical Ceylon (12 jours)",
      duration: "12 Jours",
      image: tour2,
      icons: ["3/4 Stars", "All entrance", "Group of 4"],
      description: "Explore Sri Lanka in 12 days: visit Anuradhapura, Polonnaruwa, Sigiriya, Dambulla, Kandy, Nuwara Eliya, and Ella. Enjoy Yala safari and relax at Unawatuna and Mirissa beaches, combining history, nature, and coastal experiences.",
      price: "1,840",
    },
    {
      id: 3,
      title: "The Land Of Spices (15 jours)",
      duration: "15 Jours",
      image: tour3,
      icons: ["3/4 Stars", "Jeep Safari", "Group of 4"],
      description: "Explore Sri Lanka in 15 days: visit Anuradhapura, Polonnaruwa, Sigiriya, Trincomalee, and Nilaveli beaches. Continue to Kandy, Nuwara Eliya, and Ella, enjoy classic Yala safari, and conclude your journey in Galle for a full experience.",
      price: "2,260",
    },
    {
      id: 4,
      title: "Southern Discovery (7 jours)",
      duration: "7 Jours",
      image: tour4,
      icons: ["4/5 Stars", "Whale Watch", "Wildlife"],
      description: "A specialized tour focusing on the southern coast and wildlife. Visit Galle Fort, Mirissa for whale watching, and Yala National Park for an unforgettable safari experience.",
      price: "1,050",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Nos circuits proposés à personnaliser</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            Des montagnes brumeuses aux plages dorées, découvrez une île aux merveilles infinies 
            avec les plus grands experts du voyage au Sri Lanka.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((tour) => (
            <ItineraryCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              image={tour.image}
              icons={tour.icons}
              description={tour.description}
              price={tour.price}
              tag="Populaire"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <a 
            href="/itineraires" 
            className="inline-flex items-center space-x-3 bg-primary text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
          >
            <span>Découvrez nos autres itinéraires</span>
            <div className="bg-white rounded-full p-1">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TourCards;

