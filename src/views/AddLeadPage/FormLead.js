import m from 'mithril'
import SearchList from '../commons/SearchList'
import settings from '../../data/settings'
import store from '../../data/store'
import Lead from '../../data/Lead'
import {getSourceList,getTypeList} from '../../firebase/qry'

function getList(term, field, model) {
    if (term.length < 2) {
        return [];
    }
    let filter = store[model].filter(el => {
        let search = el[field] || '';
        return search.indexOf(term) !== -1;
    });
    return filter;
}


let Form = (init) => {
    return {
        oninit: vnode => {
            getSourceList();
            getTypeList();
            vnode.state.term = '';
            vnode.state.sourceList = settings.leadSourceList;
            vnode.state.typeList = settings.leadTypeList;
        },
        onbeforeupdate: vnode => {
            vnode.state.list = getList(vnode.state.term, 'name', 'storeLeads');
            console.log(vnode.state)
        },
        view: (vnode) => {
            return (
                m('form#leadForm.form',
                    {
                        style: vnode.attrs.parent.state.activeContact ? "display:block" : "display:none",
                        autocorrect: "off", autocapitalize: "off", spellcheck: "false", autocomplete: "off",
                        onsubmit: (event) => submitForm(event, vnode)
                    },
                    [
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formData.meta.heading)
                        ),
                        renderFormData(vnode.attrs.formData),
                        renderDataLists(vnode.attrs.formData),
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
    let elements = e.target.elements;
    let data = {};
    for (let i in elements) {
        let el = elements[i]
        if (el.name && el.value) {
            data[el.name] = el.value || ""
        }
    }
    let newLead = new Lead('', data);
    let contactPath = `contacts/${vnode.attrs.parent.state.activeContact.id}`;
    newLead.addLeadToExistContact(newLead, contactPath);
    e.target.reset();
    vnode.attrs.parent.state.activeContact = false;
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
    console.log('TODO! append list base on term ');
}

function renderDataLists(vnode) {
    return m('div[type="hidden"]', [
        m('datalist#typeList', [
            m('option','חתונה'),
            m('option','בת מצווה'),
            m('option','חינה'),
        ]),
        m('datalist#sourceList', [
            m('option','פייסבוק'),
            m('option','גוגל'),
            m('option','פה לאוזן'),
        ]),
    ])
}

module.exports = Form
