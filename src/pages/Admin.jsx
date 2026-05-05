import React, { useState, useEffect } from 'react';
import { 
  addReview, addArticle, getReviews, getArticles, updateArticle, deleteArticle, updateReview, deleteReview,
  getItineraries, addItinerary, updateItinerary, deleteItinerary 
} from '../services/contentService';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('articles');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Published content
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [publishedReviews, setPublishedReviews] = useState([]);
  const [publishedItineraries, setPublishedItineraries] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  // Edit mode
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingItineraryId, setEditingItineraryId] = useState(null);

  // Form States
  const [itineraryForm, setItineraryForm] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    duration: '',
    group: 'Private',
    effort: 'Moderate',
    category: 'popular'
  });

  const [itineraryDays, setItineraryDays] = useState([
    { id: 1, location: '', image: '', description: '', highlights: '', accommodation: '', meals: 'Breakfast & Dinner', travel: '', coords: { x: 150, y: 225 } }
  ]);

  const [articleForm, setArticleForm] = useState({
    title: '',
    description: '',
    category: 'History',
    excerpt: '',
    image: '',
    author: 'Eden Travels',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()
  });

  const [contentBlocks, setContentBlocks] = useState([{ type: 'paragraph', text: '' }]);

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    name: '',
    date: '', // Display date (e.g. Feb 2024)
    text: '', // Short snippet
    img: '', // Main hero image
    rating: 5,
    headline: '',
    detailedText: '',
    gallery: ['', '', '', ''], // 4 gallery slots
    tourDetails: {
      date: '',
      travelerType: 'Couple',
      group: 'Private'
    },
    guide: {
      name: 'Hasindu',
      photo: '',
      rating: 5,
      quote: ''
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'eden2024') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password');
    }
  };

  const fetchContent = async () => {
    setContentLoading(true);
    const [articles, reviews, itineraries] = await Promise.all([getArticles(), getReviews(), getItineraries()]);
    setPublishedArticles(articles);
    setPublishedReviews(reviews);
    setPublishedItineraries(itineraries);
    setContentLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchContent();
  }, [isAuthenticated]);

  const resetArticleForm = () => {
    setArticleForm({ title: '', description: '', category: 'History', excerpt: '', image: '', author: 'Eden Travels', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase() });
    setContentBlocks([{ type: 'paragraph', text: '' }]);
    setEditingArticleId(null);
  };

  const resetReviewForm = () => {
    setReviewForm({
      name: '',
      date: '',
      text: '',
      img: '',
      rating: 5,
      headline: '',
      detailedText: '',
      gallery: ['', '', '', ''],
      tourDetails: {
        date: '',
        travelerType: 'Couple',
        group: 'Private'
      },
      guide: {
        name: 'Hasindu',
        photo: '',
        rating: 5,
        quote: ''
      }
    });
    setEditingReviewId(null);
  };

  const resetItineraryForm = () => {
    setItineraryForm({ title: '', description: '', image: '', price: '', duration: '', group: 'Private', effort: 'Moderate', category: 'popular' });
    setItineraryDays([{ id: 1, location: '', image: '', description: '', highlights: '', accommodation: '', meals: 'Breakfast & Dinner', travel: '', coords: { x: 150, y: 225 } }]);
    setEditingItineraryId(null);
  };

  const handleEditArticle = (article) => {
    setArticleForm({
      title: article.title || '',
      description: article.description || '',
      category: article.category || 'History',
      excerpt: article.excerpt || '',
      image: article.image || '',
      author: article.author || 'Eden Travels',
      date: article.date || ''
    });
    setContentBlocks(article.content && article.content.length > 0 ? article.content : [{ type: 'paragraph', text: '' }]);
    setEditingArticleId(article.id);
    setActiveTab('new-article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditReview = (review) => {
    setReviewForm({
      name: review.name || '',
      date: review.date || '',
      text: review.text || '',
      img: review.img || '',
      rating: review.rating || 5,
      headline: review.headline || '',
      detailedText: review.detailedText || '',
      gallery: review.gallery || ['', '', '', ''],
      tourDetails: review.tourDetails || { date: '', travelerType: 'Couple', group: 'Private' },
      guide: review.guide || { name: 'Hasindu', photo: '', rating: 5, quote: '' }
    });
    setEditingReviewId(review.id);
    setActiveTab('new-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditItinerary = (itinerary) => {
    setItineraryForm({
      title: itinerary.title || '',
      description: itinerary.description || '',
      image: itinerary.image || '',
      price: itinerary.price || '',
      duration: itinerary.duration || '',
      group: itinerary.group || 'Private',
      effort: itinerary.effort || 'Moderate',
      category: itinerary.category || 'popular'
    });
    setItineraryDays(itinerary.days || [{ id: 1, location: '', image: '', description: '', highlights: '', accommodation: '', meals: 'Breakfast & Dinner', travel: '', coords: { x: 150, y: 225 } }]);
    setEditingItineraryId(itinerary.id);
    setActiveTab('new-itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteArticle(id);
      setMessage({ type: 'success', text: 'Article deleted!' });
      fetchContent();
    } catch (e) {
      setMessage({ type: 'error', text: `Delete failed: ${e.message}` });
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(id);
      setMessage({ type: 'success', text: 'Review deleted!' });
      fetchContent();
    } catch (e) {
      setMessage({ type: 'error', text: `Delete failed: ${e.message}` });
    }
  };

  const handleDeleteItinerary = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    try {
      await deleteItinerary(id);
      setMessage({ type: 'success', text: 'Itinerary deleted!' });
      fetchContent();
    } catch (e) {
      setMessage({ type: 'error', text: `Delete failed: ${e.message}` });
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...articleForm,
        content: contentBlocks.filter(b => b.text.trim() !== ''),
        tags: articleForm.category ? [`#${articleForm.category.replace(/\s+/g, '')}`] : []
      };
      if (editingArticleId) {
        await updateArticle(editingArticleId, data);
        setMessage({ type: 'success', text: 'Article updated successfully!' });
      } else {
        await addArticle(data);
        setMessage({ type: 'success', text: 'Article published successfully!' });
      }
      resetArticleForm();
      fetchContent();
      setActiveTab('articles');
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: `Failed: ${error.message}` });
    }
    setLoading(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingReviewId) {
        await updateReview(editingReviewId, reviewForm);
        setMessage({ type: 'success', text: 'Review updated successfully!' });
      } else {
        await addReview(reviewForm);
        setMessage({ type: 'success', text: 'Review added successfully!' });
      }
      resetReviewForm();
      fetchContent();
      setActiveTab('reviews');
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: `Failed: ${error.message}` });
    }
    setLoading(false);
  };

  const handleItinerarySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...itineraryForm, days: itineraryDays };
      if (editingItineraryId) {
        await updateItinerary(editingItineraryId, data);
        setMessage({ type: 'success', text: 'Itinerary updated successfully!' });
      } else {
        await addItinerary(data);
        setMessage({ type: 'success', text: 'Itinerary published successfully!' });
      }
      resetItineraryForm();
      fetchContent();
      setActiveTab('itineraries');
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: `Failed: ${error.message}` });
    }
    setLoading(false);
  };

  const addBlock = (type) => setContentBlocks([...contentBlocks, { type, text: '' }]);
  const updateBlock = (index, text) => { const b = [...contentBlocks]; b[index].text = text; setContentBlocks(b); };
  const removeBlock = (index) => setContentBlocks(contentBlocks.filter((_, i) => i !== index));

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-primary text-3xl font-bold font-serif">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-2">Eden Travels Content Manager</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Secret Key</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Enter password..." />
            </div>
            <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all">Login to Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'articles', label: '📄 Articles', count: publishedArticles.length },
    { id: 'reviews', label: '⭐ Reviews', count: publishedReviews.length },
    { id: 'itineraries', label: '🗺️ Itineraries', count: publishedItineraries.length },
    { id: 'new-article', label: editingArticleId ? '✏️ Edit Article' : '+ New Article' },
    { id: 'new-review', label: editingReviewId ? '✏️ Edit Review' : '+ New Review' },
    { id: 'new-itinerary', label: editingItineraryId ? '✏️ Edit Itinerary' : '+ New Itinerary' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* Header */}
      <div className="bg-primary text-white px-8 py-6 flex items-center justify-between shadow-xl">
        <div>
          <h1 className="text-2xl font-bold font-serif">Content Manager</h1>
          <p className="text-white/60 text-sm">Eden Travels Dashboard</p>
        </div>
        <a href="/" className="text-white/70 hover:text-white text-sm font-bold transition-colors">← Back to Site</a>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); if (tab.id === 'new-article' && !editingArticleId) resetArticleForm(); if (tab.id === 'new-review' && !editingReviewId) resetReviewForm(); }}
              className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
            >
              {tab.label}
              {tab.count !== undefined && <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl text-center font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
            <button onClick={() => setMessage({ type: '', text: '' })} className="ml-4 opacity-60 hover:opacity-100">×</button>
          </div>
        )}

        {/* ARTICLES LIST */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-primary text-2xl font-bold">Published Articles</h2>
              <button onClick={() => { resetArticleForm(); setActiveTab('new-article'); }} className="bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all">+ New Article</button>
            </div>
            {contentLoading ? (
              <div className="text-center py-20 text-gray-400 font-bold">Loading...</div>
            ) : publishedArticles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100">
                <p className="text-gray-400 font-bold">No articles yet.</p>
                <button onClick={() => setActiveTab('new-article')} className="mt-4 text-primary font-bold hover:underline">+ Publish your first article</button>
              </div>
            ) : publishedArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex gap-6 items-center hover:shadow-md transition-all">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {article.image && <img src={article.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-luxury uppercase tracking-widest">{article.category}</span>
                  <h3 className="text-primary font-bold text-lg leading-tight truncate">{article.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{article.excerpt}</p>
                  <p className="text-gray-300 text-xs mt-1">{article.date}</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button onClick={() => handleEditArticle(article)} className="bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold px-5 py-2.5 rounded-xl transition-all text-sm">Edit</button>
                  <button onClick={() => handleDeleteArticle(article.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 font-bold px-5 py-2.5 rounded-xl transition-all text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS LIST */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-primary text-2xl font-bold">Published Reviews</h2>
              <button onClick={() => { resetReviewForm(); setActiveTab('new-review'); }} className="bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all">+ New Review</button>
            </div>
            {contentLoading ? (
              <div className="text-center py-20 text-gray-400 font-bold">Loading...</div>
            ) : publishedReviews.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100">
                <p className="text-gray-400 font-bold">No reviews yet.</p>
                <button onClick={() => setActiveTab('new-review')} className="mt-4 text-primary font-bold hover:underline">+ Add your first review</button>
              </div>
            ) : publishedReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex gap-6 items-center hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                  {review.img && <img src={review.img} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex text-yellow-400 gap-0.5 mb-1">{'★'.repeat(review.rating || 5)}</div>
                  <h3 className="text-primary font-bold">{review.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{review.text}</p>
                  <p className="text-gray-300 text-xs mt-1">Tour: {review.date}</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button onClick={() => handleEditReview(review)} className="bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold px-5 py-2.5 rounded-xl transition-all text-sm">Edit</button>
                  <button onClick={() => handleDeleteReview(review.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 font-bold px-5 py-2.5 rounded-xl transition-all text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ITINERARIES LIST */}
        {activeTab === 'itineraries' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-primary text-2xl font-bold">Published Itineraries</h2>
              <button onClick={() => { resetItineraryForm(); setActiveTab('new-itinerary'); }} className="bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all">+ New Itinerary</button>
            </div>
            {contentLoading ? (
              <div className="text-center py-20 text-gray-400 font-bold">Loading...</div>
            ) : publishedItineraries.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100">
                <p className="text-gray-400 font-bold">No itineraries yet.</p>
                <button onClick={() => setActiveTab('new-itinerary')} className="mt-4 text-primary font-bold hover:underline">+ Create your first itinerary</button>
              </div>
            ) : publishedItineraries.map((itinerary) => (
              <div key={itinerary.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex gap-6 items-center hover:shadow-md transition-all">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {itinerary.image && <img src={itinerary.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-luxury uppercase tracking-widest">{itinerary.category}</span>
                  <h3 className="text-primary font-bold text-lg leading-tight truncate">{itinerary.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{itinerary.description}</p>
                  <p className="text-gray-300 text-xs mt-1">{itinerary.duration} • {itinerary.price} EUR</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button onClick={() => handleEditItinerary(itinerary)} className="bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold px-5 py-2.5 rounded-xl transition-all text-sm">Edit</button>
                  <button onClick={() => handleDeleteItinerary(itinerary.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 font-bold px-5 py-2.5 rounded-xl transition-all text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NEW / EDIT ARTICLE FORM */}
        {activeTab === 'new-article' && (
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-primary text-2xl font-bold">{editingArticleId ? 'Edit Article' : 'New Article'}</h2>
              {editingArticleId && <button type="button" onClick={resetArticleForm} className="text-gray-400 text-sm hover:text-gray-600">× Cancel Edit</button>}
            </div>
            <form onSubmit={handleArticleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Main Title</label>
                <input type="text" required value={articleForm.title} onChange={(e) => setArticleForm({...articleForm, title: e.target.value})} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Hero Description</label>
                <input type="text" required value={articleForm.description} onChange={(e) => setArticleForm({...articleForm, description: e.target.value})} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Category</label>
                  <select value={articleForm.category} onChange={(e) => setArticleForm({...articleForm, category: e.target.value})} className={inputClass}>
                    <option>History</option><option>Nature</option><option>Culture</option><option>Adventure</option><option>Luxury</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Cover Image URL</label>
                  <input type="text" required value={articleForm.image} onChange={(e) => setArticleForm({...articleForm, image: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Short Excerpt (Card Preview)</label>
                <input type="text" required value={articleForm.excerpt} onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})} className={inputClass} />
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h3 className="text-primary font-bold text-xl">Article Content</h3>
                {contentBlocks.map((block, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-3xl relative group">
                    <button type="button" onClick={() => removeBlock(index)} className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold">×</button>
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${block.type === 'heading' ? 'bg-primary text-white' : block.type === 'quote' ? 'bg-luxury text-white' : 'bg-gray-200 text-gray-600'}`}>{block.type}</span>
                    <textarea rows={block.type === 'paragraph' ? 4 : 2} value={block.text} onChange={(e) => updateBlock(index, e.target.value)} placeholder={`Enter ${block.type} text...`} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none resize-none focus:ring-2 focus:ring-primary/20"></textarea>
                  </div>
                ))}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button type="button" onClick={() => addBlock('paragraph')} className="bg-gray-100 hover:bg-gray-200 text-primary font-bold px-5 py-2.5 rounded-xl transition-all text-sm">+ Paragraph</button>
                  <button type="button" onClick={() => addBlock('heading')} className="bg-gray-100 hover:bg-gray-200 text-primary font-bold px-5 py-2.5 rounded-xl transition-all text-sm">+ Heading</button>
                  <button type="button" onClick={() => addBlock('quote')} className="bg-gray-100 hover:bg-gray-200 text-primary font-bold px-5 py-2.5 rounded-xl transition-all text-sm">+ Quote</button>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:bg-primary/90 disabled:opacity-70 mt-4">
                {loading ? 'Saving...' : editingArticleId ? '💾 Save Changes' : '🚀 Publish Article'}
              </button>
            </form>
          </div>
        )}

        {/* NEW / EDIT REVIEW FORM */}
        {activeTab === 'new-review' && (
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-primary text-2xl font-bold">{editingReviewId ? 'Edit Review' : 'New Review'}</h2>
              {editingReviewId && <button type="button" onClick={resetReviewForm} className="text-gray-400 text-sm hover:text-gray-600">× Cancel Edit</button>}
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Traveler Name</label>
                  <input type="text" required value={reviewForm.name} onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Tour Month/Year (e.g. Feb 2024)</label>
                  <input type="text" required value={reviewForm.date} onChange={(e) => setReviewForm({...reviewForm, date: e.target.value})} className={inputClass} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Main Hero Photo URL</label>
                  <input type="text" required value={reviewForm.img} onChange={(e) => setReviewForm({...reviewForm, img: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Review Headline (Italicized text)</label>
                  <input type="text" value={reviewForm.headline} onChange={(e) => setReviewForm({...reviewForm, headline: e.target.value})} className={inputClass} placeholder="e.g. This trip far exceeded our expectations." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Short Preview Snippet (For Cards)</label>
                <input type="text" required value={reviewForm.text} onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})} className={inputClass} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Full Detailed Story</label>
                <textarea rows="8" required value={reviewForm.detailedText} onChange={(e) => setReviewForm({...reviewForm, detailedText: e.target.value})} className={`${inputClass} resize-none`} placeholder="Write the full story here..."></textarea>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-primary font-bold text-xl mb-6">Gallery Images (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviewForm.gallery.map((url, i) => (
                    <input key={i} type="text" value={url} onChange={(e) => {
                      const newGallery = [...reviewForm.gallery];
                      newGallery[i] = e.target.value;
                      setReviewForm({...reviewForm, gallery: newGallery});
                    }} className={inputClass} placeholder={`Gallery Image ${i+1} URL`} />
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-primary font-bold text-xl mb-6">Tour Stats</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Specific Date" value={reviewForm.tourDetails.date} onChange={(e) => setReviewForm({...reviewForm, tourDetails: {...reviewForm.tourDetails, date: e.target.value}})} className={inputClass} />
                    <input type="text" placeholder="Traveler Type (e.g. Couple)" value={reviewForm.tourDetails.travelerType} onChange={(e) => setReviewForm({...reviewForm, tourDetails: {...reviewForm.tourDetails, travelerType: e.target.value}})} className={inputClass} />
                    <input type="text" placeholder="Group Type (e.g. Private)" value={reviewForm.tourDetails.group} onChange={(e) => setReviewForm({...reviewForm, tourDetails: {...reviewForm.tourDetails, group: e.target.value}})} className={inputClass} />
                  </div>
                </div>
                <div>
                  <h3 className="text-primary font-bold text-xl mb-6">Guide Profile</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Guide Name" value={reviewForm.guide.name} onChange={(e) => setReviewForm({...reviewForm, guide: {...reviewForm.guide, name: e.target.value}})} className={inputClass} />
                    <input type="text" placeholder="Guide Photo URL" value={reviewForm.guide.photo} onChange={(e) => setReviewForm({...reviewForm, guide: {...reviewForm.guide, photo: e.target.value}})} className={inputClass} />
                    <input type="text" placeholder="Guide's Quote about them" value={reviewForm.guide.quote} onChange={(e) => setReviewForm({...reviewForm, guide: {...reviewForm.guide, quote: e.target.value}})} className={inputClass} />
                  </div>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:bg-primary/90 disabled:opacity-70 mt-4">
                {loading ? 'Saving...' : editingReviewId ? '💾 Save Story' : '⭐ Publish Story'}
              </button>
            </form>
          </div>
        )}

        {/* NEW / EDIT ITINERARY FORM */}
        {activeTab === 'new-itinerary' && (
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-primary text-2xl font-bold">{editingItineraryId ? 'Edit Itinerary' : 'New Itinerary'}</h2>
              {editingItineraryId && <button type="button" onClick={resetItineraryForm} className="text-gray-400 text-sm hover:text-gray-600">× Cancel Edit</button>}
            </div>
            <form onSubmit={handleItinerarySubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Tour Title</label>
                  <input type="text" required value={itineraryForm.title} onChange={(e) => setItineraryForm({...itineraryForm, title: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Category</label>
                  <select value={itineraryForm.category} onChange={(e) => setItineraryForm({...itineraryForm, category: e.target.value})} className={inputClass}>
                    <option value="popular">Popular</option>
                    <option value="adventure">Adventure</option>
                    <option value="family">Family</option>
                    <option value="luxury">Luxury</option>
                    <option value="golf">Golf</option>
                    <option value="surf">Surf & Dive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Short Description</label>
                <textarea rows="3" required value={itineraryForm.description} onChange={(e) => setItineraryForm({...itineraryForm, description: e.target.value})} className={`${inputClass} resize-none`}></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Hero Image URL</label>
                  <input type="text" required value={itineraryForm.image} onChange={(e) => setItineraryForm({...itineraryForm, image: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Starting Price (EUR)</label>
                  <input type="text" required value={itineraryForm.price} onChange={(e) => setItineraryForm({...itineraryForm, price: e.target.value})} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Duration</label>
                  <input type="text" required value={itineraryForm.duration} onChange={(e) => setItineraryForm({...itineraryForm, duration: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Group Type</label>
                  <input type="text" value={itineraryForm.group} onChange={(e) => setItineraryForm({...itineraryForm, group: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Effort Level</label>
                  <input type="text" value={itineraryForm.effort} onChange={(e) => setItineraryForm({...itineraryForm, effort: e.target.value})} className={inputClass} />
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-primary font-bold text-xl">Day-by-Day Plan</h3>
                  <button type="button" onClick={() => setItineraryDays([...itineraryDays, { id: itineraryDays.length + 1, location: '', image: '', description: '', highlights: '', accommodation: '', meals: 'Breakfast & Dinner', travel: '', coords: { x: 150, y: 225 } }])} className="text-primary font-bold text-sm hover:underline">+ Add Day</button>
                </div>
                
                <div className="space-y-10">
                  {itineraryDays.map((day, idx) => (
                    <div key={idx} className="bg-gray-50 p-8 rounded-[32px] relative group border border-gray-100">
                      <div className="absolute -left-3 top-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg">D{day.id}</div>
                      <button type="button" onClick={() => setItineraryDays(itineraryDays.filter((_, i) => i !== idx))} className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Remove Day</button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                          <input type="text" required value={day.location} onChange={e => {
                            const newDays = [...itineraryDays];
                            newDays[idx].location = e.target.value;
                            setItineraryDays(newDays);
                          }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Day Photo URL</label>
                          <input type="text" required value={day.image} onChange={e => {
                            const newDays = [...itineraryDays];
                            newDays[idx].image = e.target.value;
                            setItineraryDays(newDays);
                          }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>

                      <div className="space-y-2 mt-6">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Activity Description</label>
                        <textarea rows="3" required value={day.description} onChange={e => {
                          const newDays = [...itineraryDays];
                          newDays[idx].description = e.target.value;
                          setItineraryDays(newDays);
                        }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20 resize-none"></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Highlights (Comma separated)</label>
                          <input type="text" value={day.highlights} onChange={e => {
                            const newDays = [...itineraryDays];
                            newDays[idx].highlights = e.target.value;
                            setItineraryDays(newDays);
                          }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Accommodation</label>
                          <input type="text" value={day.accommodation} onChange={e => {
                            const newDays = [...itineraryDays];
                            newDays[idx].accommodation = e.target.value;
                            setItineraryDays(newDays);
                          }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Meals</label>
                          <input type="text" value={day.meals} onChange={e => {
                            const newDays = [...itineraryDays];
                            newDays[idx].meals = e.target.value;
                            setItineraryDays(newDays);
                          }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Travel (Dist/Time)</label>
                          <input type="text" value={day.travel} onChange={e => {
                            const newDays = [...itineraryDays];
                            newDays[idx].travel = e.target.value;
                            setItineraryDays(newDays);
                          }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Map Coords (X, Y)</label>
                          <div className="flex gap-2">
                            <input type="number" placeholder="X" value={day.coords.x} onChange={e => {
                              const newDays = [...itineraryDays];
                              newDays[idx].coords.x = parseInt(e.target.value);
                              setItineraryDays(newDays);
                            }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                            <input type="number" placeholder="Y" value={day.coords.y} onChange={e => {
                              const newDays = [...itineraryDays];
                              newDays[idx].coords.y = parseInt(e.target.value);
                              setItineraryDays(newDays);
                            }} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-primary/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button disabled={loading} className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:bg-primary/90 disabled:opacity-70 mt-10">
                {loading ? 'Saving...' : editingItineraryId ? '💾 Save Itinerary' : '🗺️ Publish Itinerary'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
