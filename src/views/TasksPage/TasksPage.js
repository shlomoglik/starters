import m from 'mithril'
import Header from '../commons/Header/Header';
import Bottom from '../commons/Menus/BottomMenu';

const TasksPage = (init)=>{
    return{
        view: vnode =>{
            return (
                m(".container--tasks",[
                    m(Header , {title:"המשימות שלי"}),
                    m('main.myTasks',[
                        'כל המשימות שלי'
                    ]),
                    m(Bottom )
                ])
            )
        }
    }
}

module.exports = TasksPage;