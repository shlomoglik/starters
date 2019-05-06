const { Database, aql } = require('arangojs');

// ## Const variables for connecting to ArangoDB database
const dbConfig = {
    host: '127.0.0.1',
    port: '8529',
    username: 'shlomoglik',
    password: 'shl13579$',
    database: 'lead-up',
};

const db = new Database({
    url: `http://${dbConfig.host}:${dbConfig.port}`
});
db.useDatabase(`${dbConfig.database}`);

db.useBasicAuth(`${dbConfig.username}`, `${dbConfig.password}`);

const leads = db.collection('leads');
console.log(leads.name)

async function getAllDocs() {
    try {
        const result =
            await
                db.query(aql`
                FOR d IN ${leads}
                RETURN d
            `);
        return result;
    } catch (e) {
        console.error(e);
    }
}
var result = getAllDocs();
result.then(
    data=>data.map(doc=>console.log(doc)),
    e=>console.error(e)
);
