import m from "mithril"
import HeaderFullPage from '../commons/Header/HeaderFullPage'
import LeadGeneralCard from './LeadGeneralCard'
import LeadContacts from './LeadContactsCard'
import LeadFollowCard from './LeadFollowCard'
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
            getContactsData(vnode);
            getMainContactName(vnode);
            // console.log(vnode.state.contactData[0].name);
            vnode.state.contactsCount = vnode.state.contactsData.length;
        },
        view: (vnode) => {
            return (
                m('.lead', { id: vnode.attrs.id }, [
                    m(HeaderFullPage, { title: `פרטי ליד ${vnode.state.mainContactName ? ' - '+ vnode.state.mainContactName:''}`, backTo: '/myLeads' }),
                    vnode.state.lead ?
                        m('.cards', [
                            m(LeadGeneralCard, { title: "פרטים כלליים", leadData:vnode.state.lead, leadTitle: vnode.state.leadTitle}),
                            m(LeadContacts, { title: `אנשי קשר ${vnode.state.contactsCount ? `(${vnode.state.contactsCount})` : ''}`, rows: vnode.state.contactsData, leadID: vnode.attrs.id, leadData: vnode.state.lead }),
                            m(LeadFollowCard, {title:"פולואפ"}),
                            m(LeadFollowCard, {title:"משימות"}),
                            m(LeadFollowCard, {title:"סטטוס"}),
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
    vnode.state.lead = myLeadData[0];
}

function getContactsData(vnode) {
    let res = [];
    let activeContacts = vnode.state.lead.contacts; //[{contactRef:'',role:'main|?'},{...}]
    for (let i in activeContacts) {
        let contactFilter = store.storeContacts.filter(contact => {
            return activeContacts[i]['contactRef'] == `contacts/${contact.id}`
        })
        let contact = Object.assign({}, contactFilter[0], { role: activeContacts[i]['role'] });
        res.push(contact);
    }
    vnode.state.contactsData = res;
}
function getMainContactName(vnode){
    let activeContactsData = vnode.state.contactsData;
    let mainContact = activeContactsData.filter(contact=>contact.role =='main');
    vnode.state.mainContactName = mainContact[0].name;
}

module.exports = Lead;