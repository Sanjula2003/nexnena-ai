import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbF9ojMFJvpECBDDIeon9CpOYbdG5Dce0",
  authDomain: "nexnena-ai.firebaseapp.com",
  projectId: "nexnena-ai",
  storageBucket: "nexnena-ai.firebasestorage.app",
  messagingSenderId: "412510814317",
  appId: "1:412510814317:web:e42e46f3a6ffcefd38ff64",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);