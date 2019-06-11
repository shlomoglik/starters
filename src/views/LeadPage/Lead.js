import m from "mithril"
import HeaderFullPage from '../commons/Header/HeaderFullPage'
import LeadCard from './LeadCard'
import LeadContacts from './LeadContactsCard'
import ScrollTop from '../commons/ScrollTop'
import store from '../../data/store'


let Lead = (init) => {
    return {
        oninit: vnode => {
            // console.log('use function getLeadByID ', vnode.attrs.id, vnode);
            getLeadByID(vnode);
        },
        onupdate: vnode => {
            getLeadByID(vnode);
            vnode.state.leadTitle = getLeadTitle(vnode);
            getContacts(vnode);
            // console.log(vnode);
        },
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
                            m(LeadCard, getGeneralCard(vnode)),
                            m(LeadContacts, {title:"אנשי קשר"}),
                            m(LeadCard, {title:"פולואפ"}),
                            m(LeadCard, {title:"משימות"}),
                            m(LeadCard, {title:"סטטוס"}),
                        ])
                        : m('span.loader', 'טוען...'),
                        m(ScrollTop)
                ])
            )
        }
    }
}
function getLeadByID(vnode) {
    let myLeadData = store.storeLeads.filter(lead => {
        // console.log('comparte: ', lead.id, '?==', vnode.attrs.id)
        return lead.id == vnode.attrs.id;
    })
    // console.log('filter result: ', myLeadData);
    vnode.state.lead = myLeadData[0];
    // getLeadCards(vnode);
}

function getLeadTitle(vnode) {
    let res = 'פרטי ליד';
    let name = getContactName(vnode);
    let type = vnode.state.lead.type;
    // console.log(vnode.state.lead, name, type);
    let title = name + ' ' + type || false;
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

function toggleGroup(e, vnode) {
    if (vnode.state.shrink) {
        vnode.state.shrink = false;
    } else {
        vnode.state.shrink = true;
    }
}

function getGeneralCard(vnode) {
    return {
        title: 'פרטים כלליים',
        rows: [
            { label: "כותרת", data: getContactName(vnode) + ' - ' + vnode.state.lead.type },
            { label: "מקור", data: vnode.state.lead.source },
            { label: "סוג", data: vnode.state.lead.type },
            { label: "תיאור", data: vnode.state.lead.description },
            { label: "תאריך יעד", data: vnode.state.lead.duedate ,type:"date"},
        ],
        shrink: false,
    }
}

function getContacts(vnode){
    let res = [];
    let activeContacts = vnode.state.lead.contacts; //[{contactRef:'',role:'main|?'},{...}]
    // console.log('active contacts are: ',activeContacts);
    for(let i in activeContacts){
        let contactFilter = store.storeContacts.filter(contact=>{
            return activeContacts[i]['contactRef'] == `contacts/${contact.id}`;
        })
        // console.log('after filtering: ',contactFilter);
        res.push(Object.assign({},contactFilter[0],{role:activeContacts[i]['role']}));
    }
    vnode.state.contactsData = res;
}

module.exports = Lead;