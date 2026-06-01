import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoColorFR from '../../assets/French-t.png';
import logoColorEN from '../../assets/English-Logo-scaled.png';
import logoColorES from '../../assets/Spanish-Logo-scaled.png';
import logoColorIT from '../../assets/Italy-Logo-scaled.png';
import logoWhiteText from '../../assets/French-t-white-text.png';

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

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const colorLogos = {
    fr: logoColorFR,
    en: logoColorEN,
    es: logoColorES,
    it: logoColorIT,
    de: logoColorFR // Fallback to French until German logo is added
  };

  const currentLogoColor = colorLogos[i18n.language] || logoColorFR;

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    let newPath = `/${langCode}`;
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    if (['fr', 'en', 'de', 'es', 'it'].includes(pathParts[0])) {
      pathParts[0] = langCode;
      newPath = '/' + pathParts.join('/');
    } else {
      newPath = '/' + [langCode, ...pathParts].join('/');
    }
    
    navigate(newPath);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: `/${i18n.language}/` },
    { name: t('nav.itineraries'), path: `/${i18n.language}/itineraires` },
    { name: t('nav.about'), path: `/${i18n.language}/about` },
    { name: t('nav.guide'), path: `/${i18n.language}/travel-guide` },
    { name: t('nav.reviews', 'Avis'), path: `/${i18n.language}/reviews` },
    { name: t('nav.contact'), path: `/${i18n.language}/contact` },
  ];

  const flags = [
    { code: 'es', url: 'https://flagcdn.com/w40/es.png', alt: 'Español' },
    { code: 'it', url: 'https://flagcdn.com/w40/it.png', alt: 'Italiano' },
    { code: 'en', url: 'https://flagcdn.com/w40/gb.png', alt: 'English' },
    { code: 'fr', url: 'https://flagcdn.com/w40/fr.png', alt: 'Français' },
    { code: 'de', url: 'https://flagcdn.com/w40/de.png', alt: 'Deutsch' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${isScrolled || isMenuOpen ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        <Link
          to="/"
          className="flex items-center cursor-pointer transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            key={i18n.language}
            src={(i18n.language === 'fr' || i18n.language === 'de') && !isScrolled && !isMenuOpen ? logoWhiteText : currentLogoColor}
            alt="Eden Travels Logo"
            className={`h-16 md:h-20 w-auto object-contain transition-all duration-300 origin-left`}
            style={{
              transform: (i18n.language !== 'fr' && i18n.language !== 'de') ? 'scale(1.65)' : 'none',
              filter: (!isScrolled && !isMenuOpen && i18n.language !== 'fr' && i18n.language !== 'de') ? 'brightness(0) invert(1)' : 'none'
            }}
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
              <button
                key={flag.code}
                onClick={() => handleLanguageChange(flag.code)}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 shadow-sm cursor-pointer transition-all duration-300 ${i18n.language === flag.code ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                title={flag.alt}
              >
                <img
                  src={flag.url}
                  alt={flag.alt}
                  className='w-full h-full object-cover'
                />
              </button>
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
          <img src={currentLogoColor} alt="Logo" className="h-16 w-auto object-contain" />
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
            <p className="text-gray-500 mb-6 font-medium">{t('nav.changeLanguage')}</p>
            <div className='flex flex-col space-y-6'>
              {flags.map((flag) => (
                <button
                  key={flag.code}
                  onClick={() => handleLanguageChange(flag.code)}
                  className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${i18n.language === flag.code ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className={`w-10 h-10 rounded-full overflow-hidden border-2 shadow-sm ${i18n.language === flag.code ? 'border-primary' : 'border-gray-200'}`}>
                    <img
                      src={flag.url}
                      alt={flag.alt}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <span className={`font-medium ${i18n.language === flag.code ? 'text-primary' : 'text-gray-500'}`}>{flag.alt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

