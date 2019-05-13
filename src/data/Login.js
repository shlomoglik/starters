import m from 'mithril'
import db from '../firebase/firebaseConfig'
import _user from '../firebase/auth'
import {signIn} from '../firebase/auth'
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
        var success = signIn(User.data.email , User.data.password);
        // if(success){
        //     sessionStorage.setItem('uid','asdfasdf');
        //     m.route.set("/add");
        // }
    },
    logoutUser: () => {
        console.log('start User.logoutUser')
        console.log(_user);
        // logout();
    }
}

module.exports = User;

