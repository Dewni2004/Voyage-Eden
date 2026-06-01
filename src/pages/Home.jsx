import React from 'react';
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

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustSection />
      <TourCards />
      {/* <CustomTripCTA /> */}
      <WhyChooseUs />
      <CustomTripBanner />
      <Destinations />
      <Reviews />
      <OfficeGallery />
      <Salons />
    </div>
  );
};

export default Home;
