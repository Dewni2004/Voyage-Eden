import { supabase } from "../supabase";

// --- REVIEWS ---

export const getReviews = async () => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const addReview = async (reviewData) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .update(reviewData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// --- ITINERARIES ---
export const getItineraries = async () => {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error("Error fetching itineraries: ", e);
    return [];
  }
};

export const addItinerary = async (itineraryData) => {
  try {
    const { data, error } = await supabase
      .from('itineraries')
      .insert([itineraryData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding itinerary:", error);
    throw error;
  }
};

export const updateItinerary = async (id, itineraryData) => {
  try {
    const { error } = await supabase
      .from('itineraries')
      .update(itineraryData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating itinerary:", error);
    throw error;
  }
};

export const deleteItinerary = async (id) => {
  try {
    const { error } = await supabase
      .from('itineraries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    throw error;
  }
};

// --- ARTICLES (TRAVEL GUIDE) ---

export const getArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const addArticle = async (articleData) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select();
    
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const { error } = await supabase
      .from('articles')
      .update(articleData)
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
