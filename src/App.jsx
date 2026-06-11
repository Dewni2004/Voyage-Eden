import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Itineraires from './pages/Itineraires';
import AboutUs from './pages/AboutUs';
import TravelGuide from './pages/TravelGuide';
import ContactUs from './pages/ContactUs';
import CustomTrip from './pages/CustomTrip';
import ItineraryDetail from './pages/ItineraryDetail';
import BlogDetail from './pages/BlogDetail';
import Reviews from './pages/Reviews';
import ReviewDetail from './pages/ReviewDetail';
import HotelCategoryPage from './pages/HotelCategoryPage';
import Restaurants from './pages/Restaurants';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

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
          </Route>
        </Routes>
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
