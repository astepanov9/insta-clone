import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQJ5UYeH0Kx1hGbOOHIWnxUTe8o4IQJG8',
  authDomain: 'insta-clone-as9.firebaseapp.com',
  projectId: 'insta-clone-as9',
  storageBucket: 'insta-clone-as9.appspot.com',
  messagingSenderId: '7457032934',
  appId: '1:7457032934:web:d3197de41f7f78d6f24927',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
