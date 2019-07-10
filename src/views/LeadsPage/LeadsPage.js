import m from "mithril";
import store from '../../data/store';
import settings from '../../data/settings';
import Header from '../commons/Header/Header';
import FiltersBar from '../commons/Filters/FiltersBar';
import Bottom from '../commons/Menus/BottomMenu';
import ScrollTop from '../commons/ScrollTop';
import Leads from './Leads';


let leadsPage = (init)=>{
  return {
    oninit: (vnode) => {
      window.scrollTo(0,0);
      vnode.state.filters = settings.leadGroupsList;
      setCounter(vnode);
    },
    onbeforeupdate: (vnode) => {
      vnode.state.filters = settings.leadGroupsList;
      setCounter(vnode);
    },
    view: (vnode) => {
      return (
        m('container--myLeads' , [
          m(Header , {title:"הלידים שלי"}),
          m(FiltersBar , {filters:vnode.state.filters}),
          m('main.myLeads',
            m(Leads , {filters:vnode.state.filters} )
          ),
          m(Bottom),
          m(ScrollTop)
        ])
      )
    }
  }
}

function setCounter(vnode ) {
  vnode.state.filters.forEach(group => {
    let filter = store.storeLeads.filter( lead=>{
        let groupID = getTypeGroup(lead.type);
        return group.id == groupID;
      })
    group.count = filter.length
  })
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

// function setDefActive(vnode){
//   console.log('TODO set a defult state to one filter',vnode.state.filters)
//   let defActive = "notAssign";
//   if(vnode.state.filters){
//     vnode.state.filters.forEach(filter=>{
//       if(filter.id ==defActive ){
//         filter.active = true;
//       }
//     })
//   }
// }

module.exports = leadsPage;