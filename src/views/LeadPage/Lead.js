import m from "mithril"
import HeaderFullPage from '../commons/Header/HeaderFullPage'
import LeadGeneralCard from './LeadGeneralCard'
import LeadContacts from './LeadContactsCard'
import ScrollTop from '../commons/ScrollTop'
import store from '../../data/store'


let Lead = (init) => {
    return {
        oninit: vnode => {
            vnode.state.contactsCount = 0;
            getLeadByID(vnode);
        },
        onbeforeupdate: vnode => {
            getLeadByID(vnode);
            vnode.state.leadTitle = getLeadTitle(vnode);
            getContactsData(vnode);
            vnode.state.contactsCount = vnode.state.contactsData.length;
        },
        onupdate: vnode => { },
        view: (vnode) => {
            return (
                m('.lead', { id: vnode.attrs.id }, [
                    m(HeaderFullPage, { title: 'פרטי ליד', backTo: '/myLeads' }),
                    vnode.state.lead ?
                        // Object.keys(vnode.state.lead).map((k, ind) => {
                        //     return (
                        //         m('.lead__row', { key: ind }, k + ' ' + vnode.state.lead[k])
                        //     )
                        // })
                        m('.cards', [
                            m(LeadGeneralCard, { title: "פרטים כלליים", leadData: vnode.state.lead, leadTitle: vnode.state.leadTitle }),
                            m(LeadContacts, { title: `אנשי קשר ${vnode.state.contactsCount ? `(${vnode.state.contactsCount})` : ''}`, rows: vnode.state.contactsData, leadID: vnode.attrs.id, leadData: vnode.state.lead }),
                            // m(LeadFollowCard, {title:"פולואפ"}),
                            // m(LeadTasksCard, {title:"משימות"}),
                            // m(LeadStatueCard, {title:"סטטוס"}),
                        ])
                        : m('span.loader', 'טוען...'),
                    m(ScrollTop)
                ])
            )
        }
    }
}
function getLeadByID(vnode) {
    let myLeadData = store.storeLeads.filter(lead => lead.id == vnode.attrs.id);
    // console.log('filter result: ', myLeadData);
    vnode.state.lead = myLeadData[0];
    // getLeadCards(vnode);
}

function getLeadTitle(vnode) {
    let res = 'פרטי ליד';
    let name = getContactName(vnode);
    let type = vnode.state.lead.type;
    // console.log(vnode.state.lead, name, type);
    let title = name + ' - ' + type || false;
    return title ? title : res;
}

function getContactName(vnode) {
    let contactPath = vnode.state.lead.contacts[0].contactRef;
    // console.log(contactPath);
    let myContact = store.storeContacts.filter(contact => {
        let path = `contacts/${contact.id}`;
        return path == contactPath;
    })

    if (myContact[0]) {
        return myContact[0].name
    } else {
        return 'ללא איש קשר'
    }
}

function getContactsData(vnode) {
    // vnode.state.contactsData = [];
    let res = [];
    let activeContacts = vnode.state.lead.contacts; //[{contactRef:'',role:'main|?'},{...}]
    // console.log('active contacts are: ',activeContacts);
    for (let i in activeContacts) {
        let contactFilter = store.storeContacts.filter(contact => {
            return activeContacts[i]['contactRef'] == `contacts/${contact.id}`;
        })
        console.log('after filtering: ', contactFilter);
        let contact = Object.assign({}, contactFilter[0], { role: activeContacts[i]['role'] });
        res.push(contact);
    }
    vnode.state.contactsData = res;
}

module.exports = Lead;