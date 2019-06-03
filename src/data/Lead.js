import m from 'mithril'
import { insertDoc, followChanges } from '../firebase/qry'
import User from '../data/User'
import Model from '../data/Model'

class Lead extends Model {
    // id = "";
    // _data = {
    //     title: "",
    //     type: "",
    //     description: "",
    //     duedate: "",
    //     source: "",
    //     contacts: [],
    //     assigns:[]
    // }
    constructor(...args) {
        super(...args);
        this._data['assigns'] = [{
            'assignRef': User.getUser('path'),
            'role': 'main'
        }];
    }
    /**
     * @param {Object} newLead the new lead that creatin with new Lead keword
     * @param {String} contactPath the path of contact which has the main role on that lead
     */
    addLeadToExistContact(newLead, contactPath) {
        let contactsRef = [{
            'role': 'main',
            'contactRef': contactPath
        }];
        newLead.setData('contacts', contactsRef);
        newLead.add('leads');
    }

    static addLeadAndContact(newContact, newLead) {
        console.log('step 1: add Contact data=>', newContact._data);

        newContact.add('contacts').then(
            doc => {
                let path = newContact.getID();
                let contactsRef = [{
                    'role': 'main',
                    'contactRef': path
                }];
                newLead.setData('contacts', contactsRef);
                newLead.add('leads');
            }
        )
    }

} //end Cless

module.exports = Lead

