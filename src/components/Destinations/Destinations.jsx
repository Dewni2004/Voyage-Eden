import React, { useState, useEffect } from 'react';
import { getArticles } from '../../services/contentService';
import { Link } from 'react-router-dom';
import sigiriya from '../../assets/Sigiriya.jpg';
import ella from '../../assets/Ella.jfif';
import kandy from '../../assets/Kandy.jpg';
import mirissa from '../../assets/Mirissa.webp';
import taprobane from '../../assets/itinerary-hero.png';
import diyaluma from '../../assets/blog-safari.png';

const Destinations = () => {
  const [articles, setArticles] = useState([]);
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
      excerpt: "Discover the second highest waterfall in Sri Lanka and its hidden natural infinity pools.",
      image: diyaluma
    },
    { id: 'kandy', title: 'Kandy', excerpt: 'Cultural Heart', image: kandy },
    { id: 'mirissa', title: 'Mirissa', excerpt: 'Côte d’Or', image: mirissa },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data.slice(0, 4));
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const displayItems = articles.length >= 4 ? articles : fallbackDestinations;

  if (loading && articles.length === 0) {
    return <div className="py-24 text-center text-gray-400">Loading guide...</div>;
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Le Journal d’Eden</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Inspiration et découvertes du monde.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[700px]">
          {/* Large Card (Left) */}
          <Link
            to={articles.length >= 1 ? `/blog/${displayItems[0].id}` : '/travel-guide'}
            className="lg:col-span-2 lg:row-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-[400px] lg:h-full"
          >
            <img
              src={displayItems[0].image}
              alt={displayItems[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{displayItems[0].title}</h3>
            </div>
          </Link>

          {/* Medium Card (Top Right) */}
          <Link
            to={articles.length >= 2 ? `/blog/${displayItems[1].id}` : '/travel-guide'}
            className="lg:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-[300px] lg:h-full"
          >
            <img
              src={displayItems[1].image}
              alt={displayItems[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{displayItems[1].title}</h3>
            </div>
          </Link>

          {/* Small Card 1 (Bottom Right 1) */}
          <Link
            to={articles.length >= 3 ? `/blog/${displayItems[2].id}` : '/travel-guide'}
            className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] lg:h-full"
          >
            <img
              src={displayItems[2].image}
              alt={displayItems[2].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{displayItems[2].title}</h3>
            </div>
          </Link>

          {/* Small Card 2 (Bottom Right 2) */}
          <Link
            to={articles.length >= 4 ? `/blog/${displayItems[3].id}` : '/travel-guide'}
            className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] lg:h-full"
          >
            <img
              src={displayItems[3].image}
              alt={displayItems[3].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{displayItems[3].title}</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
