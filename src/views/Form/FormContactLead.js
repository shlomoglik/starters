import m from 'mithril'
import Contact from '../../data/Contact'
import User from '../../data/User'

let FormLead = (init) => {
    return {
        view: (vnode) => {
            if (vnode.attrs.mode == 'add') {
                console.log('add mode so enable add button');
            }
            return (
                <form
                    class="form addLead__form"
                    onsubmit={function (e) {
                        e.preventDefault();
                        let form = e.target.elements;
                        console.log(form)
                        // for (let i in form) {
                        //     let el = form[i]
                        //     if (el.value)
                        //         Contact.data[el.name] = el.value;
                        // }
                        // Contact.addContact(e, vnode);
                    }}
                >
                    <div class="heading">
                        <h1 class="heading__secondary">פרטי איש קשר</h1>
                    </div>
                    <div class="form__row">
                        <input type="text" name="name" class="form__input" id="contactName" placeholder="שם" required/>
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

                    <div className="heading">
                        <h1 className="heading__secondary">פרטי פנייה</h1>
                    </div>
                    <div class="form__row" >
                        <input type="text" class="form__input" id="contactName" placeholder="סוג פנייה" />
                        <label for="contactName" class="form__label">סוג פנייה</label>
                    </div>
                    <div class="form__row" >
                        <input type="text" class="form__input" placeholder="מקור הגעה" />
                        <label for="contactPhone" class="form__label">מקור הגעה</label>
                    </div>
                    <div class="form__row">
                        <input type="date" class="form__input" id="lead_duedate" placeholder="תאריך יעד" />
                        <label for="lead_duedate" class="form__label">תאריך יעד</label>
                    </div>
                    <div class="form__row">
                        <input type="text" class="form__input" id="lead_assign" placeholder="בטיפול" required/>
                        <label for="lead_assign" class="form__label">בטיפול</label>
                    </div>
                    <div class="form__row">
                        <textarea class="form__input" id="lead_description" placeholder="תיאור והערות *" required/>
                    </div>

                    <div class="form__row">
                        <button type="submit" class="btn btn--def" >הוסף</button>
                    </div>
                </form>
            )
        }
    }
}

module.exports = FormLead
