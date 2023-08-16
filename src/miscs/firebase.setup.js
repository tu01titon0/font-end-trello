import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1NekwiBCs5Zddl88jG0Eye4h-dZkH9uQ",
  authDomain: "trello-cg.firebaseapp.com",
  projectId: "trello-cg",
  storageBucket: "trello-cg.appspot.com",
  messagingSenderId: "694011430701",
  appId: "1:694011430701:web:47f64ccd1fbbfcffb875a4",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
