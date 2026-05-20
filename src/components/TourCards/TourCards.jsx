import React, { useState, useRef } from 'react';
import ItineraryCard from '../UI/ItineraryCard';
import swipeHandImg from '../../assets/swipe-hand-transparent.png';
import tour1 from '../../assets/L\'île des couleurs (8 jours).webp';
import tour2 from '../../assets/Explorez le mythique Ceylan (12 jours).png';
import tour3 from '../../assets/Le pays des épices (15 jours).png';
import tour4 from '../../assets/Tour Card 4.png';

const TourCards = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!hasScrolled && scrollRef.current) {
      if (scrollRef.current.scrollLeft > 20) {
        setHasScrolled(true);
      }
    }
  };

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
    <section className="py-10 md:py-16 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Nos circuits proposés à personnaliser</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light">
            Des montagnes brumeuses aux plages dorées, découvrez une île aux merveilles infinies 
            avec les plus grands experts du voyage au Sri Lanka.
          </p>
        </div>

        {/* Mobile Swipe Hint Overlay */}
        {!hasScrolled && tours.length > 1 && (
          <div className="md:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
            <img 
              src={swipeHandImg} 
              alt="Swipe Gesture" 
              className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
            />
          </div>
        )}

        {/* Grid */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {tours.map((tour) => (
            <div key={tour.id} className="min-w-[280px] w-[85vw] sm:w-[45vw] md:w-auto shrink-0 snap-center h-full">
              <ItineraryCard
                id={tour.id}
                title={tour.title}
                image={tour.image}
                icons={tour.icons}
                description={tour.description}
                price={tour.price}
                duration={tour.duration}
                tag="Populaire"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 md:mt-16 text-center">
          <a 
            href="/itineraires" 
            className="group inline-flex items-center space-x-2 md:space-x-3 btn-premium-primary px-6 py-2.5 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl text-sm md:text-base font-bold"
          >
            <span>Découvrez nos autres itinéraires</span>
            <div className="bg-primary group-hover:bg-white rounded-full p-1 md:p-1.5 transition-colors duration-300 shadow-sm">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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
