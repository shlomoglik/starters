import m from 'mithril'
import db from '../firebase/firebaseConfig'
// import _user from '../firebase/auth'
import { signIn, logout } from '../firebase/auth'
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

