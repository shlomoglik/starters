import m from 'mithril'
import store from '../data/store'
import LoginPage from '../views/LoginPage/LoginPage'

function loginUser(uData) {
    const login = fetch('/loginUserApi', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify(uData)
    })
    login.then(
        prom => prom.json() , err=>console.error(err))
        .then(
            res => {
                if (res.isAuth == 'ok') {
                    let token = res.myToken;
                    store.token = token;
                    store.user = uData;
                    localStorage.setItem("auth-token", token);
                    console.log(store);
                    console.log(localStorage.getItem("auth-token"));
                    m.route.set("/add")
                } else if (res.isAuth == 'not') {
                    alert('please check your login details');
                    console.log(LoginPage.map(item=>console.log(item)));
                }
            }, err => {
                console.error(err);
            }
        )
}

module.exports = { loginUser };

