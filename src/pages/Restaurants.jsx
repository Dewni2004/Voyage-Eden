import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Newsletter from '../components/Newsletter/Newsletter';
const restaurants = [];
const cuisines = ["All Cuisines"];
const cities = ["All Cities"];
const amenitiesList = [];

const Restaurants = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language?.split('-')[0] || 'fr';

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Lock body scroll when restaurant detail modal is open
  useEffect(() => {
    if (selectedRestaurant) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRestaurant]);

  // Filtering Logic
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      // Search
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Cuisine
      const matchesCuisine = selectedCuisine === "All Cuisines" || restaurant.cuisines.includes(selectedCuisine);
      // City
      const matchesCity = selectedCity === "All Cities" || restaurant.city === selectedCity;
      // Rating (if any selected)
      const matchesRating = selectedRating.length === 0 || selectedRating.some(r => restaurant.rating >= r && restaurant.rating < r + 1);
      // Amenities (must have all selected amenities)
      const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => restaurant.amenities.includes(a));

      return matchesSearch && matchesCuisine && matchesCity && matchesRating && matchesAmenities;
    });
  }, [searchQuery, selectedCuisine, selectedCity, selectedRating, selectedAmenities]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" alt="Restaurants" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12 pt-24">
          <button 
            onClick={() => navigate(`/${lang}/itineraires`)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm mb-6 w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            {t('nav.itineraries', 'Itineraires')}
          </button>
          <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">
            {t('restaurants.subtitle', 'Gastronomie')}
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-bold font-serif mb-4 leading-tight">{t('restaurants.title', 'Restaurants')}</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            {t('restaurants.description', 'Découvrez les meilleures expériences culinaires, sélectionnées pour votre voyage.')}
          </p>
        </div>
      </div>



      <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-6 h-fit lg:sticky lg:top-40">
          
          {/* Search Card */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-primary text-lg mb-4">{t('restaurants.searchTitle', 'Buscar aquí')}</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t('restaurants.searchPlaceholder', 'Buscar Aquí...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm text-gray-700"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </div>

          {/* Cuisine Filter Card */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-primary text-lg mb-4">{t('restaurants.cuisine', 'Categorías')}</h3>
            <div className="flex flex-col gap-1">
              {cuisines.map(cuisine => {
                const count = cuisine === "All Cuisines" 
                  ? restaurants.length 
                  : restaurants.filter(r => r.cuisines.includes(cuisine)).length;
                
                return (
                  <div 
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${selectedCuisine === cuisine ? 'bg-gray-50' : 'bg-transparent hover:bg-gray-50'}`}
                  >
                    <span className={`text-sm font-medium ${selectedCuisine === cuisine ? 'text-primary' : 'text-gray-600'}`}>{cuisine === "All Cuisines" ? t('restaurants.allCategories', 'Todas las categorías') : cuisine}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${selectedCuisine === cuisine ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>



        </aside>

        {/* Main Content Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-600">
              <span className="text-primary font-bold">{filteredRestaurants.length}</span> {t('restaurants.results', 'résultats')}
            </h2>
          </div>

          {filteredRestaurants.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <AnimatePresence>
                {filteredRestaurants.map(restaurant => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={restaurant.id} 
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="bg-white rounded-[1.75rem] border border-primary/20 hover:border-primary/55 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_45px_-12px_rgba(30,64,111,0.08)] overflow-hidden transition-all duration-500 group flex flex-col h-full w-full cursor-pointer"
                  >
                    
                    {/* Card Image Header */}
                    <div className="h-56 md:h-64 overflow-hidden relative flex-shrink-0">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mb-2">{restaurant.cuisines[0]}</p>
                      <h3 className="text-xl font-bold mb-4 text-primary">{restaurant.name}</h3>
                      
                      {/* Icon Bar */}
                      <div className="flex items-center space-x-4 mb-6 py-2 px-3 bg-gray-50 rounded-lg flex-wrap gap-y-2">
                        <div className="flex items-center space-x-1.5">
                          <svg className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{restaurant.rating} {t('restaurants.rating', 'Rating')}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{restaurant.city}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{restaurant.hours}</span>
                        </div>
                      </div>

                      <p className="text-[14px] leading-relaxed mb-8 flex-grow font-light text-gray-500">
                        {restaurant.description}
                      </p>

                      <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-primary">
                            {restaurant.amenities.slice(0, 2).join(' • ')}
                            {restaurant.amenities.length > 2 && '...'}
                          </span>
                        </div>
                        <button className="btn-premium-primary px-6 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap min-w-[120px] text-center">
                          {t('restaurants.viewDetails', 'View Details')}
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">No restaurants found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCuisine("All Cuisines");
                  setSelectedCity("All Cities");
                  setSelectedAmenities([]);
                  setSelectedRating([]);
                }}
                className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Newsletter />
      
      {/* Restaurant Detail Modal */}
      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95%] max-w-[1400px] h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden my-auto"
            >
              {/* Modal Header is gone, we'll implement the new layout inside Scrollable Content directly */}
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/50 backdrop-blur border border-gray-200 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="flex-1 overflow-y-auto overscroll-none scroll-smooth bg-gray-50">
                <div className="w-full h-full px-6 py-10 md:px-12 md:py-14">
                  
                  {/* Top Header */}
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{selectedRestaurant.name}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-md text-xs">
                        {selectedRestaurant.cuisines.join(', ')}
                      </span>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {selectedRestaurant.address}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(Math.floor(selectedRestaurant.rating))].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          ))}
                        </div>
                        <span className="font-bold">{selectedRestaurant.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div className="w-full h-[40vh] md:h-[50vh] rounded-[2rem] overflow-hidden mb-8 shadow-sm">
                    <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Main Details Section - Redesigned to be clean and minimal */}
                  <div className="flex flex-col lg:flex-row gap-10 md:gap-16">
                    
                    {/* Left Column (Details) */}
                    <div className="flex-1">
                      <div className="space-y-10">
                        
                        {/* Quick Facts */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            {t('restaurants.quickFacts', 'Quick Facts')}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            <div>
                              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1 block">{t('restaurants.cuisineLabel', 'Cuisine')}</span>
                              <span className="text-base font-bold text-gray-800">{selectedRestaurant.cuisines.join(', ')}</span>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1 block">{t('restaurants.hoursLabel', 'Hours')}</span>
                              <span className="text-base font-bold text-gray-800">{selectedRestaurant.hours}</span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1 block">{t('restaurants.addressLabel', 'Address')}</span>
                              <span className="text-base font-bold text-gray-800">{selectedRestaurant.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200"></div>

                        {/* Amenities */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            </div>
                            {t('restaurants.amenitiesTitle', 'Amenities & Features')}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {selectedRestaurant.amenities.map((amenity, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                <span className="text-sm font-bold text-gray-700">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Column (Contact & Actions) - Sticky */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                      <div className="sticky top-6 bg-white p-6 rounded-3xl shadow-lg shadow-black/5 border border-gray-100 flex flex-col gap-6">
                        
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4">{t('restaurants.contactTitle', 'Contact Us')}</h4>
                          <div className="flex flex-col gap-4">
                            <a href={`mailto:${selectedRestaurant.email}`} className="flex items-start gap-3 group">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              </div>
                              <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors break-all mt-1">{selectedRestaurant.email}</span>
                            </a>
                            <a href={`tel:${selectedRestaurant.phone}`} className="flex items-start gap-3 group">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                              </div>
                              <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors mt-1">{selectedRestaurant.phone}</span>
                            </a>
                          </div>
                        </div>

                        <div className="w-full h-px bg-gray-100"></div>

                        <div className="flex flex-col gap-3">
                          <a 
                            href={selectedRestaurant.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-transform active:scale-95 shadow-md"
                          >
                            {t('restaurants.visitWebsite', 'Visit Website')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                          <button 
                            onClick={() => setSelectedRestaurant(null)}
                            className="w-full flex items-center justify-center py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-transform active:scale-95"
                          >
                            {t('restaurants.backBtn', 'Back to Restaurants')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Gallery */}
                  {selectedRestaurant.gallery && selectedRestaurant.gallery.length > 0 && (
                    <div className="mt-12 md:mt-16">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        {t('restaurants.galleryTitle', 'Photo Gallery')}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {selectedRestaurant.gallery.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group">
                            <img 
                              src={img} 
                              alt={`${selectedRestaurant.name} gallery ${idx + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Restaurants;
