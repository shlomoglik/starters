import m from "mithril"
import Header from '../Header/Header'
import FormContact from '../Form/FormContact'
import FormLead from '../Form/FormLead'



module.exports = {
  view: (vnode) => {
    return (
      <div class="container">
        <Header title="הוסף פנייה חדשה"/>
        <main class="addLead">
          <FormContact />
          <FormLead />
        </main>
      </div>
    )
  }
}