import m from "mithril"
import settings from '../../data/settings'

const Tasks = (init) => {
    return {
        view: vnode => {
            let tasksData = getMyTasks(vnode);
            if (!tasksData[0]) {
                return m('.tasks.tasks--empty', { "data-empty": "כל הכבוד אין משימות פתוחות" })
            } else {
                return (
                    m(".tasks", [
                        m('.tasks__heading', [
                            m(".tasks__cell", "משימה"),
                            m(".tasks__cell", "תיאור"),
                            m(".tasks__cell", "פולואפ")
                        ]),
                        tasksData.map(task => {
                            return (
                                m(TaskRow, { task: task })
                            )
                        })
                    ])
                )
            }
        }
    }
}


function getMyTasks(vnode) {
    // add filter to get my tasks
    return [];
}

module.exports = Tasks;