import m from "mithril"
import Store from '../../data/Store'

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
                        onclick: e=>m.route.set(`/lead-up/myLeads/${lead.id}`)
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
    let myContact = Store.storeContacts.filter(contact => {
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

module.exports = LeadRow;