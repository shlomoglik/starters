import {auth} from '../firebase/firebaseConfig'


function signIn(email, password) { 
    return auth.signInWithEmailAndPassword(email, password);
}

function logout() {
    firebase.auth.signOut().then(
        ()=>{
            localStorage.removeItem('token');
        },
        err=>console.error(err)
    );
}
function isUserLoggedIn(){
    let token = sessionStorage.getItem('token');
    return  token ? true : false;
}


module.exports = { signIn, logout ,isUserLoggedIn};

