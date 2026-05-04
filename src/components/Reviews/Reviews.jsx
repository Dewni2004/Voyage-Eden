import React from 'react';
import blogSafari from '../../assets/blog-safari.png';
import blogCity from '../../assets/blog-city.png';
import blogBoat from '../../assets/blog-boat.png';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah & James',
      location: 'UK',
      text: '"Une expérience inoubliable ! Le safari animalier a été le point culminant de notre voyage."',
      image: blogSafari,
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Canada',
      text: '"The personalized itinerary was exactly what we needed. From tea plantations to beaches."',
      image: blogCity,
    },
    {
      id: 3,
      name: 'Elena Rossi',
      location: 'Italy',
      text: '"Professional guides and beautiful accommodations. Sri Lanka is a gem, absolutely magical."',
      image: blogBoat,
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'Australia',
      text: '"Excellent service from start to finish. The local knowledge of our driver was impressive."',
      image: blogSafari,
    },
    {
      id: 5,
      name: 'Sophia Chen',
      location: 'UK',
      text: '"Everything was handled with care and luxury. We felt so taken care of throughout."',
      image: blogCity,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Ce que disent nos clients</h2>
          <div className="w-20 h-1 bg-luxury mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer"
            >
              {/* Background Image */}
              <img 
                src={review.image} 
                alt={review.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                {/* Stars */}
                <div className="flex text-yellow-400 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-white/90 italic mb-6 leading-relaxed text-sm md:text-base line-clamp-4">
                  {review.text}
                </p>

                <div className="border-t border-white/20 pt-6">
                  <h4 className="font-bold text-xl mb-1">{review.name}</h4>
                  <p className="text-luxury text-xs font-bold uppercase tracking-widest">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
