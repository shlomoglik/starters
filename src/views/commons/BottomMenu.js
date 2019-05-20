import m from "mithril"

let commands = [
  {
    title:"חדש",
    iconPath:""
  },
  {
    title:"לטיפול",
    active:true,
    iconPath:""
  },
  {
    title:"חיפוש",
    iconPath:""
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
      setClassActive(vnode,event); //when state change set class as active
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
                    item.title,
                    m("span.bottomMenu__icon",item.iconPath)
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
}

function setClassActive(vnode,e){
  let el = e.target;
  vnode.dom.querySelector('.bottomMenu__btn--active').classList.remove('bottomMenu__btn--active')
  el.classList.add('bottomMenu__btn--active');
}

module.exports = BottomMenu;