import m from "mithril"
import Header from '../Header/Header'
import {loginUser} from '../../functions/login'

var loginPage = {
  invalid:(vnode)=>{
    console.log('start function form invalid!!');
    let inputs = vnode.form.elements;
    console.log(inputs);
    // inputs.map(input=>{console.log('TODO=> clear element',input)});
    // vnode.form.animate( 
    //   {animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
    //   transform: "translate3d(0, 0, 0)"});
  },
  view: (vnode) => {
    return (
      <div class="login">
        <Header title="התחבר למערכת" />
        <form class="login__form" onsubmit={(e) => { login(e) }} >
          <div class="login__row">
            <input type="text" id="uName" name="uName" class="login__input" minLength="4" placeholder="שם משתמש" required autofocus />
            <label for="uName" class="login__label">שם משתמש</label>
          </div>
          <div class="login__row">
            <input type="password" id="uPass" name="uPass" class="login__input" minLength="4" placeholder="סיסמא" required />
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
  let form = e.target;
  let elements = form.elements;
  let data = {};
  for (var el in elements) {
    let elem = elements[el]
    if (elem.value) {
      let key = elem.name;
      let val = elem.value;
      data[key] = val;
    }
  }
  loginUser(data);
  // console.log('test shake form ',loginPage.invalid);
}

  module.exports = loginPage;