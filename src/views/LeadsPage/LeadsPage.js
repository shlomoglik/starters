import m from "mithril"
import store from '../../data/store'
import Header from '../Header/Header'
import FormContactLead from '../Form/FormContactLead'



module.exports = {
  view: (vnode) => {
    return (
      <div class="container">
        <Header title="הלידים שלי"/>
        <main class="myLeads">
          <FiltersBar/>
        </main>
      </div>
    )
  }
}