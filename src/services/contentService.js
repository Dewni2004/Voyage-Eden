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
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    if (lang !== 'fr') {
      console.warn(`Fallback to French for reviews due to error:`, error.message);
      return getReviews('fr');
    }
    console.error("Error fetching reviews:", error);
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
    if (lang !== 'fr') {
      console.warn(`Fallback to French for itineraries due to error:`, e.message);
      return getItineraries('fr');
    }
    console.error("Error fetching itineraries: ", e);
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
    if (lang !== 'fr') {
      console.warn(`Fallback to French for articles due to error:`, error.message);
      return getArticles('fr');
    }
    console.error("Error fetching articles:", error);
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
    if ((!data || data.length === 0) && lang !== 'fr') {
      console.warn(`Fallback to French for tags due to empty data.`);
      return getTags('fr');
    }
    return data || [];
  } catch (error) {
    if (lang !== 'fr') {
      console.warn(`Fallback to French for tags due to error:`, error.message);
      return getTags('fr');
    }
    console.error("Error fetching tags:", error);
    return [];
  }
};

// --- CATEGORIES ---

export const getCategories = async (lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('categories', lang))
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    if ((!data || data.length === 0) && lang !== 'fr') {
      console.warn(`Fallback to French for categories due to empty data.`);
      return getCategories('fr');
    }
    return data || [];
  } catch (error) {
    if (lang !== 'fr') {
      console.warn(`Fallback to French for categories due to error:`, error.message);
      return getCategories('fr');
    }
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addCategory = async (categoryData, lang = 'fr') => {
  try {
    const { data, error } = await supabase
      .from(getTableName('categories', lang))
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
      .from(getTableName('categories', lang))
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
      .from(getTableName('categories', lang))
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