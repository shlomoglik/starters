const m = require('mithril');
const root = document.body;
import './style.css';

//functions
// m.route.prefix('?')

//Views
import LoginPage from "./views/LoginPage/LoginPage";
import AddLeadPage from "./views/AddLeadPage/AddLeadPage";


m.route(root, "/", {
    "/": LoginPage,
    // "/add/:token":AddLeadPage
    "/add": {
        onmatch: function() {
            if(!sessionStorage.getItem('uid')){
                console.log('not find uid')
                m.route.set("/");
            }else{
                return AddLeadPage;
            }
        }
    }
});


