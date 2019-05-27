import m from "mithril"
import Leads from '../LeadsPage/Leads'

let Filters = (init) => {
  return {
    view: (vnode) => {
      return (
        m(".filterGroup",[
          vnode.attrs.filters.map(item => {
            return(
                m(".filterGroup__item",
                  {
                    onclick:e=>toggleActive(vnode,item),
                    class:item.active?"filterGroup__item--active":""
                  },
                  [
                    item.title
                ])
            )
          })
        ])
      )
    }
  }
}

function toggleActive(vnode,item){
  // settings.groupTypeFilter.map(it=>{
  //   if(it.active){
  //     it.active =false;
  //   }
  // })
  // item.active = true;
  // vnode.state.active = item.title;
}

module.exports = Filters;