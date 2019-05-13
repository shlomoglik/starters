import firebase from 'firebase/app'
import 'firebase/firestore'
import auth from 'firebase/auth'
import m from 'mithril'

var _auth = firebase.auth();

function signIn(email, password) {
    return _auth.signInWithEmailAndPassword(email, password);
}

function logout() {
    return _auth.signOut();
}


_auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(token=>{
            console.log('user token is',token);
        })
    } else {
        console.log('user logged out so route to / page');
        m.route.set('/');
    }
})

module.exports = { signIn, logout };

