// Firebase for Character Chat

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6qAWVMtfFpmuhr2GY0rrjN2LYMbmBoJo",
  authDomain: "character-interaction-engine.firebaseapp.com",
  projectId: "character-interaction-engine",
  storageBucket: "character-interaction-engine.appspot.com",
  messagingSenderId: "758446330757",
  appId: "1:758446330757:web:403990dd02e63b251eaaec",
  measurementId: "G-D7ZXR0P213",
};

const app = initializeApp(firebaseConfig);
