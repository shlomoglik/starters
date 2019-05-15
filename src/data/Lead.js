import m from 'mithril'
import { insertDoc, followChanges } from '../firebase/qry'
import User from '../data/User'

let Leads = {};

let Lead = {
    id: "",
    data: {
        title: "",
        type: "",
        description: "",
        duedate: "",
        source: "",
        assignRef: User.getUser('path'),
        contactsRef: [],
    }
}

let LeadFunc = {
    add: (key, value) => {
        console.log(Lead.data)
        Lead.data[key] = value;
    },
    addLeadAndContact: (e, vnode) => {
        for(Model in [Contact,Lead]){
            let elements = vnode.dom.querySelectorAll("." + Model.name);
            for (let i in elements) {
                let el = elements[i]
                if (el.value) {
                    try {
                        Model.add(el.name, el.value);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
        // console.log('add data to database=>',Lead.data);
        let contactRef = Contact.AddContact(); // return path
        let prom = insertDoc('leads', Lead.data);
        prom.then(
            doc => {
                Lead.id = doc.path;
                Lead.data = doc.data();
                contactsRef[0] = {
                    role: "main",
                    contactRef: contactRef
                }
            }, err => {
                console.log(err)
            }
        );
    },
    editLead: () => {
        console.log('TODO edit data =>', Lead.data);
    },
    removeLead: () => {
        console.log('TODO remove data based on doc id=>', Lead.id);
    }

}

module.exports = LeadFunc

