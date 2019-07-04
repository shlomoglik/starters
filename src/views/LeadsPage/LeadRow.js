import m from "mithril"
import store from '../../data/store'
import settings from '../../data/settings'
import {dateDiffDays} from '../../js/utils'

let LeadRow = (init) => {
    return {
        view: (vnode) => {
            let lead = vnode.attrs.lead ;
            let follow ='לא הוגדר';
            console.log(follow)
            if (lead.followDate) {
                // follow = lead.followDate.toDate().getDate() + '/' + Number(lead.followDate.toDate().getMonth()+1) + '/' + lead.followDate.toDate().getFullYear();
                follow =  dateDiffDays(lead.followDate.toDate());
                console.log(follow)
            };
            return (
                m(".leads__row",
                    {
                        id: lead.id , 
                        onclick: e=>navigateToLead(e,vnode)
                    }, [
                        m(".leads__cell.leads__title", [
                            m("span.leads__name", getContactName(vnode)),
                            m("span.leads__type", getLeadTypeLabel(lead.type))
                        ]),
                        m(".leads__cell.leads__desc", lead.description),
                        m(".leads__cell.leads__follow", follow)
                    ])
            )
        }
    }
}

function getContactName(vnode) {
    let filter = store.storeContacts.filter(contact => {
        let contactPath = vnode.attrs.lead.contacts[0].contactRef;
        let path = `contacts/${contact.id}`;
        return path == contactPath;
    })

    return  filter[0] ? filter[0].name : '';
}

function getLeadTypeLabel(typeID){
    let filter = settings.leadTypeList.filter(type=>type.id == typeID);
    return  filter[0] ? filter[0].label : '';
}

function navigateToLead(e,vnode){
    m.route.set(`/myLeads/${vnode.attrs.lead.id}`);
}

module.exports = LeadRow;