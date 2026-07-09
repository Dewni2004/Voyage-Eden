import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeVideo from '../assets/Welcome.mov';
import { supabase } from '../supabase';
import { generateEmailTemplate, getAgentEmail, getBrandName, getTranslatedTitle } from '../utils/emailTemplate';

const CustomTrip = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submittedName, setSubmittedName] = useState('');

  const steps = [
    { number: 1, label: t('customTrip.stepContact', 'Contact') },
    { number: 2, label: t('customTrip.stepDetails', 'Details') },
    { number: 3, label: t('customTrip.stepServices', 'Services') },
    { number: 4, label: t('customTrip.stepActivities', 'Activities') }
  ];

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

  const handleCounterChange = (field, delta) => {
    setFormData(prev => {
      const currentVal = parseInt(prev[field] || '0', 10);
      const newVal = Math.max(0, currentVal + delta);
      return { ...prev, [field]: newVal.toString() };
    });
  };

  const nextSlide = () => {
    if (currentSlide < 5) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 1) setCurrentSlide(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmittedName(formData.fullName || '');
    
    try {
      const htmlContent = generateEmailTemplate('Custom Trip Request', formData, i18n.language || 'en');
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: getAgentEmail(i18n.language), 
          reply_to: formData.email,
          subject: `[${(i18n.language || 'en').toUpperCase()}] ${getTranslatedTitle('Custom Trip Request', i18n.language)}`,
          html: htmlContent,
          brand_name: getBrandName(i18n.language)
        }
      });

      if (error) throw error;

      setIsSending(false);
      setStatus({ type: 'success', message: t('customTrip.success', 'Your request has been sent successfully!') });
      setCurrentSlide(6);
      setFormData({
        fullName: '', whatsapp: '', nationality: '', email: '',
        whoWith: '', whereAt: '', planeTickets: '', numTravelers: '',
        adults: '', teens: '', children: '', infants: '', numDays: '',
        arrivalDate: '', departureDate: '', interests: [], accommodation: '',
        singleRooms: '0', doubleRooms: '0', tripleRooms: '0', mealPlan: '',
        accompaniment: '', langPref: '', otherLanguage: '', comments: '',
      });
    } catch (error) {
      console.error('Edge Function Error:', error);
      setIsSending(false);
      setStatus({ type: 'error', message: t('customTrip.error', 'Sorry, an error occurred while sending your request.') });
    }
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

  const getTrackerStep = (slide) => {
    if (slide === 1 || slide === 2) return 1;
    if (slide === 3) return 2;
    if (slide === 4) return 3;
    if (slide === 5) return 4;
    return 1;
  };
  const activeStep = getTrackerStep(currentSlide);

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col pt-20 md:pt-28">
      {/* Main Content Area */}
      <div className="relative z-10 flex-grow flex flex-col justify-center py-8 md:py-12 px-4 md:px-0">
        
        {/* Progress Tracker */}
        <div className="relative w-full max-w-4xl mx-auto mb-10 px-4">
          <div className="absolute inset-x-0 top-5 md:top-6 px-10">
            {/* Background Line */}
            <div className="h-1 bg-gray-200/60 w-full rounded-full" />
            
            {/* Active Line */}
            <div 
              className="h-1 bg-gradient-to-r from-primary to-luxury rounded-full transition-all duration-500 ease-out -mt-1" 
              style={{ width: currentSlide === 6 ? '100%' : `${((activeStep - 1) / 3) * 100}%` }}
            />
          </div>

          {/* Step Circles */}
          <div className="relative z-10 flex justify-between items-center px-6">
            {steps.map((step) => {
              const isCompleted = currentSlide === 6 || step.number < activeStep;
              const isActive = currentSlide !== 6 && step.number === activeStep;
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-500 shadow-md relative z-10
                      ${isCompleted ? 'bg-primary text-white scale-100' : ''}
                      ${isActive ? 'bg-gradient-to-tr from-primary to-luxury text-white ring-4 ring-primary/10 scale-110 shadow-lg shadow-primary/20' : ''}
                      ${!isCompleted && !isActive ? 'bg-white text-gray-400 border border-gray-200' : ''}
                    `}
                  >
                    {isActive && (
                      <span className="absolute -inset-1.5 rounded-full bg-luxury/30 animate-pulse -z-10" />
                    )}
                    {isCompleted ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="relative z-10">{step.number}</span>
                    )}
                  </div>
                  <span className={`text-[9px] md:text-[11px] font-bold uppercase tracking-widest mt-4 transition-all duration-300 text-center
                    ${isActive ? 'text-primary scale-105 font-extrabold' : ''}
                    ${isCompleted ? 'text-gray-700' : ''}
                    ${!isCompleted && !isActive ? 'text-gray-400 font-medium' : ''}
                  `}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* SLIDE 1: Basic Information */}
            {currentSlide === 1 && (
              <motion.div
                key="slide1"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 w-full max-w-7xl border border-gray-100"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-6 text-center">
                  {t('customTrip.heroTitle', 'DESIGN YOUR CUSTOM TRIP')}
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); nextSlide(); }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.fullName', 'Full Name')} <span className="text-red-500">*</span></label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.whatsapp', 'Whatsapp Contact Number')} <span className="text-red-500">*</span></label>
                      <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.nationality', 'Nationality')} <span className="text-red-500">*</span></label>
                      <select name="nationality" value={formData.nationality} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm">
                        <option value="" disabled>{t('customTrip.selectNationality', 'Select Nationality')}</option>
                        {i18n.language?.startsWith('es') ? (
                          <>
                            <option value="Española">Española</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Chile">Chile</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cuba">Cuba</option>
                            <option value="República Dominicana">República Dominicana</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Honduras">Honduras</option>
                            <option value="México">México</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Panamá">Panamá</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Perú">Perú</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Venezuela">Venezuela</option>
                          </>
                        ) : (
                          <>
                            <option value="France">France</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Suisse">Suisse</option>
                            <option value="Canada">Canada</option>
                            <option value="Royaume-Uni">Royaume-Uni</option>
                            <option value="Allemagne">Allemagne</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.email', 'E-mail')} <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm" />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-10 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
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
                className="text-center text-gray-800 px-4"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-luxury animate-pulse">
                  {t('customTrip.hello', 'Hello')} {formData.fullName ? formData.fullName.split(' ')[0] : ''}!
                </h1>
                <p className="text-2xl md:text-4xl font-light mb-12 text-gray-600">
                  {t('customTrip.letsPlan', "Let's plan your dream trip!")}
                </p>
                <button type="button" onClick={nextSlide} className="bg-primary text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
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
                className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 w-full max-w-7xl border border-gray-100"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-6 border-b border-gray-100 pb-3">{t('customTrip.tripDetails', 'Trip Details')}</h2>
                <form onSubmit={(e) => { e.preventDefault(); nextSlide(); }} className="space-y-6">
                  
                  <div>
                    <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.whoWith', 'Who are you traveling with?')} <span className="text-red-500">*</span></p>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="whoWith" value="couple" onChange={handleInputChange} checked={formData.whoWith === 'couple'} required className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.couple', 'As a couple')}</span></label>
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="whoWith" value="family" onChange={handleInputChange} checked={formData.whoWith === 'family'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.family', 'With family')}</span></label>
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="whoWith" value="group" onChange={handleInputChange} checked={formData.whoWith === 'group'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.group', 'In a group')}</span></label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/55 border border-gray-100 p-6 rounded-2xl">
                    <div>
                      <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.whereAt', 'Where are you at?')}</p>
                      <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="whereAt" value="info" onChange={handleInputChange} checked={formData.whereAt === 'info'} className="accent-primary w-4 h-4" /> <span className="text-xs sm:text-sm font-semibold text-gray-700">{t('customTrip.lookingForInfo', "I'm currently looking for information")}</span></label>
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="whereAt" value="organize" onChange={handleInputChange} checked={formData.whereAt === 'organize'} className="accent-primary w-4 h-4" /> <span className="text-xs sm:text-sm font-semibold text-gray-700">{t('customTrip.startingToOrganize', "I'm starting to organize my trip")}</span></label>
                      </div>
                    </div>
                    <div>
                      <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.boughtTickets', 'I have already bought the plane tickets')}</p>
                      <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="planeTickets" value="yes" onChange={handleInputChange} checked={formData.planeTickets === 'yes'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.yes', 'Yes')}</span></label>
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="planeTickets" value="no" onChange={handleInputChange} checked={formData.planeTickets === 'no'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.no', 'No')}</span></label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.numTravelers', 'Number of travelers?')} <span className="text-red-500">*</span></label>
                    <input type="text" name="numTravelers" value={formData.numTravelers} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/30 p-4 border border-gray-100 rounded-2xl">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.adults', 'No. Adults')}</label>
                      <input type="number" min="0" name="adults" value={formData.adults} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.teens', 'Teens <16 years')}</label>
                      <input type="number" min="0" name="teens" value={formData.teens} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.children', 'Children <11 years')}</label>
                      <input type="number" min="0" name="children" value={formData.children} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.infants', 'Infants <2 years')}</label>
                      <input type="number" min="0" name="infants" value={formData.infants} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.numDays', 'Number of days')} <span className="text-red-500">*</span></label>
                      <input type="number" name="numDays" value={formData.numDays} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.arrivalDate', 'Arrival date')} <span className="text-red-500">*</span></label>
                      <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.departureDate', 'Departure date')} <span className="text-red-500">*</span></label>
                      <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm bg-white" />
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

            {/* SLIDE 4: Accommodation & Services */}
            {currentSlide === 4 && (
              <motion.div
                key="slide4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 w-full max-w-7xl border border-gray-100"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-6 border-b border-gray-100 pb-3">{t('customTrip.accommodationServices', 'Accommodation & Services')}</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); nextSlide(); }} className="space-y-6">
                  <div>
                    <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.accommodationType', 'Type of accommodation')} <span className="text-red-500">*</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accommodation" value="standard" onChange={handleInputChange} checked={formData.accommodation === 'standard'} required className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.standard', 'Standard (3 stars approx.)')}</span></label>
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accommodation" value="superior" onChange={handleInputChange} checked={formData.accommodation === 'superior'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.superior', 'Superior (4/5 stars approx.)')}</span></label>
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accommodation" value="luxury" onChange={handleInputChange} checked={formData.accommodation === 'luxury'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.luxury', 'Luxury Hotels')}</span></label>
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accommodation" value="superLuxury" onChange={handleInputChange} checked={formData.accommodation === 'superLuxury'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.superLuxury', 'Super Luxury')}</span></label>
                    </div>
                  </div>

                  <div className="bg-gray-50/55 border border-gray-100 p-6 rounded-2xl">
                    <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.roomDist', 'Room Distribution')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.singleRooms', 'Single')}</label>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button type="button" onClick={() => handleCounterChange('singleRooms', -1)} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-sm">-</button>
                          <input type="number" min="0" name="singleRooms" value={formData.singleRooms} onChange={handleInputChange} className="w-full text-center bg-white border border-gray-200 rounded-xl py-1.5 sm:py-2 px-1 text-[13px] sm:text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                          <button type="button" onClick={() => handleCounterChange('singleRooms', 1)} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-sm">+</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.doubleRooms', 'Double')}</label>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button type="button" onClick={() => handleCounterChange('doubleRooms', -1)} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-sm">-</button>
                          <input type="number" min="0" name="doubleRooms" value={formData.doubleRooms} onChange={handleInputChange} className="w-full text-center bg-white border border-gray-200 rounded-xl py-1.5 sm:py-2 px-1 text-[13px] sm:text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                          <button type="button" onClick={() => handleCounterChange('doubleRooms', 1)} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-sm">+</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{t('customTrip.tripleRooms', 'Triple')}</label>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button type="button" onClick={() => handleCounterChange('tripleRooms', -1)} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-sm">-</button>
                          <input type="number" min="0" name="tripleRooms" value={formData.tripleRooms} onChange={handleInputChange} className="w-full text-center bg-white border border-gray-200 rounded-xl py-1.5 sm:py-2 px-1 text-[13px] sm:text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm" />
                          <button type="button" onClick={() => handleCounterChange('tripleRooms', 1)} className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-sm">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/30 p-6 border border-gray-100 rounded-2xl">
                    <div>
                      <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.mealPlan', 'Meal Plan')} <span className="text-red-500">*</span></p>
                      <div className="flex flex-col gap-2.5">
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="mealPlan" value="bb" onChange={handleInputChange} checked={formData.mealPlan === 'bb'} required className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.bb', 'Bed & Breakfast')}</span></label>
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="mealPlan" value="hb" onChange={handleInputChange} checked={formData.mealPlan === 'hb'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.hb', 'Half Board')}</span></label>
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="mealPlan" value="fb" onChange={handleInputChange} checked={formData.mealPlan === 'fb'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.fb', 'Full Board')}</span></label>
                      </div>
                    </div>

                    <div>
                      <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.accompaniment', 'Type of Accompaniment:')} <span className="text-red-500">*</span></p>
                      <div className="flex flex-col gap-2.5">
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accompaniment" value="driver" onChange={handleInputChange} checked={formData.accompaniment === 'driver'} required className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.driver', 'Tourist Driver')}</span></label>
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accompaniment" value="chauffeur" onChange={handleInputChange} checked={formData.accompaniment === 'chauffeur'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.chauffeur', 'Chauffeur Guide')}</span></label>
                        <label className="flex items-center gap-2.5 cursor-pointer bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm hover:border-primary/30 transition-all"><input type="radio" name="accompaniment" value="nationalGuide" onChange={handleInputChange} checked={formData.accompaniment === 'nationalGuide'} className="accent-primary w-4 h-4" /> <span className="text-sm font-semibold text-gray-700">{t('customTrip.nationalGuide', 'National Guide')}</span></label>
                      </div>
                    </div>

                    <div>
                      <p className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">{t('customTrip.languagePref', 'Preferred Language of Accompaniment:')} <span className="text-red-500">*</span></p>
                      <select 
                        name="langPref" 
                        value={formData.langPref} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 transition-all shadow-sm"
                      >
                        <option value="" disabled>{t('customTrip.selectLanguage', 'Select Language')}</option>
                        <option value={t('customTrip.spanish', 'Spanish')}>{t('customTrip.spanish', 'Spanish')}</option>
                        <option value={t('customTrip.english', 'English')}>{t('customTrip.english', 'English')}</option>
                        <option value={t('customTrip.french', 'French')}>{t('customTrip.french', 'French')}</option>
                        <option value={t('customTrip.german', 'German')}>{t('customTrip.german', 'German')}</option>
                        <option value={t('customTrip.italian', 'Italian')}>{t('customTrip.italian', 'Italian')}</option>
                        <option value={t('customTrip.otherLanguage', 'Other')}>{t('customTrip.otherLanguage', 'Other')}</option>
                      </select>

                      {formData.langPref === 'Other' && (
                        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          <input 
                            type="text" 
                            name="otherLanguage" 
                            value={formData.otherLanguage} 
                            onChange={handleInputChange} 
                            placeholder={t('customTrip.otherLangPlaceholder', 'Specify language...')}
                            required 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm"
                          />
                        </div>
                      )}
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

            {/* SLIDE 5: Activities & Submit */}
            {currentSlide === 5 && (
              <motion.div
                key="slide5"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 w-full max-w-7xl border border-gray-100"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-6 border-b border-gray-100 pb-3">{t('customTrip.activitiesInterests', 'Activities & Interests')}</h2>
                
                {status.message && (
                  <div className={`p-4 mb-6 text-sm font-bold border rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-gray-600 font-medium mb-6 text-sm">{t('customTrip.interestsTitle', 'What are you particularly interested in? (Several options are possible)')}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {['monuments', 'temples', 'nature', 'beach', 'adventure', 'hiking'].map(interest => (
                      <label key={interest} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.interests.includes(interest) ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="checkbox" name="interests" value={interest} onChange={handleInputChange} checked={formData.interests.includes(interest)} className="accent-primary w-5 h-5" /> 
                        <span className="capitalize font-semibold text-gray-700">{t(`customTrip.${interest}`, interest)}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{t('customTrip.comments', 'Comments')}</label>
                    <textarea 
                      name="comments" 
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows="4" 
                      placeholder={t('customTrip.commentsPlaceholder', 'Holidays, Photography trips, Birdwatching, Trekking etc...')}
                      className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm resize-y"
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

            {/* SLIDE 6: Success Screen */}
            {currentSlide === 6 && (
              <motion.div
                key="slide6"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-20 w-full max-w-7xl border border-gray-100 text-center flex flex-col items-center"
              >
                {/* Animated Green Check Circle with Premium Styling */}
                <div className="w-24 h-24 md:w-28 md:h-28 bg-emerald-50 rounded-full flex items-center justify-center mb-10 shadow-inner relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-100/50 animate-ping opacity-60" style={{ animationDuration: '3s' }} />
                  <div className="absolute -inset-2 rounded-full bg-emerald-50/30 animate-pulse opacity-80" />
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-luxury to-primary bg-clip-text text-transparent font-serif mb-6 leading-tight">
                  {submittedName ? t('customTrip.thankYouWithName', 'Thank You, {{name}}!', { name: submittedName.split(' ')[0] }) : t('customTrip.thankYou', 'Thank You!')}
                </h2>
                
                <p className="text-gray-700 text-xl md:text-2xl font-semibold max-w-3xl mx-auto mb-6">
                  {t('customTrip.successSub', 'Your dream trip request has been received!')}
                </p>

                <p className="text-gray-500 text-sm md:text-base max-w-4xl mx-auto mb-12 leading-relaxed">
                  {t('customTrip.successDetail', 'Our Sri Lankan travel specialist will review your preferences and get in touch with you shortly via WhatsApp or E-mail with a custom itinerary plan.')}
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
                  <button 
                    type="button" 
                    onClick={() => {
                      setCurrentSlide(1);
                      setStatus({ type: '', message: '' });
                      setSubmittedName('');
                    }}
                    className="bg-gradient-to-r from-primary to-luxury hover:from-primary/95 hover:to-luxury/95 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
                    </svg>
                    {t('customTrip.planAnother', 'Plan Another Trip')}
                  </button>
                  <a 
                    href="/" 
                    className="bg-white hover:bg-gray-50 text-primary border border-primary/20 hover:border-primary/40 font-bold py-4 px-10 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {t('customTrip.goHome', 'Back to Home')}
                  </a>
                </div>
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
