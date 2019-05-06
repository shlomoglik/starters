const { Database, aql } = require('arangojs');
const express = require('express');
const bodyParser = require('body-parser');

// Setup express server
const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


// db.useBearerAuth(genereteToken());
// function rand(){
//     return Math.random().toString(36).substr(2); // remove `0.`
// };
// function genereteToken() {
//     return rand() + rand(); // to make it longer
// };


function getToken(){
    var token = db._connection.config.headers.authorization;
    var len = token.length; //total length of string
    return token.substr(6,len-7); //remove Basic and =
}

console.log(getToken());


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




// START THE SERVER
app.listen(port, function () {
    console.log('connection on port ' + port);
});