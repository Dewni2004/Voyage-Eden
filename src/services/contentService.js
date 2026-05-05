import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// --- REVIEWS ---

export const getReviews = async () => {
  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const addReview = async (reviewData) => {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...reviewData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    await updateDoc(doc(db, "reviews", id), reviewData);
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  const docRef = doc(db, 'reviews', id);
  await deleteDoc(docRef);
};

// --- ITINERARIES ---
export const getItineraries = async () => {
  try {
    const q = query(collection(db, 'itineraries'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching itineraries: ", e);
    return [];
  }
};

export const addItinerary = async (data) => {
  const docRef = await addDoc(collection(db, 'itineraries'), {
    ...data,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const updateItinerary = async (id, data) => {
  const docRef = doc(db, 'itineraries', id);
  await updateDoc(docRef, data);
};

export const deleteItinerary = async (id) => {
  const docRef = doc(db, 'itineraries', id);
  await deleteDoc(docRef);
};

// --- ARTICLES (TRAVEL GUIDE) ---

export const getArticles = async () => {
  try {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const addArticle = async (articleData) => {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      ...articleData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    await updateDoc(doc(db, "articles", id), articleData);
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    await deleteDoc(doc(db, "articles", id));
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
