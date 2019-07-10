import m from "mithril"
import Header from '../commons/Header/Header'
import User from '../../data/User'


let LoginPage = {
  oninit:(vnode)=>{
    console.log('initialize login page');
    vnode.state.valid = true;
  },
  onupdate:(vnode)=>{
    if(!vnode.state.valid){
      let ref = vnode.dom.querySelector('.login__form')
      ref.classList.add("shake");
      return new Promise((resolve,reject)=> {
          vnode.dom.addEventListener("animationend", ()=>{
            ref.classList.remove("shake");
            resolve;
          })
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
            // oninput={e=>User.data.email = e.target.value}
            />
            <label for="uMail" class="login__label">שם משתמש</label>
          </div>
          <div class="login__row">
            <input type="password" id="uPass" name="uPass" class="login__input" minLength="4" autocomplete="current-password" placeholder="סיסמא" required
            // oninput={e=>User.data.password = e.target.value}
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
  let form = e.target.elements;
  let email = form.uMail.value;
  let password = form.uPass.value;
  User.loginUser(email,password,vnode);
}

module.exports =  LoginPage;