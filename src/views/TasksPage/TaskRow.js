import m from "mithril"
import store from '../../data/store'
import {updateDoc} from '../../firebase/qry'
import {dateDiffDays} from '../../js/utils'

let TaskRow = (init) => {
    return {
        oninit: vnode =>{
            getLeadData(vnode);
        },
        view: (vnode) => {
            let task = vnode.attrs.task;
            let follow = 'לא הוגדר';
            if (task.followDate) {
                // follow = task.followDate.toDate().getDate() + '/' + Number(task.followDate.toDate().getMonth()+1) + '/' + task.followDate.toDate().getFullYear();
                follow =  dateDiffDays(task.followDate.toDate());
                console.log(follow)
            };
            return (
                m(".tasks__row",
                    {
                        id: task.id, 
                        onclick: e=>navigateToTask(e,vnode)
                    }, [
                        m(".tasks__cell.tasks__follow", follow),
                        m(".tasks__cell", task.text),
                        m(".tasks__cell.tasks__link", {onclick: e=>navigateToLead(e,vnode)} , vnode.state.leadData?vnode.state.leadData.description:'לא משוייך לליד' ),
                        m('button.tasks__cell.tasks__button', { onclick: e => closeTask(e, vnode) }, 'בוצע')
                    ])
            )
        }
    }
}

function navigateToLead(e,vnode){
    if(e.target.innerText=="לא משוייך לליד"){
        return;
    }else{
        m.route.set(`/myLeads/${vnode.state.leadID}`);
    }
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