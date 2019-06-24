import m from 'mithril'
import Model from '../data/Model'
import {addToMapInDoc} from '../firebase/qry'


class Contact extends Model {
    // id: "",
    // data: {
    //     name:"",
    //     phone:"",
    //     email:""
    // }
    constructor(...args) {
        super(...args);
    }
    /**
     * @param {Object} newContact the new contact that creating with new Contact keword
     * @param {String} contactPath the path of contact which has the main role on that lead
     */
    addNewSubContact(newContact,leadID) {
        newContact.add('contacts').then(d=>{
            let col = 'leads';
            let id = leadID;
            let fieldRef = 'contacts';
            let value = {'role': 'any','contactRef': newContact.getID()};
            addToMapInDoc(col, id, fieldRef, value);
            m.redraw();
        })
    }

}

module.exports = Contact

