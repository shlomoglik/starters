import m from 'mithril'

let CommandList = (init) => {
    return {
        view: (vnode) => {
            return (
                m('.commandList', [
                    vnode.attrs.list.map((item,ind) => {
                        if(item){
                            return (
                                m('.commandList__row', { key:ind }, [
                                    m('.commandList__item', item),
                                    m('svg.commandList__select', [
                                        m('use', { href: '/public/img/sprite.svg#icon-add-to-list' })
                                    ])
                                ])
                            )
                        }else{
                            return [];
                        }
                    })
                ])
            )
        }
    }
}

module.exports = CommandList;