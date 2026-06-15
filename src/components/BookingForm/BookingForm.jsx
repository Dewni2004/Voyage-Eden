import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SectionIcon = ({ d }) => (
  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-md">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
    </svg>
  </div>
);

const BookingForm = ({ itineraryTitle }) => {
  const { t } = useTranslation();
  const form = useRef();
  const step1Ref = useRef();
  const step2Ref = useRef();
  const step3Ref = useRef();

  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: '', text: '' });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [containerHeight, setContainerHeight] = useState('auto');

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      // Trigger a re-measurement of height on resize if mobile
      if (window.innerWidth < 1024) {
        updateHeight();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateHeight = () => {
    if (window.innerWidth >= 1024) {
      setContainerHeight('auto');
      return;
    }
    setTimeout(() => {
      const activeRef = currentStep === 1 ? step1Ref : currentStep === 2 ? step2Ref : step3Ref;
      if (activeRef.current) {
        setContainerHeight(activeRef.current.offsetHeight + 'px');
      }
    }, 50); // slight delay to ensure DOM is updated
  };

  React.useEffect(() => {
    updateHeight();
  }, [currentStep, isMobile]);

  const handleNext = (e, currentRef) => {
    e.preventDefault();
    if (!currentRef.current) return;
    const inputs = currentRef.current.querySelectorAll('input, select, textarea');
    let isValid = true;
    for (let input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        isValid = false;
        break;
      }
    }
    // Also check dates if moving from step 2
    if (currentRef === step2Ref && (!startDate || !endDate)) {
      setMessageStatus({ type: 'error', text: t("bookingForm.errorDates") });
      isValid = false;
    } else if (currentRef === step2Ref) {
      setMessageStatus({ type: '', text: '' });
    }

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      form.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep(prev => Math.max(prev - 1, 1));
    form.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const checkStep1Completion = () => {
    if (currentStep !== 1 || !step1Ref.current) return;
    
    setTimeout(() => {
      if (currentStep !== 1) return;
      const inputs = step1Ref.current.querySelectorAll('input[required]');
      let allValid = true;
      for (let input of inputs) {
        if (!input.value.trim() || !input.checkValidity()) {
          allValid = false;
          break;
        }
      }
      const whatsapp = step1Ref.current.querySelector('input[name="whatsapp_number"]');
      if (whatsapp && whatsapp.value.length < 8) {
         allValid = false;
      }
      
      if (allValid) {
        setCurrentStep(2);
        form.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const numDays = (startDate && endDate) 
    ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 
    : '';

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessageStatus({ type: '', text: '' });

    // Validate that dates are selected
    if (!startDate || !endDate) {
      setMessageStatus({ 
        type: 'error', 
        text: t("bookingForm.errorDates") 
      });
      setIsSending(false);
      return;
    }

    const SERVICE_ID = "service_xxxxxx"; 
    const TEMPLATE_ID = "template_xxxxxx";
    const PUBLIC_KEY = "xxxxxxxxxxxx";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setMessageStatus({ 
            type: 'success', 
            text: t("bookingForm.successMsg") 
          });
          form.current.reset();
          setDateRange([null, null]);
      }, (error) => {
          setMessageStatus({ 
            type: 'error', 
            text: "Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter directement." 
          });
          console.error('EmailJS Error:', error);
      })
      .finally(() => setIsSending(false));
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[15px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-800 placeholder-gray-400 transition-all shadow-sm";
  const labelClass = "block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider";

  return (
    <section id="booking-form" className="max-w-7xl mx-auto px-6 py-8 md:py-16 pb-2 md:pb-16">
      <style dangerouslySetInnerHTML={{__html: `
        .react-datepicker-wrapper { width: 100%; }
        .react-datepicker__input-container input { width: 100%; }
      `}} />
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 lg:p-16 border border-gray-100 relative overflow-hidden">
        
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="text-center mb-16 relative z-10">
          <span className="text-luxury text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">{t("bookingForm.subtitle")}</span>
          <h2 className="text-primary text-4xl md:text-5xl font-bold font-serif mb-4">{t("bookingForm.title")}</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto font-medium leading-relaxed">{t("bookingForm.desc")}</p>
        </div>

        {messageStatus.text && (
          <div className={`p-4 rounded-2xl text-sm font-bold mb-10 text-center shadow-sm relative z-10 ${messageStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {messageStatus.text}
          </div>
        )}

        <form ref={form} onSubmit={sendEmail} className="relative z-10">
          
          {/* Step Indicator on Mobile */}
          {isMobile && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map(step => (
                <div key={step} className={`h-2 rounded-full transition-all duration-300 ${currentStep === step ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          )}

          {/* Hidden inputs for DateRange to pass to EmailJS */}
          <input type="hidden" name="arrival_date" value={startDate ? startDate.toLocaleDateString('fr-FR') : ''} />
          <input type="hidden" name="departure_date" value={endDate ? endDate.toLocaleDateString('fr-FR') : ''} />

          <div 
            className={isMobile ? "overflow-hidden -mx-2 px-2 transition-[height] duration-500 ease-in-out" : "space-y-10"}
            style={isMobile ? { height: containerHeight } : {}}
          >
            <div 
              className={isMobile ? "flex items-start transition-transform duration-500 ease-in-out w-[300%]" : "space-y-10"}
              style={isMobile ? { transform: `translateX(-${(currentStep - 1) * 33.333333}%)` } : {}}
            >

              {/* Section 1: Informations Personnelles */}
              <div className={isMobile ? "w-1/3 shrink-0 px-2 h-max" : ""}>
                <div ref={step1Ref} className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-8 flex items-center gap-5">
              <SectionIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">{t("bookingForm.step1Title")}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{t("bookingForm.step1Desc")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>{t("bookingForm.fullName")}</label>
                <input type="text" name="full_name" required placeholder={t("bookingForm.fullNameHolder")} className={inputClass} onBlur={checkStep1Completion} />
              </div>
              <div>
                <label className={labelClass}>{t("bookingForm.whatsapp")}</label>
                <input type="tel" name="whatsapp_number" required placeholder="Ex: +33 6 12 34 56 78" className={inputClass} onBlur={checkStep1Completion} />
              </div>
              <div>
                <label className={labelClass}>{t("bookingForm.nationality")}</label>
                <input 
                  type="text" 
                  name="nationality" 
                  list="nationalities" 
                  required 
                  placeholder={t("bookingForm.nationalityHolder")} 
                  className={inputClass} 
                  autoComplete="off"
                  onBlur={checkStep1Completion}
                />
                <datalist id="nationalities">
                  <option value="France" />
                  <option value="Belgique" />
                  <option value="Suisse" />
                  <option value="Canada" />
                  <option value="Royaume-Uni" />
                  <option value="Allemagne" />
                </datalist>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobile && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button type="button" onClick={(e) => handleNext(e, step1Ref)} className="btn-premium-primary py-3 px-6 rounded-full text-sm font-bold shadow-md flex items-center">{t("bookingForm.next")} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Détails du Voyage */}
        <div className={isMobile ? "w-1/3 shrink-0 px-2 h-max" : ""}>
          <div ref={step2Ref} className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center gap-5">
              <SectionIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">{t("bookingForm.step2Title")}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{t("bookingForm.step2Desc")}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className={labelClass}>{t("bookingForm.tourName")}</label>
                <input type="text" name="tour_name" defaultValue={itineraryTitle} readOnly className={`${inputClass} bg-gray-100 text-gray-500 font-medium cursor-not-allowed`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>{t("bookingForm.dates")}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    isClearable={true}
                    placeholderText={t("bookingForm.selectPeriod")}
                    className={`${inputClass} pl-11`}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t("bookingForm.numDaysTitle")}</label>
                <input 
                  type="text" 
                  name="num_days" 
                  value={numDays ? `${numDays} ${t("bookingForm.daysSuffix")}` : ''} 
                  readOnly 
                  className={`${inputClass} bg-gray-100 text-gray-500 font-medium cursor-not-allowed`} 
                  placeholder={t("bookingForm.autoCalc")} 
                />
              </div>
              <div>
                <label className={labelClass}>{t("bookingForm.numTravelers")}</label>
                <input type="number" name="num_travelers" min="1" required placeholder="Ex: 2" className={inputClass} />
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobile && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <button type="button" onClick={handlePrev} className="text-gray-500 font-bold py-2 px-2 flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg> {t("bookingForm.back")}</button>
                <button type="button" onClick={(e) => handleNext(e, step2Ref)} className="btn-premium-primary py-3 px-6 rounded-full text-sm font-bold shadow-md flex items-center">{t("bookingForm.next")} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Hébergement & Logistique */}
        <div className={isMobile ? "w-1/3 shrink-0 px-2 h-max" : ""}>
          <div ref={step3Ref} className="bg-[#f8f9fa] rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center gap-5">
              <SectionIcon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">{t("bookingForm.step3Title")}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{t("bookingForm.step3Desc")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className={labelClass}>{t("bookingForm.hotelCat")}</label>
                <select name="hotel_category" required className={inputClass} defaultValue="">
                  <option value="" disabled>{t("bookingForm.select")}</option>
                  <option value="3 Étoiles">{t("bookingForm.stars3")}</option>
                  <option value="4 Étoiles">{t("bookingForm.stars4")}</option>
                  <option value="5 Étoiles">{t("bookingForm.stars5")}</option>
                  <option value="Boutique Hôtel">{t("bookingForm.boutique")}</option>
                  <option value="Mixte">{t("bookingForm.mixed")}</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>{t("bookingForm.roomDist")}</label>
                <input type="text" name="room_distribution" required placeholder={t("bookingForm.roomHolder")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t("bookingForm.mealPlan")}</label>
                <select name="meal_plan" required className={inputClass} defaultValue="">
                  <option value="" disabled>{t("bookingForm.select")}</option>
                  <option value="BB - Bed & Breakfast">BB - Bed & Breakfast</option>
                  <option value="HB - Breakfast & Dinner">HB - Breakfast & Dinner</option>
                  <option value="FB - Breakfast + Lunch + Dinner">FB - Breakfast + Lunch + Dinner</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{t("bookingForm.driverLang")}</label>
                <select name="chauffeur_language" required className={inputClass} defaultValue="">
                  <option value="" disabled>{t("bookingForm.select")}</option>
                  <option value="Francophone">{t("bookingForm.french")}</option>
                  <option value="Anglophone">{t("bookingForm.english")}</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>{t("bookingForm.specialReq")}</label>
                <textarea 
                  name="special_requirements" 
                  rows="4"
                  className={`${inputClass} resize-none`}
                  placeholder={t("bookingForm.specialHolder")}
                ></textarea>
              </div>
            </div>

            {/* Mobile Navigation & Submit */}
            {isMobile && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <button type="button" onClick={handlePrev} className="text-gray-500 font-bold py-2 px-2 flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg> {t("bookingForm.back")}</button>
                <button type="submit" disabled={isSending} className="btn-premium-primary py-3 px-6 rounded-full text-sm font-bold shadow-md flex items-center gap-2">
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>{t("bookingForm.sending")}</>
                  ) : (
                    <>{t("bookingForm.send")}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        </div>
        </div>

        {/* Desktop Footer / Submit */}
        {!isMobile && (
          <div className="pt-8 flex justify-center">
            <button 
              type="submit"
              disabled={isSending}
              className="btn-premium-primary py-5 px-14 rounded-full text-base md:text-lg font-bold w-full md:w-auto shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>{t("bookingForm.sendingDesktop")}</>
              ) : (
                <>{t("bookingForm.sendDesktop")}<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </div>
        )}
      </form>
      </div>
    </section>
  );
};

export default BookingForm;
