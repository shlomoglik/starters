import m from 'mithril'
import { deleteDoc, insertDoc } from '../../firebase/qry'
import FormList from '../commons/Forms/FormList'


let SettingGroup = (init) => {
    return {
        oninit:vnode=>{
            vnode.state.shrink = vnode.attrs.shrink
        },
        view: (vnode) => {
            return (
                m('.setGroup', [
                    m('.setGroup__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.setGroup__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down'}))
                    ]),
                    vnode.attrs.rows && !vnode.state.shrink ?
                        vnode.attrs.rows.map((row, ind) => {
                            return m('.setGroup__row', { key: ind, id: row.id || '' }, [
                                m('span.setGroup__label', row.label),
                                m('span.setGroup__delete', { onclick: e => deleteDoc(vnode.attrs.collection, e.target.parentNode.id) }, 'X')
                            ])
                        }) : [],
                    !vnode.state.shrink ?
                        m(FormList,{submitFunc: e =>addToList(e,vnode)}) : []
                ])
            )
        }
    }
}

// submitForm(e, vnode.dom.querySelector('.setGroup__form'), vnode)
function addToList(e, vnode) {
    e.preventDefault();
    let form = e.target;
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
    }
}

module.exports = SettingGroup
