import User from '../data/User'
import store from '../data/store'
import settings from '../data/settings'
import m from 'mithril'
import { db } from '../firebase/firebaseConfig'


// let db = firebase.firestore();

/**
 * getDoc get a document from specific collection
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find
 * @return {Promise} return new Promise with DocoumentReference
 */
function getDoc(col, id) {
    let docRef = db.collection(col).doc(id);
    return docRef.get();
}
/**
 * insertDoc insert new document to specific collection
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find
 * @param {String} field the field to update value
 * @return {Promise} return new Promise with DocoumentReference
 */
function updateMapInDoc(col, id, fieldRef, value) {
    console.log(id);
    let docRef = db.collection(col).doc(id);
    docRef.get().then(
        doc => {
            if (doc.exists) {
                let newField = doc.data()[fieldRef];
                newField.push(value);
                docRef.update(fieldRef, newField);
            } else {
                console.log('doc not exist')
            }
        }
    ).catch(err => console.error(err));
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

/**
 * 
 * @param {String | Query} qry collection to listen on data changes (ex: let col = db.collection(col)) or query object reference that build with where clause (ex: let col = db.collection(col).where(...))
 * @param {Object} target Object reference to fill data on snap collection
 * @param {String} property property of target object to fill data on snap collection
 */
function snapCollection_(qry, target, property) {
    qry.onSnapshot(
        snap => {
            let res = [];
            snap.forEach(doc => {
                res.push(Object.assign(doc.data(), { id: doc.id }))
            })
            console.log('listen on collection:', qry.path, 'snap size = ', snap.size, 'result data is: ', res)
            target[property] = res;
            m.redraw();
        }
    )
}

/**
 * getLeads get all leads assign to user as main role
 * @param {String} [groupType] optinal: add group to qry by
 */
function getLeads(groupType) {
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
    //     qry.where('groupType', '==', groupType); // AND claues
    // }
    snapCollection_(qry, store, 'storeLeads');
}

function getContacts() {
    let colRef = db.collection('contacts');
    snapCollection_(colRef, store, 'storeContacts');
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
function getSourceList() {
    let colRef = db.collection('setLeadSource');
    snapCollection_(colRef, settings, 'leadSourceList');
}
function getTypeList() {
    let colRef = db.collection('setLeadType');
    snapCollection_(colRef, settings, 'leadTypeList');
}


module.exports = {
    getDoc,
    updateMapInDoc,
    insertDoc,
    deleteDoc,
    getLeads,
    getContacts,
    getSettingGroups,
    getSourceList,
    getTypeList,
};


