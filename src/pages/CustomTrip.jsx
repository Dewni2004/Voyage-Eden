import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeVideo from '../assets/Welcome.mov';

const CustomTrip = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    // Slide 1
    fullName: '',
    whatsapp: '',
    nationality: '',
    email: '',
    // Slide 3
    whoWith: '',
    whereAt: '',
    planeTickets: '',
    numTravelers: '',
    adults: '',
    teens: '',
    children: '',
    infants: '',
    numDays: '',
    arrivalDate: '',
    departureDate: '',
    // Slide 4
    interests: [],
    // Slide 5
    accommodation: '',
    singleRooms: '0',
    doubleRooms: '0',
    tripleRooms: '0',
    mealPlan: '',
    accompaniment: '',
    langPref: '',
    otherLanguage: '',
    comments: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const interests = prev.interests.includes(value)
          ? prev.interests.filter((i) => i !== value)
          : [...prev.interests, value];
        return { ...prev, interests };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextSlide = () => {
    if (currentSlide < 5) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 1) setCurrentSlide(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    // Dummy submit for now until backend logic is decided
    setTimeout(() => {
      setIsSending(false);
      setStatus({ type: 'success', message: t('customTrip.success', 'Your request has been sent successfully!') });
      setCurrentSlide(1);
      setFormData({
        fullName: '', whatsapp: '', nationality: '', email: '',
        whoWith: '', whereAt: '', planeTickets: '', numTravelers: '',
        adults: '', teens: '', children: '', infants: '', numDays: '',
        arrivalDate: '', departureDate: '', interests: [], accommodation: '',
        singleRooms: '0', doubleRooms: '0', tripleRooms: '0', mealPlan: '',
        accompaniment: '', langPref: '', otherLanguage: '', comments: '',
      });
    }, 1500);
  };

  // Auto-next for slide 1
  useEffect(() => {
    if (currentSlide === 1) {
      if (formData.fullName && formData.whatsapp && formData.nationality && formData.email) {
        // Simple regex check for email
        if (/\S+@\S+\.\S+/.test(formData.email)) {
          const timer = setTimeout(() => {
            nextSlide();
          }, 800);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [formData.fullName, formData.whatsapp, formData.nationality, formData.email, currentSlide]);

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } }
  };

  const isOfficeVideo = currentSlide === 1 || currentSlide === 2;
  const videoSrc = currentSlide === 1 
    ? WelcomeVideo 
    : 'https://www.w3schools.com/html/mov_bbb.mp4'; // Placeholder for other slides

  return (
    <div className="relative h-[100dvh] md:min-h-screen bg-gray-900 md:overflow-hidden flex flex-col">
      {/* Video Background - Banner on mobile, Fullscreen on desktop */}
      <div className="relative md:absolute top-0 left-0 w-full aspect-video md:h-full z-0 shrink-0 bg-black">
        <video
          key={currentSlide === 1 ? 'welcome' : (isOfficeVideo ? 'office' : 'hotel')}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top opacity-80"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-1 overflow-y-auto pt-8 md:pt-24 pb-10 px-4 md:px-0">
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === step ? 'w-8 bg-primary' : 'w-2 bg-white/40'}`} 
            />
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* SLIDE 1: Basic Information */}
            {currentSlide === 1 && (
              <motion.div
                key="slide1"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-xl border border-white/20"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center drop-shadow-md">
                  {t('customTrip.heroTitle', 'DESIGN YOUR CUSTOM TRIP')}
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); nextSlide(); }} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-white font-medium text-sm drop-shadow-sm">{t('customTrip.fullName', 'Full Name')} <span className="text-red-400">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="block mb-1 text-white font-medium text-sm drop-shadow-sm">{t('customTrip.whatsapp', 'Whatsapp Contact Number')} <span className="text-red-400">*</span></label>
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="block mb-1 text-white font-medium text-sm drop-shadow-sm">{t('customTrip.nationality', 'Nationality')} <span className="text-red-400">*</span></label>
                    <select name="nationality" value={formData.nationality} onChange={handleInputChange} required className="w-full bg-white/20 text-white border border-white/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm [&>option]:text-gray-800">
                      <option value="">Select Nationality</option>
                      <option value="Sri Lankan">Sri Lankan</option>
                      <option value="French">French</option>
                      <option value="British">British</option>
                      <option value="German">German</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Italian">Italian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-white font-medium text-sm drop-shadow-sm">{t('customTrip.email', 'E-mail')} <span className="text-red-400">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm" />
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
                      {t('customTrip.nextBtn', 'Next')}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* SLIDE 2: Greeting */}
            {currentSlide === 2 && (
              <motion.div
                key="slide2"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center text-white px-4"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-primary/30">
                  Hello {formData.fullName ? formData.fullName.split(' ')[0] : ''}!
                </h1>
                <p className="text-2xl md:text-4xl font-light drop-shadow-md mb-12">
                  Let's plan your dream trip!
                </p>
                <button type="button" onClick={nextSlide} className="bg-white text-primary font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
                  {t('customTrip.startPlanningBtn', 'Start Planning')}
                </button>
              </motion.div>
            )}

            {/* SLIDE 3: Travel Info */}
            {currentSlide === 3 && (
              <motion.div
                key="slide3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto custom-scrollbar border border-white/20"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Trip Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); nextSlide(); }} className="space-y-6">
                  
                  <div>
                    <p className="mb-2 text-gray-800 font-medium text-sm">{t('customTrip.whoWith', 'Who are you traveling with?')} <span className="text-red-500">*</span></p>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whoWith" value="couple" onChange={handleInputChange} checked={formData.whoWith === 'couple'} required className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.couple', 'As a couple')}</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whoWith" value="family" onChange={handleInputChange} checked={formData.whoWith === 'family'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.family', 'With family')}</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whoWith" value="group" onChange={handleInputChange} checked={formData.whoWith === 'group'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.group', 'In a group')}</span></label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="mb-2 text-gray-800 font-medium text-sm">{t('customTrip.whereAt', 'Where are you at?')}</p>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whereAt" value="info" onChange={handleInputChange} checked={formData.whereAt === 'info'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.lookingForInfo', "I'm currently looking for information")}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whereAt" value="organize" onChange={handleInputChange} checked={formData.whereAt === 'organize'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.startingToOrganize', "I'm starting to organize my trip")}</span></label>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-gray-800 font-medium text-sm">{t('customTrip.boughtTickets', 'I have already bought the plane tickets')}</p>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="planeTickets" value="yes" onChange={handleInputChange} checked={formData.planeTickets === 'yes'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.yes', 'Yes')}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="planeTickets" value="no" onChange={handleInputChange} checked={formData.planeTickets === 'no'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.no', 'No')}</span></label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-800 font-medium text-sm">{t('customTrip.numTravelers', 'Number of travelers?')} <span className="text-red-500">*</span></label>
                    <input type="text" name="numTravelers" value={formData.numTravelers} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.adults', 'No. Adults')}</label>
                      <input type="number" min="0" name="adults" value={formData.adults} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.teens', 'Teens <16 years')}</label>
                      <input type="number" min="0" name="teens" value={formData.teens} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.children', 'Children <11 years')}</label>
                      <input type="number" min="0" name="children" value={formData.children} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.infants', 'Infants <2 years')}</label>
                      <input type="number" min="0" name="infants" value={formData.infants} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 text-gray-800 text-sm font-medium">{t('customTrip.numDays', 'Number of days')} <span className="text-red-500">*</span></label>
                      <input type="number" name="numDays" value={formData.numDays} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-800 text-sm font-medium">{t('customTrip.arrivalDate', 'Arrival date')} <span className="text-red-500">*</span></label>
                      <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white" />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-800 text-sm font-medium">{t('customTrip.departureDate', 'Departure date')} <span className="text-red-500">*</span></label>
                      <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white" />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
                    <button type="button" onClick={prevSlide} className="text-gray-500 hover:text-gray-800 font-bold py-2 px-4 transition-colors">
                      {t('customTrip.backBtn', 'Back')}
                    </button>
                    <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
                      {t('customTrip.nextBtn', 'Next')}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* SLIDE 4: Activities */}
            {currentSlide === 4 && (
              <motion.div
                key="slide4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl border border-white/20"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Activities & Interests</h2>
                
                <p className="text-gray-800 font-medium mb-4 text-sm">{t('customTrip.interestsTitle', 'What are you particularly interested in? (Several options are possible)')}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {['monuments', 'temples', 'nature', 'beach', 'adventure', 'hiking'].map(interest => (
                    <label key={interest} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.interests.includes(interest) ? 'bg-primary/10 border-primary/50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="checkbox" name="interests" value={interest} onChange={handleInputChange} checked={formData.interests.includes(interest)} className="accent-primary w-5 h-5" /> 
                      <span className="capitalize font-medium text-gray-700">{t(`customTrip.${interest}`, interest)}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-12 flex justify-between items-center pt-4 border-t border-gray-200">
                  <button type="button" onClick={prevSlide} className="text-gray-500 hover:text-gray-800 font-bold py-2 px-4 transition-colors">
                    {t('customTrip.backBtn', 'Back')}
                  </button>
                  <button type="button" onClick={nextSlide} className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    {t('customTrip.nextBtn', 'Next')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SLIDE 5: Accommodations & Submit */}
            {currentSlide === 5 && (
              <motion.div
                key="slide5"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto custom-scrollbar border border-white/20"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Accommodation & Services</h2>
                
                {status.message && (
                  <div className={`p-4 mb-6 text-sm font-bold border rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="mb-2 text-gray-800 font-medium text-sm">{t('customTrip.accommodationType', 'Type of accommodation')} <span className="text-red-500">*</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accommodation" value="standard" onChange={handleInputChange} checked={formData.accommodation === 'standard'} required className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.standard', 'Standard (3 stars approx.)')}</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accommodation" value="superior" onChange={handleInputChange} checked={formData.accommodation === 'superior'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.superior', 'Superior (4/5 stars approx.)')}</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accommodation" value="luxury" onChange={handleInputChange} checked={formData.accommodation === 'luxury'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.luxury', 'Luxury Hotels')}</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accommodation" value="superLuxury" onChange={handleInputChange} checked={formData.accommodation === 'superLuxury'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.superLuxury', 'Super Luxury')}</span></label>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-3 text-gray-800 font-medium text-sm">{t('customTrip.roomDist', 'Room Distribution')}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.singleRooms', 'Single')}</label>
                        <input type="number" min="0" name="singleRooms" value={formData.singleRooms} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.doubleRooms', 'Double')}</label>
                        <input type="number" min="0" name="doubleRooms" value={formData.doubleRooms} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block mb-1 text-gray-600 text-xs">{t('customTrip.tripleRooms', 'Triple')}</label>
                        <input type="number" min="0" name="tripleRooms" value={formData.tripleRooms} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-2 text-gray-800 font-medium text-sm">{t('customTrip.mealPlan', 'Meal Plan')} <span className="text-red-500">*</span></p>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="mealPlan" value="bb" onChange={handleInputChange} checked={formData.mealPlan === 'bb'} required className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.bb', 'Bread & Breakfast')}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="mealPlan" value="hb" onChange={handleInputChange} checked={formData.mealPlan === 'hb'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.hb', 'Half Board')}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="mealPlan" value="fb" onChange={handleInputChange} checked={formData.mealPlan === 'fb'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.fb', 'Full Board')}</span></label>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-gray-800 font-medium text-sm">{t('customTrip.accompaniment', 'Type of Accompaniment:')} <span className="text-red-500">*</span></p>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accompaniment" value="driver" onChange={handleInputChange} checked={formData.accompaniment === 'driver'} required className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.driver', 'Tourist Driver')}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accompaniment" value="chauffeur" onChange={handleInputChange} checked={formData.accompaniment === 'chauffeur'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.chauffeur', 'Chauffeur Guide')}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="accompaniment" value="nationalGuide" onChange={handleInputChange} checked={formData.accompaniment === 'nationalGuide'} className="accent-primary w-4 h-4" /> <span className="text-sm">{t('customTrip.nationalGuide', 'National Guide')}</span></label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-800 font-medium text-sm">{t('customTrip.comments', 'Comments')}</label>
                    <textarea 
                      name="comments" 
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows="3" 
                      placeholder={t('customTrip.commentsPlaceholder', 'Holidays, Photography trips, Birdwatching, Trekking etc...')}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                    ></textarea>
                  </div>

                  <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
                    <button type="button" onClick={prevSlide} className="text-gray-500 hover:text-gray-800 font-bold py-2 px-4 transition-colors">
                      {t('customTrip.backBtn', 'Back')}
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {isSending ? t('customTrip.sending', 'Sending...') : t('customTrip.send', 'SUBMIT REQUEST')}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
};

export default CustomTrip;
