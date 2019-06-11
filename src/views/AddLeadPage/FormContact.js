import m from 'mithril'
import FilterInline from '../commons/FiltersInline'
import SearchBox from '../commons/SearchBox'
import SearchList from '../commons/SearchList'
import CommandList from '../commons/CommandList'
import Contact from '../../data/Contact'
import store from '../../data/store'


let Form = (init) => {
    return {
        oninit: vnode => {
            vnode.state.term = '';
        },
        onbeforeupdate: vnode => {
            vnode.state.list = getList(vnode.state.term, 'name', 'storeContacts');
        },
        view: (vnode) => {
            if (vnode.attrs.parent.state.activeContact) {
                return (
                    m('.form',
                        renderActiveContact(vnode.attrs.parent.state.activeContact, vnode)
                    )
                )
            } else {
                return (
                    m('form.form',
                        {
                            autocorrect: "off", autocapitalize: "off", spellcheck: "false", autocomplete: "off",
                            onsubmit: (event) => submitForm(event, vnode),
                        },
                        [
                            m('.heading', m('.heading__secondary', vnode.attrs.formData.meta.heading)),
                            m(FilterInline, { filters: vnode.attrs.filters }),
                            vnode.attrs.filters.map(filter => {
                                if (filter.active) {
                                    if (filter.type == 'add') {
                                        return renderFormData(vnode.attrs.formData, vnode)
                                    } else if (filter.type == 'search') {
                                        return [
                                            m('.form__row', { style: "position:relative" }, [
                                                m(SearchBox, { label: 'חפש איש לפי שם', parent: vnode }),
                                                m(SearchList, { parent: vnode, displayField: 'name', list: vnode.state.list })
                                            ])
                                        ]
                                    }
                                }
                            }),
                            m('div', [
                                m('button[class="btn btn--def"]',
                                    {
                                        type: "submit",
                                    }
                                    , "הוסף")
                            ])
                        ]
                    )
                )
            }
        }
    }
}

function submitForm(e, vnode) {
    e.preventDefault();
    vnode.attrs.filters.map(filter => {
        if (filter.active) {
            if (filter.type !== 'add') {
                return;
            } else {
                let elements = e.target.elements;
                let data = {};
                for (let i in elements) {
                    let el = elements[i]
                    if (el.name && el.value) {
                        data[el.name] = el.value || ""
                    }
                }
                console.log(data);
                if (data == {}) return;
                let newContact = new Contact('', data);
                newContact.add('contacts').then(
                    doc => {
                        vnode.attrs.parent.state.activeContact = newContact._data;
                        vnode.attrs.parent.state.activeContact['id'] = newContact.getID();
                        e.target.reset();
                        m.redraw();
                    }, err => console.error(err)
                );
            }
        }
    });

}


function getList(term, field, model) {
    if (term.length < 2) {
        return [];
    }
    let filter = store[model].filter(el => {
        let search = el[field] || '';
        return search.indexOf(term.trim()) !== -1;
    });
    return filter;
}



function renderActiveContact(activeContact, vnode) {
    let cmdList = [
        { cmd: 'unAssign', label: 'הסר מליד זה', func: e => vnode.attrs.parent.state.activeContact = false },
        { cmd: 'markAsMain', label: 'הגדר כעיקרי', func: e => console.log('TODO! change role to main') },
        { cmd: 'edit', label: 'ערוך איש קשר', func: e => console.log('TODO! goto contact full page via contacts/:id ') },
    ]
    return m(`.row#${activeContact.id}`, [
        m('svg.row__icon', m('use', { href: '/public/img/sprite.svg#icon-user' })),
        Object.keys(activeContact).map((k, ind) => {
            if (k == 'id') return '';
            return m('span.row__span', activeContact[k]);
        }),
        m(CommandList, { list: cmdList })
    ]
    )
}

function renderFormData(myData, vnode) {
    let meta = myData.meta;
    let data = myData.data;
    return Object.keys(data).map((k, ind) => {
        let curr = data[k];
        vnode.state[`term${k}`] = '';
        if (data[k].input) {
            return (
                m('.form__row', { key: ind, style: "position:relative" },
                    [
                        m(`input#${k}[class="form__input ${meta.class}"]`,
                            Object.assign({}, curr.input,
                                {
                                    onkeyup: e => {
                                        vnode.state[`term${k}`] = e.target.value;
                                        vnode.state[`list${k}`] = getList(vnode.state[`term${k}`], k, 'storeContacts');
                                        validateInput(e);
                                    }
                                })
                        ),
                        m('label[class="form__label"]', { for: k }, curr.label.text),
                        m(SearchList, { parent: vnode, inputID: k, list: vnode.state[`list${k}`] }) // should crete list dynamicly for each input
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

function validateInput(e){
    let row = e.path[1]; //one level up = row
    let list = row.querySelectorAll('.searchList > .searchList__row');
    console.log(list);
    console.log(list.length);
    if(list.length>0){
        e.target.setCustomValidity('כבר קיים ערך כזה , הזן ערך חדש או בחר מתוך הרשימה')
    }else{
        e.target.setCustomValidity('')
    }
}


module.exports = Form
