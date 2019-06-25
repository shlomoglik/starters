import m from 'mithril'

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
                                    m('span','11/7'),
                                    m('p','שיחה טלפונית טובה מאוד , רוצה לבוא לפגישה'),
                                    m('input[type="file"]','הקלטה'),
                                ])
                            ]),
                            m('form.lead-follow__form',[
                                m('input.lead-follow__input',{type:'text'}),
                                m('button[type="submit"]','הוסף')
                            ])
                        ]) : []
                ])
            )
        }
    }
}
function toggleGroup(e, vnode) {
    if (vnode.state.shrink) {
        vnode.state.shrink = false;
    } else {
        vnode.state.shrink = true;
    }
}

module.exports = Card
