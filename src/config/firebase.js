
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage' 

const firebaseConfig = {
  apiKey: "AIzaSyAFcZqBzD_cmmd4HX0sHD7PsMfVmG7PicI",
  authDomain: "auth-91cee.firebaseapp.com",
  projectId: "auth-91cee",
  storageBucket: "auth-91cee.appspot.com",
  messagingSenderId: "496140067121",
  appId: "1:496140067121:web:456f4898a4c9d7f7375010",
  measurementId: "G-6FLRRH7Z9L"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider = new GoogleAuthProvider;
export const db= getFirestore(app);
export const storage=getStorage(app);