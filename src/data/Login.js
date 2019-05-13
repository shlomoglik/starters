import m from 'mithril'
import { signIn, logout } from '../firebase/auth'
import {getDoc} from '../firebase/qry'
import store from './store'
import LoginPage from '../views/LoginPage/LoginPage'

let User = {
    data: {
        email: "",
        password: "",
        name: "",
        phone: ""
    },
    loginUser: () => {
        console.log('start User.loginUser')
        let login = signIn(User.data.email, User.data.password); // return Promise
        login.then(
            cred => {
                m.route.set("/add");
                console.log('TODO: append data to User model - get from db',cred.user.uid);
                var user = getDoc(cred.user.uid);
                console.log(user)
                User._user = cred.user;
            },
            err => console.error('error on login', err)
        )
    },
    logoutUser: () => {
        console.log('start User.logoutUser')
        logout();
    }
}

module.exports = User;

