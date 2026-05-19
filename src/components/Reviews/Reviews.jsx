import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReviews } from '../../services/contentService';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) return null;


  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Ce que disent nos clients</h2>
          <div className="w-20 h-1 bg-luxury mx-auto rounded-full"></div>
        </div>

        {/* Grid/Slider */}
        <div className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 -mx-6 px-6 md:mx-0 md:px-0">
          {reviews.slice(0, 5).map((review) => (
            <div 
              key={review.id} 
              className="relative h-[450px] min-w-[280px] w-[85vw] sm:w-auto md:w-auto md:min-w-0 snap-center rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer shrink-0 md:shrink"
            >
              {/* Background Image */}
              <img 
                src={review.img} 
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
                  <p className="text-luxury text-xs font-bold uppercase tracking-widest">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 md:mt-16 text-center">
          <Link 
            to="/reviews" 
            className="inline-block relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-luxury rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Main Button */}
            <div className="relative px-6 py-3 md:px-12 md:py-5 bg-primary/90 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl flex items-center gap-4 md:gap-6 transition-all duration-300 group-hover:bg-primary shadow-2xl">
              <span className="text-white font-bold tracking-wider uppercase text-xs md:text-sm">Voir tous les avis</span>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-hover:bg-luxury">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
