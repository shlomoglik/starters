import m from "mithril"
import CommandList from '../CommandList'

let cmdList = [
    { cmd: 'deleteLead', label: 'מחק ליד', func: e => console.log('TODO! delete lead + nav back to myLeads') },
]

let Header = (init) => {
    return {
        view: (vnode) => {
            return m('.header-full-page', [
                m('span.header-full-page__arrow',
                    { onclick: e => m.route.set(vnode.attrs.backTo) },
                    String.fromCharCode(10132)
                ),
                m('span.header-full-page__title', vnode.attrs.title || 'כותרת'),
                m(CommandList, {list: cmdList })
            ])
        }
    }
}


    

module.exports = Header;
