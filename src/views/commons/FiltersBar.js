import m from "mithril"
import settings from '../../data/settings'
import Leads from '../LeadsPage/Leads'

let Filters = (init) => {
  return {
    oninit:vnode=>{
      vnode.state.filters = vnode.attrs.filters;
    },
    view: (vnode) => {
      return (
        m(".filterBar",[
          vnode.state.filters.map(item => {
            return(
                m(".filterBar__card",
                  {
                    onclick:e=>toggleActive(vnode,item),
                    class:item.active?"filterBar__card--active":""
                  },
                  [
                    item.title,
                    m("span.filterBar__card-counter",
                      {class:item.done||item.count==0?"filterBar__card-counter--done":""},
                      item.done || item.count==0?
                      String.fromCharCode(10003)
                      :[item.count])
                  ])
            )
          })
        ])
      )
    }
  }
}

function toggleActive(vnode,item){
  vnode.state.filters.map(it=>{
    if(it.active){
      it.active =false;
    }
  })
  item.active = true;
}

module.exports = Filters;