import m from 'mithril'

let SearchBox = (init) => {
    return {
        view: (vnode) => {
            return (
                m('.searchBox',
                    [
                        m('input[type="search"][class="searchBox__input"]',
                            {
                                placeholder: vnode.attrs.label || "חפש...",
                                autofocus: true,
                                oninput:(e)=> vnode.attrs.parent.state.term = e.target.value
                            }
                        ),
                        m('svg.searchBox__icon', [
                            m('use', { href: '/public/img/sprite.svg#icon-magnifying-glass' })
                        ]),
                    ])
            )
        }
    }
}

module.exports = SearchBox;