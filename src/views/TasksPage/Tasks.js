import m from "mithril"
import TaskRow from './TaskRow'
import Snackbar from '../commons/Snackbar';
import store from '../../data/store'

const Tasks = (init) => {
    return {
        oninit: vnode =>{
            vnode.state.openTasks = [];
        },
        onbeforeupdate: vnode =>{
            vnode.state.openTasks = store.storeTasks.filter(task=>task.done !== true);
        },
        view: vnode => {
            if (!vnode.state.openTasks[0]) {
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
                        vnode.state.openTasks.map(task => {
                            return (
                                m(TaskRow, { task: task })
                            )
                        }),
                        m(Snackbar , {oncreate:node=>node.dom.classList.add('snackbar__show')  , text:`שים לב! יש לך ${vnode.state.openTasks.length} משימות פתוחות לטיפול`})
                    ])
                )
            }
        }
    }
}


module.exports = Tasks;