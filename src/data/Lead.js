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
        newContact.add('contacts').then(
            doc=>{
                let path = newContact.getID();
                let contactsRef =[{
                    'role':'main',
                    'contactRef':path
                }];
                newLead.setData('contacts',contactsRef);
                newLead.add('leads');
            }
        )
    }

} //end Cless

module.exports = Lead

