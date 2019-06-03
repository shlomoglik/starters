import m from 'mithril'


let SettingGroup = (init) => {
    return {
        view: (vnode) => {
            return (
                m('.setGroup', [
                    m('.setGroup__title', vnode.attrs.title),
                    vnode.attrs.rows ?
                        vnode.attrs.rows.map(row => {
                            return m('.setGroup__row', row.label)
                        }) : [],
                    m('form.setGroup__form', { onsubmit: e => submitForm(e, e.target,vnode) }, [
                        m('input.setGroup__form-input', { type: "text", placeholder: "הוסף ..." }),
                        m('svg.setGroup__form-icon', {onclick: e => submitForm( e , vnode.dom.querySelector('.setGroup__form') , vnode ) },
                            m('use', { href: '/public/img/sprite.svg#icon-triangle-left' })
                        )
                    ]
                    )
                ])
            )
        }
    }
}

function submitForm(e, form) {
    e.preventDefault();
    console.log('TODO! add to database! and insert new row');
    form.reset();
}

module.exports = SettingGroup
