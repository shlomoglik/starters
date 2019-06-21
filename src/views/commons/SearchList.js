import m from 'mithril'

let SearchList = (init) => {
    return {
        oninit:(vnode)=>{
            vnode.attrs.parent.state.list = false;
        },
        onbeforeupdate:(vnode)=>{
            vnode.state.list = vnode.attrs.list;
        },
        onupdate:(vnode)=>{
            if(vnode.dom.querySelectorAll('.searchList__row').length ==0){
                vnode.dom.style.display ='none';
            }else{
                vnode.dom.style.display ='block';
            }
        },
        view: (vnode) => {
            return (
                m('.searchList',{style:'display:none'}, [
                    vnode.state.list ?
                        vnode.state.list.map(item => {
                            return (
                                m('.searchList__row',
                                    {
                                        id: item.id,
                                        onclick: e => vnode.attrs.func(e)
                                    }
                                    , [
                                        Object.keys(item).map( (k,ind)=>{
                                            if(k=='id')return; 
                                            return m('.searchList__item', item[k]);
                                        }),
                                        m('svg.searchList__select', [
                                            m('use', { href: '/public/img/sprite.svg#icon-add-to-list' })
                                        ])
                                    ])
                            )
                        }) : []
                ])
            )
        }
    }
}

module.exports = SearchList;