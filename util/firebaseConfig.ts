// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Din Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBQiU6lje_zLnLI_cDsvMoPC4BRuKwfeII",
  authDomain: "instapost-picture.firebaseapp.com",
  projectId: "instapost-picture",
  storageBucket: "instapost-picture.appspot.com", // korrekt format
  messagingSenderId: "970258554475",
  appId: "1:970258554475:web:c5617933fcc97e0caddb2e",
};

// Initiera Firebase
const app = initializeApp(firebaseConfig);

// Initiera Storage
export const storage = getStorage(app);

export default app;
