import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqyAi0RzOYYJzZtu86z6nHB6CfX2xKIjU",
  authDomain: "photorage-4d71c.firebaseapp.com",
  projectId: "photorage-4d71c",
  storageBucket: "photorage-4d71c.appspot.com",
  messagingSenderId: "630359127354",
  appId: "1:630359127354:web:d0d249ed80cb0dd36a0c03",
  measurementId: "G-W0MELGYRM7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, ref, uploadBytes, getDownloadURL, listAll };
