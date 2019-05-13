import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFAQbuy-jB3z3nr0TlKjk5NWndrPoYBak",
  authDomain: "lead-up-ad9c4.firebaseapp.com",
  databaseURL: "https://lead-up-ad9c4.firebaseio.com",
  projectId: "lead-up-ad9c4",
  storageBucket: "lead-up-ad9c4.appspot.com",
  messagingSenderId: "620824153004",
  appId: "1:620824153004:web:9764cb899bf456ab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = db;

