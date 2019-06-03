import User from '../data/User'
import Store from '../data/Store'
import m from 'mithril'
import { db } from '../firebase/firebaseConfig'


// let db = firebase.firestore();


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

function followChanges(col, id, elem) {
    db.collection(col).doc(id)
        .onSnapshot(function (doc) {
            console.log("Current data: ", doc.data());
            console.log("TODO=> update model on chaghes");
            console.log('current data is: ', elem.data);
        });
}



/**
 * getLeads get all leads assign to user as main role
 * @param {String} [groupType] optinal: add group to qry by
 */
function getLeads(groupType) {
    let leads = [];
    let user = JSON.parse(sessionStorage.getItem('User'));
    if(!user){
        return;
    }
    let userPath = user.path; // User.getUser('path') || 

    let assignMain = {
        assignRef: userPath,
        role: "main"
    };
    let colRef = db.collection('leads');

    let qry;
    qry = colRef.where('assigns', 'array-contains', assignMain);
    // if (groupType) {
    //     qry.where('groupType', '==', groupType);
    // }

    qry.onSnapshot(
        snap => {
            leads = [];
            snap.forEach(doc => {
                leads.push(doc.data())
            })
            console.log('total docs in qry: ', snap.size,'result: ', leads);
            Store.storeLeads = leads;
            m.redraw();
        });
}

function getContacts() {
    let colRef = db.collection('contacts');
    let col = colRef.get();
    col.then(
        res=>{
            let result =[];
            let docs = res.docs;
            docs.map(doc=>{
                let newDoc = Object.assign(doc.data(),{id:doc.id});
                result.push(newDoc);
            })
            Store.storeContacts = result;
            m.redraw();
        }
    )
}


module.exports = { getDoc, insertDoc, followChanges, getLeads, getContacts };


