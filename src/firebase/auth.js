import {auth} from '../firebase/firebaseConfig'


function signIn(email, password) {
    console.log('there is a firebase app?',firebase);
    // console.log('there is a auth?',firebase.auth());
    return auth.signInWithEmailAndPassword(email, password);
}

function logout() {
    firebase.auth.signOut().then(
        ()=>{
            console.log('user is logout');
            console.log(`user is: ${auth.currentUser}`)
            localStorage.removeItem('token');
        },
        err=>console.error(err)
    );
}
function isUserLoggedIn(){
    // console.log('check if user is logged in: ',firebase.auth().currentUser);
    // return firebase.auth().currentUser?true:false;
    let token = sessionStorage.getItem('token');
    console.log('token is found')
    return  token ? true : false;
}


module.exports = { signIn, logout ,isUserLoggedIn};

