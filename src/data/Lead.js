import m from 'mithril'
import {insertDoc,followChanges} from '../firebase/qry'

let Leads = [];

let Lead = {
    id:"",
    data:{
        title:"",
        type:"",
        description:"",
        duedate:"",
        source:"",
        assignRef:"",
        contactsRef:[{}],
    },
    addLead: (e,vnode)=>{
        // console.log('add data to database=>',Lead.data);
        let prom = insertDoc('leads',Lead.data);
        prom.then(
            res=>{
                console.log('TODO => sync data from DB to Model with id || add listener to DB || push to Leads || clean current..=>')
                console.log(res)
                console.log('T change vnode mode before =>',vnode.state);
                vnode.state.mode = 'edit';
                console.log('T change vnode mode after =>',vnode.state);
                Lead.id = res.id;
                try{
                    followChanges('leads',res.id,Lead);
                }catch(e){
                    console.error(e)
                } //try to follow changes
            },err=>{
                console.log(err)
            }
        );
    },
    editLead:()=>{
        console.log('TODO edit data =>',Lead.data);
    },
    removeLead:()=>{
        console.log('TODO remove data based on doc id=>',Lead.id);
    }
}

module.exports = Lead

