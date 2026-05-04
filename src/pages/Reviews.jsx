import React from 'react';
import blogSafari from '../assets/blog-safari.png';
import blogCity from '../assets/blog-city.png';
import blogBoat from '../assets/blog-boat.png';

const Reviews = () => {
  const [selectedReview, setSelectedReview] = React.useState(null);

  const videoReviews = [
    { id: 1, name: "Dario Alvarado", tour: "May 2023 Tour", image: blogSafari },
    { id: 2, name: "Elena Martinez", tour: "June 2023 Tour", image: blogCity },
    { id: 3, name: "James Wilson", tour: "July 2023 Tour", image: blogBoat },
    { id: 4, name: "Sophia Chen", tour: "Aug 2023 Tour", image: blogSafari },
    { id: 5, name: "Lucas Brown", tour: "Sept 2023 Tour", image: blogCity },
    { id: 6, name: "Maria Garcia", tour: "Oct 2023 Tour", image: blogBoat },
    { id: 7, name: "John Smith", tour: "Nov 2023 Tour", image: blogSafari },
    { id: 8, name: "Emma Watson", tour: "Dec 2023 Tour", image: blogCity },
    { id: 9, name: "Robert De Niro", tour: "Jan 2024 Tour", image: blogBoat },
    { id: 10, name: "Anne Hathaway", tour: "Feb 2024 Tour", image: blogSafari },
    { id: 11, name: "David Beckham", tour: "March 2024 Tour", image: blogCity },
    { id: 12, name: "Victoria B.", tour: "April 2024 Tour", image: blogBoat },
  ];

  const textReviews = [
    { name: "Sarah & James", date: "Feb 2024", img: blogSafari, text: "Une expérience inoubliable ! Le safari animalier a été le point culminant de notre voyage. Eden Travels s'est occupé de tout parfaitement." },
    { name: "Elena Martinez", date: "Jan 2024", img: blogCity, text: "Le Sri Lanka est un pays magnifique et l'organisation d'Eden Travels a rendu notre séjour encore plus spécial. Les hôtels étaient de grande qualité." },
    { name: "James Wilson", date: "Dec 2023", img: blogBoat, text: "Un voyage sur mesure parfait. Notre guide était exceptionnel et nous a fait découvrir des endroits secrets loin des foules touristiques." },
    { name: "Sophia Chen", date: "Nov 2023", img: blogSafari, text: "La gentillesse des gens et la beauté des paysages nous ont marqués. Merci à toute l'équipe pour cette aventure incroyable." },
    { name: "Lucas Brown", date: "Oct 2023", img: blogCity, text: "Une organisation sans faille. Du début à la fin, nous nous sommes sentis pris en charge avec beaucoup d'attention et de professionnalisme." },
    { name: "Maria Garcia", date: "Sept 2023", img: blogBoat, text: "Les randonnées dans les plantations de thé étaient magiques. Un grand merci pour l'itinéraire personnalisé qui correspondait à nos attentes." },
    { name: "John Smith", date: "Aug 2023", img: blogSafari, text: "Une immersion culturelle totale. Le choix des activités était varié et très bien équilibré entre aventure et détente." },
    { name: "Emma Watson", date: "July 2023", img: blogCity, text: "Incroyable séjour ! La nourriture, les paysages et surtout l'accueil chaleureux ont rendu ce voyage inoubliable. On reviendra !" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/C:/Users/ASUS/.gemini/antigravity/brain/281003f6-40f9-4b9c-803a-003a6a03115c/reviews_hero_family_1777866517622.png" 
          alt="Happy Travelers" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 px-4 sm:px-6 py-2 rounded-full mb-6 sm:mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 sm:w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white text-xs sm:text-sm font-bold tracking-wide">Rated 4.9/5 by 150+ Travelers</span>
          </div>

          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-2xl">
            Real Stories
          </h1>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 opacity-90">
            Unforgettable Journeys
          </h2>
          <p className="text-white/80 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Read what our clients say about their experience traveling through Sri Lanka with Eden Travels. Authentic voices, real adventures.
          </p>
        </div>
      </section>

      {/* Recent Videos Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-primary text-3xl md:text-4xl font-bold mb-4">Recent videos</h2>
          <p className="text-gray-500 font-medium">
            Watch short videos from our clients explaining their experience in Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoReviews.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative rounded-[20px] overflow-hidden aspect-[4/5] shadow-lg mb-4">
                <img 
                  src={video.image} 
                  alt={video.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40">
                    <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-primary text-lg font-bold mb-0.5 group-hover:text-luxury transition-colors">
                  {video.name}
                </h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  {video.tour}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Watch More Button */}
        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-3 bg-[#4a6e91] hover:bg-primary text-white font-bold px-10 py-5 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95">
            <span>Watch More Videos</span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="bg-[#f0f7ff] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-4">Recent Reviews</h2>
            <p className="text-gray-500 font-medium">
              Read detailed evaluations from our clients at the end of their trips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {textReviews.map((review, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedReview(review)}
                className="relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl group transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={review.img} 
                  alt={review.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="flex text-yellow-400 gap-1 mb-3">
                    {[...Array(5)].map((_, star) => (
                      <svg key={star} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="text-white font-bold text-xl mb-1">{review.name}</h4>
                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">Tour in {review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="mt-20 text-center">
            <button className="inline-flex items-center gap-3 bg-[#426189] hover:bg-primary text-white font-bold px-10 py-5 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95">
              <span>See 150+ More Reviews</span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>
      {/* Why Travelers Love Us Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-4">Why Travelers Love Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Family Friendly",
                desc: "For our local agency, organized circuits for children are essential. We take maximum care of all the details when traveling with parents with small children.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )
              },
              {
                title: "Quality Hotels",
                desc: "Customer reviews of hotels in Sri Lanka are very positive. We ensure a good relationship between price and quality of services, especially with our superior category hotels.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: "Expert Drivers & Guides",
                desc: "Our drivers are instructed to drive with the utmost caution. Comments about the drivers and guides are always grateful, highlighting their professionalism in multiple languages.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Tailor-made Routes",
                desc: "Living and working in Kandy gives us privileged access to create exclusive, unique trips. We receive top scores for our tailor-made itineraries and prior trip management.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#f8f9fb] p-8 rounded-[32px] text-center flex flex-col items-center group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-primary font-bold text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#516d8a] rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to write your own story?</h2>
              <p className="text-white/80 text-lg md:text-xl">
                Join hundreds of satisfied travelers and discover the true beauty of Sri Lanka.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <button className="bg-white text-primary font-bold px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                Plan My Trip
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="bg-[#364a5d] text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-[#2c3d4d] transition-colors border border-white/10">
                Explore Tours
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
