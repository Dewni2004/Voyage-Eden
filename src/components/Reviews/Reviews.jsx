import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah & James',
      location: 'UK',
      text: '"Une expérience inoubliable ! Le safari animalier a été le point culminant de notre voyage. Eden Travels s\'est occupé de tout parfaitement."',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Canada',
      text: '"The personalized itinerary was exactly what we needed. From the tea plantations to the beaches, everything was handled with care and luxury."',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 3,
      name: 'Elena Rossi',
      location: 'Italy',
      text: '"Professional guides and beautiful accommodations. Sri Lanka is a gem, and Eden Travels made our honeymoon truly magical."',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'Australia',
      text: '"Excellent service from start to finish. The local knowledge of our driver was impressive. Highly recommend for a stress-free vacation."',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Ce que disent nos clients</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-[#f8faff] p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center border border-gray-100"
            >
              {/* Header with Image & Name */}
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="text-left">
                  <p className="font-bold text-primary">
                    — {review.name}, {review.location}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 italic mb-6 leading-relaxed text-[15px] flex-grow">
                {review.text}
              </p>

              {/* Stars */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
