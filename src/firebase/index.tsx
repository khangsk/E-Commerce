import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY",
  authDomain: "efootball-e37a5.firebaseapp.com",
  databaseURL: "https://efootball-e37a5-default-rtdb.firebaseio.com",
  projectId: "efootball-e37a5",
  storageBucket: "efootball-e37a5.appspot.com",
  messagingSenderId: "642625662545",
  appId: "1:642625662545:web:6e6f7cccfc905cdf84d270",
  measurementId: "G-VN32M8V4G4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const storage = firebase.storage();

const db = firebase.firestore();

const User = db.collection("User");
const MenuItems = db.collection("MenuItems");
const Categories = db.collection("Categories");
const Products = db.collection("Products");

export { storage, firebase as default, User, MenuItems, Categories, Products };
