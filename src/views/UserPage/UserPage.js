import m from 'mithril';
import User from '../../data/User'
import Header from '../commons/Header/HeaderFullPage'


const UserPage=(init)=>{

    const getUserData = (vnode)=>{
        vnode.state.user = User.getUser()["_data"];
        console.log(User.getUser());
    }

    const getPhoto = ()=>{
        if(false){
            console.log('bla bla bla')
            return m('img.user__photo',{src:"#",alt:""})
        }else{
            return m('svg.user__photo',m('use',{href:"/img/sprite.svg#icon-user"}))
        }
    }

    return {
        oninit:vnode=>{
            getUserData(vnode);
            console.log(m.route.get());
        },
        view:vnode=>{
            let user = vnode.state.user;
            return (
                m('.user',[
                    m(Header , {title:"פרופיל משתמש",backTo:false}),
                    m('form.user__form',[
                        m('.user__row',[
                            getPhoto()
                        ]),
                        m('.user__row',[
                            m('input[type="text"].user__input user__name',{value:user.name ||''}),
                            m('label.user__label','שם')
                        ]),
                        m('.user__row',[
                            m('input[type="phone"].user__input user__phone',{value:user.phone||''}),
                            m('label.user__label','טלפון')
                        ]),
                        m('.user__row',[
                            m('input[type="email"].user__input user__email',{value:user.email||''}),
                            m('label.user__label','אימייל')
                        ]),
                    ]),
                ])
            )
        }
    }
}

module.exports = UserPage;