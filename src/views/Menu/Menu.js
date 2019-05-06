import m from "mithril"
// import Sidebar from './Sidebar'

module.exports = {
  view: (vnode) => {
    return (
        <div class="menu">
            <input type="checkbox" class="menu__check" id="navi-toggle"/>
            <label for="navi-toggle" class="menu__button">
                <span class="menu__icon">&nbsp;</span>
            </label>
            {/* <Sidebar/> */}
        </div>
    )
  }
}