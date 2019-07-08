const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.createStatus = functions.firestore.document('leads/{leadID}').onCreate((doc, context) => {
    console.log('doc has been created should add status collection', doc);
    addStatusCollection(context.params.leadID);
})

function addStatusCollection(leadID) {
    let colRef = db.collection(`leads/${leadID}/status`);
    let defStatus = settings.setLeadStatus;
    let batch = db.batch();
    defStatus.forEach(statusDoc => {
        var newDoc = colRef.doc();
        batch.set(newDoc, statusDoc);
    })
    batch.commit()
        .then(() => console.log('addStatusCollection finished'));
}