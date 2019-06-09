import m from "mithril"
import HeaderFullPage from '../commons/HeaderFullPage'
import store from '../../data/store'

let Lead = (init) => {
    return {
        oninit: vnode => {
            console.log('use function getLeadByID ', vnode.attrs.id, vnode);
            getLeadByID(vnode);
        },
        view: (vnode) => {
            let lead = vnode.state.lead;
            console.log(lead)
            return (
                m('.lead', { id: vnode.attrs.id },[
                    m(HeaderFullPage,'פרטי ליד'),
                    m('.lead__row.leads__title', [
                        m("span.leads__name", getContactName(vnode)),
                        m("span.leads__type", lead.type)
                    ]),
                    m(".leads__row.leads__desc", lead.description),
                    m(".leads__row.leads__follow", 'follow'),
                ])
            )
        }
    }
}
function getLeadByID(vnode) {
    let myLeadData = store.storeLeads.filter(lead => {
        console.log('comparte: ', lead.id, '?==', vnode.attrs.id)
        return lead.id == vnode.attrs.id;
    })
    console.log('filter result: ', myLeadData);
    vnode.state.lead = myLeadData;
}

function getContactName(vnode) {
    return 'getName';
    // let contactPath = vnode.state.lead.contacts[0].contactRef;
    // console.log(contactPath);
    // let myContact = store.storeContacts.filter(contact => {
    //     let path = `contacts/${contact.id}`;
    //     return path == contactPath;
    // })

    // if (myContact[0]) {
    //     return myContact[0].name
    // } else {
    //     return 'ללא איש קשר'
    // }
}

module.exports = Lead;