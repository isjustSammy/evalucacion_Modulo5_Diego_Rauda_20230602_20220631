import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // hola

// Tu configuración (ya está bien)
const firebaseConfig = {
  apiKey: "AIzaSyCpXnrGF4ymG0lFxC9EViMSIZAuagnRwnM",
  authDomain: "evaluacion-modulo5-ad644.firebaseapp.com",
  projectId: "evaluacion-modulo5-ad644",
  storageBucket: "evaluacion-modulo5-ad644.appspot.com", 
  messagingSenderId: "301329916514",
  appId: "1:301329916514:web:90e2bdbfbc8f77072d673b"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); 

export { database, storage, auth };
