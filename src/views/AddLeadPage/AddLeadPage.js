import m from "mithril"
import store from '../../data/store'
import Header from '../Header/Header'
import Bottom from '../commons/BottomMenu'
import FormContact from './FormContact'
import FormLead from './FormLead'

let filters = [
  { active: true, title: 'איש קשר חדש', type: 'add' },
  { title: 'איש קשר קיים', type: 'search' },
];

let formDataContact = {
  "meta": { heading: 'הוסף איש קשר', class: 'Contact' },
  "data": {
    "name": {
      "input": { type: "text", name: "name", placeholder: "שם", required: true},
      "label": { text: "שם איש קשר" }
    },
    "phone": {
      "input": { type: "tel", name: "phone", placeholder: "טלפון", pattern: "[0-9]{3}-[0-9]{7}" },
      "label": { text: "טלפון איש קשר (xxx-xxxxxxx)" }
    },
    "email": {
      "input": { type: "email", name: "email", placeholder: "אימייל" },
      "label": { text: "אימייל איש קשר" }
    },
  }
}

let formDataLead = {
  "meta": { heading: 'פרטי פנייה', class: 'Lead' },
  "data": {
    "type": {
      "input": { type: "text", name: "type", placeholder: "סוג פנייה", required: true ,list:"typeList"},
      "label": { text: "סוג פנייה" }
    },
    "source": {
      "input": { type: "text", name: "phone", placeholder: "מקור הגעה" , list:"sourceList" },
      "label": { text: "בחר מקור הגעה של הליד מתוך רשימה" }
    },
    "duedate": {
      "input": { type: "date", name: "duedate", placeholder: "תאריך יעד" },
      "label": { text: "תאריך יעד" }
    },
    "description": {
      "textarea": { name: "description", placeholder: "תיאור והערות", required: true },
    },
  }
}



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
          <FormContact parent={vnode} formData={formDataContact} filters={filters} />
          <FormLead parent={vnode} formData={formDataLead} style={vnode.state.activeContact?'display:block':'display:none'}/>
          <Bottom/>
        </div>
      )
    }
  }
}

module.exports = AddLeadPage;