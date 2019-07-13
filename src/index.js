import m from 'mithril';
const root = document.body;

import './style.css';

//functions
// m.route.prefix('?')

//Views
import LoginPage from "./views/LoginPage/LoginPage";
import AddLeadPage from "./views/AddLeadPage/AddLeadPage";
import TasksPage from "./views/TasksPage/TasksPage";
import LeadsPage from "./views/LeadsPage/LeadsPage";
import LeadPage from "./views/LeadPage/Lead";
import SearchPage from "./views/SearchPage/SearchPage";
import SettingsPage from "./views/SettingsPage/SettingsPage";
import UserPage from './views/UserPage/UserPage';

//data
import User from "./data/User";
import {getLeads, getContacts, getSettingGroups ,getSourceList   , getAllTasks , getGroupLeadsList , getAllTypeList } from './firebase/qry'

//get all data the user need
getLeads();
getContacts();
getAllTasks();
getSettingGroups();
getSourceList();
getGroupLeadsList();
getAllTypeList();

//routes config
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
    "/myTasks": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return TasksPage
            else m.route.set('/login')
        }
    },
    "/myLeads": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return LeadsPage
            else m.route.set('/login')
        }
    },
    "/myLeads/:id": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return LeadPage
            else m.route.set('/login')
        }
    },
    "/search": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return SearchPage
            else m.route.set('/login')
        }
    },
    "/settings": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return SettingsPage
            else m.route.set('/login')
        }
    },
    "/user": {
        onmatch: () => {
            let logged = User.isLoggedIn();
            if (logged)
                return UserPage
            else m.route.set('/login')
        }
    },
});