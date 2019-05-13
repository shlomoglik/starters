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


m.route(root, "/", {
    "/": LoginPage,
    "/add": {
        onmatch: function() {
            console.log(User._user);
            if (User._user){
                return AddLeadPage;
            }else{
                m.route.set("/");
            }
        }
    }
});


