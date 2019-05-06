const { Database, aql } = require('arangojs');
const express = require('express');
const bodyParser = require('body-parser');

// Setup express server
const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// START THE SERVER
app.listen(port, function () {
    console.log('connection on port ' + port);
});


app.post('/loginUserApi', (req, res, next) => {
    console.log('start function post login');
    const dbConfig = {
        host: '127.0.0.1',
        port: '8529',
        username: req.body.uName,
        password: req.body.uPass,
        database: 'lead-up',
    };
    const db = new Database({
        url: `http://${dbConfig.host}:${dbConfig.port}`
    });
    db.useDatabase(`${dbConfig.database}`);
    db.useBasicAuth(`${dbConfig.username}`, `${dbConfig.password}`);
    // console.log(db.get());
    // db.useBearerAuth(genereteToken());
    let prom =  db.get();
    let isAuth = {};
    prom.then(
        ok=>isAuth.auth = "ok",
        err=>{
            console.error('err on login = ');
            console.log('should send msg to client');
            isAuth.auth = "not";
        }
    ).then(
        result=>{
            console.log(isAuth);
            res.send(isAuth);
        }
    )
});
    // function rand(){
    //     return Math.random().toString(36).substr(2); // remove `0.`
    // };
    // function genereteToken() {
    //     return rand() + rand(); // to make it longer
    // };

// function getToken() {
//     var token = db._connection.config.headers.authorization;
//     var len = token.length; //total length of string
//     return token.substr(6, len - 7); //remove Basic and =
// }

// console.log(getToken());
// const leads = db.collection('leads');
// console.log(leads.name)

// async function getAllDocs() {
//     try {
//         const result =
//             await
//                 db.query(aql`
//                 FOR d IN ${leads}
//                 RETURN d
//             `);
//         return result;
//     } catch (e) {
//         console.error(e);
//     }
// }
// var result = getAllDocs();
// result.then(
//     data=>data.map(doc=>console.log(doc)),
//     e=>console.error(e)
// );
