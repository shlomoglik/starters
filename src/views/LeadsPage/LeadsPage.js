import m from "mithril"
import Store from '../../data/Store'
import Header from '../Header/Header'
import FiltersBar from '../commons/FiltersBar'
import Bottom from '../commons/BottomMenu'
import Leads from './Leads'


//TODO!! create it from data controller that implement this from database!!!
let topFilters = [
  {
    title: "קבוצות",
    active: true,
    done: false,
    count: 2
  },
  {
    title: "אירועים",
    done: false,
    count: 2
  },
  {
    title: "חוגים",
    done: true,
    count: 2
  },
  {
    title: "כלבייה",
    done: true,
    count: 4
  }
]


module.exports = {
  view: (vnode) => {
    return (
      <div class="container--myLeads">
        <Header title="הלידים שלי" />
        <FiltersBar filters={topFilters} />
        <main class="myLeads">
          <Leads />
        </main>
        <Bottom />
      </div>
    )
  }
}