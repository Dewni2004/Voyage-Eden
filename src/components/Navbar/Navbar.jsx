import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/New-French-Logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Itinéraires', path: '/itineraires' },
    { name: 'About Us', path: '/about' },
    { name: 'Travel Guide', path: '/travel-guide' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Offers', path: '/offers', specialized: true },
  ];

  const flags = [
    { code: 'it', url: 'https://flagcdn.com/w40/it.png', alt: 'Italy' },
    { code: 'es', url: 'https://flagcdn.com/w40/es.png', alt: 'Spain' },
    { code: 'gb', url: 'https://flagcdn.com/w40/gb.png', alt: 'UK' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        {/* Logo Section */}
        <Link to="/" className='flex items-center cursor-pointer group'>
          <img 
            src={logo} 
            alt="Eden Travels Logo" 
            className={`h-16 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
              !isScrolled ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Navigation Links */}
        <ul className='hidden lg:flex items-center space-x-10'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={`text-[17px] font-medium transition-all duration-300 relative group ${
                  !isScrolled ? 'text-white hover:text-luxury' : (link.specialized ? 'text-red-700 font-semibold text-[18px]' : 'text-primary hover:text-luxury')
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-luxury transition-all duration-300 group-hover:w-full ${link.specialized ? 'hidden' : ''}`}></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Flags / Actions */}
        <div className='flex items-center space-x-6'>
          <div className='flex items-center space-x-3'>
            {flags.map((flag) => (
              <div key={flag.code} className='w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm hover:scale-125 transition-all cursor-pointer'>
                <img 
                  src={flag.url} 
                  alt={flag.alt} 
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>
          {/* Mobile Menu Toggle */}
          <button className='lg:hidden text-primary'>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

