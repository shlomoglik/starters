import m from "mithril"
import store from '../../data/store'
import settings from '../../data/settings'
import Header from '../Header/Header'
import Bottom from '../commons/BottomMenu'
import FormContact from './FormContact'
import FormLead from './FormLead'



let AddLeadPage = (init) => {
  return {
    oncreate: (vnode) => {
      let forms = vnode.dom.querySelectorAll('form');
      forms.forEach(form=>{
        form.classList.add("fade-in");
        return new Promise((resolve, reject) => {
          vnode.dom.addEventListener("animationend", () => {
            form.classList.remove("fade-in");
            // resolve; 
          })
        })
      });
    },  
    view: (vnode) => {
      return (
        <div class="container--addLead">
          <Header title="פנייה חדשה" />
          <FormContact parent={vnode} formData={settings.formDataContact} filters={settings.filtersAddContact} />
          <FormLead parent={vnode} formData={settings.formDataLead} style={vnode.state.activeContact?'display:block':'display:none'}/>
          <Bottom/>
        </div>
      )
    }
  }
}

module.exports = AddLeadPage;