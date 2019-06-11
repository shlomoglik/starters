import m from "mithril"
import Menu from '../Menus/Menu'
import User from '../../../data/User'


module.exports = {
  oninit: (vnode) => {
  },
  view: (vnode) => {
    return (
      <div class="header">
        <Menu />
        <div class="header__title">
          {vnode.attrs.title}
        </div>
        <div class="header__logo-box">
          <img src="img/logo.png" alt="logo image" class="header__logo" />
        </div>
      </div>
    )
  }
}