import m from 'mithril'
import { deleteDoc, insertDoc } from '../../firebase/qry'

let pathToggle = { shrink: "#icon-chevron-thin-up", expend: "#icon-chevron-thin-down" };


let SettingGroup = (init) => {
    return {
        view: (vnode) => {
            return (
                m('.setGroup', [
                    m('.setGroup__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.setGroup__toggle-arrow', m('use', { href: vnode.state.shrink ? `/public/img/sprite.svg${pathToggle.shrink}` : `/public/img/sprite.svg${pathToggle.expend}`}))
                    ]),
                    vnode.attrs.rows && !vnode.state.shrink ?
                        vnode.attrs.rows.map((row, ind) => {
                            return m('.setGroup__row', { key: ind, id: row.id || '' }, [
                                m('span.setGroup__label', row.label),
                                m('span.setGroup__delete', { onclick: e => deleteDoc(vnode.attrs.collection, e.target.parentNode.id) }, 'X')
                            ])
                        }) : [],
                    !vnode.state.shrink ?
                        m('form.setGroup__form', { onsubmit: e => submitForm(e, e.target, vnode) }, [
                            m('input.setGroup__form-input', { type: "text", placeholder: "הוסף ...", required: true, minlength: 3 }),
                            m('svg.setGroup__form-icon', { onclick: e => submitForm(e, vnode.dom.querySelector('.setGroup__form'), vnode) },
                                m('use', { href: '/public/img/sprite.svg#icon-triangle-left' })
                            )
                        ]
                        ) : []
                ])
            )
        }
    }
}


function submitForm(e, form, vnode) {
    e.preventDefault();
    let val = form.elements[0].value;
    let col = vnode.attrs.collection;
    let doc = { label: val };
    insertDoc(col, doc).then(r => {
        console.log('new doc added', r.path);
        m.redraw();
    });
    form.reset();
}
function toggleGroup(e, vnode) {
    if (vnode.state.shrink) {
        vnode.state.shrink = false;
    } else {
        vnode.state.shrink = true;
    }    // let dom = vnode.dom;
    // let children = dom.querySelectorAll('.setGroup > *:not(:first-child) '); 
    // children.forEach(child=>{
    //     child.classList.toggle('setGroup--hidden');
    // });
}

module.exports = SettingGroup
