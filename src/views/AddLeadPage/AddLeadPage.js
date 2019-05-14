import m from "mithril"
import store from '../../data/store'
import Header from '../Header/Header'
import FormContact from '../Form/FormContact'
import FormLead from '../Form/FormLead'
import Submit from '../Form/Submit'


module.exports = {
  view: (vnode) => {
    return (
      <div class="container">
        <Header title="הוסף פנייה חדשה"/>
        <main class="addLead">
          <FormContact mode="add" />
          <FormLead mode="add" />
          <Submit />
        </main>
      </div>
    )
  }
}