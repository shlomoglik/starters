import m from 'mithril'
import { deleteDoc, insertDoc } from '../../firebase/qry'



const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink || false;
        },
        view: (vnode) => {
            return (
                m('form.lead-card', {onsubmit: e => submitForm(e, e.target, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    vnode.attrs.rows && !vnode.state.shrink ?
                        vnode.attrs.rows.map((row, ind) => {
                            return m('.lead-card__row', { key: ind}, [
                                m('label.lead-card__label', row.label),
                                m('input.lead-card__input', { value: row.data ,type:row.type || '' }),
                            ])
                        }) : [],
                    vnode.attrs.rows && !vnode.state.shrink ? 
                        m('.lead-card__btns',[
                            m('button.btn.btn--def','עדכן') ,
                            m('button.btn.btn--def.btn--red','בטל') ,
                        ]):[]
                ])
            )
        }
    }
}

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
