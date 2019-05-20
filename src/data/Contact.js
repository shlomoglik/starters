import m from 'mithril'
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

