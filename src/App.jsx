import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Itineraires from './pages/Itineraires';
import AboutUs from './pages/AboutUs';
import TravelGuide from './pages/TravelGuide';
import ContactUs from './pages/ContactUs';
import ItineraryDetail from './pages/ItineraryDetail';
import BlogDetail from './pages/BlogDetail';
import Reviews from './pages/Reviews';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
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
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
