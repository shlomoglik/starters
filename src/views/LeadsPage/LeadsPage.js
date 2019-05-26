import m from "mithril"
import { getLeads } from '../../firebase/qry'
import Store from '../../data/Store'
import settings from '../../data/settings'


import Header from '../Header/Header'
import FiltersBar from '../commons/FiltersBar'
import Bottom from '../commons/BottomMenu'
import Leads from './Leads'


let leadsPage = (init)=>{
  let topFilters = settings.groupTypeFilter;
  let groupFilter = 'אירועים';
  return {
    oninit: (vnode) => {
      vnode.state.data = [];
      getLeads();
    },
    onbeforeupdate: (vnode) => {
      vnode.state.data = Store.storeLeads;
      function setActive(vnode,e){
        if(e){
          groupFilter= e.target.firstChild.data;
        }
      }
      setActive(vnode,event);
    },
    view: (vnode) => {
      return (
        <div class="container--myLeads">
          <Header title="הלידים שלי" />
          <FiltersBar filters={topFilters} />
          <main class="myLeads" >
            <Leads data={vnode.state.data} groupFilter={groupFilter} />
          </main>
          <Bottom />
        </div>
      )
    }
  }
}

module.exports = leadsPage;