import m from "mithril"
import store from '../../data/store'
import {updateDoc} from '../../firebase/qry'

let TaskRow = (init) => {
    return {
        oninit: vnode =>{
            getLeadData(vnode);
        },
        view: (vnode) => {
            let task = vnode.attrs.task;
            let follow = 'היום';
            if (task.followDate) {
                follow = task.followDate.toDate().getDate() + '/' + task.followDate.toDate().getMonth() + '/' + task.followDate.toDate().getFullYear();
                let dist = (new Date().setTime(0) - task.followDate.toDate().setTime(0));
                if (dist == 0) {
                    follow = 'היום'
                }
            };
            return (
                m(".tasks__row",
                    {
                        id: task.id, 
                        onclick: e=>navigateToTask(e,vnode)
                    }, [
                        m(".tasks__cell.tasks__follow", follow),
                        m(".tasks__cell", task.text),
                        m(".tasks__cell.tasks__link", {onclick: e=>navigateToLead(e,vnode)} , vnode.state.leadData.description),
                        m('button.tasks__cell.tasks__button', { onclick: e => closeTask(e, vnode) }, 'בוצע')
                    ])
            )
        }
    }
}

function navigateToLead(e,vnode){
    m.route.set(`/myLeads/${vnode.state.leadID}`);
}
function navigateToTask(e,vnode){
    console.log('TODO nav to task popup or page by set task id as param to routes ',vnode.dom.id);
}
function closeTask(e,vnode){
    let col = `leads/${vnode.state.leadID}/tasks`;
    let taskID = e.path[1].id;
    let objToUpdate = {"done":true};
    updateDoc(col, taskID, objToUpdate);
}

function getLeadData(vnode){
    let ref = vnode.attrs.task.ref;
    let regex = /leads\/([^\/]+)/.exec(ref);
    let leadID = regex[1]
    vnode.state.leadID = leadID;
    let filter = store.storeLeads.filter(lead=> lead.id ==vnode.state.leadID);
    vnode.state.leadData = filter[0]; 
}


module.exports = TaskRow;