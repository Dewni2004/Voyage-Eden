import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/French-t.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    { name: 'À propos de nous', path: '/about' },
    { name: 'Guide de Voyage', path: '/travel-guide' },
    { name: 'Contactez-nous', path: '/contact' },
    { name: 'Avis', path: '/reviews' },
    { name: 'Offres', path: '/offers', specialized: true },
  ];

  const flags = [
    { code: 'it', url: 'https://flagcdn.com/w40/it.png', alt: 'Italy', link: 'https://srilankaviaggieden.com/' },
    { code: 'es', url: 'https://flagcdn.com/w40/es.png', alt: 'Spain', link: 'https://srilankaviajeseden.es/' },
    { code: 'gb', url: 'https://flagcdn.com/w40/gb.png', alt: 'UK', link: 'https://srilankaedentravels.com/' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${isScrolled || isMenuOpen ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        {/* Logo Section */}
        <Link to="/" className='flex items-center cursor-pointer' onClick={() => setIsMenuOpen(false)}>
          <img
            src={logo}
            alt="Eden Travels Logo"
            className="h-12 md:h-20 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Navigation Links */}
        <ul className='hidden lg:flex items-center space-x-10'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`text-[17px] font-medium relative ${!isScrolled ? 'text-white' : (link.specialized ? 'text-red-700 font-semibold text-[18px]' : 'text-primary')
                  }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Flags / Actions */}
        <div className='flex items-center space-x-6'>
          <div className='hidden sm:flex items-center space-x-3'>
            {flags.map((flag) => (
              <a
                key={flag.code}
                href={flag.link}
                target="_blank"
                rel="noopener noreferrer"
                className='w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm cursor-pointer'
              >
                <img
                  src={flag.url}
                  alt={flag.alt}
                  className='w-full h-full object-cover'
                />
              </a>
            ))}
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden transition-colors ${!isScrolled && !isMenuOpen ? 'text-white' : 'text-primary'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 bg-white z-[60] lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
      >
        <div className='flex items-center justify-between px-6 py-6 border-b'>
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
          <button
            className='text-primary'
            onClick={() => setIsMenuOpen(false)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="container mx-auto px-6 py-6 flex flex-col h-full overflow-y-auto">
          <ul className='flex flex-col space-y-6 mb-10'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-semibold transition-all duration-300 ${link.specialized ? 'text-red-700' : 'text-primary'
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pb-10 border-t pt-10">
            <p className="text-gray-500 mb-6 font-medium">Change Language</p>
            <div className='flex flex-col space-y-6'>
              {flags.map((flag) => (
                <a
                  key={flag.code}
                  href={flag.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-center space-x-3 cursor-pointer'
                >
                  <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm'>
                    <img
                      src={flag.url}
                      alt={flag.alt}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <span className="font-medium text-primary">{flag.alt}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

