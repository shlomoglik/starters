import m from 'mithril'
import { deleteDoc, insertDoc } from '../../firebase/qry'


const CardContacts = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink;
        },
        view: (vnode) => {
            return (
                m('form.lead-card', { onsubmit: e => submitForm(e, e.target, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    vnode.attrs.rows && !vnode.state.shrink ?
                        vnode.attrs.rows.map((row, ind) => {
                            return m('.contact-card__row', { id: row.id, key: ind }, [
                                m('svg.contact-card__icon', m('use', { href: '/public/img/sprite.svg#icon-user' })),
                                m('.contact-card__input',[
                                    m('input[type="text"]', { value: row.name ,autofocus:true}),m('label.contact-card__label','שם'),
                                ]),
                                m('.contact-card__input',[
                                    m('input[type="phone"]', { value: row.phone }),m('label.contact-card__label','טלפון'),
                                ]),
                                m('.contact-card__input',[
                                    m('input[type="email"]', { value: row.email }),m('label.contact-card__label','אימייל'),
                                ]),
                                m('.contact-card__input',[
                                    m('input[type="text"]',  { value: row.role }),m('label.contact-card__label','תפקיד')
                                ]),
                            ])
                        }) : [],
                    vnode.attrs.rows && !vnode.state.shrink ?
                        m('.lead-card__btns', [
                            m('button.btn.btn--def', 'עדכן'),
                            m('button.btn.btn--def.btn--red', 'בטל'),
                        ]) : []
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
