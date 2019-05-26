import m from "mithril"
import settings from '../../data/settings'

let Leads = (init) => {
  return {
    oninit:(vnode)=>{
      settings.groupTypeFilter.map(item=>{
        console.log(item)
        if(item.active){
          vnode.state.active= item.title;
        }
      });
    },
    view: (vnode) => {
      if (!vnode.attrs.data.length) {
        return m('.leads.leads--empty', { "data-empty": "כל הכבוד אין לידים פתוחים" })
      } else {
        return (
          m(".leads", [
            m('.leads__heading', [
              m(".leads__cell", "ליד"),
              m(".leads__cell", "תיאור"),
              m(".leads__cell", "פולואפ")
            ]),
    
            vnode.attrs.data.map(item => {
              console.log('include only: ',vnode.state.active);
              //exclude not in filters
              if(!item.groupType || vnode.state.active !== item.groupType){
                return;
              }

              let follow = 'היום'
              if (item.followDate) {
                follow = item.followDate.toDate().getDay() + '/' + item.followDate.toDate().getMonth() + '/' + item.followDate.toDate().getFullYear();
                let dist = (new Date().setTime(0) - item.followDate.toDate().setTime(0));
                if (dist == 0) {
                  follow = 'היום'
                }
              };
              return (
                m(".leads__row", { id: item.id }, [
                  m(".leads__cell.leads__title", [
                    m("span.leads__name", item.name),
                    m("span.leads__type", item.type)
                  ]),
                  m(".leads__cell.leads__desc", item.description),
                  m(".leads__cell.leads__follow", follow)
                ])
              )
            })
          ])
        )
      }


    }
  }
}

module.exports = Leads;