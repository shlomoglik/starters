import m from "mithril"

let Header = (init) => {
    return {
        view: (vnode) => {
            return m('.header-full-page', [
                m('span.header-full-page__title',vnode.attrs.title || 'כותרת')
            ])
        }
    }
}

module.exports = Header;
