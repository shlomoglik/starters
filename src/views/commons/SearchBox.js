import m from 'mithril'

let SearchBox=(init)=>{
    view:(vnode)=>{
        return(
            m('.searchBox',[
                m('.input[type="search" class="searchBox__input"]'),
                m('svg.searchBox__icon',[
                    m('use',{href:'/public/img/sprite.svg#icon-magnifying-glass'})
                ])
            ])
        )
    }
}

module.exports = SearchBox;