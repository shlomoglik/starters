import m from 'mithril'
import Contact from '../../data/Contact'
import Lead from '../../data/User'
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
                        appendDataToModel(vnode, "Contact",Contact);
                        appendDataToModel(vnode, "Lead",Lead);
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
                        <input type="text" name="name" class="form__input Contact" id="contactName" placeholder="שם" required />
                        <label for="contactName" class="form__label">שם איש קשר</label>
                    </div>
                    <div class="form__row">
                        <input type="phone" name="phone" class="form__input Contact" placeholder="טלפון" />
                        <label for="contactPhone" class="form__label">טלפון איש קשר</label>
                    </div>
                    <div class="form__row">
                        <input type="email" name="email" class="form__input Contact" id="contactMail" placeholder="אימייל" />
                        <label for="contactMail" class="form__label">אימייל איש קשר</label>
                    </div>

                    <div className="heading">
                        <h1 className="heading__secondary">פרטי פנייה</h1>
                    </div>
                    <div class="form__row" >
                        <input type="text" class="form__input Lead" id="leadType" placeholder="סוג פנייה" />
                        <label for="leadType" class="form__label">סוג פנייה</label>
                    </div>
                    <div class="form__row" >
                        <input type="text" class="form__input Lead" name="source" placeholder="מקור הגעה" />
                        <label for="contactPhone" class="form__label">מקור הגעה</label>
                    </div>
                    <div class="form__row">
                        <input type="date" class="form__input Lead" name="duedate" id="lead_duedate" placeholder="תאריך יעד" />
                        <label for="lead_duedate" class="form__label">תאריך יעד</label>
                    </div>
                    <div class="form__row">
                        <input type="text" class="form__input Lead" name="assign" id="lead_assign" placeholder="בטיפול" required />
                        <label for="lead_assign" class="form__label">בטיפול</label>
                    </div>
                    <div class="form__row">
                        <textarea class="form__input Lead" name="description" id="lead_description " placeholder="תיאור והערות *" required />
                    </div>

                    <div class="form__row">
                        <button type="submit" class="btn btn--def" >הוסף</button>
                    </div>
                </form>
            )
        }
    }
}

let appendDataToModel = (vnode, modelName,Model) => {
    let elements = vnode.dom.querySelectorAll("."+modelName);
    console.log(elements);
    for (let i in elements) {
        let el = elements[i]
        if (el.value)
        Model.data[el.name] = el.value;
    }
    console.log('the Mode data afrer appending is: ',Model);
};

module.exports = FormLead
