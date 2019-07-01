import m from 'mithril'
import Tasks from './Tasks';
import Header from '../commons/Header/Header';
import Bottom from '../commons/Menus/BottomMenu';
import ScrollTop from '../commons/ScrollTop'

const TasksPage = (init)=>{
    return{
        oninit: vnode =>{
            window.scrollTo(0,0);
        },
        view: vnode =>{
            return (
                m(".container--myTasks",[
                    m(Header , {title:"המשימות שלי"}),
                    m('main.myTasks',[
                        m(Tasks , {})
                    ]),
                    m(Bottom),
                    m(ScrollTop)
                ])
            )
        }
    }
}

module.exports = TasksPage;