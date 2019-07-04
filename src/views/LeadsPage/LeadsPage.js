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
      getFilters(vnode);
      setCounter(vnode);
    },
    onbeforeupdate: (vnode) => {
      getFilters(vnode);
      setCounter(vnode);
    },
    view: (vnode) => {
      return (
        m('container--myLeads' , [
          m(Header , {title:"הלידים שלי"}),
          m(FiltersBar , {filters:vnode.state.filters}),
          m('main.myLeads',
            m(Leads , {data:vnode.attrs.data})
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
    vnode.state.filters.map(item => {
      let groupID = item.id;
      let group= allData.filter(it=>{
        console.log(it.type , groupID)
        if(groupID=='general')
          return !it.type || it.type==groupID
        return it.type == groupID;
      });
      item.count = group.length > 0 ? group.length : false;
    });
  }
}

function getFilters(vnode){
  let filters = [
    { label: "לא הוגדר", count: 0 , id:'notAssign'  ,active:true}
  ];
  settings.leadGroupsList.forEach(item=>{
    filters.push({label:item.label , count:item.count , id:item.id})
  })
  vnode.state.filters = filters;
}
// groupTypeFilter: [
//   { title: "קבוצות", count: 0, active: true  },
//   { title: "אירועים", count: 0 },
//   { title: "חוגים", count: 0 },
//   { title: "כלבייה", count: 0 },
//   { title: "כללי", count: 0 },
// ],


module.exports = leadsPage;