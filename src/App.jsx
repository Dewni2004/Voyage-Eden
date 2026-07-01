import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy loading components
const Home = React.lazy(() => import('./pages/Home'));
const Itineraires = React.lazy(() => import('./pages/Itineraires'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const TravelGuide = React.lazy(() => import('./pages/TravelGuide'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const CustomTrip = React.lazy(() => import('./pages/CustomTrip'));
const ItineraryDetail = React.lazy(() => import('./pages/ItineraryDetail'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const Reviews = React.lazy(() => import('./pages/Reviews'));
const ReviewDetail = React.lazy(() => import('./pages/ReviewDetail'));
const HotelCategoryPage = React.lazy(() => import('./pages/HotelCategoryPage'));
const Restaurants = React.lazy(() => import('./pages/Restaurants'));
const B2BPartner = React.lazy(() => import('./pages/B2BPartner'));

// Syncs the URL language parameter with the i18n engine
function LanguageWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    if (['fr', 'en', 'de', 'es', 'it'].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
}

// Redirects the root (/) to the user's detected language (e.g. /fr)
function RootRedirect() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'es';
  const targetLang = ['fr', 'en', 'de', 'es', 'it'].includes(lang) ? lang : 'es';
  return <Navigate to={`/${targetLang}`} replace />;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/:lang" element={<LanguageWrapper />}>
              <Route index element={<Home />} />
              <Route path="itineraires" element={<Itineraires />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="travel-guide" element={<TravelGuide />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="custom-trip" element={<CustomTrip />} />
              <Route path="itinerary/:id" element={<ItineraryDetail />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="review/:id" element={<ReviewDetail />} />
              <Route path="hotels/:category" element={<HotelCategoryPage />} />
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="b2b" element={<B2BPartner />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
