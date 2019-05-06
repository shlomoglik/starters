import m from "mithril"
import Header from '../Header/Header'

var loginPage = {
  view: (vnode) => {
    return (
      <div class="login">
        <Header title="התחבר למערכת" />
        <form class="login__form" onsubmit={(e) => { loginUser(e) }} >
          <div class="login__row">
            <input type="text" id="uName" name="uName" class="login__input" minLength="4" placeholder="שם משתמש" required autofocus />
            <label for="uName" class="login__label">שם משתמש</label>
          </div>
          <div class="login__row">
            <input type="password" id="uPass" name="uPass" class="login__input" minLength="4" placeholder="סיסמא" required />
            <label htmlFor="uPass" class="login__label">סיסמא</label>
          </div>
          <div class="login__row">
            <button type="submit" class="btn btn--def">שלח</button>
          </div>
        </form>
      </div >
    )
  }
}

module.exports = loginPage;

function loginUser(e) {
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
  console.log(data);
  let Users = {
    "shlomoglik": "1234",
    "zohar": "1357",
    "ronit": "9753"
  }
  if ( !Users.hasOwnProperty(data.uName) ) {
    return 'userNotExist';
  } else {
    for(let u in Users){
      if(data[u] == u ){}
    }
  }
}
