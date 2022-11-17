import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
const firebaseInitialize = () => {
  firebase.initializeApp(firebaseConfig);
};

export default firebaseInitialize;
