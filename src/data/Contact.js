import m from 'mithril'

let Contact = {
    data:{
        name:"",
        phone:"",
        email:""
    },
    addContact: function(){
        console.log('TODO append data to database=>',Contact.data);
    }
}

module.exports = Contact

