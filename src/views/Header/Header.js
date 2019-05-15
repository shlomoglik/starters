import m from "mithril"
import Menu from '../Menu/Menu'
import User from '../../data/User'


module.exports = {
  oninit: (vnode) => {
    console.log(`header component is init and the attrs passed are: ${JSON.stringify(vnode.attrs)}`);
  },
  view: (vnode) => {
    return (
      <div class="header">
        <Menu />
        <div class="header__title">
          {vnode.attrs.title}
        </div>
        <div class="header__signOut">
          <button onclick={User.logoutUser()}>signOut</button>
        </div>
        <div class="header__logo-box">
          <img src="img/logo.png" alt="logo image" class="header__logo" />
        </div>
      </div>
    )
  }
}