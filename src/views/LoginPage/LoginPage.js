import m from "mithril"
import Header from '../Header/Header'
import User from '../../data/Login'

let LoginPage = {
  oninit:(vnode)=>{
    console.log('initialize login page');
    vnode.state.valid = true;
    User.logoutUser();
  },
  onupdate:(vnode)=>{
    let dom = vnode.dom;
    if(!vnode.state.valid){
      dom.querySelector('.login__form').classList.add("shake");
      return new Promise(function(resolve) {
          vnode.dom.addEventListener("animationend", resolve)
      })
    }
  },
  view: (vnode) => {
    return (
      <div class="login">
        <Header title="התחבר למערכת" />
        <form class="login__form"
        onsubmit={(e) => { login(e,vnode) }} 
        >
          <div class="login__row">
            <input type="email" id="uMail" name="uMail" class="login__input" placeholder="אימייל" required autofocus
            oninput={e=>User.data.email = e.target.value}
            />
            <label for="uMail" class="login__label">שם משתמש</label>
          </div>
          <div class="login__row">
            <input type="password" id="uPass" name="uPass" class="login__input" minLength="4" autocomplete="current-password" placeholder="סיסמא" required
            oninput={e=>User.data.password = e.target.value}
            />
            <label for="uPass" class="login__label">סיסמא</label>
          </div>
          <div class="login__row">
            <button type="submit" class="btn btn--def">שלח</button>
          </div>
        </form>
      </div >
    )
  }
}


function login(e,vnode) {
  e.preventDefault();
  User.loginUser(vnode);
}

module.exports =  LoginPage;