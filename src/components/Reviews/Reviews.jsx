import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getReviews } from '../../services/contentService';
import swipeHandImg from '../../assets/swipe-hand-transparent.png';


const Reviews = () => {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(i18n.language);
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, [i18n.language]);

  useEffect(() => {
    if (window.innerWidth >= 768 || !scrollRef.current || reviews.length <= 1) return;

    const container = scrollRef.current;
    let observerActive = true;
    let isAutoScrolling = false;

    const handleScroll = () => {
      if (isAutoScrolling) return;
      setShowSwipeHint(false);
      container.removeEventListener('scroll', handleScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && observerActive) {
            setShowSwipeHint(true);
            isAutoScrolling = true;
            container.addEventListener('scroll', handleScroll, { passive: true });

            // Auto swipe peek animation
            setTimeout(() => {
              if (container) {
                // Temporarily disable scroll snapping
                container.style.scrollSnapType = 'none';
                container.scrollTo({ left: 70, behavior: 'smooth' });
                
                setTimeout(() => {
                  if (container) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    // Restore scroll snapping after animation completes
                    setTimeout(() => {
                      if (container) container.style.scrollSnapType = '';
                      isAutoScrolling = false;
                    }, 500);
                  }
                }, 700);
              }
            }, 500);

            observer.unobserve(entry.target);
            observerActive = false;
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [reviews]);

  if (loading || reviews.length === 0) return null;


  return (
    <section className="py-6 md:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-3">{t('reviews.title')}</h2>
          <span className="inline-block bg-primary/5 text-primary text-[11px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            {reviews.length} {reviews.length <= 1 ? t('nav.reviews', 'avis client') : t('nav.reviews', 'avis clients')}
          </span>
        </div>

        {/* Mobile Swipe Hint Overlay */}
        {showSwipeHint && (
          <div className="md:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none flex justify-center items-center">
            <div className="p-4 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.08)] flex items-center justify-center animate-glass-swipe">
              <img 
                src={swipeHandImg} 
                alt="Swipe Gesture" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
        )}

        {/* Grid/Slider */}
        <div 
          ref={scrollRef}
          className="flex md:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible pb-8 md:pb-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {reviews.slice(0, 5).map((review) => (
            <Link 
              key={review.id} 
              to={`/${i18n.language?.split('-')[0] || 'fr'}/review/${review.id}`}
              className="relative h-[450px] min-w-[280px] w-[85vw] sm:w-auto md:w-auto md:min-w-0 snap-center rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer shrink-0 md:shrink block"
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

                <p className="text-white/90 italic mb-6 leading-relaxed text-sm md:text-base line-clamp-4 text-left">
                  {review.text}
                </p>

                <div className="border-t border-white/20 pt-6 flex items-end justify-between text-left">
                  <div>
                    <h4 className="font-bold text-xl mb-1">{review.name}</h4>
                    <p className="text-luxury text-xs font-bold uppercase tracking-widest">{review.date}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-primary backdrop-blur-sm shrink-0">
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 md:mt-16 text-center">
          <Link 
            to="/reviews" 
            className="group inline-flex items-center gap-2 sm:gap-3 border border-primary bg-transparent text-primary hover:bg-primary hover:text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95"
          >
            <span>{t('nav.reviews')}</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-primary/5 group-hover:bg-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1.5 shadow-sm">
              <svg className="w-2.5 h-2.5 sm:w-3 h-3 md:w-4 md:h-4 text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
