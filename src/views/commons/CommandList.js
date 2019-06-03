import m from 'mithril'

let CommandList = (init) => {
    return {
        view: (vnode) => {
            console.log(vnode.attrs.list)
            return (
                m('.commandList', [
                    vnode.attrs.list.map((item,ind) => {
                        if(item){
                            console.log(item.label)
                            return (
                                m('.commandList__row', { key:ind }, [
                                    m('.commandList__item', item.label),
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