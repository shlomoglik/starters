import m from 'mithril'
import { getDoc } from '../../firebase/qry'

let SearchBox = (init) => {
    let ind = 0;
    return {
        view: (vnode) => {
            return (
                m('.searchBox',
                    [
                        m('input[type="search"][class="searchBox__input"]',
                            {
                                placeholder: vnode.attrs.label || "חפש...",
                                autofocus: true,
                                oninput:(e)=> vnode.attrs.parent.state.term = e.target.value,
                                onkeydown:(e)=>{
                                    let parent = vnode.attrs.parent;
                                    let rows = parent.dom.querySelectorAll('.searchList__row');
                                    if(rows.length==0)return;
                                    if(e.code=='ArrowDown' || e.code =='ArrowUp'){
                                        rows.forEach(row=>row.classList.remove('searchList__row--active'))
                                        console.log(ind,rows.length);
                                        if(ind == rows.length || ind<0)
                                            ind=0;
                                        let row = rows[ind];
                                        row.classList.add('searchList__row--active');
                                        switch (e.code){
                                            case 'ArrowDown':
                                                ind++;
                                                break;
                                            case 'ArrowUp':
                                                ind--;
                                                break;
                                        }
                                    }else if(e.code =='Enter'){
                                        let activeRow = parent.dom.querySelector('.searchList__row--active');
                                        if(!activeRow) return;
                                        setActiveContact(vnode,activeRow.id);
                                    }
                                }
                            }
                        ),
                        m('svg.searchBox__icon', [
                            m('use', { href: '/public/img/sprite.svg#icon-magnifying-glass' })
                        ]),
                    ])
            )
        }
    }
}

function setActiveContact(vnode,elemID) {
    console.log('START function setActiveContact(e,vnode)');
    let parent = vnode.attrs.parent;
    let pageParent = parent.attrs.parent;
    let docRef = getDoc('contacts', elemID);
    docRef.then(doc => {
        pageParent.state.activeContact = Object.assign(doc.data(), { id: elemID });
        console.log(pageParent.state.activeContact);
        m.redraw();
    })
}

module.exports = SearchBox;