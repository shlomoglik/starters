import m from 'mithril'
import FormList from '../commons/Forms/FormList';
import { insertDoc, updateDoc , getTasks } from '../../firebase/qry';
import { toggleGroup } from '../../js/utils';


const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.tasks = [];
            vnode.state.shrink = vnode.attrs.shrink || true;
            vnode.state.counter = 0;
        },
        onbeforeupdate: vnode => {
            getFilterTasks(vnode);
            getDist(vnode);
        },
        oncreate: vnode => {
            getTasks(vnode.attrs.leadID, vnode);
        },
        view: (vnode) => {
            return (
                m('.lead-card', [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title + ` (${vnode.state.counter})`),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    !vnode.state.shrink ?
                        m('.lead-tasks', [
                            m('.lead-tasks__list', [
                                vnode.state.openTasks ?
                                    vnode.state.openTasks.map((doc, ind) => {
                                        let date = doc.dueDate.toDate();
                                        let d = date.getDate() + '/' + date.getMonth() /*  + '/' + item.date.toDate().getFullYear() */;
                                        return (
                                            m('.lead-tasks__row', { key: ind, id: doc.id }, [
                                                m('.lead-tasks__date', d),
                                                m('.lead-tasks__text', doc.text),
                                                m('button.lead-tasks__button', { onclick: e => closeTask(e, vnode) }, 'בוצע')
                                            ])
                                        )
                                    })
                                    : [] ,
                            ]),
                            vnode.state.closedTasks.length > 0 ?
                            m('.lead-tasks__section-row',{onclick:e=>toggleNext(e,vnode)},[
                                m('.lead-tasks__section-title',`משימות שנסגרו (${vnode.state.countClosed ? vnode.state.countClosed : '' })`),
                                m('svg#arrow.setGroup__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down'}))
                            ]) : [],
                            m('div#doneList.lead-tasks__list.lead-tasks__list--done',{style:"display:none;"} ,  [
                                vnode.state.closedTasks ?
                                    vnode.state.closedTasks.map((doc, ind) => {
                                        let date = doc.dueDate.toDate();
                                        let d = date.getDate() + '/' + date.getMonth() /*  + '/' + item.date.toDate().getFullYear() */;
                                        return (
                                            m('.lead-tasks__row.lead-tasks__row--done', { key: ind, id: doc.id }, [
                                                m('.lead-tasks__date.lead-tasks__date--done', d),
                                                m('.lead-tasks__text.lead-tasks__text--done', doc.text),
                                                m('button.lead-tasks__button.lead-tasks__button--done', { onclick: e => reOpenTask(e, vnode) }, 'שחזר')
                                            ])
                                        )
                                    })
                                    : [] ,
                            ]),
                            m(FormList, { submitFunc: e => addToList(e, vnode) })
                        ]) : []
                ])
            )
        }
    }
}

function getFilterTasks(vnode) {
    if (vnode.state.tasks) {
        let openTasks = vnode.state.tasks.filter(d=>d.done==false);
        let closedTasks = vnode.state.tasks.filter(d=>d.done==true);

        vnode.state.openTasks = openTasks;
        vnode.state.closedTasks = closedTasks;
        vnode.state.counter = openTasks.length;
        vnode.state.countClosed = closedTasks.length;
    }
}
function toggleNext(e,vnode){
    let list = vnode.dom.querySelector('#doneList');
    if(list.style.display =='none'){
        list.style.display = "block";
    }else{
        list.style.display = "none";
    }
}
function getDist(vnode) {
    // if(vnode.state.tasks !== []){
    //     console.log('before sorting: ',vnode.state.tasks);
    //     let sorted = vnode.state.tasks.sort(compareDates);
    //     console.log('after sorting: ',sorted);
    // }
}
function closeTask(e,vnode){
    let col = `leads/${vnode.attrs.leadID}/tasks`;
    let taskID = e.path[1].id;
    let objToUpdate = {"done":true};
    updateDoc(col, taskID, objToUpdate);
}
function reOpenTask(e, vnode){
    console.log('TODO!! re open task by mark "done:false"');
    let col = `leads/${vnode.attrs.leadID}/tasks`;
    let taskID = e.path[1].id;
    let objToUpdate = {"done":false};
    updateDoc(col, taskID, objToUpdate);
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

function addToList(e, vnode) {
    e.preventDefault();
    let form = e.target;
    let val = form.elements[0].value;
    let doc = { date: new Date(), dueDate: new Date(), text: val, done: false };
    let ref = `leads/${vnode.attrs.leadID}/tasks`;
    console.log('add to this ref ', ref, '\rthis doc', JSON.stringify(doc));
    insertDoc(ref, doc).then(r => {
        console.log('new doc added', r.path);
        m.redraw();
    });
    form.reset();
}

module.exports = Card
