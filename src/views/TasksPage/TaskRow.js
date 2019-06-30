import m from "mithril"

let TaskRow = (init) => {
    return {
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
                        id: task.leadID , 
                        onclick: e=>navigateToLead(e,vnode)
                    }, [
                        m(".tasks__cell",task.title),
                        m(".tasks__cell.tasks__desc", task.description),
                        m(".tasks__cell.tasks__follow", follow)
                    ])
            )
        }
    }
}

function navigateToLead(e,vnode){
    m.route.set(`/myLeads/${vnode.attrs.task.leadID}`);
}

module.exports = TaskRow;