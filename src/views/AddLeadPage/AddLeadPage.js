import m from "mithril"
import Store from '../../data/Store'
import Header from '../Header/Header'
import Bottom from '../commons/BottomMenu'
import FormContactLead from '../Form/FormContactLead'



module.exports = {
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
          <FormContactLead />
        </main>
        <Bottom />
      </div>
    )
  }
}