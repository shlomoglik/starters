import firebase from 'firebase/app'
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
        console.log('user is logged in - uid');
        user.getIdTokenResult().then(id=>{
            console.log(id);
        })
    } else {
        console.log('user logged out so route to / page');
        m.route.set('/');
    }
})

module.exports = { signIn, logout };

