
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırması - DEVELOPMENT (geçici hardcode)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCUNupPVu-FxXaJW9jfyZ1PvWJRcp2-tcQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "finopsprojesi-39510656-2ec03.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "finopsprojesi-39510656-2ec03",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "finopsprojesi-39510656-2ec03.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "922068833510",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:922068833510:web:4e0f0b7d8c8b8e8e8e8e8e"
}

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini başlat ve dışa aktar
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase Storage (anti-chaos için)
import { getStorage } from 'firebase/storage';
const storage = getStorage(app);

export { auth, db, storage };
