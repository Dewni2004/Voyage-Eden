import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/UI/PageHero';
import heroImage from '../assets/design your itinerary.jpeg';

const CustomTrip = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    // Dummy submit for now until backend logic is decided
    setTimeout(() => {
      setIsSending(false);
      setStatus({ type: 'success', message: t('customTrip.success', 'Your request has been sent successfully!') });
      if (formRef.current) formRef.current.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title={t('customTrip.heroTitle', 'DESIGN YOUR CUSTOM TRIP')}
        description={t('customTrip.heroDesc', 'We know that the best way to travel to Sri Lanka is tailor-made and private. Tell us your travel idea and we will prepare the trip you have always dreamed of.')}
        image={heroImage}
        overlayOpacity="bg-black/60"
        bgPosition="object-center"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 border border-gray-300 shadow-sm">
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 text-gray-700 text-sm md:text-base">
            
            {status.message && (
              <div className={`p-4 mb-6 text-sm font-bold border ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {status.message}
              </div>
            )}

            {/* Travel Info Section */}
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.whoWith', 'Who are you traveling with?')} <span className="text-red-500">*</span></p>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="whoWith" value="couple" required className="accent-blue-900" /> {t('customTrip.couple', 'As a couple')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="whoWith" value="family" className="accent-blue-900" /> {t('customTrip.family', 'With family')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="whoWith" value="group" className="accent-blue-900" /> {t('customTrip.group', 'In a group')}</label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.whereAt', 'Where are you at?')}</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="whereAt" value="info" className="accent-blue-900" /> {t('customTrip.lookingForInfo', "I'm currently looking for information")}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="whereAt" value="organize" className="accent-blue-900" /> {t('customTrip.startingToOrganize', "I'm starting to organize my trip")}</label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.boughtTickets', 'I have already bought the plane tickets')}</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="planeTickets" value="yes" className="accent-blue-900" /> {t('customTrip.yes', 'Yes')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="planeTickets" value="no" className="accent-blue-900" /> {t('customTrip.no', 'No')}</label>
                </div>
              </div>
            </div>

            {/* Travelers & Dates Section */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block mb-2 text-gray-800">{t('customTrip.numTravelers', 'Number of travelers?')} <span className="text-red-500">*</span></label>
                <input type="text" name="numTravelers" required className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-gray-600 text-xs md:text-sm">{t('customTrip.adults', 'No. Adults')}</label>
                  <input type="number" min="0" name="adults" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-600 text-xs md:text-sm">{t('customTrip.teens', 'Teens <16 years')}</label>
                  <input type="number" min="0" name="teens" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-600 text-xs md:text-sm">{t('customTrip.children', 'Children <11 years')}</label>
                  <input type="number" min="0" name="children" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-600 text-xs md:text-sm">{t('customTrip.infants', 'Infants <2 years')}</label>
                  <input type="number" min="0" name="infants" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-gray-800 text-sm">{t('customTrip.numDays', 'Number of days')} <span className="text-red-500">*</span></label>
                  <input type="number" name="numDays" required className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-800 text-sm">{t('customTrip.arrivalDate', 'Approximate Arrival date')} <span className="text-red-500">*</span></label>
                  <input type="text" name="arrivalDate" required className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-800 text-sm">{t('customTrip.departureDate', 'Approximate departure date')} <span className="text-red-500">*</span></label>
                  <input type="text" name="departureDate" required className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-gray-800">{t('customTrip.interestsTitle', 'What are you particularly interested in? (Several options are possible)')}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" name="interests" value="monuments" className="accent-blue-900" /> {t('customTrip.monuments', 'Monuments')}</label>
                <label className="flex items-center gap-2"><input type="checkbox" name="interests" value="temples" className="accent-blue-900" /> {t('customTrip.temples', 'Temples')}</label>
                <label className="flex items-center gap-2"><input type="checkbox" name="interests" value="nature" className="accent-blue-900" /> {t('customTrip.nature', 'Nature/Animal Life')}</label>
                <label className="flex items-center gap-2"><input type="checkbox" name="interests" value="beach" className="accent-blue-900" /> {t('customTrip.beach', 'Beach')}</label>
                <label className="flex items-center gap-2"><input type="checkbox" name="interests" value="adventure" className="accent-blue-900" /> {t('customTrip.adventure', 'Adventure')}</label>
                <label className="flex items-center gap-2"><input type="checkbox" name="interests" value="hiking" className="accent-blue-900" /> {t('customTrip.hiking', 'Hiking')}</label>
              </div>
            </div>

            {/* Accommodation & Services Section */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.accommodationType', 'Type of accommodation')} <span className="text-red-500">*</span></p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="accommodation" value="standard" required className="accent-blue-900" /> {t('customTrip.standard', 'Standard (3 stars approx.)')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="accommodation" value="superior" className="accent-blue-900" /> {t('customTrip.superior', 'Superior (4/5 stars approx.)')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="accommodation" value="luxury" className="accent-blue-900" /> {t('customTrip.luxury', 'Luxury Hotels')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="accommodation" value="superLuxury" className="accent-blue-900" /> {t('customTrip.superLuxury', 'Super Luxury')}</label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.roomDist', 'Room Distribution')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-600 text-sm">{t('customTrip.singleRooms', 'Single Rooms')}</label>
                    <input type="number" min="0" defaultValue="0" name="singleRooms" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-600 text-sm">{t('customTrip.doubleRooms', 'Double Rooms (DBL)')}</label>
                    <input type="number" min="0" defaultValue="0" name="doubleRooms" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-600 text-sm">{t('customTrip.tripleRooms', 'Triple Rooms')}</label>
                    <input type="number" min="0" defaultValue="0" name="tripleRooms" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.mealPlan', 'Meal Plan')} <span className="text-red-500">*</span></p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="mealPlan" value="bb" required className="accent-blue-900" /> {t('customTrip.bb', 'Bread & Breakfast')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="mealPlan" value="hb" className="accent-blue-900" /> {t('customTrip.hb', 'Half Board (Breakfast + Dinner)')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="mealPlan" value="fb" className="accent-blue-900" /> {t('customTrip.fb', 'Full Board (Breakfast + Lunch + Dinner)')}</label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.accompaniment', 'Select Type of Accompaniment:')} <span className="text-red-500">*</span></p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="accompaniment" value="driver" required className="accent-blue-900" /> {t('customTrip.driver', 'Tourist Driver')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="accompaniment" value="chauffeur" className="accent-blue-900" /> {t('customTrip.chauffeur', 'Licensed Chauffeur Guide')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="accompaniment" value="nationalGuide" className="accent-blue-900" /> {t('customTrip.nationalGuide', 'Licensed National Guide [ For Group ]')}</label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-800">{t('customTrip.languagePref', 'Preferred Language of Accompaniment:')}</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="radio" name="langPref" value="english" className="accent-blue-900" /> {t('customTrip.english', 'English')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="langPref" value="spanish" className="accent-blue-900" /> {t('customTrip.spanish', 'Spanish')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="langPref" value="italian" className="accent-blue-900" /> {t('customTrip.italian', 'Italian')}</label>
                  <label className="flex items-center gap-2"><input type="radio" name="langPref" value="arabic" className="accent-blue-900" /> {t('customTrip.arabic', 'Arabic')}</label>
                </div>
                <div className="mt-4 max-w-sm">
                  <label className="block mb-2 text-gray-600 text-sm">{t('customTrip.otherLanguage', 'Other Language')}</label>
                  <input type="text" name="otherLanguage" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-800">{t('customTrip.fullName', 'Full Name')} <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" required className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-800">{t('customTrip.nationality', 'Nationality')} <span className="text-red-500">*</span></label>
                  <select name="nationality" required className="w-full border border-gray-400 p-2 bg-white focus:outline-none focus:border-blue-900">
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
                  <label className="block mb-2 text-gray-800">{t('customTrip.whatsapp', 'Whatsapp Contact Number')}</label>
                  <input type="tel" name="whatsapp" className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-800">{t('customTrip.email', 'E-mail')} <span className="text-red-500">*</span></label>
                  <input type="email" name="email" required className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-800">{t('customTrip.comments', 'Comments')}</label>
                <textarea 
                  name="comments" 
                  rows="4" 
                  placeholder={t('customTrip.commentsPlaceholder', 'Holidays, Photography trips, Birdwatching, Trekking etc...')}
                  className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-900 resize-y"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSending}
                  className="bg-[#102a43] text-white font-bold py-3 px-8 text-sm md:text-base hover:bg-[#0a1b2e] transition-colors disabled:opacity-50"
                >
                  {isSending ? t('customTrip.sending', 'Sending...') : t('customTrip.send', 'SEND')}
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default CustomTrip;
