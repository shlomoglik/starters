import m from 'mithril';
import Header from '../commons/Header/HeaderFullPage';
import { getFormValues } from '../../js/utils';
import { updateDoc } from '../../firebase/qry';
import Snackbar from '../commons/Snackbar';


const Contact = (init) => {
    const getContact = () => {
        const mockContact = {
            name:"משתמש לדוגמא",
            phone:"010-1234567",
            email:"testContact@test.co.il"
        }
        init.state.contact = mockContact;
    }

    const updateContact = (e, vnode) => {
        console.log('START function updateContact');
        e.preventDefault();
        let form = e.target;
        let contactID = form.id;
        let data = getFormValues(form);
        const prom = new Promise (resolve=> resolve(updateDoc('contacts', contactID, data)) );
        prom.then(res=>{            
            let msg = m(Snackbar , {oncreate:node=>node.dom.classList.add('snackbar__show')  , text:`פרטי איש קשר עודכנו בהצלחה!!`})
            vnode.state.msgs.push(msg);
        })
        prom.catch(err=>alert(err))
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
        oninit: vnode=>{
            getContact();
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
                                m('input[type="text"].contact__input contact__name', { name: "name", value: contact._data.name || '' }),
                                m('label.contact__label', 'שם')
                            ]),
                            m('.contact__row', [
                                m('input[type="phone"].contact__input contact__phone', { name: "phone", value: contact._data.phone || '' }),
                                m('label.contact__label', 'טלפון')
                            ]),
                            m('.contact__row', [
                                m('input[type="email"].contact__input contact__email', { name: "email", value: contact._data.email || '' }),
                                m('label.contact__label', 'אימייל')
                            ]),
                            m('.contact__btns', [
                                m('button[type="submit"].btn.btn--def', 'עדכן'),
                                m('button[type="button"].btn.btn--def.btn--red', { onclick: e => m.redraw() }, 'אפס'),
                            ])
                        ]),
                        vnode.state.msgs.map(msg=>msg)
                ])
            )
        }
    }
}

module.exports = Contact;