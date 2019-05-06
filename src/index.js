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
    "/add":AddLeadPage
})

