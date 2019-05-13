import firebase from 'firebase/app'
import auth from 'firebase/auth'

var _auth = firebase.auth();

//login
// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;

//     auth.signInWithEmailAndPassword(email, password).then(
//         cred => {
//             console.log(cred.user);
//             const modal = document.querySelector('#modal-login');
//             M.Modal.getInstance(modal).close();
//             loginForm.reset();
//             loginForm.querySelector('.error').innerHTML = '';
//         },
//         err => {
//             console.error(err);
//             loginForm.querySelector('.error').innerHTML = err.message;
//         }
//     )
// });
function signIn(email,password){
    _auth.signInWithEmailAndPassword(email, password).then(
        cred => {
            console.log(cred.user);
            return true;
        },
        err => {
            console.error(err);
        }
    )
}


var _user = _auth.currentUser;


module.exports = [_user,{signIn}];

