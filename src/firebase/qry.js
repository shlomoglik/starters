// import db from '../firebase/firebaseConfig'

//for emmet purpose only - letter you should delete this
import firebase from 'firebase/app'
let db = firebase.firestore()

function getDoc(col, id) {
    let docRef = db.collection(col).doc(id);
    return docRef;
}


function insertDoc(col, doc) {
    let ref = db.collection(col);
    let prom = ref.add(doc);
    return prom;
}

function followChanges(col,id,elem) {
    db.collection(col).doc(id)
        .onSnapshot(function (doc) {
            console.log("Current data: ", doc.data());
            console.log("TODO=> update model on chaghes");
            console.log('current data is: ',elem.data);
        });
}
module.exports = { getDoc, insertDoc , followChanges };