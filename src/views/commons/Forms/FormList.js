import m from 'mithril'

const Form = (vnode)=>{
    return {
        view: vnode => {
            return(
                m('form.form-list', { onsubmit: e => vnode.attrs.submitFunc(e) }, [
                    m('input.form-list__input', { autofocus:true,type: "text", placeholder: "הוסף ...", required: true, minlength: 3 }),
                    m('button[type="submit"].form-list__btn', [
                        m('svg.form-list__icon', { onclick: () => vnode.dom.submit()  },
                            m('use', { href: '/img/sprite.svg#icon-triangle-left' })
                        )
                    ])
                ])
            )
        }
    }
}

module.exports = Form;