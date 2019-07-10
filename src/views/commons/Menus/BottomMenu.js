import m from "mithril"

let commands = [
  {
    title: "חדש",
    iconPath: "/img/sprite.svg#icon-plus",
    ref: "/add"
  },
  {
    title: "לטיפול",
    iconPath: "/img/sprite.svg#icon-flow-tree",
    ref: "/myTasks"
  },
  {
    title: "חיפוש",
    iconPath: "/img/sprite.svg#icon-magnifying-glass",
    ref: "/search"
  },
  {
    title: "לידים",
    iconPath: "/img/sprite.svg#icon-layers",
    ref: "/myLeads"
  }
]



let BottomMenu = (init) => {
  return {
    oninit: (vnode) => {
      vnode.state.commands = commands;
    },
    oncreate:(vnode)=>{
      let activePath = m.route.get();
      vnode.state.commands.map(item=>{
        if(activePath===item.ref){
          item.active = true;
        }else{
          item.active = false;
        }
      })
      m.redraw();
    },
    view: (vnode) => {
      return (
        m(".bottomMenu", [
          vnode.state.commands.map(item => {
            return (
              m(".bottomMenu__btn",
                {
                  class: item.active ? "bottomMenu__btn--active" : "",
                  onclick: e => toggleActive(vnode, item)
                },
                [
                  m("svg.bottomMenu__icon", [
                    m('use', { href: item.iconPath })
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

function toggleActive(vnode, item) {
  //step 1 - route to page:
  m.route.set(item.ref);
  
  //step 2 - find who is active and change state:
  vnode.state.commands.map(it => {
    if (it.active) {
      it.active = false;
    }
  });
  
  //step 3 - active current ?? not need because when route its crete it again
  // item.active = true;
}

module.exports = BottomMenu;