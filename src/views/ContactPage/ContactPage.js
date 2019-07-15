import m from 'mithril';
import Header from '../commons/Header/HeaderFullPage';
import { getFormValues } from '../../js/utils';
import { updateDoc , getContacts } from '../../firebase/qry';
import Snackbar from '../commons/Snackbar';
import store from '../../data/store';



const Contact = (init) => {
    getContacts();
    const getContact = (vnode) => {
        let contactID = m.route.param("id");
        const mockContact = {
            name: "משתמש לדוגמא",
            phone: "010-1234567",
            email: "testContact@test.co.il"
        }
        let allContacts = store.storeContacts;
        console.log(allContacts);
        let contactFilter = allContacts.filter(contact => {
            console.log(contact.id , contactID);
            return contact.id == contactID;
        })
        console.log(contactFilter,'length prop',contactFilter.length , contactFilter)
        if (contactFilter.length == 1) {
            return contactFilter[0];
        }
        return mockContact; //else case
    }

    const updateContact = (e, vnode) => {
        console.log('START function updateContact');
        e.preventDefault();
        let form = e.target;
        let contactID = form.id;
        let data = getFormValues(form);
        const prom = new Promise(resolve => resolve(updateDoc('contacts', contactID, data)));
        prom.then(res => {
            let msg = m(Snackbar, { oncreate: node => node.dom.classList.add('snackbar__show'), text: `פרטי איש קשר עודכנו בהצלחה!!` })
            vnode.state.msgs.push(msg);
        })
        prom.catch(err => alert(err))
    }

    const getPhoto = () => {
        if (false) { // if has photo
            console.log('bla bla bla')
            return m('img.contact__photo', { src: "#", alt: "" })
        } else {
            return m('svg.contact__photo.contact__photo--add', { onclick: e => console.log('TODO add new photo to contact', e, e.target) }, m('use', { href: "/img/sprite.svg#icon-user" }))
        }
    }

    return {
        oninit: vnode => {
            vnode.state.contact = getContact();
            vnode.state.msgs = [];
        },
        oncreate: vnode => {
            let dom = vnode.dom;
            // let inputs = dom.querySelectorAll('input');
            // const log =e=>console.log(e,e.target)
            // inputs.forEach(input=>{
            //     input.addEventListener('keyup',log)
            // })
        },
        view: vnode => {
            let contact = vnode.state.contact;
            return (
                m('.contact', [
                    m(Header, { title: "פרטי איש קשר", backTo: false }),
                    m(`form.contact__form#${contact.id}`,
                        { onsubmit: e => updateContact(e, vnode) },
                        [
                            m('.contact__row', [
                                getPhoto()
                            ]),
                            m('.contact__row', [
                                m('input[type="text"].contact__input contact__name', { name: "name", value: contact.name || '' }),
                                m('label.contact__label', 'שם')
                            ]),
                            m('.contact__row', [
                                m('input[type="phone"].contact__input contact__phone', { name: "phone", value: contact.phone || '' }),
                                m('label.contact__label', 'טלפון')
                            ]),
                            m('.contact__row', [
                                m('input[type="email"].contact__input contact__email', { name: "email", value: contact.email || '' }),
                                m('label.contact__label', 'אימייל')
                            ]),
                            m('.contact__btns', [
                                m('button[type="submit"].btn.btn--def', 'עדכן'),
                                m('button[type="button"].btn.btn--def.btn--red', { onclick: e => m.redraw() }, 'אפס'),
                            ])
                        ]),
                    vnode.state.msgs.map(msg => msg)
                ])
            )
        }
    }
}

module.exports = Contact;