import m from "mithril"
import Header from '../Header/Header'
import User from '../../data/Login'

var LoginPage = {
  oninit:(vnode)=>{
    console.log('initialize login page');
    User.logoutUser();
  },
  view: (vnode) => {
    return (
      <div class="login">
        <Header title="התחבר למערכת" />
        <form class="login__form"
        onsubmit={(e) => { login(e) }} 
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

function login(e) {
  e.preventDefault();
  User.loginUser();
  // TODO => invalid behavior
}

  module.exports = LoginPage;