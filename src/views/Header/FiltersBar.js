import m from "mithril"
import Menu from '../Menu/Menu'
import User from '../../data/User'


module.exports = {
  oninit: (vnode) => {
    console.log(`header component is init and the attrs passed are: ${JSON.stringify(vnode.attrs)}`);
  },
  view: (vnode) => {
    return (
      <div class="filtersBar">
        פה תבוא שורה של פילטרים
      </div>
    )
  }
}