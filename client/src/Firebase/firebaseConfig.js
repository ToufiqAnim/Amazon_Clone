import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAVU1kLi-r95TH43cr8HFXKU-jIXZlJVi4",
  authDomain: "e-ecommerce-69bef.firebaseapp.com",
  projectId: "e-ecommerce-69bef",
  storageBucket: "e-ecommerce-69bef.appspot.com",
  messagingSenderId: "356951143411",
  appId: "1:356951143411:web:849edcc09021cebae65886",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseInitialize = () => {
  firebase.initializeApp(firebaseConfig);
};
const db = firebaseApp.firestore;
const auth = firebase.auth();

export { db, auth };
