import m from 'mithril'

const UserPage=(init)=>{
    return {
        view:vnode=>{
            m('.user',[
                m('.user__row',[
                    m('img.user__photo',{alt:"upload your photo"})
                ]),
                m('.user__row',[
                    m('.user__name','שלמה'),
                    m('.user__phone','05423232323'),
                    m('.user__email','test@test.co.il')
                ]),
                m('.user__row',[]),
                m('.user__row',[]),
            ])
        }
    }
}

module.exports = UserPage;