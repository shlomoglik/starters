import m from 'mithril'
import { insertDoc, followChanges } from '../firebase/qry'
import User from './User'
import Model from '../data/Model'

let Contacts = {};

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
}

module.exports = Contact

