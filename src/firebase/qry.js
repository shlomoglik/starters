import User from '../data/User'
import store from '../data/store'
import settings from '../data/settings'
import m from 'mithril'
import { db } from '../firebase/firebaseConfig'


// let db = firebase.firestore();

/**
 * insertDoc insert new document to specific collection
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find
 * @return {Promise} return DocoumentReference
 */
function getDoc(col, id) {
    let docRef = db.collection(col).doc(id);
    return docRef.get();
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

/**
 * insertDoc insert new document to specific collection
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find and delete
 */
function deleteDoc(col, id) {
    let docRef = db.collection(col).doc(id);
    docRef.delete().then(d => m.redraw());
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
    if (!user) {
        return;
    }
    let userPath = user.path || ""; // User.getUser('path') || 

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
                leads.push(Object.assign(doc.data(), { id: doc.id }))
            })
            console.log('total docs in qry: ', snap.size, 'result: ', leads);
            store.storeLeads = leads;
            m.redraw();
        });
}

function getContacts() {
    // let colRef = db.collection('contacts');
    // let col = colRef.get();
    // col.then(
    //     res => {
    //         let result = [];
    //         let docs = res.docs;
    //         docs.map(doc => {
    //             let newDoc = Object.assign(doc.data(), { id: doc.id });
    //             result.push(newDoc);
    //         })
    //         store.storeContacts = result;
    //         m.redraw();
    //     }
    // )
    let colRef = db.collection('contacts');
    colRef.onSnapshot(
        snap => {
            let res = [];
            snap.forEach(doc => {
                console.log('total docs in qry: ', snap.size, 'result: ', res);
                res.push(Object.assign(doc.data(), { id: doc.id }))
            })
            store.storeContacts = res;
            m.redraw();
        }
    )
}

function getSettingGroups() {
    settings.setGroup.map(item => {
        if (item.groups) {
            item.groups.map(group => {
                group.data = [];
                let col = group.collection;
                let colRef = db.collection(col);
                colRef.onSnapshot(
                    snap => {
                        let res = [];
                        snap.forEach(doc => {
                            res.push(Object.assign(doc.data(), { id: doc.id }))
                        })
                        group.data = res;
                        m.redraw();
                    }
                )
            })
        }
    })
}


module.exports = { getDoc, insertDoc, deleteDoc, followChanges, getLeads, getContacts, getSettingGroups };


