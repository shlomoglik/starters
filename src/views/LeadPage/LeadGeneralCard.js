import m from 'mithril'
import store from '../../data/store';
import settings from '../../data/settings';
import { deleteDoc, insertDoc } from '../../firebase/qry'

// let rows= [
//     { label: "כותרת", data: getContactName(vnode) + ' - ' + vnode.state.lead.type },
//     { label: "מקור", data: vnode.state.lead.source },
//     { label: "סוג", data: vnode.state.lead.type },
//     { label: "תיאור", data: vnode.state.lead.description },
//     { label: "תאריך יעד", data: vnode.state.lead.duedate ,type:"date"},
// ];


const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink || false;
        },
        view: (vnode) => {
            let objLeadData = settings.formDataLead.data;
            return (
                m('form.lead-card', { onsubmit: e => submitForm(e, e.target, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    !vnode.state.shrink ?
                        m('.lead-card__row', [
                            m('input.lead-card__input',
                                {
                                    type: "text",
                                    value: vnode.attrs.leadTitle || "",
                                    name: "title",
                                    key: 0,
                                }
                            ),
                            m('label.lead-card__label', 'כותרת ליד'),
                        ]) : [],
                    objLeadData && vnode.attrs.leadData && !vnode.state.shrink ?
                        Object.keys(objLeadData).map((k, i) => {
                            return m('.lead-card__row', { key: `formRow${i}`, style: "position:relative" }, [
                                m('input.lead-card__input', Object.assign({}, objLeadData[k].input, { value: vnode.attrs.leadData[k] })),
                                m('label.lead-card__label', objLeadData[k].label),
                            ])
                            // vnode.state.rows.map((row, ind) => {
                            //     return m('.lead-card__row', { key: ind}, [
                            //         m('label.lead-card__label', row.label),
                            //         m('input.lead-card__input', Object.assign({}, objLeadtData[k].input, { value: row[k] }) ),
                            //     ])
                        }) : [],
                    vnode.attrs.leadData && !vnode.state.shrink ?
                        m('.lead-card__btns', [
                            m('button.btn.btn--def', 'עדכן'),
                            m('button.btn.btn--def.btn--red', 'בטל'),
                        ]) : []
                ])
            )
        }
    }
}

// function getContactTitle(vnode) {
//     let mainContact =false;
//     vnode.attrs.contactsData.forEach(contact=>{
//         if(contact.role =='main'){
//             mainContact= contact.name;
//             return; 
//         }
//     });
//     vnode.state.leadTitle = 'כותרת ליד' ;
//     vnode.state.leadTitle += mainContact ? ` - ${mainContact.name}`: '';
// }

// function getContactName(vnode) {
//     console.log(vnode);
//     let contactPath = vnode.attrs.leadData.contacts[0].contactRef;
//     console.log(contactPath);
//     let myContact = store.storeContacts.filter(contact => {
//         let path = `contacts/${contact.id}`;
//         return path == contactPath;
//     })
//     console.log(myContact);
//     // if (myContact[0]) {
//     //     return myContact[0].name
//     // } else {
//     //     return 'ללא איש קשר'
//     // }
// }

function submitForm(e, form, vnode) {
    e.preventDefault();
    // let val = form.elements[0].value;
    // let col = vnode.attrs.collection;
    // let doc = { label: val };
    // insertDoc(col, doc).then(r => {
    //     console.log('new doc added', r.path);
    //     m.redraw();
    // });
    form.reset();
}

function toggleGroup(e, vnode) {
    if (vnode.state.shrink) {
        vnode.state.shrink = false;
    } else {
        vnode.state.shrink = true;
    }
}

module.exports = Card
