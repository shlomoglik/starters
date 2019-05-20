import m from "mithril"

let commands = [
  {
    title:"חדש",
    iconPath:"/public/img/sprite.svg#icon-plus",
    ref:"/add"
  },
  {
    title:"לטיפול",
    active:true,
    iconPath:"/public/img/sprite.svg#icon-flow-tree",
    ref:"/myLeads"
  },
  {
    title:"חיפוש",
    iconPath:"/public/img/sprite.svg#icon-magnifying-glass",
    ref:"/search"
  }
]

let BottomMenu = (init) => {
  return {
    oninit: (vnode) => {
      vnode.state.commands = commands;
    },
    oncreate: (vnode) => {
      console.log('Create!')
    },
    onupdate:(vnode)=>{
      // setClassActive(vnode,event); //when state change set class as active
    },
    view: (vnode) => {
      return (
        m(".bottomMenu",[
          vnode.state.commands.map(item => {
            return(
                m(".bottomMenu__btn",
                  {
                    class:item.active?"bottomMenu__btn--active":"",
                    onclick:e=>toggleActive(vnode,item)
                  },
                  [
                    m("svg.bottomMenu__icon",[
                      m('use',{href:item.iconPath})
                    ]),
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
  vnode.state.commands.map(it=>{
    if(it.active){
      it.active =false;
    }
  })
  item.active = true;
  m.route.set(item.ref);
}

module.exports = BottomMenu;