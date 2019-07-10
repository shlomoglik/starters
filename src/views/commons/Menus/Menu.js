import m from "mithril"
import Sidebar from './Sidebar'

let Menu = (init) => {
  return {
    oncreate:(vnode)=>{
      // let checkbox = document.querySelector("#navi-toggle");
      // checkbox.addEventListener('change', function() {
      //   if (this.checked) {
      //     console.log('Checkbox is checked..')
      //   } else {
      //     console.log('Checkbox is not checked..')
      //   }
      // });
    },
    view: (vnode) => {
      return (
        <div class="menu">
          <input type="checkbox" class="menu__check" id="navi-toggle"
          />
          <label for="navi-toggle" class="menu__button">
            <span class="menu__icon">&nbsp;</span>
          </label>
          <Sidebar />
        </div>
      )
    }
  }
}
module.exports = Menu;