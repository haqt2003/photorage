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
  apiKey: "AIzaSyDxlNq4HBvVZLgkl8GIzENGt5fm2vs0Hb8",
  authDomain: "photorage-a22e5.firebaseapp.com",
  projectId: "photorage-a22e5",
  storageBucket: "photorage-a22e5.appspot.com",
  messagingSenderId: "407965560210",
  appId: "1:407965560210:web:0b126d225b49622a6d254b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, ref, uploadBytes, getDownloadURL, listAll };
