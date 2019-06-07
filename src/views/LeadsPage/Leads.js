import m from "mithril"
import settings from '../../data/settings'
import LeadRow from './LeadRow'

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
                m(LeadRow, { lead: lead })
              )
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