import m from 'mithril'

let SearchList = (init) => {
    return {
        oninit: (vndoe) => {
            console.log('init search list')
        },
        oncreate:(vnode)=>{
            console.log(vnode.dom)
        },
        view: (vnode) => {
            return (
                m('.searchList', [
                    vnode.attrs.list.map(item => {
                        return (
                            m('.searchList__row',{id:item.id}, [
                                m('.searchList__item', item.term),
                                m('svg.searchList__select',[
                                    m('use', { href: '/public/img/sprite.svg#icon-add-to-list'})
                                ])
                            ])
                        )
                    })
                ])
            )
        }
    }
}

module.exports = SearchList;