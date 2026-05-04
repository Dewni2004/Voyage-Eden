import React from 'react';
import Hero from '../components/Hero/Hero';
import TrustSection from '../components/TrustSection/TrustSection';
import TourCards from '../components/TourCards/TourCards';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Destinations from '../components/Destinations/Destinations';
import Reviews from '../components/Reviews/Reviews';

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustSection />
      <TourCards />
      <WhyChooseUs />
      <Destinations />
      <Reviews />
    </div>
  );
};

export default Home;
