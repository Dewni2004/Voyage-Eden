import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogArticles } from '../data/blogData';
import { getArticles } from '../services/contentService';
import PageHero from '../components/UI/PageHero';

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      // First try static data
      let found = blogArticles.find(item => item.id.toString() === id);
      
      if (!found) {
        // Try Firestore
        const dynamicArticles = await getArticles();
        found = dynamicArticles.find(item => item.id === id);
      }
      
      setArticle(found);
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff]">
        <div className="text-primary font-bold">Loading article...</div>
      </div>
    );
  }

  // If article not found, show error
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Article non trouvé</h2>
          <Link to="/travel-guide" className="text-luxury font-bold hover:underline">Retour au guide de voyage</Link>
        </div>
      </div>
    );
  }

  // Sidebar data
  const categories = [
    { name: "Tourist Attractions", count: 12 },
    { name: "News & Curiosities", count: 3 },
    { name: "Cultural & Religions", count: 9 },
    { name: "Useful Tips", count: 10 },
  ];

  const popularReads = blogArticles.slice(0, 3);

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      <PageHero 
        title={article.title}
        description={article.description}
        image={article.image}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Article Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-gray-100">
              <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10 leading-tight">
                Introduction to {article.title}
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
                {article.content.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={index} className={`mb-8 ${index === 0 ? 'relative pl-16 first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-2' : ''}`}>
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'heading') {
                    return <h3 key={index} className="text-primary text-2xl font-bold mt-12 mb-6">{block.text}</h3>;
                  }
                  if (block.type === 'quote') {
                    return (
                      <div key={index} className="my-12 bg-[#f8fbff] border-l-8 border-luxury p-10 rounded-r-[32px] italic">
                        <p className="text-xl md:text-2xl text-primary font-bold leading-relaxed">
                          "{block.text}"
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}

                <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                  {article.tags.map((tag) => (
                    <span key={tag} className="bg-gray-50 text-gray-400 font-bold px-6 py-2 rounded-full text-sm border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3 space-y-12">
            
            {/* Categories Card */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8 relative inline-block">
                Categories
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-luxury rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {categories.map((cat, index) => (
                  <li key={index} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-luxury rounded-full group-hover:scale-150 transition-transform"></span>
                      <span className="text-gray-700 font-medium group-hover:text-luxury transition-colors">{cat.name}</span>
                    </div>
                    <span className="text-gray-400 font-bold text-sm">{cat.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Reads Card */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8 relative inline-block">
                Popular Reads
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-luxury rounded-full"></span>
              </h3>
              <div className="space-y-8">
                {popularReads.map((read, index) => (
                  <div key={index} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                      <img src={read.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-primary text-sm font-bold leading-snug group-hover:text-luxury transition-colors line-clamp-2 mb-1">
                        {read.title}
                      </h4>
                      <span className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">{read.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Join The Journey Card */}
            <div className="bg-[#1e406f] p-10 rounded-[32px] shadow-2xl relative overflow-hidden group">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-white text-2xl font-bold mb-4">Join The Journey</h3>
                <p className="text-white/70 text-sm mb-8">
                  Get exclusive travel tips and secret destinations delivered to your inbox.
                </p>
                
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-white placeholder-white/40 text-sm"
                  />
                  <button className="w-full bg-[#0d213f] hover:bg-[#0a1a33] text-white font-bold py-4 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
