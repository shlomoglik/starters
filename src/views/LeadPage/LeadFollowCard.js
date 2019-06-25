import m from 'mithril'
import FormList from '../commons/Forms/FormList'

const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink || true;
        },
        view: (vnode) => {
            return (
                m('form.lead-card', { onsubmit: e => updateChanges(e, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    !vnode.state.shrink ?
                        m('.lead-follow',[
                            m('.lead-follow__list',[
                                m('.lead-follow__row',[
                                    m('.lead-follow__date','11/7'),
                                    m('.lead-follow__text','שיחה טלפונית טובה מאוד , רוצה לבוא לפגישה'),
                                ]),
                                m('.lead-follow__row',[
                                    m('.lead-follow__date','12/7'),
                                    m('.lead-follow__text','הייתה פגישה מדהימה , רוצים לסגור רק מבררים תאריך'),
                                ]),
                                m('.lead-follow__row',[
                                    m('.lead-follow__date','13/7'),
                                    m('.lead-follow__text','נשלחה הצעת מחיר והזמנה לחתימה'),
                                ]),
                            ]),
                            m(FormList,{submitFunc: e =>addToList(e,vnode)})
                        ]) : []
                ])
            )
        }
    }
}
function addToList(e,vnode){
    console.log('TODO ! add to list')
}
function toggleGroup(e, vnode) {
    if (vnode.state.shrink) {
        vnode.state.shrink = false;
    } else {
        vnode.state.shrink = true;
    }
}

module.exports = Card
