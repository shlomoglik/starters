import m from 'mithril'

const Sidebar = (init) => {
  return {
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
      return (
        m('.sidebar', [
          m('.sidebar__row', { onclick: e => m.route.set('/') }, [
            m('span.sidebar__label', "צא מהמערכת"),
            m('.sidebar__link', [
              m('svg.sidebar__icon', m('use', { href: "/public/img/sprite.svg#icon-login" })),
            ]),
          ]),
          m('.sidebar__row', { onclick: e => console.log('TODO!!! go to user page') }, [
            m('span.sidebar__label', "הפרופיל שלי"),
            m('.sidebar__link', [
              m('svg.sidebar__icon', m('use', { href: "/public/img/sprite.svg#icon-user" })),
            ]),
          ]),
          m('.sidebar__row', { onclick: e => m.route.set('/settings') }, [
            m('span.sidebar__label', "הגדרות"),
            m('.sidebar__link', [
              m('svg.sidebar__icon', m('use', { href: "/public/img/sprite.svg#icon-tools" })),
            ]),
          ])
        ])
      )
      // return (
      // <div class="sidebar">
      //   <div class="sidebar__row">
      //     <a href="#" class="sidebar__link">
      //       <svg class="sidebar__icon">
      //         <use href="/public/img/sprite.svg#icon-login" />
      //       </svg>
      //       <span>צא מהמערכת</span>
      //     </a>
      //   </div>
      //   <div class="sidebar__row">
      //     <a href="#" class="sidebar__link">
      //       <svg class="sidebar__icon">
      //         <use href="/public/img/sprite.svg#icon-user" />
      //       </svg>
      //       <span>הפרופיל שלי</span>
      //     </a>
      //   </div>
      //   <div class="sidebar__row">
      //     <a class="sidebar__link">
      //       <svg class="sidebar__icon">
      //         <use href="/public/img/sprite.svg#icon-tools" />
      //       </svg>
      //       <span>הגדרות מערכת</span>
      //     </a>
      //   </div>
      // </div>
      // )
    }
  }
}
module.exports = Sidebar;