import React from 'react';
import ItineraryCard from '../UI/ItineraryCard';
import tour1 from '../../assets/L\'île des couleurs (8 jours).webp';
import tour2 from '../../assets/Explorez le mythique Ceylan (12 jours).png';
import tour3 from '../../assets/Le pays des épices (15 jours).png';
import tour4 from '../../assets/Tour Card 4.png';

const TourCards = () => {
  const tours = [
    {
      id: "static-1",
      title: "L'île des couleurs (8 jours)",
      duration: "8 Jours",
      image: tour1,
      icons: ["Hôtels 4/5*", "Safari", "Groupe de 4"],
      description: "Explorez le Sri Lanka en 8 jours : visitez Anuradhapura, Polonnaruwa, Sigiriya et Dambulla ; continuez par Kandy et Nuwara Eliya, prenez le train panoramique vers Ella, profitez d'un safari à Yala et terminez votre voyage au fort de Galle et à la plage d'Unawatuna.",
      price: "1,260",
    },
    {
      id: "static-2",
      title: "Explorez le mythique Ceylan (12 jours)",
      duration: "12 Jours",
      image: tour2,
      icons: ["Hôtels 3/4*", "Toutes entrées", "Groupe de 4"],
      description: "Explorez le Sri Lanka en 12 jours : visitez Anuradhapura, Polonnaruwa, Sigiriya, Dambulla, Kandy, Nuwara Eliya et Ella. Profitez du safari à Yala et détendez-vous sur les plages d'Unawatuna et Mirissa, alliant histoire, nature et expériences côtières.",
      price: "1,840",
    },
    {
      id: "static-3",
      title: "Le pays des épices (15 jours)",
      duration: "15 Jours",
      image: tour3,
      icons: ["Hôtels 3/4*", "Safari Jeep", "Groupe de 4"],
      description: "Explorez le Sri Lanka en 15 jours : visitez Anuradhapura, Polonnaruwa, Sigiriya, Trincomalee et les plages de Nilaveli. Continuez vers Kandy, Nuwara Eliya et Ella, profitez du safari classique à Yala et terminez votre voyage à Galle pour une expérience complète.",
      price: "2,260",
    },
    {
      id: "f21c35ef-6769-4f04-bea4-f4af774bb968",
      title: "Découverte du Sud (7 jours)",
      duration: "7 Jours",
      image: tour4,
      icons: ["Hôtels 4/5*", "Baleines", "Vie Sauvage"],
      description: "Un circuit spécialisé axé sur la côte sud et la vie sauvage. Visitez le fort de Galle, Mirissa pour l'observation des baleines et le parc national de Yala pour une expérience de safari inoubliable.",
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
        <div className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0">
          {tours.map((tour) => (
            <div key={tour.id} className="min-w-[280px] w-[85vw] sm:w-[45vw] md:w-auto shrink-0 snap-center h-full">
              <ItineraryCard
                id={tour.id}
                title={tour.title}
                image={tour.image}
                icons={tour.icons}
                description={tour.description}
                price={tour.price}
                tag="Populaire"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 md:mt-16 text-center">
          <a 
            href="/itineraires" 
            className="inline-flex items-center space-x-2 md:space-x-3 bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
          >
            <span>Découvrez nos autres itinéraires</span>
            <div className="bg-white rounded-full p-1 md:p-1.5">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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
