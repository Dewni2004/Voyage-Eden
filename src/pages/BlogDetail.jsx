import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArticles } from '../services/contentService';
import PageHero from '../components/UI/PageHero';
import { Helmet } from 'react-helmet-async';
import { generateSlug } from '../utils/slugify';
import { getLocalizedPath } from '../utils/routeMap';

const BlogDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const [popularReads, setPopularReads] = useState([]);



  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const dynamicArticles = await getArticles(i18n.language);
      const found = dynamicArticles.find(item => item.id === id || generateSlug(item.title, item.id) === id);
      setArticle(found);
      setPopularReads(dynamicArticles.filter(item => item.id !== id && generateSlug(item.title, item.id) !== id).slice(0, 3));
      setLoading(false);
    };
    fetchArticle();
  }, [id, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff]">
        <div className="text-primary font-bold">{t('blogDetail.loading', "Chargement de l'article...")}</div>
      </div>
    );
  }

  // If article not found, show error
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('blogDetail.notFound', "Article non trouvé")}</h2>
          <Link to={getLocalizedPath('guide', i18n.language)} className="text-luxury font-bold hover:underline">{t('blogDetail.backBtn', "Retour au guide de voyage")}</Link>
        </div>
      </div>
    );
  }

  // Sidebar data
  const categories = [
    { name: t('blogDetail.sidebar.catAttractions', "Attractions touristiques"), count: 12 },
    { name: t('blogDetail.sidebar.catNews', "Actualités & Curiosités"), count: 3 },
    { name: t('blogDetail.sidebar.catCulture', "Culture & Religions"), count: 9 },
    { name: t('blogDetail.sidebar.catTips', "Conseils utiles"), count: 10 },
  ];


  return (
    <div className="bg-[#f8fbff] min-h-screen">
      <Helmet>
        <title>{article.seo_title || `${article.title} | Eden Travels`}</title>
        <meta name="description" content={article.seo_description || article.description?.substring(0, 160)} />
        {article.seo_keywords && <meta name="keywords" content={article.seo_keywords} />}
        <meta property="og:title" content={article.seo_title || article.title} />
        <meta property="og:description" content={article.seo_description || article.description?.substring(0, 160)} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      <PageHero 
        title={article.title}
        description={article.description}
        image={article.image}
      />

      {/* Main Content Area */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Article Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-gray-100">

              
              <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
                {(() => {
                  let contentArray = [];
                  try {
                    contentArray = typeof article.content === 'string' ? JSON.parse(article.content || '[]') : (article.content || []);
                  } catch (e) {
                    console.error("Failed to parse article content JSON", e);
                    contentArray = [{ type: 'paragraph', text: article.content || '' }];
                  }
                  const groupedContent = [];
                  let currentImageGroup = null;

                  contentArray.forEach((block, index) => {
                    if (block.type === 'image') {
                      if (!currentImageGroup) {
                        currentImageGroup = { type: 'imageGroup', images: [{ ...block, originalIndex: index }] };
                        groupedContent.push(currentImageGroup);
                      } else {
                        currentImageGroup.images.push({ ...block, originalIndex: index });
                      }
                    } else {
                      currentImageGroup = null;
                      groupedContent.push({ ...block, originalIndex: index });
                    }
                  });

                  return groupedContent.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p key={`p-${index}`} className={`mb-8 ${index === 0 ? 'relative pl-16 first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-2' : ''}`}>
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === 'heading') {
                      return <h3 key={`h-${index}`} className="text-primary text-2xl font-bold mt-12 mb-6">{block.text}</h3>;
                    }
                    if (block.type === 'quote') {
                      return (
                        <div key={`q-${index}`} className="my-12 bg-[#f8fbff] border-l-8 border-luxury p-10 rounded-r-[32px] italic">
                          <p className="text-xl md:text-2xl text-primary font-bold leading-relaxed">
                            "{block.text}"
                          </p>
                        </div>
                      );
                    }
                    if (block.type === 'imageGroup') {
                      if (block.images.length === 1) {
                        return (
                          <div key={`ig-${index}`} className="my-12 rounded-[32px] overflow-hidden shadow-lg border border-gray-100">
                            <img src={block.images[0].text} alt="" className="w-full h-auto object-cover" />
                          </div>
                        );
                      } else {
                        const gridClass = block.images.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';
                        return (
                          <div key={`ig-${index}`} className={`my-12 grid grid-cols-1 ${gridClass} gap-6`}>
                            {block.images.map((img, i) => (
                              <div key={i} className="rounded-[32px] overflow-hidden shadow-lg border border-gray-100 h-64 md:h-80">
                                <img src={img.text} alt="" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                              </div>
                            ))}
                          </div>
                        );
                      }
                    }
                    if (block.type === 'tips') {
                      return (
                        <div key={`t-${index}`} className="my-12 bg-gradient-to-br from-[#1e406f] to-[#0d213f] p-10 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden group">
                          {/* Decorative Background Elements */}
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-luxury/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="w-14 h-14 bg-luxury rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-luxury/20">
                                💡
                              </div>
                              <div>
                                <h4 className="text-white text-2xl font-bold font-serif tracking-wide">{t('blogDetail.travelTips', "Conseils de voyage")}</h4>
                                <p className="text-luxury text-xs font-bold uppercase tracking-widest">{t('blogDetail.expertAdvice', "Avis d'expert")}</p>
                              </div>
                            </div>
                            
                            <div className="prose prose-invert max-w-none">
                              <ul className="space-y-4 list-none p-0 m-0">
                                {block.text.split('\n').filter(tip => tip.trim() !== '').map((tip, i) => (
                                  <li key={i} className="flex gap-3 text-white/90 text-base md:text-lg font-medium leading-relaxed italic">
                                    <span className="text-luxury mt-1.5 flex-shrink-0">✦</span>
                                    <span>{tip.trim()}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{t('blogDetail.signatureGuide', "Guide signature Eden Travels")}</span>
                              <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-luxury rounded-full opacity-50"></div>)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'list') {
                      return (
                        <ul key={`l-${index}`} className="my-10 space-y-4">
                          {block.text.split('\n').filter(item => item.trim() !== '').map((item, i) => (
                            <li key={i} className="flex gap-4 group">
                              <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-luxury/10 flex items-center justify-center group-hover:bg-luxury transition-colors">
                                <div className="w-1.5 h-1.5 bg-luxury rounded-full group-hover:bg-white"></div>
                              </div>
                              <span className="text-gray-700 font-medium leading-relaxed">{item.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === 'link') {
                      return (
                        <div key={`lk-${index}`} className="my-8">
                          <a href={block.url || block.text} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-bold text-lg hover:text-luxury underline decoration-luxury decoration-2 underline-offset-4 transition-colors break-all">
                            {block.text || block.url}
                          </a>
                        </div>
                      );
                    }
                    return null;
                  });
                })()}

                <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                  {(typeof article.tags === 'string' ? JSON.parse(article.tags || '[]') : (article.tags || [])).map((tag) => {
                    const cleanTag = tag.startsWith('#') ? tag.substring(1) : tag;
                    return (
                      <span key={tag} className="bg-gray-50 text-gray-400 font-bold px-6 py-2 rounded-full text-sm border border-gray-100">
                        #{t(`travelGuide.cat${cleanTag}`, cleanTag)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/4 space-y-12">
            
            {/* Categories Card */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8 relative inline-block">
                {t('blogDetail.sidebar.categoriesTitle', 'Catégories')}
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
                {t('blogDetail.sidebar.popularReadsTitle', 'Lectures populaires')}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-luxury rounded-full"></span>
              </h3>
              <div className="space-y-8">
                {popularReads.map((read, index) => {
                  const slug = generateSlug(read.title, read.id);
                  return (
                  <Link to={`/${slug}`} key={index} className="flex gap-4 group cursor-pointer block">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                      <img src={read.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-primary text-sm font-bold leading-snug group-hover:text-luxury transition-colors line-clamp-2 mb-1">
                        {read.title}
                      </h4>
                      <span className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">{read.date}</span>
                    </div>
                  </Link>
                )})}
              </div>
            </div>

            {/* Join The Journey Card */}
            <div className="bg-[#1e406f] p-10 rounded-[32px] shadow-2xl relative overflow-hidden group sticky top-32">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-white text-2xl font-bold mb-4">{t('blogDetail.sidebar.joinTitle', "Rejoignez l'aventure")}</h3>
                <p className="text-white/70 text-sm mb-8">
                  {t('blogDetail.sidebar.joinDesc', "Recevez des conseils de voyage exclusifs et des destinations secrètes dans votre boîte de réception.")}
                </p>
                
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder={t('blogDetail.sidebar.emailPlaceholder', "Adresse e-mail")} 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-white placeholder-white/40 text-sm"
                  />
                  <button className="w-full bg-[#0d213f] hover:bg-[#0a1a33] text-white font-bold py-4 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95 text-sm">
                    {t('blogDetail.sidebar.subscribeBtn', "S'abonner")}
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
