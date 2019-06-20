import m from 'mithril'
import { deleteDoc, insertDoc } from '../../firebase/qry'
import settings from '../../data/settings';
import store from '../../data/store'
import SearchList from '../commons/SearchList'
import CommandList from '../commons/CommandList'

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
                            vnode.attrs.rows.map((row, ind) => {
                                return m('.contact-card__card', { id: row.id, key: ind, style: vnode.state.add ? "display:none;" : "" }, [
                                    // Todo: change data to be rendered from setting.formDataContact object can use function like in add form...
                                    m('form.contact-card__form',
                                        { autocorrect: "off", autocapitalize: "off", spellcheck: "false", autocomplete: "off" },
                                        [
                                            m('input[type="radio"].contact-card__radio', { id: `role${row.id}`, value: row.role, name: 'role', checked: row.role ? true : false }),
                                            m('.contact-card__role-user', [
                                                m('label.contact-card__toggle', { for: `role${row.id}` }, m('svg.contact-card__icon', m('use', { href: '/public/img/sprite.svg#icon-user' }))),
                                            ]),
                                            // render form data with setting object
                                            Object.keys(objContactData).map((k, i) => {
                                                return m('.contact-card__row', { key: `formRow${row.id + i}`, style: "position:relative" }, [
                                                    m('input.contact-card__input', Object.assign({}, objContactData[k].input, { onkeyup: e => setListData(e, vnode, k), value: row[k], })),
                                                    m('label.contact-card__label', objContactData[k].label),
                                                    m(SearchList, { parent: vnode, inputID: k, list: vnode.state[`list${k}`] })
                                                ])
                                            }),
                                            m('.contact-card__btns', [
                                                //TODO : add some commands like delete:duplicate etc...
                                                m('button.contact-card__button',
                                                    { onclick: e => removeUser(e, vnode), title: "מחק איש קשר מכל המערכת" },
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-trash' }))
                                                ),
                                                m('button.contact-card__button',
                                                    { onclick: e => unAssignUser(e, vnode) },
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-download' }))
                                                ),
                                                m('button.contact-card__button',
                                                    { onclick: e => updateChanges(e, vnode) },
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-check' }))
                                                ),
                                                m('button.contact-card__button',
                                                    { onclick: e => resetChanges(e, vnode) },
                                                    m('svg', m('use', { href: '/public/img/sprite.svg#icon-circle-with-cross' }))
                                                ),
                                            ]), // end form btns
                                        ]), // end contact form
                                ]) // end contact card
                            }) // end map
                        ]) : [],

                    vnode.state.add ?
                        m('.contact-card__card.contact-card__card--new', { style: vnode.state.add && !vnode.state.shrink ? "" : "display:none;" }, [
                            // Todo: change data to be rendered from setting.formDataContact object can use function like in add form...
                            m('form.contact-card__form.contact-card__form--new',
                                { autocorrect: "off", autocapitalize: "off", spellcheck: "false", autocomplete: "off" },
                                [
                                    Object.keys(objContactData).map((k, ind) => {
                                        console.log(objContactData)
                                        return m('.contact-card__row', { key: `formAddRow${ind}`, style: "position:relative" }, [
                                            m('input.contact-card__input', Object.assign({}, objContactData[k].input, { onkeyup: e => setListData(e, vnode, k) })),
                                            m('label.contact-card__label', objContactData[k].label),
                                            m(SearchList, { parent: vnode, inputID: k, list: vnode.state[`list${k}`] })
                                        ])
                                    }),
                                    // m('.contact-card__row', [
                                    //     m('input.contact-card__input', objContactData.name.input),
                                    //     m('label.contact-card__label', 'שם'),
                                    // ]),
                                    // m('.contact-card__row', [
                                    //     m('input.contact-card__input', objContactData.phone.input),
                                    //     m('label.contact-card__label', 'טלפון'),
                                    // ]),
                                    // m('.contact-card__row', [
                                    //     m('input.contact-card__input', objContactData.email.input),
                                    //     m('label.contact-card__label', 'אימייל'),
                                    // ]),
                                    m('.contact-card__btns', [
                                        m('button.btn.btn--def', 'הוסף'),
                                        m('button.btn.btn--def.btn--red', 'בטל'),
                                    ]), // end form btns
                                ]), // end contact form
                        ]) : [] // end contact card new
                ])
            )
        }
    }
}


function removeUser(e, vnode) { console.log('TODO remove user from database , must check that there is at least one contact for lead') }
function unAssignUser(e, vnode) { console.log('TODO unAssign user from curr Lead , must check that there is at least one contact assign lead') }


function updateChanges(e, vnode) {
    e.preventDefault();
    console.log('TODO updateChanges apply changes to contact data by id db.collection("contacts").doc(":id").set({...})');
}


function resetChanges(e, vnode) {
    e.preventDefault();
    console.log('TODO reset all changes by m.redrew!');
    let form = vnode.dom.querySelector('form');
    form.reset();
    m.redraw();
}

function markAsMain(e, vnode) { console.log('TODO mark user as main to this lead , if ther are more then one lead => set other to be false') }

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
        vnode.state.add = false; // remove add form if open
        vnode.state.shrink = true;
    }
}

function toggleAddForm(e, vnode) {
    vnode.state.shrink = false;
    vnode.state.add = true;
}


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
    console.log(list);
    console.log(list.length);
    if (list.length > 0) {
        e.target.setCustomValidity('כבר קיים ערך כזה , הזן ערך חדש או בחר מתוך הרשימה')
    } else {
        e.target.setCustomValidity('')
    }
}

module.exports = CardContacts
