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
