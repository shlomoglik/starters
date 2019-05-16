import m from 'mithril'
import { signIn, logout, isUserLoggedIn } from '../firebase/auth'
import { getDoc } from '../firebase/qry'
import store from './store'
import Model from '../data/Model'

class User extends Model {
    // ***default constructor**:
    // constructor(...args) {
    //     super(...args);
    //   }
    static loginUser(email, pass, vnode){
        console.log('start User.loginUser')
        let login = signIn(email, pass); // return Promise
        login.then(
            cred => {
                console.log('step 1- login success!')
                let docRef = getDoc('users', cred.user.uid);
                let snap = docRef.get();
                snap.then(
                    doc => {
                        console.log('step 2- search doc!')
                        if (doc.exists) {
                            console.log('step 3- doc found so get toekt!')
                            cred.user.getIdToken().then(
                                token => {
                                    console.log('step 4- token is here - put it on local storage!')
                                    let user = new User(cred.user.uid  ,  doc.data()  ,  {token:token,path:docRef.path} )
                                    sessionStorage.setItem('User', JSON.stringify(user))
                                    sessionStorage.setItem('token', token)
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
        console.log('start User.getUser')
        let user = JSON.parse(sessionStorage.getItem('User'));
        if (arguments && arguments.length == 1) { 
            return user[data]; // only metedata like id , path etc
        } else if (arguments && arguments.length == 2) { 
            return user.data[field] // only specific field
        } else {
            return user; // all
        }
    }
}

module.exports = User;

