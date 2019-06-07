import m from "mithril"

let Lead = (init) => {
    return {
        oinint: vnode => {
            console.log('lead page is init!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        },
        view: (vnode) => {
            return (
                m('.lead', [
                    m('.lead__row', [
                        m('p', 'mytext goes here!!!!!!!!!!!!!!!!')
                    ])
                ])
            )
        }
    }
}

module.exports = Lead;