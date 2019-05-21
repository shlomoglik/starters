import m from 'mithril'
import SearchBox from '../commons/SearchBox'

let Search= (init) =>{
    view:(vnode)=>{
        return(
            m('.result',['results'])
        )
    }
}

module.exports = Search;