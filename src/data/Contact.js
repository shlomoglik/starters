import m from 'mithril'
import { insertDoc, followChanges } from '../firebase/qry'
import User from './User'

let Contacts = {};

let Contact = {
    id: "",
    data: {
        name:"",
        phone:"",
        email:""
    }
}

let ContactFunc = {
    add:(key,value)=>{
        console.log(Contact.data)
        Contact.data[key] =value;
    },
    addContact: (e, vnode) => {
        // console.log('add data to database=>',Contact.data);
        let prom = insertDoc('contacts', Contact.data);
        prom.then(
            doc => {
                Contact.id = doc.path;
                Contact.data = doc.data();
                console.log(Contact)
                return doc.path;
            }, err => {
                console.log(err)
            }
        );
    },
    editContact: () => {
        console.log('TODO edit data =>', Contact.data);
    },
    removeContact: () => {
        console.log('TODO remove data based on doc id=>', Contact.id);
    }

}

module.exports = ContactFunc

