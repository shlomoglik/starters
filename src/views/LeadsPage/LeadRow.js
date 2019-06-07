import m from "mithril"
import store from '../../data/store'

let LeadRow = (init) => {
    return {
        oncreate: vnode => {
            console.log('lead data is: ', vnode.attrs.lead)
        },
        view: (vnode) => {
            let lead = vnode.attrs.lead ;
            let follow = 'היום';
            if (lead.followDate) {
                follow = lead.followDate.toDate().getDay() + '/' + lead.followDate.toDate().getMonth() + '/' + lead.followDate.toDate().getFullYear();
                let dist = (new Date().setTime(0) - lead.followDate.toDate().setTime(0));
                if (dist == 0) {
                    follow = 'היום'
                }
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
    console.log(`TODO!!!!!!! go to /myLeads/${vnode.attrs.lead.id}`);
    console.log('user this data to show lead info',vnode.attrs.lead);
    m.route.set(`/myLeads/${vnode.attrs.lead.id}`);
}

module.exports = LeadRow;