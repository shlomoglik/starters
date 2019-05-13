import firebase from 'firebase/app'
import 'firebase/firestore'
import auth from 'firebase/auth'
import m from 'mithril'

var _auth = firebase.auth();

function signIn(email, password) {
    return _auth.signInWithEmailAndPassword(email, password);
}

function logout() {
    _auth.signOut().then(
        ()=>{
            console.log('user is logout');
            console.log(`user is: ${_auth.currentUser}`)
        },
        err=>console.error(err)
    );
}

module.exports = { signIn, logout };

