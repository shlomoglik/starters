import m from "mithril"


module.exports = {
  view: (vnode) => {
    return (
      <div class="sidebar">
          <div class="sidebar__row">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use xlink="/public/img/sprite.svg#icon-login"/>
              </svg>
              <span>התחבר למערכת</span>
            </a>
          </div>
          <div class="sidebar__row">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use xlink="/public/img/sprite.svg#icon-login"/>
              </svg>
              <span>התחבר למערכת</span>
            </a>
          </div>
      </div>
    )
  }
}