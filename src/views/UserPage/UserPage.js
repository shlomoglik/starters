import m from 'mithril';
import User from '../../data/User'
import Header from '../commons/Header/HeaderFullPage'


const UserPage = (init) => {
    const getUserData = () => {
        init.state.user = User.getUser();
    }

    const updateUser = (e) => {
        console.log('START function updateUser',e,e.target);
        e.preventDefault();
    }

    const getPhoto = () => {
        if (false) { // if has photo
            console.log('bla bla bla')
            return m('img.user__photo', { src: "#", alt: "" })
        } else {
            return m('svg.user__photo', m('use', { href: "/img/sprite.svg#icon-user" }))
        }
    }

    return {
        oninit: getUserData,
        oncreate: vnode => {
            let dom = vnode.dom;
            // let inputs = dom.querySelectorAll('input');
            // const log =e=>console.log(e,e.target)
            // inputs.forEach(input=>{
            //     input.addEventListener('keyup',log)
            // })
        },
        view: vnode => {
            let user = vnode.state.user;
            return (
                m('.user', [
                    m(Header, { title: "פרופיל משתמש", backTo: false }),
                    m(`form.user__form#${user.id}`,
                        {onsubmit:updateUser},
                        [
                            m('.user__row', [
                                getPhoto()
                            ]),
                            m('.user__row', [
                                m('input[type="text"].user__input user__name', { value: user._data.name || '' }),
                                m('label.user__label', 'שם')
                            ]),
                            m('.user__row', [
                                m('input[type="phone"].user__input user__phone', { value: user._data.phone || '' }),
                                m('label.user__label', 'טלפון')
                            ]),
                            m('.user__row', [
                                m('input[type="email"].user__input user__email', { value: user._data.email || '' }),
                                m('label.user__label', 'אימייל')
                            ]),
                            m('button[type="submit"].btn.btn--def', 'הוסף')
                        ]),
                ])
            )
        }
    }
}

module.exports = UserPage;