import m from "mithril"

let Filters = (init) => {
  return {
    oninit: (vnode) => {
      vnode.state.data = vnode.attrs.data;
    },
    oncreate: (vnode) => {
      console.log('Create!')
    },
    onupdate: (vnode) => {
    },
    view: (vnode) => {
      if(!vnode.state.data.length){
        return m('.leads.leads--empty',{"data-empty": "כל הכבוד אין לידים פתוחים" })
      }else{
        return (
          m(".leads", [
            m('.leads__heading', [
              m(".leads__cell", "ליד"),
              m(".leads__cell", "תיאור"),
              m(".leads__cell", "פולואפ")
            ]),
            vnode.state.data.map(item => {
              return (
                m(".leads__row", { id: item.id }, [
                  m(".leads__cell.leads__title", [
                    m("span.leads__name", item.name),
                    m("span.leads__type", item.type)
                  ]),
                  m(".leads__cell.leads__desc", item.desc),
                  m(".leads__cell", item.follow)
                ])
              )
            })
          ])
        )
      }
    }
  }
}

function toggleActive(vnode, item) {
  vnode.state.filtersData.map(it => {
    if (it.active) {
      it.active = false;
    }
  })
  item.active = true;
}

module.exports = Filters;