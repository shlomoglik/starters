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
    },
    onbeforeupdate: (vnode) => {
      setCounter(vnode);
    },
    view: (vnode) => {
      return (
        m('container--myLeads' , [
          m(Header , {title:"הלידים שלי"}),
          m(FiltersBar , {filters:settings.leadGroupsList}),
          m('main.myLeads',
            m(Leads , {filters:settings.leadGroupsList} )
          ),
          m(Bottom),
          m(ScrollTop)
        ])
      )
    }
  }
}

function setCounter(vnode) {
  let allData = store.storeLeads;  
  if(allData[0]){
    settings.leadGroupsList.map(item => {
      let groupID = item.id;
      let group= allData.filter(it=>{
        // console.log(it.type , groupID)
        if(groupID=='general')
          return !it.type || it.type==groupID
        return it.type == groupID;
      });
      item.count = group.length > 0 ? group.length : false;
    });
  }
}


module.exports = leadsPage;