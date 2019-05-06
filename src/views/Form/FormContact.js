import m from 'mithril'

module.exports = {
    oninit: (vnode) => {
        console.log('form component is init the form data is');
    },
    view: (vnode) => {
        return (
            <form class="form addLead__form addLead__form--contact" action="">
                <div class="form__row">
                    <input type="text" class="form__input" id="contactName" placeholder="שם" />
                    <label for="contactName" class="form__label">שם איש קשר</label>
                </div>
                <div class="form__row">
                    <input type="phone" class="form__input" placeholder="טלפון" />
                    <label for="contactPhone" class="form__label">טלפון איש קשר</label>
                </div>
                <div class="form__row">
                    <input type="email" class="form__input" id="contactMail" placeholder="אימייל" />
                    <label for="contactMail" class="form__label">אימייל איש קשר</label>
                </div>
                <div class="form__row">
                    <button type="submit" class="btn btn--def" >שלח</button>
                </div>
            </form>
        )
    }
}