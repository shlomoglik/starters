import m from 'mithril'
import settings from '../../data/settings'
import store from '../../data/store'
import Lead from '../../data/Lead'


let Form = (init) => {
    return {
        oninit: vnode => {
            vnode.state.term = '';
        },
        onbeforeupdate: vnode => {
            vnode.state.list = getList(vnode.state.term, 'name', 'storeLeads');
        },
        view: (vnode) => {
            let obj = settings["formDataLeadArr"];
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
                        // renderFormData(vnode.attrs.formData , vnode),
                        // renderDataLists(vnode),
                        obj.map((curr, ind) => {
                            let inputType = curr["meta"]["inputType"];
                            let inputKey = curr["meta"]["inputID"];
                            let labelText = curr["label"] ? curr["label"]["text"] : '';
                            switch (true) {
                                case (inputType == 'input'):
                                    console.log(inputKey)
                                    return m('.form__row',{key:`formRow${ind}`}, [
                                        m(`input#${inputKey}.form__input`,curr["options"]),
                                        m('labe.form__label',{for: inputKey},labelText)
                                    ]);
                                case (inputType == 'textarea'):
                                    return m('.form__row', { key: `formRow${ind}`, style: "position:relative" }, [
                                        m(`textarea.form__input`, curr["options"]),
                                    ]);
                                    // return m('div', "text area")
                                case (inputType == 'select'):
                                    let dataList = curr["meta"]["list"];
                                    return m('.form__row', { key: `formRow${ind}`, style: "position:relative" }, [
                                        m(`select.form__input.form__select`, curr["options"], [
                                            m('option', { value: '' }, '--בחר--'),
                                            settings[dataList].map((item, i) => {
                                                return m('option', { key: `opt${i}`, value: item.id }, item.label);
                                            })
                                        ]),
                                    ]);
                                    // return m('div', "select")
                            }
                        }),
                        m('div', [
                            m('button[class="btn btn--def"]', { type: "submit" }, "הוסף")
                        ])
                    ]
                )
            )
        }
    }
}

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
                            Object.assign({}, curr.input, { oninput: (e) => validateList(e, vnode) })),
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

function validateList(e, vnode) {
    let target = e.target;
    let data = target.value;
    let listID = target.getAttribute('list');
    if (!listID) return;
    let datalist = vnode.dom.querySelector('#' + listID);
    let options = datalist.options;
    let found = false;
    for (let i in options) {
        if (options[i].value == data) {
            found = true;
        }
    }
    if (found) {
        target.setCustomValidity('');
    } else {
        target.setCustomValidity('יש לבחור ערך חוקי מתוך הרשימה בלבד');
    }
}

function renderDataLists(vnode) {
    return m('div[type="hidden"]', [
        m('datalist#typeList', [
            settings.leadTypeList.map((item, ind) => {
                return m('option', { id: item.id, key: ind }, item.label)
            })
        ]),
        m('datalist#sourceList', [
            settings.leadSourceList.map((item, ind) => {
                return m('option', { id: item.id, key: ind }, item.label)
            })
        ]),
    ])
}

module.exports = Form
