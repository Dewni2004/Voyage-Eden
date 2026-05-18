import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Itineraires from './pages/Itineraires';
import AboutUs from './pages/AboutUs';
import TravelGuide from './pages/TravelGuide';
import ContactUs from './pages/ContactUs';
import ItineraryDetail from './pages/ItineraryDetail';
import BlogDetail from './pages/BlogDetail';
import Reviews from './pages/Reviews';
import ReviewDetail from './pages/ReviewDetail';
import Admin from './pages/Admin';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itineraires" element={<Itineraires />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/travel-guide" element={<TravelGuide />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/itinerary/:id" element={<ItineraryDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <Router basename="/Eden-Travels/">
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
