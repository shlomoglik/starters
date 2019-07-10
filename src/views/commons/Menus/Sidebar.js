import m from 'mithril'
import UserPage from '../../UserPage/UserPage'

const Sidebar = (init) => {
  return {
    oninit:vnode=>{
      vnode.state.showUser =false;
    },
    oncreate: (vnode) => {
      let checkbox = document.querySelector("#navi-toggle");
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          vnode.dom.classList.add("sidebar--show");
        } else {
          vnode.dom.classList.remove("sidebar--show");
        }
      });
    },
    view: (vnode) => {
      return [
        m('.sidebar', [
          m('.sidebar__row', { onclick: e => m.route.set('/') }, [
            m('span.sidebar__label', "צא מהמערכת"),
            m('.sidebar__link', [
              m('svg.sidebar__icon', m('use', { href: "/img/sprite.svg#icon-login" })),
            ]),
          ]),
          m('.sidebar__row', { onclick: e => {vnode.state.showUser = true ;m.redraw()} }, [
            m('span.sidebar__label', "הפרופיל שלי"),
            m('.sidebar__link', [
              m('svg.sidebar__icon', m('use', { href: "/img/sprite.svg#icon-user" })),
            ]),
          ]),
          m('.sidebar__row', { onclick: e => m.route.set('/settings') }, [
            m('span.sidebar__label', "הגדרות"),
            m('.sidebar__link', [
              m('svg.sidebar__icon', m('use', { href: "/img/sprite.svg#icon-tools" })),
            ]),
          ])
        ]),

        m(UserPage , {class:`userPageModal ${vnode.state.showUser?'user--show':''}`})
      ]
    }
  }
}
module.exports = Sidebar;