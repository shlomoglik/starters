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
 * insertDoc insert new document to specific collection
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find and delete
 * @param {Object} objToUpdate object thant include field and value to update ex: {name:"john"}
 */
function updateDoc(col, id, objToUpdate) {
    let docRef = db.collection(col).doc(id);
    docRef.get().then(
        doc => {
            if (doc.exists) {
                let merge = { merge: true };
                docRef.set(objToUpdate , merge );
            } else {
                console.log('doc not exist')
            }
        }
    ).catch(err => console.error(err));
}



/**
 * addToMapInDoc update map object in specific doc like-assigns,contacts etc
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find
 * @param {String} fieldRef the fieldRef to update value ex: contacts
 * @param {String} value the newData to add to the map object
 */
function addToMapInDoc(col, id, fieldRef, newData) {
    console.log(id);
    let docRef = db.collection(col).doc(id);
    docRef.get().then(
        doc => {
            if (doc.exists) {
                let updatedField = doc.data()[fieldRef];
                updatedField.push(newData);
                docRef.update(fieldRef, updatedField);
            } else {
                console.log('doc not exist')
            }
        }
    ).catch(err => console.error(err));
}
/**
 * UpdateMapInDoc update map object in specific doc like-assigns,contacts etc
 * @param {String} col collection name to find doc
 * @param {String} id the doc id to find
 * @param {String} fieldRef the field to update value
 * @param {String} newData the newData to replace the map object
 */
function updateMapInDoc(col, id, fieldRef, newData) {
    let docRef = db.collection(col).doc(id);
    docRef.get().then(
        doc => {
            if (doc.exists) {
                docRef.update(fieldRef, newData);
            } else {
                console.log('doc not exist')
            }
        }
    ).catch(err => console.error(err));
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
    let assignMain = {assignRef: userPath , role: "main"};
    let colRef = db.collection('leads');
    let qry;
    qry = colRef.where('assigns', 'array-contains', assignMain);
    // if (groupType) {
    //     qry.where('groupType', '==', groupType); // AND claues
    // }
    snapCollection_(qry, store, 'storeLeads');
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
function getContacts() {
    let colRef = db.collection('contacts');
    snapCollection_(colRef, store, 'storeContacts');
}
function getSourceList() {
    let colRef = db.collection('setLeadSource');
    snapCollection_(colRef, settings, 'leadSourceList');
}
function getTypeList() {
    let colRef = db.collection('setLeadType');
    snapCollection_(colRef, settings, 'leadTypeList');
}

function getFollowUps(leadID , vnode){
    let colRef = db.collection(`leads/${leadID}/followUps`);
    snapCollection_(colRef, vnode.state, 'followUps');
}


module.exports = {
    getDoc,
    insertDoc,
    deleteDoc,
    updateDoc,
    addToMapInDoc,
    updateMapInDoc,
    getLeads,
    getContacts,
    getSettingGroups,
    getSourceList,
    getTypeList,
    getFollowUps,
};


