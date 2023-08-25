import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEbF8QWzPYb5e83_iNJ8UdxNJZK4MWkdA",
    authDomain: "crud-37e47.firebaseapp.com",
    projectId: "crud-37e47",
    storageBucket: "crud-37e47.appspot.com",
    messagingSenderId: "638920670573",
    appId: "1:638920670573:web:70f01ce783729d81266e64",
    measurementId: "G-396MDV1VF6"
  };


  const app = initializeApp(firebaseConfig);


  export const db = getFirestore(app);