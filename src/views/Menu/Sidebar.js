import m from "mithril"
import { pathToFileURL } from "url";

let Sidebar = (init) => {
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
        <div class="sidebar">
          <div class="sidebar__row">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="/public/img/sprite.svg#icon-login" />
              </svg>
              <span>צא מהמערכת</span>
            </a>
          </div>
          <div class="sidebar__row">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="/public/img/sprite.svg#icon-user" />
              </svg>
              <span>הפרופיל שלי</span>
            </a>
          </div>
        </div>
      )
    }
  }
}
module.exports = Sidebar;