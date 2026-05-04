import React from 'react';
import blogSafari from '../assets/blog-safari.png';
import blogCity from '../assets/blog-city.png';
import blogBoat from '../assets/blog-boat.png';

const TravelGuide = () => {
  const articles = [
    {
      id: 1,
      title: "Spiritual Sojourn: Pilgrimage Tours For Soul Seekers",
      image: blogSafari,
      date: "06 TH FEB 2024",
      author: "By Admin",
      category: "Culture",
      excerpt: "Explore the ancient temples and sacred sites of Sri Lanka, where spirituality meets history in a profound journey of self-discovery."
    },
    {
      id: 2,
      title: "Main-Country Memoirs: Vineyard Tours For Wine Stoppers",
      image: blogCity,
      date: "04 TH FEB 2024",
      author: "By Admin",
      category: "Luxury",
      excerpt: "Indulge in the finest Ceylon teas and colonial-style experiences in the heart of the hill country, where tradition and elegance blend."
    },
    {
      id: 3,
      title: "Rhythms of the Rainforest: Adventure Tours In Sinharaja",
      image: blogBoat,
      date: "02 ND FEB 2024",
      author: "By Admin",
      category: "Adventure",
      excerpt: "Immerse yourself in the dense jungles of Sinharaja, a UNESCO World Heritage site home to endemic species and breathtaking waterfalls."
    },
    {
      id: 4,
      title: "Coastal Calm: Surf & Yoga Retreats in Weligama",
      image: blogSafari,
      date: "31 ST JAN 2024",
      author: "By Admin",
      category: "Wellness",
      excerpt: "Find your balance on the southern coast, where the waves are perfect and the sunsets provide the ultimate backdrop for meditation."
    },
    {
      id: 5,
      title: "Echoes of Antiquity: Exploring the Cultural Triangle",
      image: blogCity,
      date: "28 TH JAN 2024",
      author: "By Admin",
      category: "History",
      excerpt: "Step back in time as you visit the ancient cities of Anuradhapura and Polonnaruwa, witnessing the grandeur of a bygone era."
    },
    {
      id: 6,
      title: "Wild Wonders: A Journey Through Yala National Park",
      image: blogBoat,
      date: "25 TH JAN 2024",
      author: "By Admin",
      category: "Wildlife",
      excerpt: "Track the elusive leopard and majestic elephant in the diverse landscapes of Yala, Sri Lanka's most famous wildlife sanctuary."
    }
  ];

  const categories = [
    { name: "Safari Aventure", count: 5 },
    { name: "Découverte de la ville", count: 5 },
    { name: "Voyage en croisière", count: 5 },
    { name: "Exploration culturelle", count: 5 },
    { name: "Retraite de luxe", count: 5 },
  ];

  const tags = ["Aventures", "Savoir De La Ville", "Excursion", "Culture", "Tours", "Photographie", "Tourisme", "Voyage En Voiture", "Excursion Nature"];

  return (
    <div className="pt-32 pb-24 bg-[#f8fbff]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Articles */}
          <div className="lg:w-2/3">
            <h2 className="text-primary text-3xl font-bold mb-10 uppercase tracking-widest border-l-4 border-luxury pl-4">Nos Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {articles.map((article) => (
                <article key={article.id} className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-luxury text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      {article.category}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{article.author}</span>
                    </div>
                    
                    <h3 className="text-primary text-xl font-bold mb-4 leading-tight hover:text-luxury transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <button className="text-primary font-bold text-sm flex items-center group/btn hover:text-luxury transition-all">
                      Read More
                      <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3 space-y-12">
            
            {/* Search */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-6">Rechercher ici</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Chercher Ici..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-gray-700"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-luxury transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8">Catégories</h3>
              <ul className="space-y-4">
                {categories.map((cat, index) => (
                  <li key={index} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all border-b border-gray-50 last:border-0">
                    <span className="text-gray-700 font-medium group-hover:text-luxury transition-colors">{cat.name}</span>
                    <span className="bg-gray-100 text-primary text-xs font-bold w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-luxury group-hover:text-white transition-all">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8">Message récent</h3>
              <div className="space-y-8">
                {articles.slice(0, 3).map((article) => (
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
              <h3 className="text-primary text-xl font-bold mb-8">balises</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <button key={index} className="bg-gray-100 hover:bg-luxury hover:text-white text-gray-600 text-xs font-bold px-6 py-3 rounded-xl transition-all border border-transparent">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuide;
