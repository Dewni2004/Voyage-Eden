import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logoColorFR from '../../assets/French-t.webp';
import logoColorEN from '../../assets/English-Logo-scaled.webp';
import logoColorES from '../../assets/Spanish-Logo-scaled.webp';
import logoColorIT from '../../assets/Italy-Logo-scaled.webp';
import logoColorDE from '../../assets/Geman logo.webp';
import { getLocalizedPath } from '../../utils/routeMap';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - 2013;

  const colorLogos = {
    fr: logoColorFR,
    en: logoColorEN,
    es: logoColorES,
    it: logoColorIT,
    de: logoColorDE
  };

  const currentLogoColor = colorLogos[i18n.language] || logoColorFR;

  const email1 = t('footer.email1', 'srilankavoyageeden@gmail.com');
  const email2 = t('footer.email2', '');
  const email3 = t('footer.email3', '');
  const contactEmails = [email1, email2, email3].filter(Boolean).join(',');

  const phone1 = t('footer.phone1', '+94 764409650');
  const phone2 = t('footer.phone2', '+94 77147 0150');
  const phone3 = t('footer.phone3', '+94 372201747');
  const whatsapp3 = t('footer.whatsapp3', '');

  const phone1Clean = phone1.replace(/[^0-9]/g, '');
  const phone2Clean = phone2.replace(/[^0-9]/g, '');
  const phone3Clean = phone3.replace(/[^0-9+]/g, '');
  const whatsapp3Clean = whatsapp3.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#102a43] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Company Info Section */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
            <img 
              key={i18n.language}
              src={currentLogoColor} 
              alt="Eden Travels Logo" 
              className="h-20 md:h-24 w-auto object-contain self-center lg:self-start transition-transform duration-300 hover:scale-105 origin-center lg:origin-left"
              loading="lazy"
              style={{
                transform: (i18n.language !== 'fr' && i18n.language !== 'de') ? 'scale(1.65)' : 'none'
              }}
            />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              {t('footer.description', { years: yearsExp })}
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              {[
                { name: 'whatsapp', bg: 'bg-[#25D366]', hoverText: 'group-hover:text-[#25D366]', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z', url: `https://wa.me/${i18n.language?.split('-')[0] === 'it' ? '393336449849' : i18n.language?.split('-')[0] === 'es' ? '94764409650' : '94771470150'}` },
                { name: 'facebook', bg: 'bg-[#1877F2]', hoverText: 'group-hover:text-[#1877F2]', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', url: t('socials.facebook', 'https://www.facebook.com/profile.php?id=61583714273975') },
                { name: 'instagram', bg: 'bg-[#E4405F]', hoverText: 'group-hover:text-[#E4405F]', path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', url: t('socials.instagram', 'https://www.instagram.com/srilankavoyageeden?igsh=MWNwM2pnbXJ5N2w2OA==') },
                { name: 'tiktok', bg: 'bg-[#000000]', hoverText: 'group-hover:text-[#000000]', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.23-1.29 4.83 4.83 0 0 1-1.29-3.23h-3.86v13.52a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.36 0 .71.07 1.04.2v-4.05a6.76 6.76 0 0 0-1.04-.08 6.76 6.76 0 0 0-6.76 6.76 6.76 6.76 0 0 0 6.76 6.76 6.76 6.76 0 0 0 6.76-6.76V7.12a8.68 8.68 0 0 0 5.2 1.63V4.89c-.66 0-1.3-.18-1.88-.53a4.79 4.79 0 0 1-1.88-1.78Z', url: t('socials.tiktok', 'https://www.tiktok.com/@srilankavoyageeden?_r=1&_t=ZS-96VdMCj41Bo') },
                { name: 'youtube', bg: 'bg-[#FF0000]', hoverText: 'group-hover:text-[#FF0000]', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', url: t('socials.youtube', 'https://www.youtube.com/@SriLankaVoyageEden') }
              ].map((icon) => (
                <a 
                  key={icon.name} 
                  href={icon.url} 
                  target={icon.url !== '#' ? "_blank" : undefined}
                  rel={icon.url !== '#' ? "noopener noreferrer" : undefined}
                  className={`w-10 h-10 ${icon.bg} hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 group`}
                >
                  <svg 
                    className={`w-5 h-5 text-white transition-colors duration-300 ${icon.hoverText}`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* B2B Contacts Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link 
                to={getLocalizedPath('b2b', i18n.language)}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:border-white/60 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 hover:bg-white/20"
              >
                {t('footer.b2b')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Cards Section */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Contact Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-luxury">{t('footer.contact_title')}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                {email1 && (
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.62a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${email1}`} className="hover:text-white transition-colors truncate">{email1}</a>
                  </p>
                )}
                {email2 && (
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.62a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${email2}`} className="hover:text-white transition-colors truncate">{email2}</a>
                  </p>
                )}
                {email3 && (
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.62a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${email3}`} className="hover:text-white transition-colors truncate">{email3}</a>
                  </p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5">
                  {phone1 && (
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.957.01c3.18.001 6.167 1.24 8.413 3.488 2.247 2.248 3.485 5.237 3.483 8.417-.004 6.557-5.342 11.897-11.9 11.897h-.008c-1.988 0-3.943-.546-5.683-1.448L0 24zM6.305 20.78a9.882 9.882 0 005.683 1.448h.005c5.385 0 9.768-4.386 9.771-9.771.002-2.61-1.013-5.064-2.859-6.91a9.712 9.712 0 00-6.91-2.859C6.545 2.688 2.16 7.072 2.158 12.457c-.001 1.72.45 3.397 1.305 4.887l-1.01 3.693 3.852-.957zM16.098 13.1c-.26-.13-1.53-.756-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.5-.4-.43-.57-.44-.14-.01-.31-.01-.48-.01s-.44.06-.67.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.53-.62 1.74-1.21.21-.59.21-1.09.15-1.21-.06-.12-.22-.19-.48-.32z"/>
                      </svg>
                      <a href={`https://wa.me/${phone1Clean}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors font-semibold text-white">{phone1}</a>
                    </p>
                  )}
                  {phone2 && (
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.957.01c3.18.001 6.167 1.24 8.413 3.488 2.247 2.248 3.485 5.237 3.483 8.417-.004 6.557-5.342 11.897-11.9 11.897h-.008c-1.988 0-3.943-.546-5.683-1.448L0 24zM6.305 20.78a9.882 9.882 0 005.683 1.448h.005c5.385 0 9.768-4.386 9.771-9.771.002-2.61-1.013-5.064-2.859-6.91a9.712 9.712 0 00-6.91-2.859C6.545 2.688 2.16 7.072 2.158 12.457c-.001 1.72.45 3.397 1.305 4.887l-1.01 3.693 3.852-.957zM16.098 13.1c-.26-.13-1.53-.756-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.5-.4-.43-.57-.44-.14-.01-.31-.01-.48-.01s-.44.06-.67.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.53-.62 1.74-1.21.21-.59.21-1.09.15-1.21-.06-.12-.22-.19-.48-.32z"/>
                      </svg>
                      <a href={`https://wa.me/${phone2Clean}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors font-semibold text-white">{phone2}</a>
                    </p>
                  )}
                  {whatsapp3 && (
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.957.01c3.18.001 6.167 1.24 8.413 3.488 2.247 2.248 3.485 5.237 3.483 8.417-.004 6.557-5.342 11.897-11.9 11.897h-.008c-1.988 0-3.943-.546-5.683-1.448L0 24zM6.305 20.78a9.882 9.882 0 005.683 1.448h.005c5.385 0 9.768-4.386 9.771-9.771.002-2.61-1.013-5.064-2.859-6.91a9.712 9.712 0 00-6.91-2.859C6.545 2.688 2.16 7.072 2.158 12.457c-.001 1.72.45 3.397 1.305 4.887l-1.01 3.693 3.852-.957zM16.098 13.1c-.26-.13-1.53-.756-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.5-.4-.43-.57-.44-.14-.01-.31-.01-.48-.01s-.44.06-.67.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.53-.62 1.74-1.21.21-.59.21-1.09.15-1.21-.06-.12-.22-.19-.48-.32z"/>
                      </svg>
                      <a href={`https://wa.me/${whatsapp3Clean}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors font-semibold text-white">{whatsapp3}</a>
                    </p>
                  )}
                </div>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.122-4.104-6.926-6.927l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <a href={`tel:${phone3Clean}`} className="hover:text-white transition-colors font-medium text-gray-300">
                    {phone3} <span className="text-xs text-gray-400">({t('footer.office_label', 'Oficina en Sri Lanka')})</span>
                  </a>
                </p>
              </div>
            </div>

            {/* Inscription Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-luxury">{t('footer.registration_title')}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>
                  <p>{t('footer.sltda_reg')}</p>
                  <p className="text-[11px] text-gray-400 font-light italic mt-0.5">{t('footer.sltda_desc')}</p>
                </div>
                <p>{t('footer.reg_no')}</p>
                <p>{t('footer.experience')}</p>
              </div>
            </div>

            {/* Offices Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-luxury">{t('footer.offices_title')}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>{t('footer.office1')}</p>
                <p>{t('footer.office2')}</p>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-luxury">{t('footer.hours_title')}</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>{t('footer.hours_weekdays')}</p>
                <p>{t('footer.hours_saturday')}</p>
                <p className="text-red-400 font-semibold">{t('footer.hours_sunday')}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          <p>{t('footer.copyright', { year: currentYear }).replace('{{year}}', currentYear)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
