import m from 'mithril'
module.exports = {
    oninit: (vnode) => {
        console.log('form lead component is init the form data is');
    },
    view: (vnode) => {
        return (
            <form class="form addLead__form addLead__form--contact" action="">
                <div class="form__row" >
                    <input type="text" class="form__input" id="contactName" placeholder="סוג פנייה" />
                    <label for="contactName" class="form__label">סוג פנייה</label>
                </div>
                <div class="form__row" >
                    <input type="phone" class="form__input" placeholder="מקור הגעה" />
                    <label for="contactPhone" class="form__label">מקור הגעה</label>
                </div>
                <div class="form__row">
                    <input type="email" class="form__input" id="lead_duedate" placeholder="תאריך יעד" />
                    <label for="lead_duedate" class="form__label">תאריך יעד</label>
                </div>
                <div class="form__row">
                    <input type="email" class="form__input" id="lead_assign" placeholder="בטיפול" />
                    <label for="lead_assign" class="form__label">בטיפול</label>
                </div>
                <div class="form__row">
                    <textarea class="form__input" id="lead_description" placeholder="תיאור והערות *" />
                </div>
                <div class="form__row">
                    <button type="submit" class="btn btn--def" >שלח</button>
                </div>
            </form>
        )
    }
}