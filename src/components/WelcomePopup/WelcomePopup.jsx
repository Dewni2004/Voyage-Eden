import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Award, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomePopup = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Manual Configuration for the Popup Texts
  // You can easily change these words here for each language
  const popupContent = {
    en: {
      title: "Welcome to Our New Website! 🎉",
      subtitle: "A fresh new look for your perfect Sri Lankan journey.",
      description: "We're thrilled to present our newly redesigned website! With over 15 years of experience in crafting unforgettable journeys, we've upgraded our digital home to provide you with an even better, smoother, and more inspiring experience.",
      buttonText: "Explore Now"
    },
    es: {
      title: "¡Bienvenido a nuestra nueva web! 🎉",
      subtitle: "Un nuevo diseño para su viaje perfecto a Sri Lanka.",
      description: "¡Estamos encantados de presentar nuestro sitio web recién rediseñado! Con más de 15 años de experiencia creando viajes inolvidables, hemos mejorado nuestro hogar digital para brindarle una experiencia aún mejor, más fluida y más inspiradora.",
      buttonText: "Explorar ahora"
    },
    fr: {
      title: "Bienvenue sur notre nouveau site ! 🎉",
      subtitle: "Un nouveau look pour votre voyage parfait au Sri Lanka.",
      description: "Nous sommes ravis de vous présenter notre site web fraîchement repensé ! Avec plus de 15 ans d'expérience dans la création de voyages inoubliables, nous avons amélioré notre maison numérique pour vous offrir une expérience encore meilleure.",
      buttonText: "Explorer"
    },
    it: {
      title: "Benvenuti nel nostro nuovo sito! 🎉",
      subtitle: "Un nuovo look per il tuo viaggio perfetto in Sri Lanka.",
      description: "Siamo entusiasti di presentare il nostro sito web appena riprogettato! Con oltre 15 anni di esperienza nella creazione di viaggi indimenticabili, abbiamo aggiornato la nostra casa digitale per offrirti un'esperienza ancora migliore.",
      buttonText: "Esplora Ora"
    },
    de: {
      title: "Willkommen auf unserer neuen Website! 🎉",
      subtitle: "Ein frischer Look für Ihre perfekte Sri Lanka Reise.",
      description: "Wir freuen uns, Ihnen unsere neu gestaltete Website präsentieren zu können! Mit über 15 Jahren Erfahrung in der Gestaltung unvergesslicher Reisen haben wir unser digitales Zuhause modernisiert, um Ihnen ein noch besseres Erlebnis zu bieten.",
      buttonText: "Jetzt Entdecken"
    }
  };

  const currentLang = i18n.language?.split('-')[0] || 'en';
  const content = popupContent[currentLang] || popupContent['en'];

  useEffect(() => {
    // Show popup after a short delay every time the website is opened
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4 sm:px-0">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Decorative Section with Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/hero-image.webp')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
              
              {/* Badge */}
              <motion.div 
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
                className="relative z-10 bg-gradient-to-br from-primary to-[#b84d29] p-1 rounded-full shadow-[0_0_30px_rgba(235,90,30,0.4)] mt-10"
              >
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full border-2 border-white/20">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-10 pt-8 text-center flex-grow flex flex-col items-center bg-white relative">
              {/* Floating Sparkles */}
              <div className="absolute top-0 right-10 text-yellow-400 opacity-50 animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute top-4 left-10 text-primary opacity-30 animate-bounce">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="flex gap-1.5 text-yellow-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </motion.div>
                ))}
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800 mb-3 leading-tight">
                {content.title}
              </h2>
              
              <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full mb-5">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">
                  {content.subtitle}
                </p>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-[15px] sm:text-base max-w-md">
                {content.description}
              </p>

              <button 
                onClick={handleClose}
                className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-10 py-4 font-bold text-white shadow-[0_10px_20px_rgba(235,90,30,0.3)] transition-all hover:shadow-[0_15px_25px_rgba(235,90,30,0.4)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative flex items-center justify-center gap-2">
                  {content.buttonText}
                  <Sparkles className="w-4 h-4" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
