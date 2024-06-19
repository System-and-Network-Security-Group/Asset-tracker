import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKa-DKqVH96s8X47Rf0LQTjKxuYDrQzgo",
  authDomain: "asset-tracker-security.firebaseapp.com",
  projectId: "asset-tracker-security",
  storageBucket: "asset-tracker-security.appspot.com",
  messagingSenderId: "599291520636",
  appId: "1:599291520636:web:65ea8ddf0eea8834208bf9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
