import m from 'mithril'
import FilterInline from '../commons/FiltersInline'
import SearchBox from '../commons/SearchBox'
import SearchList from '../commons/SearchList'
import CommandList from '../commons/CommandList'
import Store from '../../data/Store'

function getList(term, field, model) {
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
            vnode.state.activeContact = { "name": "שלמה", "email": "shlomoglik@gmail.com", "phone": "053-3393623" }
        },
        onbeforeupdate: vnode => {
            vnode.state.list = getList(vnode.state.term, name);
        },
        view: (vnode) => {
            if (vnode.attrs.parent.state.hasContact) {
                return (
                    m('.form',
                        renderExistData(vnode.state.activeContact , vnode)       
                    )
                )
            } else {
                return (
                    m('form.form',
                        {
                            onsubmit: (event) => submitForm(event, vnode),
                        },
                        [
                            m('.heading', m('.heading__secondary', vnode.attrs.formData.meta.heading)),
                            m(FilterInline, { filters: vnode.attrs.filters }),
                            vnode.attrs.filters.map(filter => {
                                if (filter.active) {
                                    if (filter.type == 'add') {
                                        return renderFormData(vnode.attrs.formData)
                                    } else if (filter.type == 'search') {
                                        return [
                                            m('.form__row', { style: "position:relative" }, [
                                                m(SearchBox, { label: 'חפש איש קשר', parent: vnode }),
                                                m(SearchList, { parent: vnode, displayField: 'name' })
                                            ])
                                        ]
                                    }
                                }
                            }),
                            m('div', [
                                m('button[class="btn btn--def"]',
                                    {
                                        type: "submit",
                                        onclick: (event) => {
                                            vnode.attrs.parent.state.hasContact = true;
                                            // vnode.cmdList.style.display ='block';
                                        }
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
    console.log('TODO!! collect form data and insert to database!!')
    e.target.reset();
}
function renderExistData(activeContact,vnode) {
    let cmdList =[{cmd:'markAsMain',label:'הגדר כעיקרי'},{cmd:'edit',label:'ערוך איש קשר'},{cmd:'delete',label:'מחק איש קשר'},{cmd:'unAssign',label:'הסר מליד זה'}]
    return m('.row',[
        m('svg.row__icon',m('use',{href:'/public/img/sprite.svg#icon-user'})),
        Object.keys(activeContact).map((k, ind) => {
            return m('span.row__span', activeContact[k])
        }),
        m('button.btn.btn--round',
            {onclick:(e)=>showCmdList(e,vnode)},
            m('svg.row__icon',m('use',{href:'/public/img/sprite.svg#icon-dots-three-vertical'}))),
        m(CommandList,{list:cmdList})
    ]
    )
}

function renderFormData(myData, vnode) {
    let meta = myData.meta;
    let data = myData.data;
    return Object.keys(data).map((k, ind) => {
        let curr = data[k];
        console.log(k, ind);
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
function showCmdList(e,vnode){
    console.log('cmd list is: ',vnode.dom.querySelector('#cmdList'));
    
}
function insertList(e) {
    console.log('TODO! append list base on term ', e);
}

module.exports = Form
