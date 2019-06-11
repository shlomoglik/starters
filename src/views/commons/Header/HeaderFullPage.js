import m from "mithril"

let Header = (init) => {
    return {
        view: (vnode) => {
            return m('.header-full-page', [
                m('span.header-full-page__arrow',
                {onclick:e=>m.route.set(vnode.attrs.backTo)}
                ,String.fromCharCode(10132)),
                m('span.header-full-page__title',vnode.attrs.title || 'כותרת'),
            ])
        }
    }
}

module.exports = Header;
