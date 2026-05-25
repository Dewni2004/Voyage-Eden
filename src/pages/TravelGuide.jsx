import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/contentService';
import blogSafari from '../assets/blog-safari.png';
import blogCity from '../assets/blog-city.png';
import blogBoat from '../assets/blog-boat.png';

import PageHero from '../components/UI/PageHero';
import guideBanner from '../assets/itinerary-hero.png';

import { blogArticles } from '../data/blogData';

const TravelGuide = () => {
  const [dynamicArticles, setDynamicArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setDynamicArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, selectedCategory, selectedTag]);

  const allArticles = [...dynamicArticles, ...blogArticles];

  const translateToFrench = (word) => {
    const translations = {
      'History': 'Histoire',
      'Adventure': 'Aventure',
      'Nature': 'Nature',
      'Culture': 'Culture',
      'Discovery': 'Découverte',
      'Waterfalls': 'Cascades',
      'Beach': 'Plage',
      'Islands': 'Îles',
      'Private Island': 'Île privée',
      '#History': '#Histoire',
      '#Adventure': '#Aventure',
      '#Nature': '#Nature',
      '#Culture': '#Culture',
      '#Waterfalls': '#Cascades'
    };
    return translations[word] || word;
  };
  
  const filteredArticles = allArticles.filter(article => {
    const categoryFr = translateToFrench(article.category);
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory || categoryFr === selectedCategory;
    const matchesTag = selectedTag === 'All' || (article.tags && article.tags.some(t => t === selectedTag || translateToFrench(t) === selectedTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const categories = [
    { name: "All", count: allArticles.length },
    ...Array.from(new Set(allArticles.map(a => translateToFrench(a.category))))
      .filter(Boolean)
      .map(cat => ({
        name: cat,
        count: allArticles.filter(a => translateToFrench(a.category) === cat).length
      }))
  ];

  const allTags = ['All', ...Array.from(new Set(allArticles.flatMap(a => (a.tags || []).map(translateToFrench))))].filter(Boolean);

  const ArticleCard = ({ article }) => (
    <article className="bg-white rounded-2xl sm:rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col">
      <div className="relative h-32 xs:h-40 sm:h-64 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary text-white text-[9px] sm:text-xs font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg">
          {translateToFrench(article.category)}
        </div>
      </div>
      
      <div className="p-3 xs:p-5 sm:p-8 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center text-gray-400 text-[10px] sm:text-sm mb-1.5 sm:mb-4 space-x-2 sm:space-x-4">
            <span>{article.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden xs:inline-block"></span>
            <span className="hidden xs:inline-block">{article.author}</span>
          </div>
          
          <Link to={`/blog/${article.id}`}>
            <h3 className="text-primary text-xs xs:text-base sm:text-xl font-bold mb-1.5 sm:mb-4 leading-tight hover:text-primary/80 transition-colors cursor-pointer line-clamp-2">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 hidden sm:block">
            {article.excerpt}
          </p>
        </div>
        
        <Link to={`/blog/${article.id}`} className="text-primary font-bold text-[10px] sm:text-sm flex items-center group/btn hover:text-primary/80 transition-all mt-2 sm:mt-0">
          Lire la suite
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );

  return (
    <div>
      <PageHero 
        title="Guide de Voyage"
        description="Découvrez nos conseils, histoires et guides pour explorer le Sri Lanka comme un local."
        image={guideBanner}
      />
      <div className="py-16 bg-[#f8fbff]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Articles */}
          <div className="lg:w-2/3 order-2 lg:order-1">
            
            <h2 className="text-primary text-2xl font-bold mb-6 uppercase tracking-widest border-l-4 border-primary pl-4">Sri Lanka dans l'actualité</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 mb-12">
              {allArticles.slice(0, 2).map(article => <ArticleCard key={article.id} article={article} />)}
            </div>

            <h2 className="text-primary text-2xl font-bold mb-6 uppercase tracking-widest border-l-4 border-primary pl-4">Lisez nos articles les plus utiles</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 mb-12">
              {allArticles.slice(2, 4).map(article => <ArticleCard key={article.id} article={article} />)}
            </div>

            <h2 className="text-primary text-2xl font-bold mb-6 uppercase tracking-widest border-l-4 border-primary pl-4">Les articles les plus populaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 mb-12">
              {allArticles.slice(4, 6).map(article => <ArticleCard key={article.id} article={article} />)}
            </div>

            <h2 className="text-primary text-2xl font-bold mb-6 uppercase tracking-widest border-l-4 border-primary pl-4">Tous les articles</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10">
              {filteredArticles.length > 0 ? (
                (isMobile ? filteredArticles.slice(0, visibleCount) : filteredArticles).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[40px] shadow-sm border border-gray-100">
                  <div className="text-6xl mb-6">🔎</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Aucun article trouvé</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Nous n'avons trouvé aucun article correspondant à vos filtres.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTag('All'); }} 
                    className="mt-6 text-primary font-bold hover:underline"
                  >
                    Effacer tous les filtres
                  </button>
                </div>
              )}
            </div>

            {isMobile && filteredArticles.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Afficher plus
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3 space-y-12 order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto hide-scrollbar">
            
            {/* Search */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-6">Rechercher ici</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Chercher Ici..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-700"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8">Catégories</h3>
              <ul className="space-y-4">
                {categories.map((cat, index) => (
                  <li 
                    key={index} 
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex justify-between items-center group cursor-pointer p-3 md:p-4 rounded-xl transition-all border-b border-gray-50 last:border-0 ${selectedCategory === cat.name ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                  >
                    <span className={`font-medium transition-colors ${selectedCategory === cat.name ? 'text-primary font-bold' : 'text-gray-700 group-hover:text-primary'}`}>
                      {cat.name === 'All' ? 'Toutes les catégories' : cat.name}
                    </span>
                    <span className={`text-xs font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-all ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8">Articles récents</h3>
              <div className="space-y-8">
                {allArticles.slice(0, 3).map((article) => (
                  <div key={article.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                      <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-primary/70 text-[10px] font-bold uppercase tracking-wider mb-1">{article.date}</span>
                      <h4 className="text-primary text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8">Balises</h3>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all border ${selectedTag === tag ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-primary hover:text-white'}`}
                  >
                    {tag === 'All' ? 'Toutes' : tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TravelGuide;
