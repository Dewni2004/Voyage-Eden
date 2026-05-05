import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNwbqGlNKYC6fxBXjvpjrRYYjGeftJCuI",
  authDomain: "eden-travels.firebaseapp.com",
  projectId: "eden-travels",
  storageBucket: "eden-travels.firebasestorage.app",
  messagingSenderId: "188573809532",
  appId: "1:188573809532:web:210b6d16b8f713b360c2f9",
  measurementId: "G-SNX23GW4C5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
