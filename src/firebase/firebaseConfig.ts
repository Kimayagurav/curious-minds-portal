import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqhU_w-JfSPHxyw1rjkcJPmWugo8tOSvo",
  authDomain: "curious-minds-portal.firebaseapp.com",
  projectId: "curious-minds-portal",
  storageBucket: "curious-minds-portal.firebasestorage.app",
  messagingSenderId: "777767166257",
  appId: "1:777767166257:web:b68fc58d94097975dcd010",
};

export const app = initializeApp(firebaseConfig);