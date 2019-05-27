import m from 'mithril'
import Contact from '../../data/Contact'
import Lead from '../../data/Lead'
import FilterInline from '../commons/FiltersInline'
import SearchList from '../commons/SearchList'

let list = [
    { term: 'שלמה', id: 'ased' },
    { term: 'שלמה גליקמן', id: 'gwer' },
    { term: 'שלמה גליקמן', id: 'jsar' },
];

let FormLead = (init) => {
    return {
        view: (vnode) => {
            return (
                m('form.addLead__form form', { onsubmit: (event, vnode) => submitForm(event, vnode) }
                    , [
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formDataContact.meta.heading)
                        ),
                        m(FilterInline,{filters:vnode.attrs.filters}),
                        renderFormData(vnode.attrs.formDataContact),
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formDataLead.meta.heading)
                        ),
                        renderFormData(vnode.attrs.formDataLead),
                        m('form__row',[
                            m('button[class="btn btn--def"]',{type:"submit"},"הוסף")
                        ])
                    ]
                )
            )

            //         <div class="form__row form__select-group">
            //             <button type="button" class="form__select-item form__select-item--active" id="add">איש קשר חדש</button>
            //             <button type="button" class="form__select-item" id="exist">איש קשר קיים</button>
            //         </div>
        }
    }
}

function submitForm(e, vnode) {
    console.log(e);
    e.preventDefault();
    let newContactData = getDataByClass(vnode, 'Contact');
    let newLeadData = getDataByClass(vnode, 'Lead');
    let newContact = new Contact('', newContactData);
    let newLead = new Lead('', newLeadData);
    Lead.addLeadAndContact(newContact, newLead);
    e.target.reset();
}

function renderFormData(myData,vnode) {
    let meta = myData.meta;
    let data = myData.data;
    return Object.keys(data).map((k, ind) => {
        let curr = data[k];
        if (data[k].input) {
            return [
                m('.form__row', { key: ind },
                    [
                        m(`input#${k}[class="form__input ${meta.class}"]`, curr.input),
                        m('label[class="form__label"]', { for: k }, curr.label.text)
                    ])
            ]
        } else if (data[k].textarea) {
            return [
                m('.form__row', { key: ind },
                    [
                        m(`textarea[class="form__input ${meta.class}"]`, curr.input)
                    ])
            ]

        }else{
            return;
        }
    })
}

function getDataByClass(vnode, className) {
    let elements = vnode.dom.querySelectorAll("." + className);
    let data = {};
    for (let i in elements) {
        let el = elements[i]
        if (el.name) {
            data[el.name] = el.value || ""
        }
    }
    return data;
};

module.exports = FormLead
