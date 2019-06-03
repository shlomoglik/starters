import m from 'mithril'

let CommandList = (init) => {
    
    return {
        oncreate:(vnode)=>{
            let list = vnode.dom.querySelector('#list');
            let toggle = vnode.dom.querySelector('#toggle');
            window.onclick = (e)=> {
                if(list.classList.contains('commandList__list--visible') && e.target !== list && e.target !== toggle){
                    list.classList.remove("commandList__list--visible");
                }
            }
        },
        view: (vnode) => {
            return (
                m('.commandList', [
                    m('svg#toggle.row__icon.commandList__icon', { onclick: e => toggleDispaly(e, vnode) }, m('use', { href: '/public/img/sprite.svg#icon-dots-three-vertical' })),
                    m('.commandList__list#list', [
                        vnode.attrs.list.map((item, ind) => {
                            if (item) {
                                return (
                                    m('.commandList__row', { key: ind }, [
                                        m('.commandList__item', item.label),
                                    ])
                                )
                            }
                        })
                    ])
                ])
            )
        }
    }
}
function toggleDispaly(e, vnode) {
    let list = vnode.dom.querySelector('#list');
    list.classList.toggle("commandList__list--visible");
}

module.exports = CommandList;