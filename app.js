const { Database, aql } = require('arangojs');
const express = require('express');
const bodyParser = require('body-parser');

// Setup express server
const port = process.env.PORT || 9999;
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// START THE SERVER
app.listen(port, function () {
    console.log('connection on port ' + port);
});

// LOGIN POST AND AUTH
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
    // db.useBearerAuth(genereteToken());

    let prom = db.get();
    let auth = {};
    prom.then(
        ok => {
            auth.isAuth = "ok";
            // auth.token = getToken();
            auth.myToken = genereteToken();
        },
        err => {
            // console.log(err);
            auth.isAuth = "not";
        }
    ).then(
        result => {
            console.log(auth.isAuth);
            res.send(auth);
        }
    )
});

function rand() {
    return Math.random().toString(36).substr(2); // remove `0.`
};
function genereteToken() {
    return rand() + rand(); // to make it longer
};

// async function getToken() {
//     try{
//         var token = await db._connection.config.headers.authorization;
//     }catch(e){
//         console.error(e);
//     }
//     token.then(
//         t=>{
//             var len = token.length; //total length of string
//             return token.substr(6, len - 7); //remove Basic and =
//         },
//         err=>console.error(err)
//     )
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
