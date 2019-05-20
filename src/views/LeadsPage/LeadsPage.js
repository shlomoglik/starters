import m from "mithril"
import store from '../../data/store'
import Header from '../Header/Header'
import FiltersBar from '../commons/FiltersBar'
import Bottom from '../commons/bottomMenu'
import Leads from './Leads'


//TODO!! create it from data controller that implement this from database!!!
let topFilters = [
  {
    title: "קבוצות",
    active:true,
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


//TODO!! create it from data controller that implement this from database!!! and assing filter on which the client activates
let leadsData = [
  {
    id:"asdfafafsasgasdf",
    name:"שלומי כהן",
    type:"בת מצווה",
    desc:"אירוע בת מצווה ל150 איש , מאוד רוצים אירוע בחוץ , היו כבר באירוע בחווה",
    follow:"היום"
  },{
    id:"dafgsghsrtyedfh",
    name:"יעל וגיא",
    type:"חתונה",
    desc:"רוצים חתונה גדולה מאוד בקיץ",
    follow:"היום"
  },{
    id:"cjartysdfhbsdys",
    name:"ציונה",
    type:"מפגש 80",
    desc:"דרך איגוד המפיקים , רוצה הפקה רצינית למפגש 80 שנה לאיגוד החברות",
    follow:"היום"
  }
]

module.exports = {
  view: (vnode) => {
    return (
      <div class="container--myLeads">
        <Header title="הלידים שלי" />
        <FiltersBar filters={topFilters} />
        <main class="myLeads">
          <Leads data={leadsData}/>
        </main>
        <Bottom />
      </div>
    )
  }
}