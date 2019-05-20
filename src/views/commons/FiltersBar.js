import m from "mithril"

let Filters = (init) => {
  return {
    oninit: (vnode) => {
      vnode.state.filtersData = vnode.attrs.filters;
    },
    oncreate: (vnode) => {
      console.log('Create!')
    },
    onupdate:(vnode)=>{
      // try{  
      //   setClassActive(vnode,event); //when state change set class as active
      // }catch(err){
      //   console.error(err);
      // }
    },
    view: (vnode) => {
      return (
        m(".filterBar",[
          vnode.state.filtersData.map(item => {
            return(
                m(".filterBar__card",
                  {
                    onclick:e=>toggleActive(vnode,item),
                    class:item.active?"filterBar__card--active":""
                  },
                  [
                    item.title,
                    m("span.filterBar__card-counter",
                      {class:item.done?"filterBar__card-counter--done":""},
                      item.done?
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
  vnode.state.filtersData.map(it=>{
    if(it.active){
      it.active =false;
    }
  })
  item.active = true;
}

// function setClassActive(vnode,e){
//   let el = e.target;
//   vnode.dom.querySelector('.filterBar__card--active').classList.remove('filterBar__card--active')
//   el.classList.add('filterBar__card--active');
// }

module.exports = Filters;