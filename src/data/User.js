import m from 'mithril'
import { signIn, logout, isUserLoggedIn } from '../firebase/auth'
import { getDoc } from '../firebase/qry'
import store from './store'

class User {
    constructor(id, data, options) {
        this.uid = id,
        this.data = data;
        this.path = options.path,
        this.token = options.token
    }
    static loginUser(email, pass, vnode){
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
                                token => {
                                    // console.log('step 4- token is here - put it on local storage!')
                                    let user = new User(cred.user.uid  ,  doc.data()  ,  {token:token,path:docRef.path} )
                                    sessionStorage.setItem('User', JSON.stringify(user))
                                    m.route.set("/add");
                                    console.log('this is the User data after appending all', User) // localStorage('users/{currentUID}/email', User.email)
                                }, err => {
                                    console.error(err)
                                });// https://firebase.google.com/docs/reference/js/firebase.User.html#getidtoken
                        } else {
                            console.log('not find such user so logout!!')
                            logOut();
                            m.route.set("/login");
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
    }
    static logOut(){
        console.log('start User.logoutUser')
        logout();
        m.route.set('/login');
    }
    static isLoggedIn(){
        console.log('start User.isLoggedIn')
        let logged = isUserLoggedIn();
        return logged;
    }
    static getUser(data, field){
        let user = JSON.parse(sessionStorage.getItem('User'));
        if (arguments && arguments.length == 1) { // only metedata like id , path etc
            return user.data;
        } else if (arguments && arguments.length == 2) { // only specific field
            return user.field
        } else {
            return user; // all
        }
    }
}


// let User = {
//     token: "",
//     uid: "",
//     path: "",
//     data: {
//         email: "",
//         name: "",
//         phone: ""
//     }
// }

// let UserFunc = {
//     loginUser: (email, pass, vnode) => {
//         console.log('start User.loginUser')
//         let login = signIn(email, pass); // return Promise
//         login.then(
//             cred => {
//                 // console.log('step 1- login success!')
//                 let docRef = getDoc('users', cred.user.uid);
//                 let snap = docRef.get();
//                 snap.then(
//                     doc => {
//                         // console.log('step 2- search doc!')
//                         if (doc.exists) {
//                             // console.log('step 3- doc found so get toekt!')
//                             cred.user.getIdToken().then(
//                                 token => {
//                                     // console.log('step 4- token is here - put it on local storage!')
//                                     User.token = token;
//                                     User.path = docRef.path;
//                                     User.uid = cred.user.uid;
//                                     User.data = doc.data();
//                                     sessionStorage.setItem('User',JSON.stringify(User))
//                                     m.route.set("/add");
//                                     console.log('this is the User data after appending all', User) // localStorage('users/{currentUID}/email', User.email)
//                                 }, err => {
//                                     console.error(err)
//                                 });// https://firebase.google.com/docs/reference/js/firebase.User.html#getidtoken
//                         } else {
//                             console.log('not find such user so logout!!')
//                             logOut();
//                             m.route.set("/login");
//                         }
//                     }, err => {
//                         console.error(err)
//                     }
//                 );
//             },
//             err => {
//                 console.error('error on login', err);
//                 vnode.state.valid = false;
//                 m.redraw();
//             }
//         )
//     },
//     logOut: () => {
//         console.log('start User.logoutUser')
//         logout();
//         m.route.set('/login');
//     },
//     isLoggedIn: () => {
//         console.log('start User.isLoggedIn')
//         let logged = isUserLoggedIn();
//         return logged;
//     },getUser:(data,field)=>{
//         let user = JSON.parse(sessionStorage.getItem('User'));
//         if(arguments && arguments.length ==1){ // only metedata like id , path etc
//             return user.data;
//         }else if(arguments && arguments.length ==2){ // only specific field
//             return user.field
//         }else{
//             return user; // all
//         }
//     }
// }

module.exports = User;

