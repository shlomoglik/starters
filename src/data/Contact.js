import m from 'mithril'

let Contact = {
    data:{
        name:"",
        phone:"",
        email:""
    },
    addContact: function(){
        console.log('TODO append data to database=>',Contact.data);
        const res = fetch('/addContact', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(Contact.data)
        });
        res.then(
            result=>{
                result.json().then(
                    end=>{
                        console.log(end)
                    },
                    err=>{
                        console.error(err)
                    }

                )
            },
            err=>{
                console.error(err);
            }
        );

    }
}

module.exports = Contact

