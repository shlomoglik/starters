import m from "mithril"
import store from '../../data/store'

let LeadRow = (init) => {
    return {
        view: (vnode) => {
            let lead = vnode.attrs.lead ;
            let follow ='לא הוגדר';
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
                            m("span.leads__type", lead.type)
                        ]),
                        m(".leads__cell.leads__desc", lead.description),
                        m(".leads__cell.leads__follow", follow)
                    ])
            )
        }
    }
}

function getContactName(vnode) {
    let myContact = store.storeContacts.filter(contact => {
        let contactPath = vnode.attrs.lead.contacts[0].contactRef;
        let path = `contacts/${contact.id}`;
        return path == contactPath;
    })

    if (myContact[0]) {
        return myContact[0].name
    } else {
        return 'ללא איש קשר'
    }
}

function navigateToLead(e,vnode){
    m.route.set(`/myLeads/${vnode.attrs.lead.id}`);
}

module.exports = LeadRow;