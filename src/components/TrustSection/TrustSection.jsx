import React from 'react';
import { Link } from 'react-router-dom';

const TrustSection = () => {
  return (
    <section className="py-8 md:py-12 bg-[#f8fbff]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Mobile View: Keep EXACTLY as it is, untouched */}
        <div className="md:hidden bg-white rounded-[20px] shadow-[0_10px_40px_-10px_rgba(30,64,111,0.08)] border border-gray-100 grid grid-cols-2 divide-x divide-gray-100 w-full overflow-hidden">
          
          {/* Widget 1: Google Reviews (Mobile) */}
          <div className="flex flex-col items-center text-center p-4 gap-3">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.3-4.53-4.18-4.53z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex flex-col items-center w-full gap-1">
              <div className="flex items-center justify-center gap-1">
                <span className="text-[14px] font-extrabold text-primary tracking-tight font-serif leading-none">Avis Google</span>
                <span className="bg-green-100 text-green-800 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-ping"></span>
                  Vérifié
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-black text-yellow-500">5.0</span>
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <span className="text-gray-400 text-[10px] font-medium">(416+ avis)</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-1.5 w-full justify-center mt-2 px-1">
              <a 
                href="https://www.google.com/search?q=Sri+Lanka+Eden+Travels"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1 bg-transparent border border-primary text-primary hover:bg-primary/5 font-bold px-1 py-1.5 rounded-lg transition-all shadow-sm text-[9px]"
              >
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">Consulter</span>
              </a>
              <a 
                href="https://www.google.com/search?q=Sri+Lanka+Eden+Travels#lrd=0x3ae3662a67e2a9b3:0xd9099db1070ff22,3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1 bg-white border border-gray-200 hover:border-primary/30 text-primary hover:bg-gray-50 font-bold px-1 py-1.5 rounded-lg transition-all shadow-sm text-[9px]"
              >
                <svg className="w-3 h-3 text-yellow-500 fill-current shrink-0" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="truncate">Écrire</span>
              </a>
            </div>
          </div>

          {/* Widget 2: YouTube Videos (Mobile) */}
          <div className="flex flex-col items-center text-center p-4 gap-3">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex flex-col items-center w-full gap-1">
              <div className="flex items-center justify-center gap-1">
                <span className="text-[14px] font-extrabold text-primary tracking-tight font-serif leading-none">Avis Vidéo</span>
                <span className="bg-red-100 text-red-800 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-ping"></span>
                  YouTube
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-black text-red-600">4K HD</span>
                <div className="flex text-red-500 gap-0.5 items-center">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
              </div>
              
              <span className="text-gray-400 text-[10px] font-medium">(Témoignages)</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-1.5 w-full justify-center mt-2 px-1">
              <Link 
                to="/reviews"
                className="flex flex-1 items-center justify-center gap-1 bg-transparent border border-[#FF0000] text-[#FF0000] hover:bg-red-50 font-bold px-1 py-1.5 rounded-lg transition-all shadow-sm text-[9px]"
              >
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="truncate">Visionner</span>
              </Link>
              <a 
                href="https://www.youtube.com/@srilankaviajeseden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1 bg-white border border-gray-200 hover:border-red-500/30 text-primary hover:text-red-600 hover:bg-gray-50 font-bold px-1 py-1.5 rounded-lg transition-all shadow-sm text-[9px]"
              >
                <svg className="w-3 h-3 text-red-600 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92(4285F4)" fill="none"/>
                  <path d="M19.78 4.22c-1.87-.5-9.37-.5-9.37-.5s-7.51 0-9.38.5A3 3 0 0 0 .5 7.19C0 9.07 0 13 0 13s0 3.93.5 5.81a3 3 0 0 0 2.12 2.12c1.87.5 9.38.5 9.38.5s7.5 0 9.37-.5a3 3 0 0 0 2.13-2.12c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81a3 3 0 0 0-2.13-2.12zM9.54 16.57V9.43L15.82 13l-6.28 3.57z" fill="currentColor"/>
                </svg>
                <span className="truncate">YouTube</span>
              </a>
            </div>
          </div>
          
        </div>

        {/* Desktop View: Dual Widget Panel (Side-by-Side matching mockup) */}
        <div className="hidden md:grid bg-white rounded-[32px] shadow-2xl border border-gray-100 grid-cols-2 divide-x divide-gray-100 overflow-hidden">
          
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
                className="flex items-center justify-center gap-1.5 bg-white border border-[#1e406f] hover:bg-[#1e406f]/5 text-[#1e406f] font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs"
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
                className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs"
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
              <Link 
                to="/reviews"
                className="flex items-center justify-center gap-1.5 bg-white border border-red-600 hover:bg-red-50 text-red-600 font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Visionner
              </Link>
              <a 
                href="https://www.youtube.com/@srilankaviajeseden"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs"
              >
                <svg className="w-3.5 h-3.5 text-red-600 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.974 24 12 24 12s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;
