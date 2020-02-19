import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuPB3pfKYVe9fqnLvZEALDSZSl34Ge-MU",
  authDomain: "react-playlist-23539.firebaseapp.com",
  databaseURL: "https://react-playlist-23539.firebaseio.com",
  projectId: "react-playlist-23539",
  storageBucket: "react-playlist-23539.appspot.com",
  messagingSenderId: "488900027958",
  appId: "1:488900027958:web:1fa9becee127be1b755a97"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
