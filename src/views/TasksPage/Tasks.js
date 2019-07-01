import m from "mithril"
import TaskRow from './TaskRow'
import { getAllTasks } from '../../firebase/qry'
import store from '../../data/store'

const Tasks = (init) => {
    return {
        onbeforeupdate: vnode => {
            getAllTasks();
        },
        view: vnode => {
            let openTasksData = store.storeTasks.filter(task=>task.done !== true);
            if (!openTasksData[0]) {
                return m('.tasks.tasks--empty', { "data-empty": "כל הכבוד אין משימות פתוחות" })
            } else {
                return (
                    m(".tasks", [
                        m('.tasks__heading', [
                            m(".tasks__cell", "פולואפ"),
                            m(".tasks__cell", "משימה"),
                            m(".tasks__cell", "שיוך לליד"),
                            m(".tasks__cell", "ביצוע"),
                        ]),
                        openTasksData.map(task => {
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


module.exports = Tasks;