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

// snap data---> fill store leadsData[{},{}]--> 
//TODO!! create it from data controller that implement this from database!!! and assing filter on which the client activates
let leadsData = Store.storeLeads;

// [
//   {
//     id:"asdfafafsasgasdf",
//     name:"שלומי כהן",
//     type:"בת מצווה",
//     group:"אירועים",
//     desc:"אירוע בת מצווה ל150 איש , מאוד רוצים אירוע בחוץ , היו כבר באירוע בחווה",
//     follow:"היום"
//   },{
//     id:"dafgsghsrtyedfh",
//     name:"יעל וגיא",
//     type:"חתונה",
//     group:"אירועים",
//     desc:"רוצים חתונה גדולה מאוד בקיץ",
//     follow:"היום"
//   },{
//     id:"cjartysdfhbsdys",
//     name:"ציונה",
//     type:"מפגש 80",
//     group:"אירועים",
//     desc:"דרך איגוד המפיקים , רוצה הפקה רצינית למפגש 80 שנה לאיגוד החברות",
//     follow:"היום"
//   },{
//     id:"cjartysdfhbsdys",
//     name:"פנסיון לדוגי",
//     type: "פנסיון",
//     group:"פנסיון",
//     desc:"דרך איגוד המפיקים , רוצה הפקה רצינית למפגש 80 שנה לאיגוד החברות",
//     follow:"היום"
//   }
// ]

//TODO: inject group to filter data by
let groupData = "אירועים";


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