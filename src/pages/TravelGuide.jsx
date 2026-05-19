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

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setDynamicArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

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

  return (
    <div>
      <PageHero 
        title="Guide de Voyage"
        description="Découvrez nos conseils, histoires et guides pour explorer le Sri Lanka comme un local."
        image={guideBanner}
      />
      <div className="py-24 bg-[#f8fbff]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Articles */}
          <div className="lg:w-2/3 order-2 lg:order-1">
            <h2 className="text-primary text-3xl font-bold mb-10 uppercase tracking-widest border-l-4 border-luxury pl-4">Nos Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <article key={article.id} className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-luxury text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        {translateToFrench(article.category)}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{article.author}</span>
                      </div>
                      
                      <Link to={`/blog/${article.id}`}>
                        <h3 className="text-primary text-xl font-bold mb-4 leading-tight hover:text-luxury transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <Link to={`/blog/${article.id}`} className="text-primary font-bold text-sm flex items-center group/btn hover:text-luxury transition-all">
                        Lire la suite
                        <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[40px] shadow-sm border border-gray-100">
                  <div className="text-6xl mb-6">🔎</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Aucun article trouvé</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Nous n'avons trouvé aucun article correspondant à vos filtres.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTag('All'); }} 
                    className="mt-6 text-luxury font-bold hover:underline"
                  >
                    Effacer tous les filtres
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3 space-y-12 order-1 lg:order-2">
            
            {/* Search */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-6">Rechercher ici</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Chercher Ici..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-gray-700"
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
                    <span className={`font-medium transition-colors ${selectedCategory === cat.name ? 'text-luxury' : 'text-gray-700 group-hover:text-luxury'}`}>
                      {cat.name === 'All' ? 'Toutes les catégories' : cat.name}
                    </span>
                    <span className={`text-xs font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-all ${selectedCategory === cat.name ? 'bg-luxury text-white' : 'bg-primary/5 text-primary group-hover:bg-luxury group-hover:text-white'}`}>
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
                      <span className="text-luxury text-[10px] font-bold uppercase tracking-wider mb-1">{article.date}</span>
                      <h4 className="text-primary text-sm font-bold leading-snug group-hover:text-luxury transition-colors line-clamp-2">
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
                    className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all border ${selectedTag === tag ? 'bg-luxury text-white border-luxury shadow-lg shadow-luxury/20' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-luxury hover:text-white'}`}
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
