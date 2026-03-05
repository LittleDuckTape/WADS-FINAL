import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPWmRW8j-iFU6sK50Tnnbbwfw7Z9Yt-Ys",
  authDomain: "login-fire-outh.firebaseapp.com",
  projectId: "login-fire-outh",
  storageBucket: "login-fire-outh.firebasestorage.app",
  messagingSenderId: "123948656373",
  appId: "1:123948656373:web:394e4c601bd594871207bc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();