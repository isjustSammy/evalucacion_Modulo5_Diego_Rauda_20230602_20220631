import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // hola

// Tu configuración (ya está bien)
const firebaseConfig = {
 
  apiKey: "AIzaSyCVeJIWBNYiDc3iRFtZ0b7bbcfHJ9WJHEo",
 
  authDomain: "actividad-evaluadad-2a.firebaseapp.com",
 
  projectId: "actividad-evaluadad-2a",
 
  storageBucket: "actividad-evaluadad-2a.firebasestorage.app",
 
  messagingSenderId: "458499734621",
 
  appId: "1:458499734621:web:ce519b3410dd1fb4b5e1b4"
 
};
 


 
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); 

export { database, storage, auth };
