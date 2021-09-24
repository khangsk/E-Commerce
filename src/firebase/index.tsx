import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0pB3sBcGwPH6XrCuhx_9Vp3gExw1wYNY",
  authDomain: "e-commerce-59b80.firebaseapp.com",
  databaseURL: "https://e-commerce-59b80.firebaseio.com",
  projectId: "e-commerce-59b80",
  storageBucket: "e-commerce-59b80.appspot.com",
  messagingSenderId: "857779471728",
  appId: "1:857779471728:web:d5e42cdf06ded57a3bfbb5",
  measurementId: "G-HWQR6RYPG2",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
