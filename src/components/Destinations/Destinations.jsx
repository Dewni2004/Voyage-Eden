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

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles(i18n.language);
      setTotalCount(data.length);
      setArticles(data.slice(0, 4));
      setLoading(false);
    };
    fetchArticles();
  }, [i18n.language]);

  if (loading) {
    return <div className="py-24 text-center text-gray-400">Chargement du guide...</div>;
  }

  if (articles.length === 0) {
    return null; // Return nothing if there are no articles published
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

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 h-auto lg:h-[400px]">
          {articles.map((article, index) => {
            let colSpanClass = 'col-span-1';
            let rowSpanClass = '';
            
            if (index === 0) {
              colSpanClass = 'col-span-1 lg:col-span-2';
              rowSpanClass = 'lg:row-span-2';
            } else if (index === 1) {
              colSpanClass = 'col-span-1 lg:col-span-2';
            }

            return (
              <Link
                key={article.id}
                to={`/${i18n.language?.split('-')[0] || 'fr'}/blog/${article.id}`}
                className={`${colSpanClass} ${rowSpanClass} relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group cursor-pointer h-[180px] sm:h-[220px] lg:h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
                  <span className="bg-primary/80 text-white text-[9px] sm:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {t(`travelGuide.cat${article.category || 'History'}`, article.category || 'Histoire')}
                  </span>
                  <h3 className="text-[13px] xs:text-sm sm:text-lg md:text-2xl font-bold mb-1 drop-shadow-lg leading-tight">{article.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
