
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAq_LBg1WMe7IxXLbXcPGIXdSI3JdQ4ZwI",
  authDomain: "book-catalog-aac0d.firebaseapp.com",
  projectId: "book-catalog-aac0d",
  storageBucket: "book-catalog-aac0d.appspot.com",
  messagingSenderId: "624106310032",
  appId: "1:624106310032:web:799af912753c313dc4cb15"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);