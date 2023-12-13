// Firebase for LoreDROP

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCAIw9EArk11FX3xNRWXnSHIbq5XtHgw0",
  authDomain: "lore-drop.firebaseapp.com",
  projectId: "lore-drop",
  storageBucket: "lore-drop.appspot.com",
  messagingSenderId: "561620604105",
  appId: "1:561620604105:web:d2658c5400f32fee7d6918",
  measurementId: "G-MPX3JWR33B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "stories"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
});
