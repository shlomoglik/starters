import m from "mithril"
import CommandList from '../Menus/CommandList'

let Header = (init) => {
    return {
        view: (vnode) => {
            const list = vnode.attrs.cmdList || false;
            return m('.header-full-page', [
                m('span.header-full-page__arrow',
                    { onclick: e => m.route.set(vnode.attrs.backTo) },
                    String.fromCharCode(10132)
                ),
                m('span.header-full-page__title', vnode.attrs.title || 'כותרת'),
                list ?
                    m(CommandList, {list:list})
                :[]
            ])
        }
    }
}


    

module.exports = Header;
