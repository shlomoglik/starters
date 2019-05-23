// import * as app from '../src/firebase/firebaseConfig';
import m from 'mithril';
const root = document.body;
import './style.css';

//functions
// m.route.prefix('?')

//Views
import LoginPage from "./views/LoginPage/LoginPage";
import AddLeadPage from "./views/AddLeadPage/AddLeadPage";
import LeadsPage from "./views/LeadsPage/LeadsPage";
import SearchPage from "./views/SearchPage/SearchPage";
import User from "./data/User";

m.route(root, "/login", {
    "/login": LoginPage,
    "/add": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return AddLeadPage
            else m.route.set('/login')
        }
    },
    "/myLeads":{
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return LeadsPage
            else m.route.set('/login')
        }
    },
    "/search":{
        onmatch: () => {
            console.log('go to search page')
            let logged = User.isLoggedIn();
            if (logged)
                return SearchPage
            else m.route.set('/login')
        }
    }
});