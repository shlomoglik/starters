import m from 'mithril'
import {insertDoc,followChanges} from '../firebase/qry'

let Contacts = [];

let Contact = {
    id:"",
    data:{
        name:"",
        phone:"",
        email:""
    },
    addContact: (e,vnode)=>{
        // console.log('add data to database=>',Contact.data);
        let prom = insertDoc('contacts',Contact.data);
        prom.then(
            res=>{
                console.log('TODO => sync data from DB to Model with id || add listener to DB || push to Contacts || clean current..=>')
                console.log(res)
                console.log('T change vnode mode before =>',vnode.state);
                vnode.state.mode = 'edit';
                console.log('T change vnode mode after =>',vnode.state);
                Contact.id = res.id;
                try{
                    followChanges('contacts',res.id,Contact);
                }catch(e){
                    console.error(e)
                } //try to follow changes
            },err=>{
                console.log(err)
            }
        );
    },
    editContact:()=>{
        console.log('TODO edit data =>',Contact.data);
    },
    removeContact:()=>{
        console.log('TODO remove data based on doc id=>',Contact.id);
    }
}

module.exports = Contact

