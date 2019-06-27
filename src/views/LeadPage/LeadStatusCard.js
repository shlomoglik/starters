import m from 'mithril'
import settings from '../../data/settings'
import { addOrUpdateDoc, getStatus } from '../../firebase/qry';
import { toggleGroup, mapToObj } from '../../js/utils';

const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.tasks = [];
            vnode.state.shrink = vnode.attrs.shrink || true;
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
        vnode.state.statusObj = statusObj;
    }
}

function setNewStatus(e, vnode) {
    let el = e.target;
    let text = el.innerText;
    let statusID = el.id;
    let col = `leads/${vnode.attrs.leadID}/status`;
    let objToUpdate = {
        status: text,
        done: true
    };
    addOrUpdateDoc(col, statusID, objToUpdate);
}


module.exports = Card
