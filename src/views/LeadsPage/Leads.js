import m from "mithril"
import { getLeads } from '../../firebase/qry'
import Store from '../../data/Store'

let Filters = (init) => {
  return {
    oninit: (vnode) => {
      vnode.state.data = [];
      console.log('TODO! get data from store',Store.storeLeads);
      getLeads();
    },
    onbeforeupdate: (vnode) => {
      console.log('UPDATE! data derived from store',Store.storeLeads);
      vnode.state.data = Store.storeLeads;
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
              let follow = item.followDate.toDate().getDay() + '/' + item.followDate.toDate().getMonth() + '/' + item.followDate.toDate().getFullYear();
              let dist = (new Date().setTime(0)-item.followDate.toDate().setTime(0) );
              if(dist ==0){
                follow = 'היום'
              };
              return (
                m(".leads__row", { id: item.id }, [
                  m(".leads__cell.leads__title", [
                    m("span.leads__name", item.name),
                    m("span.leads__type", item.type)
                  ]),
                  m(".leads__cell.leads__desc", item.description),
                  m(".leads__cell.leads__follow",follow)
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