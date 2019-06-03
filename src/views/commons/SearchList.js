import m from 'mithril'
import Store from '../../data/store'
import { getDoc } from '../../firebase/qry'

let SearchList = (init) => {
    return {
        oninit: (vndoe) => {
            console.log('init search list')
        },
        onupdate: (vnode) => {
            console.log(vnode.attrs.parent.state)
        },
        view: (vnode) => {
            let displayField = vnode.attrs.displayField;
            return (
                m('.searchList', [
                    vnode.attrs.parent.state.list ?
                        vnode.attrs.parent.state.list.map(item => {
                            return (
                                m('.searchList__row',
                                    {
                                        id: item.id,
                                        onclick: e => setActiveContact(e, vnode)
                                    }
                                    , [
                                        m('.searchList__item', item[displayField]),
                                        m('svg.searchList__select', [
                                            m('use', { href: '/public/img/sprite.svg#icon-add-to-list' })
                                        ])
                                    ])
                            )
                        }) : []
                ])
            )
        }
    }
}

function setActiveContact(e, vnode) {
    console.log('START function setActiveContact(e,vnode)');
    let elemID = e.path[1].id;
    let docRef = getDoc('contacts', elemID);
    docRef.then(doc => {
        vnode.attrs.parent.state.activeContact = Object.assign(doc.data(), { id: elemID });
        vnode.attrs.parent.attrs.parent.state.hasContact = true;
        m.redraw();
    })
}

module.exports = SearchList;