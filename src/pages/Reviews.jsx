import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReviews } from '../services/contentService';
import { staticTextReviews } from '../data/reviewsData';

import PageHero from '../components/UI/PageHero';
import reviewsBanner from '../assets/family-beach.png';

const Reviews = () => {
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      setDynamicReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const textReviews = [...dynamicReviews, ...staticTextReviews];

  const videoReviews = [
    { id: 1, name: "Tharindu & Anne", date: "Jan 2024", thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800" },
    { id: 2, name: "The Wilson Family", date: "Dec 2023", thumbnail: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800" },
    { id: 3, name: "Elena & Marco", date: "Nov 2023", thumbnail: "https://images.unsplash.com/photo-1506929199175-4841174e17df?w=800" },
    { id: 4, name: "Sophie Laurent", date: "Oct 2023", thumbnail: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800" },
    { id: 5, name: "James Wilson", date: "Sep 2023", thumbnail: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800" },
    { id: 6, name: "The Rossi Group", date: "Aug 2023", thumbnail: "https://images.unsplash.com/photo-1493558103817-5859396d3c6a?w=800" }
  ];

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src={reviewsBanner} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <div className="flex justify-center text-yellow-400 gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4">Real Stories</h1>
          <p className="text-xl md:text-3xl font-medium tracking-wide uppercase opacity-90">Unforgettable Journeys</p>
          <p className="mt-8 text-white/80 max-w-2xl mx-auto text-lg">
            See how our travelers experienced the magic of Sri Lanka, from the misty hills to the golden shores.
          </p>
        </div>
      </div>
      
      {/* Recent Videos Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <span className="text-luxury text-sm font-bold uppercase tracking-widest mb-2 block">Visual Memories</span>
          <h2 className="text-primary text-4xl font-bold font-serif">Recent Videos</h2>
          <p className="text-gray-400 mt-2">Short video highlights from our guests' amazing trips.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoReviews.map((video) => (
            <div key={video.id} className="bg-white rounded-[32px] overflow-hidden shadow-xl group cursor-pointer border border-gray-100">
              <div className="relative h-64">
                <img src={video.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                    <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-primary font-bold text-lg">{video.name}</h4>
                <p className="text-gray-400 text-sm mt-1">Tour in {video.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-primary text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">View All Videos</button>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center md:text-left">
            <span className="text-luxury text-sm font-bold uppercase tracking-widest mb-2 block">Guest Feedback</span>
            <h2 className="text-primary text-4xl font-bold font-serif">Recent Reviews</h2>
            <p className="text-gray-400 mt-2">Authentic stories and experiences shared by our valued guests.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {textReviews.map((review, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedReview(review)}
                className="relative h-[500px] rounded-[40px] overflow-hidden group shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                {/* Background Image */}
                <img src={review.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex text-yellow-400 gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-white text-sm italic leading-relaxed mb-8">
                    "{review.text}"
                  </p>
                  
                  <div className="border-t border-white/20 pt-6 flex items-end justify-between">
                    <div>
                      <h4 className="text-white font-bold text-xl leading-tight font-serif">{review.name}</h4>
                      <p className="text-luxury text-[10px] font-bold uppercase tracking-widest mt-1">{review.tourDetails?.travelerType || 'Traveler'}</p>
                    </div>
                    <Link 
                      to={`/review/${review.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-white/10 hover:bg-white text-white hover:text-primary rounded-full flex items-center justify-center transition-all group/btn backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-primary text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">Load More Reviews</button>
          </div>
        </div>
      </section>

      {/* Why Travelers Love Us Section */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-primary text-4xl md:text-5xl font-bold font-serif mb-6">Why Travelers Love Us</h2>
          <div className="w-24 h-1 bg-luxury mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Tailored Trips", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4", desc: "Crafting every journey to fit your personal style." },
            { title: "Expert Guides", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", desc: "Local experts who know the island's best-kept secrets." },
            { title: "Premium Hotels", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", desc: "Only the finest accommodations for your comfort." },
            { title: "Safe & Private", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", desc: "Your safety and privacy are our top priorities." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-lg border border-gray-50 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} /></svg>
              </div>
              <h4 className="text-primary font-bold text-xl mb-4">{feature.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-primary rounded-[50px] overflow-hidden relative p-12 md:p-24 text-center text-white shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8">Ready to write your own story?</h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
              Join hundreds of happy travelers and experience the trip of a lifetime with Eden Travels.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-white text-primary font-bold px-10 py-5 rounded-2xl hover:bg-luxury hover:text-white transition-all shadow-xl">Plan My Trip Now</Link>
              <a href="https://wa.me/94770000000" target="_blank" rel="noreferrer" className="bg-transparent border-2 border-white text-white font-bold px-10 py-5 rounded-2xl hover:bg-white hover:text-primary transition-all">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedReview(null)}
          ></div>
          <div className="relative bg-white rounded-[40px] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedReview(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center z-20 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedReview.img} 
                alt={selectedReview.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
              <div className="flex text-yellow-400 gap-1 mb-6">
                {[...Array(5)].map((_, star) => (
                  <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed mb-10">
                "{selectedReview.text}"
              </p>
              
              <div className="border-t border-gray-100 pt-8">
                <h4 className="text-primary font-bold text-2xl mb-1">{selectedReview.name}</h4>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Tour in {selectedReview.date}</p>
                <Link
                  to={`/review/${selectedReview.id}`}
                  className="mt-6 text-primary font-bold text-sm flex items-center gap-2 group/btn hover:text-luxury transition-all"
                >
                  Read Full Story
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
