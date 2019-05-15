import '../src/firebase/firebaseConfig'
const m = require('mithril');
const root = document.body;
import './style.css';

//functions
// m.route.prefix('?')

//Views
import LoginPage from "./views/LoginPage/LoginPage";
import AddLeadPage from "./views/AddLeadPage/AddLeadPage";
import User from "./data/User";


// let isUserLogin = User.email ? true : false;
m.route(root, "/login", {
    "/login": LoginPage,
    "/add": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            console.log(logged);
            if (logged)
                return AddLeadPage
            else m.route.set('/login')
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