import m from 'mithril'
import { deleteDoc, insertDoc } from '../../firebase/qry'
import  settings  from '../../data/settings';
import CommandList from '../commons/CommandList'


const CardContacts = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink;
        },
        view: (vnode) => {
            let objContactData = settings.formDataContact.data;
            
            return (
                m('form.lead-card', { onsubmit: e => submitForm(e, e.target, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    vnode.attrs.rows && !vnode.state.shrink ?
                        vnode.attrs.rows.map((row, ind) => {
                            return m('.contact-card__row', { id: row.id, key: ind }, [
                                m('.contact-card__commands',[
                                    m('svg.contact-card__icon', m('use', { href: '/public/img/sprite.svg#icon-user' })),
                                    //TODO : add some commands like delete:duplicate etc...
                                    m('button.btn.btn--round.btn--grey.contact-card__button',   m('svg.btn__icon', m('use', { href: '/public/img/sprite.svg#icon-trash' }))  ),
                                    m('button.btn.btn--round.btn--green.contact-card__button',  m('svg.btn__icon', m('use', { href: '/public/img/sprite.svg#icon-trash' }))  ),
                                    m('button.btn.btn--round.btn--red.contact-card__button',   m('svg.btn__icon', m('use', { href: '/public/img/sprite.svg#icon-trash' }))   ),
                                    m('.contact-card__radio',[
                                        m('input[type="radio"]', { id:`role${row.id}`, value: row.role ,name:'role',checked:row.role?true:false}),
                                        m('label.contact-card__toggle',{for:`role${row.id}`},'עיקרי'),
                                    ]),
                                ]),
                                // Todo: change data to be rendered from setting.formDataContact object can use function like in add form...
                                m('.contact-card__input',[
                                    m('input', Object.assign( {value: row.name},objContactData.name.input) ),
                                    m('label.contact-card__label','שם'),
                                ]),
                                m('.contact-card__input',[
                                    m('input', Object.assign(  { value: row.phone } ,objContactData.phone.input) ),
                                    m('label.contact-card__label','טלפון'),
                                ]),
                                m('.contact-card__input',[
                                    m('input',Object.assign(  { value: row.email } ,objContactData.email.input)),
                                    m('label.contact-card__label','אימייל'),
                                ]),
                                m('.lead-card__btns', [
                                    m('button.btn.btn--def', 'עדכן'),
                                    m('button.btn.btn--def.btn--red', 'בטל'),
                                ]),
                            ])
                        }) : [],
                ])
            )
        }
    }
}

// submitForm(e, vnode.dom.querySelector('.setGroup__form'), vnode)
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

module.exports = CardContacts
