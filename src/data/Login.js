import m from 'mithril'
import { signIn, logout,isUserLoggedIn } from '../firebase/auth'
import {getDoc} from '../firebase/qry'
import store from './store'

let User = {
    data: {
        email: "",
        name: "",
        phone: ""
    },
    loginUser: (email,pass,vnode) => {
        console.log('start User.loginUser')
        let login = signIn(email, pass); // return Promise
        login.then(
            cred => {
                m.route.set("/add");
                let doc = getDoc('users',cred.user.uid);
                if(doc){
                    doc.then(
                        res=>{
                            if(res.exists){
                                User.data = res.data();
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
    },
    isLoggedIn:()=>{
        let logged = isUserLoggedIn();
        return logged;
    }
}

module.exports = User;

