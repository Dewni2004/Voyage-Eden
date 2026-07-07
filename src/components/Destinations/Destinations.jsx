import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getArticles } from '../../services/contentService';
import { Link } from 'react-router-dom';
import sigiriya from '../../assets/Sigiriya.webp';
import ella from '../../assets/Ella.webp';
import kandy from '../../assets/Kandy.webp';
import mirissa from '../../assets/Mirissa.webp';
import taprobane from '../../assets/itinerary-hero.webp';
import diyaluma from '../../assets/blog-safari.webp';

const Destinations = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles(i18n.language);
      setTotalCount(data.length);
      
      const targetIds = [
        '6a1b8564-f219-4a2e-a48a-99b06816df0f', // Safari in Minneriya National Park
        'e603717d-3b7f-40f3-be60-a832c5e2c588', // Exploring the Flavors of Sri Lankan Cuisine
        'd5d7235a-211a-411d-b116-bb6a2168f3f8', // Kitesurfing in Kalpitiya
        '03daaa6e-86fd-41fb-9751-b35e52344708'  // Fishing in Sri Lanka
      ];

      const targetedArticles = [];
      targetIds.forEach(id => {
        const found = data.find(item => item.id === id);
        if (found) {
          targetedArticles.push(found);
        }
      });

      if (targetedArticles.length === 4) {
        setArticles(targetedArticles);
      } else {
        setArticles(data.slice(0, 4));
      }
      
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
    <section className="py-6 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6 md:mb-16">
          <h2 className="mb-4">{t('destinations.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light mb-3">
            {t('destinations.subtitle')}
          </p>
          <span className="inline-block bg-primary/5 text-primary text-[11px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            {totalCount} {totalCount <= 1 ? t('destinations.articlePublishedSingle') : t('destinations.articlePublishedPlural')}
          </span>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 h-auto lg:h-[400px]">
          {articles.map((article, index) => {
            let colSpanClass = 'col-span-1';
            let rowSpanClass = '';
            let titleSizeClass = 'text-[13px] xs:text-sm sm:text-lg md:text-2xl';
            let paddingClass = 'bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8';
            
            if (index === 0) {
              colSpanClass = 'col-span-1 lg:col-span-2';
              rowSpanClass = 'lg:row-span-2';
              titleSizeClass = 'text-[15px] xs:text-base sm:text-xl md:text-2xl lg:text-3xl';
            } else if (index === 1) {
              colSpanClass = 'col-span-1 lg:col-span-2';
              titleSizeClass = 'text-[13px] xs:text-sm sm:text-lg md:text-xl lg:text-2xl';
            } else {
              titleSizeClass = 'text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg';
              paddingClass = 'bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5';
            }

            return (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className={`${colSpanClass} ${rowSpanClass} relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group cursor-pointer h-[180px] sm:h-[220px] lg:h-full hover:shadow-xl transition-all duration-500`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className={`absolute ${paddingClass} text-white`}>
                  <span className="bg-primary/80 text-white text-[9px] sm:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {t(`travelGuide.cat${article.category || 'History'}`, article.category || 'Histoire')}
                  </span>
                  <h3 className={`${titleSizeClass} font-bold mb-1 drop-shadow-lg leading-tight`}>{article.title}</h3>
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
