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
        m('.sidebar',[
          m('.sidebar__row',[
            m('a.sidebar__link',[m('svg.sidebar__icon',m('use',{href:"/public/img/sprite.svg#icon-login"}))]),
            m('span',"צא מהמערכת")
          ]),
          m('.sidebar__row',[
            m('a.sidebar__link',[m('svg.sidebar__icon',m('use',{href:"/public/img/sprite.svg#icon-user"}))]),
            m('span',"הפרופיל שלי")
          ]),
          m('.sidebar__row',[
            m('a.sidebar__link',[m('svg.sidebar__icon',m('use',{href:"/public/img/sprite.svg#icon-tools"}))]),
            m('span',"צא מהמערכת")
          ]),
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