import m from "mithril"
import Store from '../../data/Store'
import Header from '../Header/Header'
import FormContactLead from '../Form/FormContactLead'



module.exports = {
  view: (vnode) => {
    return (
      <div class="container--addLead">
        <Header title="פנייה חדשה"/>
        <main class="addLead">
          <FormContactLead/>
        </main>
      </div>
    )
  }
}