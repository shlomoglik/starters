import m from 'mithril'
import { signIn, logout, isUserLoggedIn } from '../firebase/auth'
import { getDoc } from '../firebase/qry'
import store from './store'


let User = {
    id: "",
    path: "",
    data: {
        email: "",
        name: "",
        phone: ""
    },
    loginUser: (email, pass, vnode) => {
        console.log('start User.loginUser')
        let login = signIn(email, pass); // return Promise
        login.then(
            cred => {
                // console.log('step 1- login success!')
                let docRef = getDoc('users', cred.user.uid);
                let snap = docRef.get();
                snap.then(
                    doc => {
                        // console.log('step 2- search doc!')
                        if (doc.exists) {
                            // console.log('step 3- doc found so get toekt!')
                            cred.user.getIdToken().then(
                                res => {
                                    // console.log('step 4- token is here - put it on local storage!')
                                    localStorage.setItem('token', res);
                                    User.data = doc.data();
                                    User.path = docRef.path;
                                    User.id = docRef.id;
                                    m.route.set("/add");
                                }, err => {
                                    console.error(err)
                            });// https://firebase.google.com/docs/reference/js/firebase.User.html#getidtoken
                        } else {
                            console.log('not find such user so logout!!')
                            logoutUser();
                        }
                    }, err => {
                        console.error(err)
                    }
                );
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
        // m.route.set('/');
    },
    isLoggedIn: () => {
        console.log('start User.isLoggedIn')
        let logged = isUserLoggedIn();
        return logged;
    }
}

module.exports = User;

