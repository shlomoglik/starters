import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCFAQbuy-jB3z3nr0TlKjk5NWndrPoYBak",
    authDomain: "lead-up-ad9c4.firebaseapp.com",
    databaseURL: "https://lead-up-ad9c4.firebaseio.com",
    projectId: "lead-up-ad9c4",
    storageBucket: "lead-up-ad9c4.appspot.com",
    messagingSenderId: "620824153004",
    appId: "1:620824153004:web:9764cb899bf456ab"
  };

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

async function getDoc(id){
    if(id){
        let doc = await db.doc(id).data();
        return doc;
    }
}

module.exports = {getDoc};