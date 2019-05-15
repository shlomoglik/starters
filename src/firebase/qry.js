// import db from '../firebase/firebaseConfig'

//for emmet purpose only - letter you should delete this
import firebase from 'firebase/app'
let db = firebase.firestore()

function getDoc(col, id) {
    let docRef = db.collection(col).doc(id);
    return docRef;
}

/**
 * insertDoc insert new document to specific collection
 * @param {String} col insert collection name to where insert document
 * @param {Object} doc document object to insert
 * @return {Promise} return new Promise with DocoumentReference
 */
function insertDoc(col, doc) {
    let colRef = db.collection(col);
    let prom = colRef.add(doc);
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


