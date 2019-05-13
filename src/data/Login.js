import m from 'mithril'
import { signIn, logout } from '../firebase/auth'
import {getDoc} from '../firebase/qry'
import db from '../firebase/firebaseConfig'
import store from './store'

let User = {
    data: {
        email: "",
        name: "",
        phone: ""
    },
    loginUser: (vnode) => {
        console.log('start User.loginUser')
        let login = signIn(User.data.email, User.data.password); // return Promise
        login.then(
            cred => {
                m.route.set("/add");
                var doc = getDoc('users',cred.user.uid);
                console.log('doc return is:',doc);
                if(doc){
                    doc.then(
                        res=>{
                            if(res.exists){
                                console.log('TODO: append data to User model')
                                console.log(res.data());
                            }
                        },err=>{
                            console.error(err)
                        }
                    );
                }
            },
            err => {
                console.error('error on login', err);
                vnode.state.valid = false;
                m.redraw();
            }
        )
    },
    logoutUser: () => {
        console.log('start User.logoutUser')
        logout();
    }
}

module.exports = User;

