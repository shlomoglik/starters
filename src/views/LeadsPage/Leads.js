import m from "mithril"
import settings from '../../data/settings'

let Leads = (init) => {
  return {
    oncreate: (vnode) => {
    },
    onbeforeupdate: (vnode) => {
      setActiveState(vnode);
    },
    view: (vnode) => {
      let leadsData = filterMyLeads(vnode);
      if (!leadsData[0]) {
        return m('.leads.leads--empty', { "data-empty": "כל הכבוד אין לידים פתוחים" })
      } else {
        return (
          m(".leads", [
            m('.leads__heading', [
              m(".leads__cell", "ליד"),
              m(".leads__cell", "תיאור"),
              m(".leads__cell", "פולואפ")
            ]),

            leadsData.map(lead => {
              return (
                m(LeadRow,{lead:lead})
            )

              // let follow = 'היום'
              // if (item.followDate) {
              //   follow = item.followDate.toDate().getDay() + '/' + item.followDate.toDate().getMonth() + '/' + item.followDate.toDate().getFullYear();
              //   let dist = (new Date().setTime(0) - item.followDate.toDate().setTime(0));
              //   if (dist == 0) {
              //     follow = 'היום'
              //   }
              // };
              // let lead = { id: item.id, name: item.name, type: item.type, description: item.description, follow: follow };
              // return m(Lead, lead);
              // // return (
              // //   m(".leads__row", { id: item.id }, [
              // //     m(".leads__cell.leads__title", [
              // //       m("span.leads__name", item.name),
              // //       m("span.leads__type", item.type)
              // //     ]),
              // //     m(".leads__cell.leads__desc", item.description),
              // //     m(".leads__cell.leads__follow", follow)
              // //   ])
              // // )
            })
          ])
        )
      }


    }
  }
}

function filterMyLeads(vnode) {
  let result = vnode.attrs.data || [];
  result = result.filter(item => {
    if (vnode.state.active == 'כללי') {
      return !item.groupType || item.groupType == vnode.state.active
    } else {
      return item.groupType && item.groupType == vnode.state.active
    }
  });
  return result;
}

function setActiveState(vnode) {
  settings.groupTypeFilter.map(item => {
    if (item.active) {
      vnode.state.active = item.title;
    }
  });
}

module.exports = Leads;