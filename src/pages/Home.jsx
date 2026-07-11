import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero';
import TrustSection from '../components/TrustSection/TrustSection';
import TourCards from '../components/TourCards/TourCards';
import CustomTripCTA from '../components/CustomTripCTA/CustomTripCTA';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Destinations from '../components/Destinations/Destinations';
import Reviews from '../components/Reviews/Reviews';
import OfficeGallery from '../components/OfficeGallery/OfficeGallery';
import Salons from '../components/Salons/Salons';
import CustomTripBanner from '../components/CustomTripBanner/CustomTripBanner';
import HotelOptions from '../components/HotelOptions/HotelOptions';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('hero.brandName', 'Eden Travels')} | {t('hero.subtitle', 'Local Experts in Sri Lanka')}</title>
        <meta name="description" content={t('footer.description', 'Sri Lanka Eden Travels is part of a well-established group of companies operating in Sri Lanka’s inbound tourism sector.')} />
      </Helmet>
      <Hero />
      <TrustSection />
      <TourCards />
      <WhyChooseUs />
      {/* <CustomTripCTA /> */}
      {/* <HotelOptions /> */}
      <CustomTripBanner />
      <Destinations />
      <Reviews />
      <OfficeGallery />
      <Salons />
    </div>
  );
};

export default Home;
