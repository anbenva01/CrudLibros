// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRkwPze5Z75kqhEgNQFiYoUg0X1y-L2y0",
  authDomain: "crudlibros-dfd21.firebaseapp.com",
  databaseURL: "https://crudlibros-dfd21-default-rtdb.firebaseio.com",
  projectId: "crudlibros-dfd21",
  storageBucket: "crudlibros-dfd21.appspot.com",
  messagingSenderId: "496469763690",
  appId: "1:496469763690:web:a93d0b3e657d4873724c13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}