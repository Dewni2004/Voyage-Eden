import React from 'react';
import { useTranslation } from 'react-i18next';
import officeStaff from '../assets/Office- staff.jpg';
import officeStaff2 from '../assets/Office - staff 2.jpg';
import guidesImage from '../assets/Guides.jpg';
import teamMember from '../assets/team-member.png';
import officeTeam1 from '../assets/team-office-1.png';
import officeTeam2 from '../assets/team-office-2.png';
import guide1 from '../assets/guide-1.png';
import guide2 from '../assets/guide-2.png';
import sanjiImg from '../assets/Sanji.webp';
import anaImg from '../assets/Ana.webp';
import joseImg from '../assets/Jose.webp';
import marcoImg from '../assets/Marco.webp';
import manjulaImg from '../assets/Manjula.webp';
import rasikaImg from '../assets/Rasika.webp';
import nethmiImg from '../assets/Nethmi.webp';
import thakshilaImg from '../assets/Thakshila.webp';
import anjanImg from '../assets/Anjan.webp';
import dewniImg from '../assets/Dewni.webp';
import oshadhiImg from '../assets/Oshadhi.webp';
import sewminiImg from '../assets/Sewmini.webp';
import kasunImg from '../assets/Kasun.webp';
import thenuraImg from '../assets/Thenura.webp';
import sithmiImg from '../assets/Sithmi2-300x239.webp';
import theekshanaImg from '../assets/Theekshana.webp';
import sampathImg from '../assets/Sampath.jpg';
import nalindaImg from '../assets/Nalinda.webp';
import nazriImg from '../assets/Nazri.webp';
import chammiImg from '../assets/Chammi.webp';
import chamaraImg from '../assets/Chamara.webp';
import ajeebImg from '../assets/Ajeeb.webp';
import noelImg from '../assets/Noel.webp';
import chinthakaImg from '../assets/Chinthaka.webp';

import PageHero from '../components/UI/PageHero';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div>
      <PageHero 
        title={t('aboutUs.heroTitle')}
        description={t('aboutUs.heroDesc')}
        image={officeStaff}
        overlayOpacity="bg-black/60"
      />

      {/* Who We Are Section */}
      <section className="py-10 md:py-14 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-8">{t('aboutUs.whoWeAreTitle')}</h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-8 md:mb-12">
                <p>
                  {t('aboutUs.whoWeAreDesc1')}
                </p>
                <p>
                  {t('aboutUs.whoWeAreDesc2')}
                </p>
                {t('aboutUs.whoWeAreBoldText') && (
                  <p className="font-bold text-primary whitespace-pre-line">
                    {t('aboutUs.whoWeAreBoldText')}
                  </p>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 relative z-10">
                {[
                  { 
                    label: t('aboutUs.statsYears'), 
                    value: `${new Date().getFullYear() - 2013}+`,
                    icon: <svg className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-4 text-luxury opacity-80 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  },
                  { 
                    label: t('aboutUs.statsExperts'), 
                    value: "100%",
                    icon: <svg className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-4 text-luxury opacity-80 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  },
                  { 
                    label: t('aboutUs.statsReviews'), 
                    value: "4.9",
                    icon: <svg className="w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-4 text-luxury opacity-80 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  },
                ].map((stat, index) => (
                  <div key={index} className="group relative bg-white/60 backdrop-blur-md p-3 py-5 sm:p-6 md:p-8 rounded-2xl border border-white/80 text-center flex flex-col items-center justify-center transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-luxury/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {stat.icon}
                    <div className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80 text-2xl sm:text-4xl md:text-5xl font-black mb-1 md:mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">{stat.value}</div>
                    <div className="text-gray-600 font-medium text-[10px] sm:text-sm md:text-base leading-tight uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Overlapping Images */}
            <div className="lg:w-1/2 relative h-[350px] sm:h-[450px] md:h-[600px] w-full mt-8 lg:mt-0 px-4 sm:px-0">
              {/* Top Image */}
              <div className="absolute top-0 left-0 w-[80%] h-[200px] sm:h-[300px] md:h-[350px] z-10">
                <img 
                  src={officeStaff2} 
                  alt="Eden Travels Office Staff" 
                  className="w-full h-full object-cover rounded-[30px] md:rounded-[40px] shadow-2xl border-4 border-white"
                />
              </div>
              
              {/* Bottom Image */}
              <div className="absolute bottom-0 right-0 w-[70%] h-[200px] sm:h-[300px] md:h-[350px] z-20">
                <img 
                  src={guidesImage} 
                  alt="Eden Travels Guides" 
                  className="w-full h-full object-cover rounded-[30px] md:rounded-[40px] shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-primary text-4xl font-bold mb-4">{t('aboutUs.whatSetsUsApartTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('aboutUs.whatSetsUsApartSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                title: t('aboutUs.apart1Title'),
                desc: t('aboutUs.apart1Desc'),
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )
              },
              {
                title: t('aboutUs.apart2Title'),
                desc: t('aboutUs.apart2Desc'),
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                title: t('aboutUs.apart3Title'),
                desc: t('aboutUs.apart3Desc'),
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                )
              },
              {
                title: t('aboutUs.apart4Title'),
                desc: t('aboutUs.apart4Desc'),
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-[32px] border border-primary/20 hover:border-primary/55 shadow-xl shadow-gray-200/50 text-center flex flex-col items-center transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mb-4 sm:mb-8 shadow-lg shadow-primary/30 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-primary text-sm sm:text-xl font-bold mb-2 sm:mb-4 leading-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-[11px] sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders & Representatives Section */}
      <section className="py-10 md:py-14 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-primary text-4xl font-bold mb-4">{t('aboutUs.foundersTitle')}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { 
                name: "Sanji", 
                role: "Co-fondateur", 
                desc: "Né au Sri Lanka et fort d'une expérience professionnelle en Europe, il est cofondateur de l'agence. Spécialisé dans l'accompagnement des voyageurs hispanophones.", 
                img: sanjiImg 
              },
              { 
                name: "Ana", 
                role: "Co-fondatrice", 
                desc: "Elle se spécialise dans la conception de voyages sur mesure, veillant à chaque détail pour créer des expériences uniques et mémorables.", 
                img: anaImg 
              },
              { 
                name: "Jose", 
                role: "Représentant en Espagne", 
                desc: "Jose conçoit des voyages sur mesure pour les voyageurs espagnols et latino-américains. Passionné et attentif aux détails.", 
                img: joseImg 
              },
              { 
                name: "Marco", 
                role: "Représentant en Italie", 
                desc: "Marco conçoit des itinéraires personnalisés et coordonne Viaggi Eden, assurant une liaison essentielle entre l'Italie et le Sri Lanka.", 
                img: marcoImg 
              }
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="relative mb-4 sm:mb-8 p-1 rounded-full border-4 sm:border-[6px] border-primary transition-transform duration-500 group-hover:scale-105 group-hover:border-luxury shadow-xl shadow-primary/20">
                  <div className="w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-primary text-base sm:text-2xl font-bold mb-0.5 sm:mb-1">{member.name}</h3>
                <p className="text-primary/70 font-semibold text-xs sm:text-base mb-2 sm:mb-4">{t(`aboutUs.team.${member.name}.role`, { defaultValue: member.role })}</p>
                <p className="text-gray-600 text-[11px] sm:text-sm leading-relaxed max-w-[250px]">
                  {t(`aboutUs.team.${member.name}.desc`, { defaultValue: member.desc })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team at the Office Section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-primary text-4xl font-bold mb-4">{t('aboutUs.teamTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('aboutUs.teamSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { 
                name: "Manjula", 
                role: "Directeur Général", 
                img: manjulaImg,
                desc: "M. Manjula assure le bon déroulement des opérations quotidiennes, coordonne les équipes et supervise les flux de travail pour maintenir l'efficacité."
              },
              { 
                name: "Rasika", 
                role: "Gestion Financière", 
                img: rasikaImg,
                desc: "Rasika assure la gestion financière avec expertise et précision, garantissant efficacité et stabilité au sein de l'entreprise."
              },
              { 
                name: "Nethmi", 
                role: "Conseillère en voyages", 
                img: nethmiImg,
                desc: "Nethmi offre un accompagnement personnalisé, en concevant des voyages qui allient culture et confort pour une expérience réussie."
              },
              { 
                name: "Thakshila", 
                role: "Opérations Numériques", 
                img: thakshilaImg,
                desc: "Thakshila dirige les opérations numériques, gère les systèmes, le CRM et le site web, assurant l'innovation sur toutes les plateformes."
              },
              { 
                name: "Anjan", 
                role: "Comptable", 
                img: anjanImg,
                desc: "Anjan gère la facturation, les paiements et le budget avec un souci du détail, assurant un contrôle financier efficace."
              },
              { 
                name: "Dewni", 
                role: "Support Informatique", 
                img: dewniImg,
                desc: "Dewni fournit un support informatique, gérant les mises à jour et le dépannage pour des opérations techniques fluides."
              },
              { 
                name: "Oshadhi", 
                role: "Assistant Sol (Formation)", 
                img: oshadhiImg,
                desc: "Oshadhi apporte son soutien aux excursions quotidiennes, en aidant à l'élaboration des itinéraires et à la coordination."
              },
              { 
                name: "Sewmini", 
                role: "Assistante Comptable (Formation)", 
                img: sewminiImg,
                desc: "Sewmini apporte son soutien aux services de comptabilité, d'établissement des coûts et de devis avec exactitude."
              },
              { 
                name: "Kasun", 
                role: "Assistante Conseillère (Formation)", 
                img: kasunImg,
                desc: "Kasun aide à préparer des itinéraires personnalisés et assure la communication avec les clients pour leurs réservations."
              },
              { 
                name: "Thenura", 
                role: "Développeur CRM", 
                img: thenuraImg,
                desc: "Thenura développe le CRM personnalisé de l'agence, créant des outils qui rationalisent les processus et optimisent le service."
              },
              { 
                name: "Sithmi", 
                role: "Conseillère en Voyages (Formation)", 
                img: sithmiImg,
                desc: "Sithmi se concentre sur la gestion de la clientèle et la conception d'itinéraires sur mesure répondant aux attentes des voyageurs."
              },
              { 
                name: "Theekshana", 
                role: "Création de Contenu (Formation)", 
                img: theekshanaImg,
                desc: "Theekshana soutient les activités de marketing et aide à la préparation des itinéraires via la création de contenu social."
              }
            ].map((member, index) => (
              <div key={index} className="bg-[#f8fbff] p-4 sm:p-8 rounded-2xl sm:rounded-[32px] border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 sm:mb-6 shadow-lg border-4 border-white group-hover:border-luxury transition-colors duration-300">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-primary text-sm sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1">{member.name}</h3>
                <p className="text-primary/70 font-semibold text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4">{t(`aboutUs.team.${member.name}.role`, { defaultValue: member.role })}</p>
                <p className="text-gray-500 text-[10px] sm:text-[11px] leading-relaxed transition-all duration-300">
                  {t(`aboutUs.team.${member.name}.desc`, { defaultValue: member.desc })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Guides & Drivers Section */}
      <section className="py-10 md:py-14 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-primary text-4xl font-bold mb-4">{t('aboutUs.guidesTitle')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('aboutUs.guidesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { 
                name: "Sampath", 
                role: "Chauffeur-Guide Espagnol", 
                img: sampathImg,
                desc: "Notre chauffeur-guide vedette, l'un des meilleurs hispanophones. Expérimenté et chaleureux, il crée des expériences inoubliables."
              },
              { 
                name: "Nalinda", 
                role: "Chauffeur-Guide Espagnol", 
                img: nalindaImg,
                desc: "Parle couramment espagnol, réputé pour sa gentillesse et son attention particulière aux enfants. Prudent et toujours positif."
              },
              { 
                name: "Nazri", 
                role: "Chauffeur-Guide Espagnol", 
                img: nazriImg,
                desc: "Très attentionné envers les familles, il connaît parfaitement les coutumes locales et se met en quatre pour satisfaire les voyageurs."
              },
              { 
                name: "Chammi", 
                role: "Chauffeur-Guide Espagnol", 
                img: chammiImg,
                desc: "Sympathique et professionnel, il gère tous les détails logistiques. Sa conduite sûre et sa fiabilité rendent chaque trajet agréable."
              },
              { 
                name: "Chamara", 
                role: "Chauffeur-Guide Professionnel", 
                img: chamaraImg,
                desc: "Prend en charge tous les détails logistiques pour vous garantir un voyage confortable. Fiable avec une personnalité chaleureuse."
              },
              { 
                name: "Ajeeb", 
                role: "Chauffeur-Guide Professionnel", 
                img: ajeebImg,
                desc: "Le compagnon idéal pour un voyage paisible. Sa disponibilité et son professionnalisme vous garantissent une sérénité totale."
              },
              { 
                name: "Noel", 
                role: "Chauffeur Italien", 
                img: noelImg,
                desc: "Parle couramment italien, Noël s'occupe de tout pour que vous profitiez pleinement. Sa gentillesse assure votre bien-être."
              },
              { 
                name: "Chinthaka", 
                role: "Chauffeur Italien", 
                img: chinthakaImg,
                desc: "Chauffeur italien sympathique et expérimenté. Professionnel et attentif, il vous garantit une expérience sûre et inoubliable."
              },
            ].map((guide, index) => (
              <div key={index} className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[32px] border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 sm:mb-6 shadow-lg border-4 border-[#f8fbff] group-hover:border-luxury transition-colors duration-300">
                  <img 
                    src={guide.img} 
                    alt={guide.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-primary text-sm sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1">{guide.name}</h3>
                <p className="text-primary/70 font-semibold text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4">{t(`aboutUs.team.${guide.name}.role`, { defaultValue: guide.role })}</p>
                <p className="text-gray-500 text-[10px] sm:text-[11px] leading-relaxed transition-all duration-300">
                  {t(`aboutUs.team.${guide.name}.desc`, { defaultValue: guide.desc })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
