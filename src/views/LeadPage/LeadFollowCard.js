import m from 'mithril'
import FormList from '../commons/Forms/FormList';
import {insertDoc , getFollowUps} from '../../firebase/qry';
import {toggleGroup} from '../../js/utils';

const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.followUps = [];
            vnode.state.shrink = vnode.attrs.shrink || true;
            vnode.state.counter = 0;
        },
        onbeforeupdate: vnode =>{
            getCounter(vnode);
            getDist(vnode);
        },
        oncreate: vnode => {
            let stop = getFollowUps(vnode.attrs.leadID , vnode);
        },
        view: (vnode) => {
            return (
                m('form.lead-card', { onsubmit: e => updateChanges(e, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title + ` (${vnode.state.counter})`  ),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    !vnode.state.shrink ?
                        m('.lead-follow',[
                            m('.lead-follow__list',[
                                vnode.state.followUps.map((item,ind)=>{
                                    let date = item.date.toDate();
                                    let followDate = date.getDate() + '/' + date.getMonth() /*  + '/' + item.date.toDate().getFullYear() */;
                                    return(
                                        m('.lead-follow__row',{key:ind , id:item.id},[
                                            m('.lead-follow__date',followDate),
                                            m('.lead-follow__text',item.text),
                                        ])
                                    )
                                })
                                // m('.lead-follow__row',[
                                //     m('.lead-follow__date','12/7'),
                                //     m('.lead-follow__text','הייתה פגישה מדהימה , רוצים לסגור רק מבררים תאריך'),
                                // ]),
                                // m('.lead-follow__row',[
                                //     m('.lead-follow__date','13/7'),
                                //     m('.lead-follow__text','נשלחה הצעת מחיר והזמנה לחתימה'),
                                // ]),
                                // m('.lead-follow__row',[
                                //     m('.lead-follow__date','15/7'),
                                //     m('.lead-follow__text','כאן תבוא שורה לדוגמא עם המון טקסטס כך שצריך לבחון את ההתנהגות של העיצוב במצב כזה'),
                                // ]),
                            ]),
                            m(FormList,{submitFunc: e =>addToList(e,vnode)})
                        ]) : []
                ])
            )
        }
    }
}

function getCounter(vnode){
    if(vnode.state.followUps){
        vnode.state.counter = vnode.state.followUps.length
    }
}
function getDist(vnode){
    if(vnode.state.followUps !== []){
        console.log('before sorting: ',vnode.state.followUps);
        let sorted = vnode.state.followUps.sort(compareDates);
        console.log('after sorting: ',sorted);
    }
}

function compareDates(a, b) {
    let aNum = +a.date.toDate();
    let bNum = +b.date.toDate();
    if (aNum > bNum) {
        return -1; // swap
    } else if (aNum < bNum) {
        return 1;
    } else {
        return 0; //dont do nothing
    }
}

function addToList(e,vnode){
    e.preventDefault();
    let form = e.target;
    let val = form.elements[0].value;
    let doc = {date:new Date(),text:val};
    let ref = `leads/${vnode.attrs.leadID}/followUps`;
    console.log('add to this ref ',ref ,'\rthis doc', JSON.stringify(doc));
    insertDoc(ref, doc).then(r => {
        console.log('new doc added', r.path);
        m.redraw();
    });
    form.reset();
}

module.exports = Card
