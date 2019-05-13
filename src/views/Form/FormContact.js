import m from 'mithril'
import Contact from '../../data/Contact'

module.exports = {
    oninit: (vnode) => {
        console.log('form component is init the form data is');
    },
    view: (vnode) => {
        return (
            <form 
                class="form addLead__form addLead__form--contact"
                onsubmit={function(e){
                    e.preventDefault();
                    var form = e.target.elements;
                    for (let i in form){
                        let el = form[i]
                        if (el.value)
                            Contact.data[el.name]=el.value;
                    }
                    Contact.addContact();
                }} 
            >
                <div class="form__row">
                    <input type="text" name="name" class="form__input" id="contactName" placeholder="שם" />
                    <label for="contactName" class="form__label">שם איש קשר</label>
                </div>
                <div class="form__row">
                    <input type="phone" name="phone" class="form__input" placeholder="טלפון" />
                    <label for="contactPhone" class="form__label">טלפון איש קשר</label>
                </div>
                <div class="form__row">
                    <input type="email" name="email" class="form__input" id="contactMail" placeholder="אימייל" />
                    <label for="contactMail" class="form__label">אימייל איש קשר</label>
                </div>
                <div class="form__row">
                    <button type="submit" class="btn btn--def" >שלח</button>
                </div>
            </form>
        )
    }
}