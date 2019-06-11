import m from "mithril"
import store from '../../data/store'
import settings from '../../data/settings'
import Header from '../commons/Header/Header'
import FiltersBar from '../commons/FiltersBar'
import Bottom from '../commons/Menus/BottomMenu'
import ScrollTop from '../commons/ScrollTop'
import Leads from './Leads'


let leadsPage = (init)=>{
  return {
    oninit: (vnode) => {
      vnode.state.data = store.storeLeads;
      setCounter();
    },
    onbeforeupdate: (vnode) => {
      setCounter();
      vnode.state.data = store.storeLeads;
    },
    view: (vnode) => {
      return (
        <div class="container--myLeads">
          <Header title="הלידים שלי" />
          <FiltersBar filters={settings.groupTypeFilter}/>
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
  let allData = store.storeLeads;  
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