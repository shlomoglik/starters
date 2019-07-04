import m from "mithril"

let Filters = (init) => {
  return {
    view: (vnode) => {
      return (
        m(".filterBar", [
          vnode.attrs.filters.map(item => {
            return (
              m(".filterBar__card",
                {
                  onclick: e => toggleActive(vnode, item),
                  class: item.active ? "filterBar__card--active" : ""
                },
                [
                  item.label,
                  m("span.filterBar__card-counter",
                    { class: item.done || item.count == 0 ? "filterBar__card-counter--done" : "" },
                    item.done || item.count == 0 ?
                      String.fromCharCode(10003)
                      : [item.count])
                ])
            )
          })
        ])
      )
    }
  }
}

function toggleActive(vnode, item) {
  vnode.attrs.filters.forEach((it,ind) => {
    switch (true){
      case (it.id == item.id):
        return vnode.attrs.filters[ind].active = true;
      default :
      vnode.attrs.filters[ind].active = false;
    }
  })
}



module.exports = Filters;