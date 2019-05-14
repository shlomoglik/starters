import '../src/firebase/firebaseConfig'
const m = require('mithril');
const root = document.body;
import './style.css';

//functions
// m.route.prefix('?')

//Views
import LoginPage from "./views/LoginPage/LoginPage";
import AddLeadPage from "./views/AddLeadPage/AddLeadPage";
import User from "./data/Login";


// let isUserLogin = User.email ? true : false;
m.route(root, "/", {
    "/": LoginPage,
    "/add": {
        onmatch: () => {
            console.log('check if user log in ? ',User.isLoggedIn)
            if (!User.isLoggedIn) m.route.set('/')
            else return AddLeadPage
        }
    }
});

// function isUserLogin(path,page) { //Routereslover
//     console.log('check if user logged in and route to page')
//     path:{
//         onmatch: {
//             if (User._user) {
//                 return page;
//             } else {
//                 return LoginPage;
//             }
//         }
//     }
// }
// function checkUser(page) {
//     if (User._user) {
//         return page;
//     } else {
//         // m.route.set("/");
//         return LoginPage;
//     }
// }