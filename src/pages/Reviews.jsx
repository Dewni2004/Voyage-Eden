import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import swipeHandImg from '../assets/swipe-hand-transparent.png';
import { getReviews } from '../services/contentService';
import { staticTextReviews } from '../data/reviewsData';

import PageHero from '../components/UI/PageHero';
import reviewsBanner from '../assets/Review page Banner.jpeg';

const Reviews = () => {
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasScrolledVideos, setHasScrolledVideos] = useState(false);
  const [hasScrolledText, setHasScrolledText] = useState(false);
  const videosScrollRef = useRef(null);
  const textScrollRef = useRef(null);

  const handleVideosScroll = () => {
    if (!hasScrolledVideos && videosScrollRef.current) {
      if (videosScrollRef.current.scrollLeft > 20) {
        setHasScrolledVideos(true);
      }
    }
  };

  const handleTextScroll = () => {
    if (!hasScrolledText && textScrollRef.current) {
      if (textScrollRef.current.scrollLeft > 20) {
        setHasScrolledText(true);
      }
    }
  };

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
    { id: "Pjdej3Rz-OM", name: "Tharindu & Anne", date: "Jan 2024", thumbnail: "https://img.youtube.com/vi/Pjdej3Rz-OM/hqdefault.jpg" },
    { id: "T5pHb4KrFJg", name: "The Wilson Family", date: "Dec 2023", thumbnail: "https://img.youtube.com/vi/T5pHb4KrFJg/hqdefault.jpg" },
    { id: "iZbmWFCZrKQ", name: "Elena & Marco", date: "Nov 2023", thumbnail: "https://img.youtube.com/vi/iZbmWFCZrKQ/hqdefault.jpg" },
    { id: "iPXf_9b4AQ8", name: "Sophie Laurent", date: "Oct 2023", thumbnail: "https://img.youtube.com/vi/iPXf_9b4AQ8/hqdefault.jpg" },
    { id: "6APcyO3HLqM", name: "James Wilson", date: "Sep 2023", thumbnail: "https://img.youtube.com/vi/6APcyO3HLqM/hqdefault.jpg" },
    { id: "Rcp6ilHKp8Q", name: "The Rossi Group", date: "Aug 2023", thumbnail: "https://img.youtube.com/vi/Rcp6ilHKp8Q/hqdefault.jpg" }
  ];

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src={reviewsBanner} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <div className="flex justify-center text-yellow-400 gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4">Histoires réelles</h1>
          <p className="text-xl md:text-3xl font-medium tracking-wide uppercase opacity-90">Voyages inoubliables</p>
          <p className="mt-8 text-white/80 max-w-2xl mx-auto text-lg">
            Découvrez comment nos voyageurs ont vécu la magie du Sri Lanka, des collines brumeuses aux rivages dorés.
          </p>
        </div>
      </div>

      {/* Google & Video Reviews Badges Section */}
      <section className="relative z-10 -mt-10 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 mb-12 animate-fade-in">
        <div className="bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden backdrop-blur-md">
          
          {/* Left Column: Google Reviews */}
          <div className="p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* Google Logo */}
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 shrink-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.3-4.53-4.18-4.53z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </div>
              
              <div className="w-full text-left">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight font-serif">Avis Google</span>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    Vérifié
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 justify-start">
                  <span className="text-base font-extrabold text-amber-500">5.0</span>
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs font-normal">(416+ avis voyageurs)</span>
                </div>
                <p className="text-gray-400 text-[11px] sm:text-xs mt-2 font-normal leading-relaxed text-left">Note moyenne basée sur les retours d'expérience de nos clients.</p>
              </div>
            </div>
            
            {/* Actions for Google */}
            <div className="flex gap-3 mt-6 justify-start">
              <a 
                href="https://www.google.com/search?q=Sri+Lanka+Eden+Travels"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 btn-premium-primary px-4 py-1.5 rounded-xl text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Consulter
              </a>
              <a 
                href="https://www.google.com/search?q=Sri+Lanka+Eden+Travels#lrd=0x3ae3662a67e2a9b3:0xd9099db1070ff22,3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 btn-premium-secondary px-4 py-1.5 rounded-xl text-xs"
              >
                <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Écrire
              </a>
            </div>
          </div>
          
          {/* Right Column: Video Reviews */}
          <div className="p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* YouTube Logo */}
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 shrink-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.974 24 12 24 12s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              
              <div className="w-full text-left">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight font-serif">Avis Vidéo</span>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    YouTube
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 justify-start">
                  <span className="text-base font-extrabold text-red-600">4K HD</span>
                  <svg className="w-4 h-3.5 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                  <span className="text-gray-400 text-xs font-normal">(Témoignages de nos clients)</span>
                </div>
                <p className="text-gray-400 text-[11px] sm:text-xs mt-2 font-normal leading-relaxed text-left">Découvrez l'aventure en images à travers les yeux de nos voyageurs.</p>
              </div>
            </div>
            
            {/* Actions for Video */}
            <div className="flex gap-3 mt-6 justify-start">
              <button 
                onClick={() => {
                  const el = document.getElementById('recent-videos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-1.5 btn-premium-primary px-4 py-1.5 rounded-xl text-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Visionner
              </button>
              <a 
                href="https://www.youtube.com/@srilankaviajeseden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 btn-premium-secondary px-4 py-1.5 rounded-xl text-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.974 24 12 24 12s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>
          
        </div>
      </section>

      {/* Recent Videos Section */}
      <section className="py-16 max-w-7xl mx-auto px-6 relative">
        <div className="mb-16 text-center md:text-left">
          <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Souvenirs visuels</span>
          <h2 className="text-primary text-4xl font-bold font-serif">Vidéos récentes</h2>
          <p className="text-gray-400 mt-2">Courts moments forts en vidéo des voyages incroyables de nos clients.</p>
        </div>

        {/* Mobile Swipe Hint Overlay */}
        {!hasScrolledVideos && videoReviews.length > 1 && (
          <div className="sm:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
            <img 
              src={swipeHandImg} 
              alt="Swipe Gesture" 
              className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
            />
          </div>
        )}

        <div 
          ref={videosScrollRef}
          onScroll={handleVideosScroll}
          className="flex sm:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar sm:overflow-visible pb-8 sm:pb-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 -mx-6 px-6 sm:mx-0 sm:px-0"
        >
          {videoReviews.map((video) => (
            <div 
              key={video.id} 
              onClick={() => setSelectedVideo(video)}
              className="min-w-[280px] w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[32px] overflow-hidden shadow-xl group cursor-pointer border border-gray-100"
            >
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
                <p className="text-gray-400 text-sm mt-1">Voyage en {video.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a 
            href="https://www.youtube.com/@srilankaviajeseden" 
            target="_blank" 
            rel="noreferrer"
            className="group inline-flex items-center gap-2 sm:gap-3 border-[3px] border-primary bg-transparent text-primary hover:bg-primary hover:text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95"
          >
            <span>Voir toutes les vidéos</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-primary/5 group-hover:bg-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1.5 shadow-sm">
              <svg className="w-2.5 h-2.5 sm:w-3 h-3 md:w-4 md:h-4 text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-16 text-center md:text-left">
            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Avis des voyageurs</span>
            <h2 className="text-primary text-4xl font-bold font-serif">Avis récents</h2>
            <p className="text-gray-400 mt-2">Histoires et expériences authentiques partagées by nos clients précieux.</p>
          </div>

          {/* Mobile Swipe Hint Overlay */}
          {!hasScrolledText && textReviews.length > 1 && (
            <div className="sm:hidden absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none transition-opacity duration-700 flex justify-center items-center">
              <img 
                src={swipeHandImg} 
                alt="Swipe Gesture" 
                className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-swipe-gesture"
              />
            </div>
          )}

          <div 
            ref={textScrollRef}
            onScroll={handleTextScroll}
            className="flex sm:grid overflow-x-auto snap-x snap-mandatory hide-scrollbar sm:overflow-visible pb-8 sm:pb-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mx-6 px-6 sm:mx-0 sm:px-0"
          >
            {textReviews.map((review, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedReview(review)}
                className="min-w-[280px] w-[85vw] sm:w-auto shrink-0 snap-center relative h-[500px] rounded-[40px] overflow-hidden group shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
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
                      <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">{review.tourdetails?.travelertype || review.tourDetails?.travelerType || 'Traveler'}</p>
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

        </div>
      </section>

      {/* Why Travelers Love Us Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-primary text-4xl md:text-5xl font-bold font-serif mb-6">Pourquoi les voyageurs nous aiment</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {[
            { title: "Voyages sur mesure", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4", desc: "Créer chaque voyage selon votre style personnel." },
            { title: "Guides experts", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", desc: "Des experts locaux qui connaissent les secrets les mieux gardés de l'île." },
            { title: "Hôtels de prestige", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", desc: "Seulement les meilleurs hébergements pour votre confort." },
            { title: "Sûr et privé", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", desc: "Votre sécurité et votre vie privée sont nos priorités absolues." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-4 sm:p-10 rounded-2xl sm:rounded-[1.75rem] border border-primary/20 shadow-[0_15px_35px_-5px_rgba(30,64,111,0.06)] text-center flex flex-col justify-between">
              <div>
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary border border-primary flex items-center justify-center text-white shadow-md shadow-primary/15">
                    <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} /></svg>
                  </div>
                </div>
                <h4 className="text-primary font-bold text-sm sm:text-xl mb-2 sm:mb-4">{feature.title}</h4>
              </div>
              <p className="text-gray-500 text-[12px] sm:text-sm leading-relaxed mt-auto">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto relative rounded-[2.5rem] overflow-hidden shadow-xl group">
          {/* Background Image & Overlays */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000" 
              alt="Travel Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/60"></div>
          </div>

          <div className="relative z-10 p-6 md:p-10 text-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4">
                <span className="text-white text-[8px] font-bold uppercase tracking-[0.3em]">Commencez l'aventure</span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold font-serif text-white mb-4 leading-tight">
                Prêt à écrire votre <span className="italic opacity-80">propre histoire ?</span>
              </h2>
              
              <p className="text-white/70 text-sm md:text-base mb-8 font-light max-w-lg">
                Rejoignez des centaines de voyageurs heureux et vivez le voyage de votre vie avec Eden Travels.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <Link 
                  to="/contact" 
                  className="btn-premium-white px-8 py-2.5 rounded-2xl text-sm"
                >
                  Planifier mon voyage
                </Link>
                
                <a 
                  href="https://wa.me/94771470150" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-all text-sm border-none"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.674 1.436 5.662 1.436h.008c6.548 0 11.88-5.338 11.883-11.896a11.826 11.826 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          ></div>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center z-20 transition-all backdrop-blur-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.name}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

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
                <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">Voyage en {selectedReview.date}</p>
                <Link
                  to={`/review/${selectedReview.id}`}
                  className="mt-6 text-primary font-bold text-sm flex items-center gap-2 group/btn hover:text-primary/80 transition-all"
                >
                  Lire l'histoire complète
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
