import m from "mithril"
import settings from '../../data/settings'
import store from '../../data/store'
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
  let result = store.storeLeads.filter(lead => {
    let typeID = lead.type;
    let group = getTypeGroup(typeID);
    if(vnode.state.active){
      return vnode.state.active==group
    }else{
      return group == 'notAssign'
    }
  });
  return result;
}

function setActiveState(vnode) {
  settings.leadGroupsList.map(item => {
    if (item.active) {
      vnode.state.active = item.id;
    }
  });
}

function getTypeGroup(typeID){
  let filter = settings.allLeadTypes.filter(t=>t.id == typeID);
  if(filter.length>0){
    let regex = /setLeadGroup\/([^\/]+)/.exec(filter[0].col);
    let colID = regex[1];
    return colID;
  }else{
    return 'notAssign';
  }
}

module.exports = Leads;