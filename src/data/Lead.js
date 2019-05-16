import m from 'mithril'
import { insertDoc, followChanges } from '../firebase/qry'
import User from '../data/User'
import Model from '../data/Model'

let Leads = {};
class Lead extends Model {
    // id = "";
    // data = {
    //     title: "",
    //     type: "",
    //     description: "",
    //     duedate: "",
    //     source: "",
    //     contactsRef: [],
    // }
    constructor(...args) {
        super(...args);
        this._data['assignRef'] =User.getUser('path');
    }
    static addLeadAndContact(newContact ,newLead ){
        console.log('step 1: add Contact data=>',newContact._data);
        newContact.add('contacts');
        let path = newContact.getID();
        console.log('step 2: get path=>',path);
        let contactsRef =[{
            'role':'main',
            'contactRef':path
        }];
        console.log('step 3: set ref to lead=>',contactsRef);
        newLead.setData('contacts',contactsRef);
        console.log('step 3 result: ',newLead,'step 4 add to DB=>:');
        newLead.add('leads');
    }

} //end Cless

module.exports = Lead

