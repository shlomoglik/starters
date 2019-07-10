import m from 'mithril'

let CommandList = (init) => {

    return {
        oncreate: (vnode) => {
            let list = vnode.dom.querySelector('#list');
            let toggle = vnode.dom.querySelector('#toggle');
            window.onclick = (e) => {
                if (list.classList.contains('commandList__list--visible') && e.target !== list && e.target !== toggle) {
                    list.classList.remove("commandList__list--visible");
                }
            }
        },
        view: (vnode) => {
            return (
                m('.commandList',{style:'position:relative'}, [
                    m('svg#toggle.row__icon.commandList__icon', { onclick: e => toggleDispaly(e, vnode) }, m('use', { href: '/img/sprite.svg#icon-dots-three-vertical' })),
                    m('.commandList__list#list', [
                        vnode.attrs.list.map((item, ind) => {
                            if (item) {
                                return (
                                    m('.commandList__row',
                                        {
                                            key: ind,
                                            onclick: e => {
                                                console.log('TODO! add function for each command');
                                                item.func(e);
                                            }
                                        },
                                        [
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

    if (list.classList.contains('commandList__list--visible')){
        let rect = list.getBoundingClientRect();
        if(rect.left < 0){
            list.style.transform =`translateX(${0}px)`;
        }
    }
}

module.exports = CommandList;