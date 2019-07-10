import m from 'mithril'
import Header from '../commons/Header/Header'
import Bottom from '../commons/Menus/BottomMenu'
import store from '../../data/store'
import settings from '../../data/settings'

const SearchPage = (init)=>{
  return {
    oninit: vnode =>{
      window.scrollTo(0, document.body.scrollHeight);
    },
    view: (vnode) => {
      return (
        m('.container--search' , [
          m(Header , {title:"חיפוש"}),
          m('.mySearch',[
            m('form.mySearch__search-box',{onsubmit:e=>startSearch(e,vnode)},[
              m('input[type="search"][class="mySearch__input"]',
                {
                  name:"search",
                  autofocus:true , 
                  placeholder:"חפש איש קשר או ליד"
                }
              ),
              m('svg.mySearch__icon', m('use', { href: '/img/sprite.svg#icon-magnifying-glass' })),
            ]),
            m('.mySearch__results',[
              vnode.state.results ? 
                vnode.state.results.map(res=>{
                  return m('.mySearch__row',{id:res.id},[
                    res.text
                  ])
                })
                :[]
            ])
          ]),
          m(Bottom),
        ])
      )
    }
  }
}

function startSearch(e,vnode){
  e.preventDefault();
  let form = e.target;
  const term = form.elements[0].value;
  let res = [];

  let contactRes = store.storeContacts.filter(contact =>{
    let fields = ["name","email"];
    return getResults(contact ,fields , term);
  }).map(el=>{return {"text":el.name ,"id":el.id} });
 
  let leadsRes = store.storeLeads.filter(lead => {
    let fields = ["description"];
    return getResults(lead ,fields , term);
  }).map(el=>{return {"text":el.description ,"id":el.id} });
  
  console.log(store.storeTasks);
  let tasksRes = store.storeTasks.filter(task => {
    let fields = ["text"];
    return getResults(task ,fields , term);
  }).map(el=>{return {"text":el.text ,"id":el.id} });

  res.push(...contactRes);
  res.push(...leadsRes);
  res.push(...tasksRes);

  vnode.state.results = res;
  form.reset();
  window.scrollTo(0, document.body.scrollHeight);
}
function getResults(obj ,fields , term){
  for(let f in fields){
    let field = fields[f];
    if(obj[field]){
      if (obj[field].indexOf(term.trim()) !== -1){
        return obj;
      }
    }
  }
  return false;
}


module.exports = SearchPage;