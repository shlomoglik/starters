import m from "mithril"

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
  vnode.attrs.filters.map(it=>{
    if(it.title == item.title){
      item.active = true;
    }else{
      it.active = false;
    }
  })
}

module.exports = Filters;