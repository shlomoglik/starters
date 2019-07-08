import m from 'mithril'
import settings from '../../data/settings'
import { addOrUpdateDoc, getStatus , insertDoc } from '../../firebase/qry';
import { toggleGroup, mapToObj } from '../../js/utils';

const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.tasks = [];
            vnode.state.shrink = vnode.attrs.shrink || false;
        },
        oncreate: vnode => {
            getStatus(vnode.attrs.leadID, vnode);
        },
        onbeforeupdate: vnode => {
            buildStatusObj(vnode)
        },
        view: (vnode) => {
            return (
                m('.lead-card', [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    !vnode.state.shrink ?
                        m('.lead-status', [
                            vnode.state.statusObj ?
                                Object.keys(vnode.state.statusObj).map((k, ind) => {
                                    let curr = vnode.state.statusObj[k];
                                    let isDone = curr.done ? true : false;
                                    return (
                                        m('button.lead-status__button',
                                            {
                                                disabled:curr.id =="newLead",
                                                key: ind,
                                                id: curr.id,
                                                class: isDone ? 'lead-status__button--done' : 'lead-status__button--open',
                                                onclick: e => setNewStatus(e, vnode),
                                            }
                                            , curr.status)
                                    )
                                }) : []
                        ]) : []
                ])
            )
        }
    }
}
function buildStatusObj(vnode) {
    if (vnode.state.status) {
        let obj = mapToObj(vnode.state.status);
        let statusObj = settings.setLeadStatus.map(set => {
            let id = set.id;
            return obj[id] ? obj[id] : set;
        })
        console.log(statusObj)
        vnode.state.statusObj = statusObj;
    }
}

function setNewStatus(e, vnode) {
    let el = e.target;
    let status = el.innerText;
    let statusID = el.id;
    let col = `leads/${vnode.attrs.leadID}/status`;
    let done = true;
    let docText = 'עדכון סטטוס ל - ' + status;
    if(el.classList.contains('lead-status__button--done')){
        done = false;
        docText = 'ביטול סטטוס - ' + status;
    }
    let objToUpdate = {status,done};
    addOrUpdateDoc(col, statusID, objToUpdate);
    addFollowDoc(docText , vnode)
}

function addFollowDoc(docText, vnode){
    let ref = `leads/${vnode.attrs.leadID}/followUps`;
    let docToAdd = {date: new Date()  , text:docText};
    insertDoc(ref, docToAdd).then(r => {
        console.log('new doc added', r.path);
        m.redraw();
    });
}

module.exports = Card
