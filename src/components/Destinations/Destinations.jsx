import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getArticles } from '../../services/contentService';
import { Link } from 'react-router-dom';
import sigiriya from '../../assets/Sigiriya.jpg';
import ella from '../../assets/Ella.jfif';
import kandy from '../../assets/Kandy.jpg';
import mirissa from '../../assets/Mirissa.webp';
import taprobane from '../../assets/itinerary-hero.png';
import diyaluma from '../../assets/blog-safari.png';

const Destinations = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fallbackDestinations = [
    {
      id: 1,
      title: "L'île de Taprobane",
      excerpt: "Explorez la villa hexagonale du comte de Mauny sur cette île rocheuse privée au sud du Sri Lanka.",
      image: taprobane
    },
    {
      id: 2,
      title: "Upper Diyaluma Falls",
      excerpt: "Découvrez la deuxième plus haute cascade du Sri Lanka et ses piscines naturelles cachées.",
      image: diyaluma
    },
    { id: 'kandy', title: 'Kandy', excerpt: 'Cœur culturel', image: kandy },
    { id: 'mirissa', title: 'Mirissa', excerpt: 'Côte d’Or', image: mirissa },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles(i18n.language);
      setTotalCount(data.length);
      setArticles(data.slice(0, 4));
      setLoading(false);
    };
    fetchArticles();
  }, [i18n.language]);

  const displayItems = articles.length >= 4 ? articles : fallbackDestinations;

  if (loading && articles.length === 0) {
    return <div className="py-24 text-center text-gray-400">Chargement du guide...</div>;
  }

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mb-4">{t('destinations.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light mb-3">
            {t('destinations.subtitle')}
          </p>
          <span className="inline-block bg-primary/5 text-primary text-[11px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            {totalCount} {totalCount <= 1 ? 'article publié' : 'articles publiés'}
          </span>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 h-auto lg:h-[700px]">
          {/* Large Card (Left) */}
          <Link
            to={articles.length >= 1 ? `/blog/${displayItems[0].id}` : '/travel-guide'}
            className="col-span-1 lg:col-span-2 lg:row-span-2 relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group cursor-pointer h-[180px] sm:h-[220px] lg:h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
          >
            <img
              src={displayItems[0].image}
              alt={displayItems[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 text-white">
              <h3 className="text-[13px] xs:text-sm sm:text-lg md:text-3xl font-bold mb-1 md:mb-2 drop-shadow-lg leading-tight">{displayItems[0].title}</h3>
            </div>
          </Link>

          {/* Medium Card (Top Right) */}
          <Link
            to={articles.length >= 2 ? `/blog/${displayItems[1].id}` : '/travel-guide'}
            className="col-span-1 lg:col-span-2 relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group cursor-pointer h-[180px] sm:h-[220px] lg:h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
          >
            <img
              src={displayItems[1].image}
              alt={displayItems[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
              <h3 className="text-[13px] xs:text-sm sm:text-lg md:text-2xl font-bold mb-1 drop-shadow-lg leading-tight">{displayItems[1].title}</h3>
            </div>
          </Link>

          {/* Small Card 1 (Bottom Right 1) */}
          <Link
            to={articles.length >= 3 ? `/blog/${displayItems[2].id}` : '/travel-guide'}
            className="col-span-1 relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group cursor-pointer h-[180px] sm:h-[220px] lg:h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
          >
            <img
              src={displayItems[2].image}
              alt={displayItems[2].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-[13px] xs:text-sm sm:text-lg md:text-xl font-bold mb-1 drop-shadow-lg leading-tight">{displayItems[2].title}</h3>
            </div>
          </Link>

          {/* Small Card 2 (Bottom Right 2) */}
          <Link
            to={articles.length >= 4 ? `/blog/${displayItems[3].id}` : '/travel-guide'}
            className="col-span-1 relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group cursor-pointer h-[180px] sm:h-[220px] lg:h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
          >
            <img
              src={displayItems[3].image}
              alt={displayItems[3].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-[13px] xs:text-sm sm:text-lg md:text-xl font-bold mb-1 drop-shadow-lg leading-tight">{displayItems[3].title}</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
