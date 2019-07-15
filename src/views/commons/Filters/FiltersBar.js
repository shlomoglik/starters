import m from "mithril"

const Filters = (init) => {
  return {
    onbeforeupdate: vnode => {
      console.log('filters are: ', vnode.attrs.filters);
    },
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
  console.log('triggerd item is: ',item)
  vnode.attrs.filters.forEach((it, ind) => {
    console.log('check == to this item',it)
    if ((it.id && it.id == item.id) || (it.label && it.label == item.label) ) {
      vnode.attrs.filters[ind].active = true;
      return;
    } else {
      vnode.attrs.filters[ind].active = false;
    }
  })
}


module.exports = Filters;