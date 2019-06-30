import m from 'mithril'
import { deleteDoc, updateDoc, addToMapInDoc, updateMapInDoc } from '../../firebase/qry'
import { getFormValues, closestByClass } from '../../js/utils';
import settings from '../../data/settings';
import store from '../../data/store';
import Contact from '../../data/Contact';
import SearchList from '../commons/SearchList';
import CommandList from '../commons/Menus/CommandList';

const CardContacts = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink || true; // set to true if attrs not set yet
        },
        view: (vnode) => {
            let objContactData = settings.formDataContact.data;

            return (
                m('.lead-card', [
                    m('button.btn.btn--fab.btn--round', { onclick: e => toggleAddForm(e, vnode), style: vnode.state.add ? "display:none;" : "" }, m('svg.btn__icon', m('use', { href: '/public/img/sprite.svg#icon-plus' }))),
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    vnode.attrs.rows && !vnode.state.shrink ?
                        m('.contact-card__wrapper', [
                            vnode.attrs.rows.sort(compareRoles).map((row, ind) => {
                                if (typeof row.id == "undefined" || row.id == "") return
                                return m('.contact-card__card', { id: row.id, key: ind, style: vnode.state.add ? "display:none;" : "" }, [
                                    m('form.contact-card__form',
                                        { onsubmit: e => updateChanges(e, vnode), autocorrect: "off", autocapitalize: "off", spellcheck: "false", autocomplete: "off" },
                                        [
                                            m('input[type="checkbox"].contact-card__radio', { onchange: e => markAsMainRole(e, vnode), id: `role${row.id}`, value: row.role, name: 'role', checked: row.role == 'main' ? true : false }),
                                            m('.contact-card__role-user', [
                                                m('label.contact-card__toggle', { for: `role${row.id}` }, m('svg.contact-card__icon', m('use', { href: '/public/img/sprite.svg#icon-user' }))),
                                            ]),
                                            m('span.contact-card__role-text',  row.role == 'main' ? "עיקרי" : ''),
                                            // render form data with setting object
                                            Object.keys(objContactData).map((k, i) => {
                                                return m('.contact-card__row', { key: `formRow${row.id + i}`, style: "position:relative" }, [
                                                    m('input.contact-card__input', Object.assign({}, objContactData[k].input, { value: row[k] }) ),
                                                    m('label.contact-card__label', objContactData[k].label),
                                                ])
                                            }),
                                            m('.contact-card__btns', [
                                                m('button.contact-card__button',
                                                    { onclick: e => unAssignContact(e, vnode) },
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-download' }))
                                                ),
                                                m('button[type="submit"].contact-card__button',
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-check' }))
                                                ),
                                                m('button.contact-card__button',
                                                    { onclick: e => resetChanges(e, vnode) },
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-circle-with-cross' }))
                                                ),
                                            ]), // end form btns
                                        ]), // end contact form
                                ]) // end contact card
                            }) //s end map
                        ]) : [],

                    vnode.state.add ?
                        m('.contact-card__card.contact-card__card--new', { style: vnode.state.add && !vnode.state.shrink ? "" : "display:none;" }, [
                            // Todo: change data to be rendered from setting.formDataContact object can use function like in add form...
                            m('form.contact-card__form.contact-card__form--new',
                                { onsubmit: e => addNewContact(e, vnode), autocorrect: "off", autocapitalize: "off", spellcheck: "false", autocomplete: "off" },
                                [
                                    Object.keys(objContactData).map((k, ind) => {
                                        return m('.contact-card__row', { key: `formAddRow${ind}`, style: "position:relative" }, [
                                            m('input.contact-card__input', Object.assign({}, objContactData[k].input, { onkeyup: e => setListData(e, vnode, k) })),
                                            m('label.contact-card__label', objContactData[k].label),
                                            m(SearchList, { parent: vnode, inputID: k, list: vnode.state[`list${k}`], func: e => assignContact(e, vnode) })
                                        ])
                                    }),
                                    m('.contact-card__btns', [
                                        m('button[type="submit"].btn.btn--def', 'הוסף'),
                                        m('button.btn.btn--def.btn--red', { onclick: e => toggleAddForm(e, vnode) }, 'בטל'),
                                    ]), // end form btns
                                ]), // end contact form
                        ]) : "" // end contact card new
                ])
            )
        }
    }
}

function assignContact(e, vnode) {
    let contactID = e.path[1].id;
    let existContacts = vnode.attrs.leadData.contacts;
    let exist = existContacts.filter(el => el.contactRef == `contacts/${contactID}`);
    if (exist[0]) {
        alert('משתמש זה כבר קיים');
        resetChanges(e, vnode);
        return;
    }
    let collection = 'leads';
    let docID = vnode.attrs.leadID;
    let field = 'contacts';
    let value = { "role": "any", "contactRef": `contacts/${contactID}` };
    addToMapInDoc(collection, docID, field, value);
    toggleAddForm(e, vnode);
}


function removeContact(e, vnode) { console.log('TODO remove user from database , must check that there is at least one contact for lead') };

function unAssignContact(e, vnode) {
    // console.log('START function unAssignContact : \rbefore:',vnode.attrs.leadData.contacts)
    e.redraw = false;
    let contactID = closestByClass(e.target, 'contact-card__card').id;
    let contactsDataAfterRemove = vnode.attrs.leadData.contacts.filter(el => el.contactRef !== `contacts/${contactID}`);
    // console.log('\rafter',vnode.attrs.leadData.contacts)
    
    if (vnode.attrs.leadData.contacts.length > 1) {
        vnode.attrs.leadData.contacts = contactsDataAfterRemove;
        updateMapInDoc('leads', vnode.attrs.leadID, 'contacts', contactsDataAfterRemove);
    } else {
        alert('יש להשאיר לפחות איש קשר אחד לכל ליד');
        return;
    }
}

function updateChanges(e, vnode) {
    e.preventDefault();
    let contactID = closestByClass(e.target, 'contact-card__card').id;
    let form = e.target;
    let objToUpdate = getFormValues(form);
    updateDoc('contacts', contactID, objToUpdate);
}


function resetChanges(e, vnode) {
    e.preventDefault();
    let form = closestByClass(e.target, 'contact-card__form');
    form.reset();
    m.redraw();
}

function markAsMainRole(e, vnode) {
    if (!e.target.checked) {
        return;
    }
    e.redraw = false;
    let contactID = e.path[2].id;
    let contactsData = vnode.attrs.leadData.contacts.map(el => {
        el.contactRef == `contacts/${contactID}` ?
            el.role = 'main' :
            el.role = 'any';
        return el;
    });
    updateMapInDoc('leads', vnode.attrs.leadID, 'contacts', contactsData);
}

function addNewContact(e, vnode) {
    e.preventDefault();
    let form = e.target;
    let dataToAdd = getFormValues(form);
    console.log(dataToAdd);
    let newContact = new Contact('', dataToAdd);
    newContact.addNewSubContact(newContact, vnode.attrs.leadID);
    toggleAddForm(e, vnode);
}

function compareRoles(a, b) {
    if (a.role && a.role == 'main') {
        return -1;
    } else if (b.role && b.role == 'main') {
        return 1;
    } else {
        return 0;
    }
}



//display mode:
function toggleGroup(e, vnode) {
    console.log('TODO! toggle group')
    if (vnode.state.shrink) {
        console.log('state is shrink => so make it open')
        vnode.state.shrink = false;
    } else {
        vnode.state.add = false; //first make sure no add form is active
        vnode.state.shrink = true;
    }
}

function toggleAddForm(e, vnode) {
    if (vnode.state.add) {
        vnode.state.add = false;
    } else {
        vnode.state.shrink = false;
        vnode.state.add = true;
    }
}




//validations and lists:
function getList(term, field, model) {
    if (term.length < 2) {
        return [];
    }
    let filter = store[model].filter(el => {
        let search = el[field] || '';
        return search.indexOf(term.trim()) !== -1;
    });
    return filter;
}

function setListData(e, vnode, key) {
    vnode.state[`term${key}`] = e.target.value;
    vnode.state[`list${key}`] = getList(vnode.state[`term${key}`], key, 'storeContacts');
    validateInput(e);
}

function validateInput(e) {
    let row = e.path[1]; //one level up = row
    let list = row.querySelectorAll('.searchList > .searchList__row');
    if (list.length > 0) {
        e.target.setCustomValidity('כבר קיים ערך כזה , הזן ערך חדש או בחר מתוך הרשימה')
    } else {
        e.target.setCustomValidity('')
    }
}


module.exports = CardContacts
