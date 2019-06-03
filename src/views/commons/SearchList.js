import m from 'mithril'
import Store from '../../data/Store'
import { getDoc } from '../../firebase/qry'

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
            // let displayField = vnode.attrs.displayField;
            return (
                m('.searchList',{style:'display:none'}, [
                    vnode.state.list ?
                        vnode.state.list.map(item => {
                            return (
                                m('.searchList__row',
                                    {
                                        id: item.id,
                                        onclick: e => setActiveContact(e, vnode)
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


function setActiveContact(e, vnode) {
    console.log('START function setActiveContact(e,vnode)');
    let parent = vnode.attrs.parent;
    let pageParent = parent.attrs.parent;
    let elemID = e.path[1].id;
    let docRef = getDoc('contacts', elemID);
    docRef.then(doc => {
        pageParent.state.activeContact = Object.assign(doc.data(), { id: elemID });
        m.redraw();
    })
}

module.exports = SearchList;