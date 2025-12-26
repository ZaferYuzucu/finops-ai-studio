
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırması, kullanıcı tarafından sağlanan bilgilerle tamamlandı.
const firebaseConfig = {
  apiKey: "AIzaSyCUNupPVu-FxXaJW9jfyZ1PvWJRcp2-tcQ",
  authDomain: "finops-ai-studio-8576334-ece74.firebaseapp.com",
  projectId: "finops-ai-studio-8576334-ece74",
  storageBucket: "finops-ai-studio-8576334-ece74.appspot.com",
  messagingSenderId: "854112920936",
  appId: "1:854112920936:web:7b1f44d8621aa8144a62dd"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini başlat ve dışa aktar
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
