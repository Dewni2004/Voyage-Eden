import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blogHeader from '../assets/itinerary-hero.png'; // Fallback
import blogSafari from '../assets/blog-safari.png';
import blogCity from '../assets/blog-city.png';

const BlogDetail = () => {
  const { id } = useParams();

  // Categories data
  const categories = [
    { name: "Tourist Attractions", count: 12 },
    { name: "News & Curiosities", count: 3 },
    { name: "Cultural & Religions", count: 9 },
    { name: "Useful Tips", count: 10 },
  ];

  // Popular Reads data
  const popularReads = [
    {
      title: "Discovering Badulla: A Natural Paradise",
      date: "April 15, 2024",
      image: blogSafari
    },
    {
      title: "Exploring Rathnapura: The Gem City",
      date: "May 02, 2024",
      image: blogCity
    }
  ];

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/C:/Users/ASUS/.gemini/antigravity/brain/281003f6-40f9-4b9c-803a-003a6a03115c/upper_diyaluma_falls_blog_1777866025087.png" 
          alt="Upper Diyaluma Falls" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 text-center px-6">
          <span className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest border border-white/30 mb-8 inline-block">
            Adventure
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl tracking-tight">
            Upper Diyaluma Falls
          </h1>
          <p className="text-white/90 text-2xl md:text-3xl font-light italic drop-shadow-lg">
            The Hidden Gem
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Article Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-gray-100">
              <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10 leading-tight">
                Introduction to Upper Diyaluma Falls
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
                <p className="relative pl-16 mb-8 first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-2">
                  Located near the town of Koslanda, the "Upper Diyaluma Falls" is part of the famous Diyaluma Falls, the second highest waterfall in Sri Lanka. However, what many travelers do not know is that at the top of this impressive waterfall lies a little-explored natural paradise, with natural infinity pools and spectacular panoramic views.
                </p>

                <h3 className="text-primary text-2xl font-bold mt-12 mb-6">A unique and less crowded destination</h3>
                <p className="mb-8">
                  Unlike the base of Diyaluma, which is easily accessible from the road, Upper Diyaluma offers a more intimate and authentic experience. Here, you can enjoy nature in its purest state, surrounded by tropical vegetation, fresh mountain air, and the soothing sound of water flowing over the rocks.
                </p>

                <div className="my-12 rounded-[32px] overflow-hidden shadow-2xl group">
                  <img 
                    src="/C:/Users/ASUS/.gemini/antigravity/brain/281003f6-40f9-4b9c-803a-003a6a03115c/upper_diyaluma_falls_blog_1777866025087.png" 
                    alt="Upper Diyaluma View" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="my-12 bg-[#f8fbff] border-l-8 border-luxury p-10 rounded-r-[32px] italic">
                  <p className="text-xl md:text-2xl text-primary font-bold leading-relaxed">
                    "Visiting Upper Diyaluma Falls is like discovering a magical corner of Sri Lanka that combines adventure, relaxation, and dreamlike landscapes."
                  </p>
                </div>

                <div className="my-12 bg-[#f9bcad] rounded-[32px] p-10 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="text-primary text-2xl font-bold">Traveler Tips</h4>
                  </div>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p className="text-gray-800"><span className="font-bold">Best time:</span> Visit during the dry season for stable weather.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p className="text-gray-800"><span className="font-bold">Gear up:</span> Wear comfortable clothing, non-slip footwear, and bring a swimsuit.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p className="text-gray-800"><span className="font-bold">Essentials:</span> Don't forget sunscreen and plenty of water!</p>
                    </li>
                  </ul>
                </div>

                <p className="mb-12">
                  It is the perfect place for those seeking something different, away from traditional tourist routes, and who want to connect with nature in a unique way. Without a doubt, Upper Diyaluma is one of the island's best-kept secrets.
                </p>

                <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                  {['#SriLanka', '#Waterfalls', '#Nature'].map((tag) => (
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
