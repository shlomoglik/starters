import m from 'mithril'
import { deleteDoc, updateDoc, addToMapInDoc, updateMapInDoc } from '../../firebase/qry'
import { getFormValues, closestByClass } from '../../js/utils';
import settings from '../../data/settings';
import store from '../../data/store';

// let rows= [
//     { label: "כותרת", data: getContactName(vnode) + ' - ' + vnode.state.lead.type },
//     { label: "מקור", data: vnode.state.lead.source },
//     { label: "סוג", data: vnode.state.lead.type },
//     { label: "תיאור", data: vnode.state.lead.description },
//     { label: "תאריך יעד", data: vnode.state.lead.duedate ,type:"date"},
// ];


const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.shrink = vnode.attrs.shrink || false;
        },
        view: (vnode) => {
            // let objLeadData = settings.formDataLead.data;
            let obj = settings.formDataLeadArr;
            return (
                m('form.lead-card', { onsubmit: e => updateChanges(e, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    obj && vnode.attrs.leadData && !vnode.state.shrink ?
                        // Object.keys(objLeadData).map((k, i) => {
                        //     let inputType =objLeadData[k].input ? "input" : objLeadData[k].textarea ? "textarea" :'' ;
                        //     let labelText = objLeadData[k].label ? objLeadData[k].label.text:"";
                        //     return m('.lead-card__row', { key: `formRow${i}`, style: "position:relative" }, [
                        //         m(`${inputType}.lead-card__input`, Object.assign({}, objLeadData[k].input || objLeadData[k].textarea , { value: vnode.attrs.leadData[k] })),
                        //         m('label.lead-card__label', labelText),
                        //     ])
                        obj.map((curr,ind)=>{
                            let inputType = curr["meta"]["inputType"];
                            let inputKey = curr["meta"]["inputID"];
                            let labelText = curr["label"] ? curr["label"] : '' ;
                            console.log(inputType,inputKey,labelText);
                            return m('.lead-card__row', { key: `formRow${ind}`, style: "position:relative" }, [
                                m(`${inputType}.lead-card__input`, Object.assign({}, curr["options"], { value: vnode.attrs.leadData[inputKey] })),
                                m('label.lead-card__label', labelText),
                            ])
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
