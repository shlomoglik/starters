import db from '../firebase/firebaseConfig'

function getDoc(col, id) {
    let doc = db.collection(col).doc(id).get();
    return doc || false;
}

module.exports = { getDoc };