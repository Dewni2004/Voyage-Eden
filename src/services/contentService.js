import { supabase } from "../supabase";

const getTableName = (baseName, lang) => {
  const shortLang = lang?.split('-')[0] || 'fr';
  if (shortLang === 'fr') return baseName;
  return `${baseName}_${shortLang}`;
};

// --- REVIEWS ---

export const getReviews = async (lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('reviews', lang))
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching reviews for ${lang}:`, error.message);
    return [];
  }
};

export const addReview = async (reviewData, lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('reviews', lang))
      .insert([reviewData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateReview = async (id, reviewData, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from(getTableName('reviews', lang))
      .update(reviewData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (id, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from(getTableName('reviews', lang))
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// --- ITINERARIES ---
export const getItineraries = async (lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('itineraries', lang))
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error(`Error fetching itineraries for ${lang}:`, e.message);
    return [];
  }
};

export const addItinerary = async (itineraryData, lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('itineraries', lang))
      .insert([itineraryData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding itinerary:", error);
    throw error;
  }
};

export const updateItinerary = async (id, itineraryData, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from(getTableName('itineraries', lang))
      .update(itineraryData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating itinerary:", error);
    throw error;
  }
};

export const deleteItinerary = async (id, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from(getTableName('itineraries', lang))
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    throw error;
  }
};

// --- ARTICLES (TRAVEL GUIDE) ---

export const getArticles = async (lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('articles', lang))
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching articles for ${lang}:`, error.message);
    return [];
  }
};

export const addArticle = async (articleData, lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('articles', lang))
      .insert([articleData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

export const updateArticle = async (id, articleData, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from(getTableName('articles', lang))
      .update(articleData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (id, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from(getTableName('articles', lang))
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
// --- TAGS ---

export const getTags = async (lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('tags', lang))
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching tags for ${lang}:`, error.message);
    return [];
  }
};

// --- CATEGORIES ---

export const getCategories = async (lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching categories for ${lang}:`, error.message);
    return [];
  }
};

export const addCategory = async (categoryData, lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id, lang = 'fr') => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// --- NEWSLETTER ---
export const subscribeToNewsletter = async (email) => {
  try {
    const { error } = await supabase
      .from('newsletter')
      .insert([{ email }]);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};