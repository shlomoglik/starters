import m from 'mithril'
import SearchList from '../commons/SearchList'
import Store from '../../data/Store'

function getList(term, field,model) {
    if (term.length < 2) {
        return [];
    }
    let filter = Store.storeContacts.filter(el => {
        let search = el.name || '';
        return search.indexOf(term) !== -1;
    });
    return filter;
}


let Form = (init) => {
    return {
        oninit: vnode => {
            vnode.state.term = '';
        },
        onbeforeupdate: vnode => {
            vnode.state.list = getList(vnode.state.term, name);
        },
        view: (vnode) => {
            return (
                m('form#leadForm.form',
                    {   style : vnode.attrs.parent.state.hasContact?"display:block":"display:none",
                        onsubmit: (event) => submitForm(event,vnode) },
                    [
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formData.meta.heading)
                        ),
                        renderFormData(vnode.attrs.formData),
                        m('div', [
                            m('button[class="btn btn--def"]', { type: "submit" }, "הוסף")
                        ])
                    ]
                )
            )
        }
    }
}

function submitForm(e, vnode) {
    e.preventDefault();
    console.log('TODO!! collect form data and insert to database!!')
    e.target.reset();
}

function renderFormData(myData, vnode) {
    let meta = myData.meta;
    let data = myData.data;
    return Object.keys(data).map((k, ind) => {
        let curr = data[k];
        if (data[k].input) {
            return (
                m('.form__row', { key: ind },
                    [
                        m(`input#${k}[class="form__input ${meta.class}"]`,
                            Object.assign({}, curr.input, { oninput: (e) => insertList(e) })),
                        m('label[class="form__label"]', { for: k }, curr.label.text)
                    ])
            )

        } else if (data[k].textarea) {
            return [
                m(`.form__row`, { key: ind },
                    [
                        m(`textarea[class="form__input ${meta.class}"]`, curr.textarea)
                    ])
            ]
        } else {
            return;
        }
    })
}

function insertList(e) {
    console.log('TODO! append list base on term ', e);
}

module.exports = Form
