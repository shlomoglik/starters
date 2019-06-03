import m from 'mithril'
import Contact from '../../data/Contact'
import Lead from '../../data/Lead'
import FilterInline from '../commons/FiltersInline'
import SearchBox from '../commons/SearchBox'
import SearchList from '../commons/SearchList'
import { relative } from 'path';

function getList(term){
    console.log('TODO! list from store and filter by term')
    let list =[];
    if(term=='שלמה'){
        list = [
            { data: 'שלמה רובין', id: 'ased' },
            { data: 'שלמה גליקמן', id: 'gwer' },
            { data: 'שלמה ארצי', id: 'jsar' },
        ];
    }else if(term=='מזל'){
            list = [
                { data: 'מזל טוב', id: 'serg' },
                { data: 'מזל גלוש', id: 'ibsh' },
                { data: 'מזלגות וכוסות', id: 'qbtd' },
            ];
    }
    return list;
}


let FormLead = (init) => {
    return {
        oninit:vnode=>{
            vnode.state.term='';
        },
        onbeforeupdate:vnode=>{
            vnode.state.list = getList(vnode.state.term);
        },
        view: (vnode) => {
            return (
                m('form.addLead__form form', { onsubmit: (event, vnode) => submitForm(event, vnode) }
                    , [
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formDataContact.meta.heading)
                        ),
                        m(FilterInline, { filters: vnode.attrs.filters }),
                        vnode.attrs.filters.map(filter=>{
                            if(filter.active){
                                if(filter.type=='add'){
                                    return renderFormData(vnode.attrs.formDataContact)
                                }else{
                                    return [
                                        m('.form__row',{style:"position:relative"},[
                                            m(SearchBox,{label:'חפש איש קשר',parent:vnode}),
                                            m(SearchList,{parent:vnode})
                                        ])
                                ]
                                }
                            }
                        }),
                        m('.form__row'),
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formDataLead.meta.heading)
                        ),
                        renderFormData(vnode.attrs.formDataLead),
                        m('.form__row', [
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
    let newContactData = getDataByClass(vnode, 'Contact');
    let newLeadData = getDataByClass(vnode, 'Lead');
    let newContact = new Contact('', newContactData);
    let newLead = new Lead('', newLeadData);
    Lead.addLeadAndContact(newContact, newLead);
    e.target.reset();
}

function renderFormData(myData, vnode) {
    let meta = myData.meta;
    let data = myData.data;
    return Object.keys(data).map((k, ind) => {
        let curr = data[k];
        if (data[k].input) {
            return [
                m('.form__row', {key:ind},
                [
                    m(`input#${k}[class="form__input ${meta.class}"]`, 
                            Object.assign({},curr.input,{oninput:(e)=>insertList(e)})),
                        m('label[class="form__label"]', { for: k }, curr.label.text)
                    ])
            ]
        } else if (data[k].textarea) {
            return [
                m(`.form__row`, {key:ind},
                    [
                        m(`textarea[class="form__input ${meta.class}"]`, curr.textarea)
                    ])
            ]
        } else {
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

function insertList(e){
    console.log('TODO! append list base on term ',e);
}

module.exports = FormLead
