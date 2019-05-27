import m from "mithril"
import Store from '../../data/Store'
import Header from '../Header/Header'
import Bottom from '../commons/BottomMenu'
import FormContactLead from '../Form/FormContactLead.1'

let filtersInline = [
  {active:true,title:'איש קשר חדש'},
  {title:'איש קשר קיים'},
];

let formDataContact = {
  "meta":{heading:'פרטי איש קשר',class:'Contact'},
  "data":{
    "name":{
      "input":{type:"text",name:"name",placeholder:"שם",required:true},
      "label":{text:"שם איש קשר"}
    },
    "phone":{
      "input":{type:"tel",name:"phone",placeholder:"אימייל",pattern:"[0-9]{3}-[0-9]{7}"},
      "label":{text:"טלפון איש קשר (xxx-xxxxxxx)"}
    },
    "email":{
      "input":{type:"email",name:"email",placeholder:"אימייל"},
      "label":{text:"אימייל איש קשר"}
    },
  }
}

let formDataLead = {
  "meta":{heading:'פרטי פנייה',class:'Lead'},
  "data":{
    "type":{
      "input":{type:"text",name:"type",placeholder:"סוג פנייה",required:true},
      "label":{text:"סוג פנייה"}
    },
    "source":{
      "input":{type:"text",name:"phone",placeholder:"מקור הגעה"},
      "label":{text:"טלפון איש קשר (xxx-xxxxxxx)"}
    },
    "duedate":{
      "input":{type:"date",name:"duedate",placeholder:"תאריך יעד"},
      "label":{text:"תאריך יעד"}
    },
    "description":{
      "textarea":{name:"description",placeholder:"תיאור והערות",required:true},
    },
  }
}



let AddLeadPage = (init)=>{
  return {
    oncreate:(vnode)=>{
      let main =vnode.dom.querySelector('main');
      main.classList.add("fade-in");
      return new Promise((resolve,reject)=> {
          vnode.dom.addEventListener("animationend", ()=>{
            main.classList.remove("fade-in");
            // resolve; 
          })
      })
    },
    view: (vnode) => {
      return (
        <div class="container--addLead">
          <Header title="פנייה חדשה" />
          <main class="addLead">
            <FormContactLead parent={vnode} formDataContact={formDataContact} formDataLead={formDataLead} />
          </main>
          <Bottom />
        </div>
      )
    }
  }
}

module.exports = AddLeadPage;