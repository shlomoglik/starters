import m from "mithril"
import Store from '../../data/Store'
import settings from '../../data/settings'


import Header from '../Header/Header'
import FiltersBar from '../commons/FiltersBar'
import Bottom from '../commons/BottomMenu'
import ScrollTop from '../commons/ScrollTop'
import Leads from './Leads'


let leadsPage = (init)=>{
  return {
    oninit: (vnode) => {
      vnode.state.data = [];
      setCounter();
    },
    onbeforeupdate: (vnode) => {
      setCounter();
      vnode.state.data = Store.storeLeads;
    },
    view: (vnode) => {
      return (
        <div class="container--myLeads">
          <Header title="הלידים שלי" />
          <FiltersBar/>
          <main class="myLeads" >
            <Leads data={vnode.state.data}/>
          </main>
          <Bottom />
          <ScrollTop/>
        </div>
      )
    }
  }
}

function setCounter(vnode) {
  let allData = Store.storeLeads;  
  if(allData[0]){
    settings.groupTypeFilter.map(item => {
      let groupTitle = item.title;
      let group= allData.filter(it=>{
        if(groupTitle=='כללי')
          return !it.groupType || it.groupType==groupTitle
        return it.groupType == groupTitle;
      });
      item.count = group.length;
    });
  }
}
module.exports = leadsPage;