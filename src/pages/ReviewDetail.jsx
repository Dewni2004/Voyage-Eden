import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getReviews } from '../services/contentService';

const ReviewDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [review, setReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch dynamic reviews from Firestore
      const dynamicData = await getReviews(i18n.language);
      
      // 2. Combine with static reviews
      const combinedData = [...dynamicData];
      setAllReviews(combinedData);
      
      // 3. Find the review (handle both string and number IDs, and generated slugs for backwards compatibility)
      const found = combinedData.find(r => {
        if (r.id.toString() === id.toString()) return true;
        
        // Check generated slug (e.g., from old WordPress URLs)
        const nameSlug = r.name ? r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
        const headlineSlug = r.headline ? r.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
        const titleSlug = r.title ? r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
        
        return id.includes(nameSlug) || id.includes(headlineSlug) || id.includes(titleSlug);
      });
      
      setReview(found);
      setLoading(false);
    };
    fetchData();
  }, [id, i18n.language]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f8fbff] text-primary font-bold">{t('reviewDetail.loading')}</div>;
  if (!review) return <div className="min-h-screen flex items-center justify-center bg-[#f8fbff] text-center px-6"><div><h2 className="text-2xl font-bold text-primary mb-4">{t('reviewDetail.notFound')}</h2><Link to={`/reviews`} className="text-luxury font-bold hover:underline">{t('reviewDetail.backToReviews')}</Link></div></div>;

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* Custom Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src={review.img} alt="" className="absolute inset-0 w-full h-full object-cover" width="1600" height="1200" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6 mt-20">
          <span className="bg-primary text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg">{t('reviewDetail.travelerStory')}</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">{review.name}'s</h1>
          <p className="text-xl md:text-2xl font-medium tracking-wide uppercase opacity-90">{t('reviewDetail.journey')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-start gap-16 relative">
          
          {/* Main Content */}
          <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[40px] shadow-xl border border-gray-100 -mt-32 relative z-20">
            <div className="mb-10 text-center md:text-left">
              <svg className="w-16 h-16 text-primary/10 mb-6 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
              <div className="flex justify-center md:justify-start text-yellow-400 gap-1 mb-6">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h2 className="text-primary text-3xl md:text-4xl font-bold mb-8 leading-tight italic">
                "{review.headline || review.text}"
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap max-w-none">
                {review.detailedText || review.detailedtext || review.text}
              </div>
            </div>

            {review.gallery && review.gallery.filter(img => img).length > 0 && (
              <div className="pt-16 border-t border-gray-100">
                <h3 className="text-primary text-2xl font-bold mb-10">{t('reviewDetail.memories')}</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {review.gallery.filter(img => img).map((img, i) => (
                    <div key={i} className={`rounded-3xl overflow-hidden shadow-lg h-48 md:h-64 ${i === 3 ? 'md:col-span-2' : ''}`}>
                      <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" width="800" height="600" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            {/* About Tour Card */}
            <div className="bg-white p-10 rounded-[40px] shadow-lg border border-gray-100">
              <h3 className="text-primary text-xl font-bold mb-8">{t('reviewDetail.aboutTour')}</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">{t('reviewDetail.date')}</p>
                    <p className="text-primary font-bold">{review.tourdetails?.date || review.tourDetails?.date || review.date}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">{t('reviewDetail.travelerType')}</p>
                    <p className="text-primary font-bold">{review.tourdetails?.travelertype || review.tourDetails?.travelerType || t('reviewDetail.couple')}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">{t('reviewDetail.group')}</p>
                    <p className="text-primary font-bold">{review.tourdetails?.group || review.tourDetails?.group || t('reviewDetail.private')}</p>
                  </div>
                </li>
              </ul>
              <Link to={`/contact`} className="w-full btn-premium-primary py-3.5 rounded-2xl mt-10 text-center block">{t('reviewDetail.planMyTrip')}</Link>
            </div>

            {/* Featured Guide Card */}
            {review.guide?.name && review.guide.name.toLowerCase() !== 'hasindu' && (
              <div className="bg-gray-100 p-8 rounded-[40px] border border-gray-200">
                <h3 className="text-primary text-xl font-bold mb-6">{t('reviewDetail.featuredGuide')}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-md">
                    <img src={review.guide?.photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'} alt="" className="w-full h-full object-cover" loading="lazy" width="400" height="400" />
                  </div>
                  <div>
                    <h4 className="text-primary font-bold">{review.guide?.name || t('reviewDetail.defaultGuideName')}</h4>
                    <div className="flex text-yellow-400 text-[10px]">{'★'.repeat(review.guide?.rating || 5)}</div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">{t('reviewDetail.edenGuide')}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl relative">
                  <svg className="w-6 h-6 text-primary/5 absolute top-4 left-4" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" /></svg>
                  <p className="text-gray-600 text-sm italic leading-relaxed pl-6">
                    {review.guide?.quote ? `"${review.guide.quote}"` : t('reviewDetail.defaultGuideQuote')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* More Stories */}
        <div className="mt-32 pt-16 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <span className="text-luxury text-xs font-bold uppercase tracking-widest mb-2 block text-center md:text-left">{t('reviewDetail.ourGuests')}</span>
              <h2 className="text-primary text-4xl font-bold font-serif text-center md:text-left">{t('reviewDetail.moreStories')}</h2>
            </div>
            <Link to={`/reviews`} className="btn-premium-primary px-8 py-3.5 rounded-2xl flex items-center gap-2 group shadow-sm">
              {t('reviewDetail.viewAll')} 
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allReviews.filter(r => r.id.toString() !== review.id.toString()).slice(0, 3).map((other) => (
              <div key={other.id} className="bg-white p-8 rounded-[40px] shadow-lg flex flex-col hover:shadow-2xl transition-all group h-full">
                <div className="w-full h-48 rounded-3xl overflow-hidden shadow-md mb-6">
                  <img src={other.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width="800" height="600" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex text-yellow-400 text-xs mb-3">{'★'.repeat(other.rating || 5)}</div>
                  <h4 className="text-primary font-bold text-xl mb-2">{other.name}</h4>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 italic flex-1">"{other.text}"</p>
                  <Link to={`/review/${generateSlug(other.name || other.headline || other.title, other.id)}`} className="text-luxury font-bold text-xs uppercase tracking-widest hover:text-primary flex items-center gap-2 group/link">
                    {t('reviewDetail.readFullStory')} 
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
