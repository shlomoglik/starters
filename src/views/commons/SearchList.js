import m from 'mithril'

let SearchList = (init) => {
    return {
        oninit: (vndoe) => {
            console.log('init search list')
        },
        onupdate:(vnode)=>{
            console.log(vnode.attrs.parent.state)
        },
        view: (vnode) => {
            let displayField = vnode.attrs.displayField;
            return (
                m('.searchList', [
                    vnode.attrs.parent.state.list.map(item => {
                        if(item){
                            return (
                                m('.searchList__row', { id: item.id }, [
                                    m('.searchList__item', item[displayField]),
                                    m('svg.searchList__select', [
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

module.exports = SearchList;