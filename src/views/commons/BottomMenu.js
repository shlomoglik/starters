import m from "mithril"

let commands = [
  {
    title: "חדש",
    iconPath: "/public/img/sprite.svg#icon-plus",
    ref: "/add"
  },
  {
    title: "לטיפול",
    iconPath: "/public/img/sprite.svg#icon-flow-tree",
    ref: "/myLeads"
  },
  {
    title: "חיפוש",
    iconPath: "/public/img/sprite.svg#icon-magnifying-glass",
    ref: "/search"
  }
]

let BottomMenu = (init) => {
  return {
    oninit: (vnode) => {
      vnode.state.commands = commands;
    },oncreate:(vnode)=>{
      let activePath = m.route.get();
      console.log(activePath)
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
  
  //step 3 - active current
  item.active = true;
}

module.exports = BottomMenu;