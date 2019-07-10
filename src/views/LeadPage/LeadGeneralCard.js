import m from 'mithril'
import { deleteDoc, updateDoc, addToMapInDoc, updateMapInDoc } from '../../firebase/qry'
import { getFormValues, closestByClass } from '../../js/utils';
import settings from '../../data/settings';
import store from '../../data/store';


const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink || false;
        },
        view: (vnode) => {
            let obj = settings.formDataLeadArr;
            return (
                m('form.lead-card', { onsubmit: e => updateChanges(e, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    obj && vnode.attrs.leadData && !vnode.state.shrink ?
                        obj.map((curr, ind) => {
                            let inputType = curr["meta"]["inputType"];
                            let inputKey = curr["meta"]["inputID"];
                            let labelText = curr["label"] ? curr["label"] : '';
                            switch (true) {
                                case inputType == 'input':
                                    return m('.lead-card__row', { key: `formRow${ind}`, style: "position:relative" }, [
                                        m(`${inputType}.lead-card__input`, Object.assign({}, curr["options"], { value: vnode.attrs.leadData[inputKey] })),
                                        m('label.lead-card__label', labelText),
                                    ]);
                                case inputType == 'textarea':
                                    return m('.lead-card__row', { key: `formRow${ind}`, style: "position:relative" }, [
                                        m(`${inputType}.lead-card__input`, Object.assign({}, curr["options"], { value: vnode.attrs.leadData[inputKey] })),
                                    ]);
                                case inputType == 'select':
                                    let dataList = curr["meta"]["list"];
                                    console.log(dataList)
                                    return m('.lead-card__row', { key: `formRow${ind}`, style: "position:relative" }, [
                                        m(`select.lead-card__input`, Object.assign({}, curr["options"]), [
                                            m('option',{value:''} ,'--בחר--'),
                                                settings[dataList].map( (item,ind)=>{
                                                    return m('option',{key:`opt${ind}`,value:item.id , selected:item.id==vnode.attrs.leadData[inputKey]} ,item.label)
                                                }
                                            )
                                        ]),
                                    ]);
                            }
                        }) : [],
                    vnode.attrs.leadData && !vnode.state.shrink ?
                        m('.lead-card__btns', [
                            m('button.btn.btn--def', 'עדכן'),
                            m('button.btn.btn--def.btn--red', 'בטל'),
                        ]) : []
                ])
            )
        }
    }
}

function updateChanges(e, vnode) {
    e.preventDefault();
    let leadID = vnode.attrs.leadData.id;
    let form = e.target;
    let objToUpdate = getFormValues(form);
    // console.log('TODO!! aplly changes data should be',JSON.stringify(objToUpdate) ,' updata id => ',leadID);
    updateDoc('leads', leadID, objToUpdate);
}

function toggleGroup(e, vnode) {
    if (vnode.state.shrink) {
        vnode.state.shrink = false;
    } else {
        vnode.state.shrink = true;
    }
}

module.exports = Card
