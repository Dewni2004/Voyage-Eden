import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy loading components
import RedirectHandler from './components/RedirectHandler/RedirectHandler';
import { routeMap } from './utils/routeMap';

const getAllPaths = (pageKey) => {
  const paths = new Set();
  Object.values(routeMap).forEach(langMap => {
    if (langMap[pageKey]) paths.add(langMap[pageKey]);
  });
  // Also add the default English path just in case
  paths.add(pageKey);
  return Array.from(paths);
};

import Home from './pages/Home';
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

// Syncs the i18n engine with the domain name
function DomainLanguageWrapper() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const hostname = window.location.hostname;
    let targetLang = 'es'; // default fallback

    if (hostname.includes('.es') || hostname.includes('viajeseden')) {
      targetLang = 'es';
    } else if (hostname.includes('.it') || hostname.includes('viaggieden')) {
      targetLang = 'it';
    } else if (hostname.includes('.fr') || hostname.includes('voyage-eden') || hostname.includes('voyageeden')) {
      targetLang = 'fr';
    } else if (hostname.includes('.de') || hostname.includes('edenreisen')) {
      targetLang = 'de';
    } else if (hostname.includes('edentravels') || hostname.includes('.com') || hostname.includes('.co.uk')) {
      targetLang = 'en';
    } else {
      // If testing locally (localhost), use browser language
      const lang = i18n.language?.split('-')[0] || 'es';
      targetLang = ['fr', 'en', 'de', 'es', 'it'].includes(lang) ? lang : 'es';
    }

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [i18n]);

  return <Outlet />;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <RedirectHandler />
          <Routes>
            <Route element={<DomainLanguageWrapper />}>
              <Route path="*" element={<RedirectHandler />} />
              <Route index element={<Home />} />
              {getAllPaths('itineraries').map(path => <Route key={path} path={path} element={<Itineraires />} />)}
              {getAllPaths('about').map(path => <Route key={path} path={path} element={<AboutUs />} />)}
              {getAllPaths('guide').map(path => <Route key={path} path={path} element={<TravelGuide />} />)}
              {getAllPaths('contact').map(path => <Route key={path} path={path} element={<ContactUs />} />)}
              {getAllPaths('customTrip').map(path => <Route key={path} path={path} element={<CustomTrip />} />)}
              {getAllPaths('itineraries').map(path => <Route key={`${path}-detail`} path={`${path}/:id`} element={<ItineraryDetail />} />)}
              <Route path=":id" element={<BlogDetail />} />
              {getAllPaths('reviews').map(path => <Route key={path} path={path} element={<Reviews />} />)}
              {getAllPaths('reviewDetail').map(path => <Route key={`${path}-detail`} path={`${path}/:id`} element={<ReviewDetail />} />)}
              {getAllPaths('hotels').map(path => <Route key={path} path={`${path}/:category`} element={<HotelCategoryPage />} />)}
              {getAllPaths('restaurants').map(path => <Route key={path} path={path} element={<Restaurants />} />)}
              {getAllPaths('b2b').map(path => <Route key={path} path={path} element={<B2BPartner />} />)}
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
