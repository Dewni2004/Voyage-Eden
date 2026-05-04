import React from 'react';
import { useNavigate } from 'react-router-dom';
import tour1 from '../../assets/Tour Card 1.webp';
import tour2 from '../../assets/Tour Card 2.png';
import tour3 from '../../assets/Tour Card 3.png';
import tour4 from '../../assets/Tour Card 4.png';

const TourCards = () => {
  const navigate = useNavigate();
  const tours = [
    {
      id: 1,
      title: "L'île des couleurs",
      duration: "8 Days",
      image: tour1,
      features: [
        "4/5 Star Hotels with Dinner and Breakfast",
        "Including all entrance fees, Safaris, Jeeps",
        "Per person Reference price for Group of 4",
      ],
      description: "Explore Sri Lanka in 8 days: visit Anuradhapura, Polonnaruwa, Sigiriya, and Dambulla; continue through Kandy and Nuwara Eliya, take the scenic train to Ella, enjoy a Yala safari, and conclude your journey at Galle Fort and Unawatuna Beach.",
      price: "1260",
    },
    {
      id: 2,
      title: "Explore the Mythical Ceylon",
      duration: "12 Days",
      image: tour2,
      features: [
        "3/4 Star Hotels with Dinner and Breakfast",
        "Including all entrance fees, Safaris, Jeeps",
        "Per person Reference price for Group of 4",
      ],
      description: "Explore Sri Lanka in 12 days: visit Anuradhapura, Polonnaruwa, Sigiriya, Dambulla, Kandy, Nuwara Eliya, and Ella. Enjoy Yala safari and relax at Unawatuna and Mirissa beaches, combining history, nature, and coastal experiences.",
      price: "1840",
    },
    {
      id: 3,
      title: "The Land Of Spices",
      duration: "15 Days",
      image: tour3,
      features: [
        "3/4 Star Hotels with Dinner and Breakfast",
        "Including all entrance fees, Safaris, Jeep",
        "Per person Reference price for Group of 4",
      ],
      description: "Explore Sri Lanka in 15 days: visit Anuradhapura, Polonnaruwa, Sigiriya, Trincomalee, and Nilaveli beaches. Continue to Kandy, Nuwara Eliya, and Ella, enjoy classic Yala safari, and conclude your journey in Galle for a full experience.",
      price: "2260",
    },
    {
      id: 4,
      title: "Southern Discovery",
      duration: "7 Days",
      image: tour4,
      features: [
        "4/5 Star Hotels with Dinner and Breakfast",
        "Including all entrance fees, Safaris, Jeeps",
        "Per person Reference price for Group of 4",
      ],
      description: "A specialized tour focusing on the southern coast and wildlife. Visit Galle Fort, Mirissa for whale watching, and Yala National Park for an unforgettable safari experience.",
      price: "1050",
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
          {tours.slice(0, 4).map((tour) => (
            <div 
              key={tour.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
            >
              {/* Image with Overlay Text */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                
                {/* Text on Image */}
                <div className="absolute top-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">
                    {tour.title}
                  </h3>
                  <p className="text-sm font-medium opacity-90 drop-shadow-md">
                    Sri Lanka in {tour.duration}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  {tour.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm text-gray-600 font-medium">
                      <div className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[13px] leading-relaxed text-gray-500 mb-8 font-light italic line-clamp-4">
                  {tour.description}
                </p>

                {/* Bottom Section with Divider */}
                <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-primary font-bold text-xl uppercase tracking-tight">
                      USD {tour.price.replace('$', '')}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/itinerary/${tour.id}`)}
                    className="bg-primary hover:bg-luxury text-white px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-primary/20 transform hover:-translate-y-1"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <a 
            href="/itineraires" 
            className="inline-flex items-center space-x-3 bg-primary hover:bg-luxury text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-primary/20 group"
          >
            <span>Découvrez nos autres itinéraires</span>
            <div className="bg-white rounded-full p-1 group-hover:translate-x-1 transition-transform duration-300">
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
