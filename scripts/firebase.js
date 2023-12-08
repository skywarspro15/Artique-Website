// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCmZK1NfPE74HWfHVyZEL-SsHWGH-g7bQ",
  authDomain: "melodies-of-the-heart.firebaseapp.com",
  projectId: "melodies-of-the-heart",
  storageBucket: "melodies-of-the-heart.appspot.com",
  messagingSenderId: "257177450914",
  appId: "1:257177450914:web:9d5299a527deae8ae8dafb",
  measurementId: "G-4KV4KX2TN9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
