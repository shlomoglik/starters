import m from 'mithril'
import Contact from '../../data/Contact'

let FormContact = (init) => {
    return {
        oninit: (vnode) => {
            console.log('vnode attrs:', vnode.attrs);
            vnode.state.mode = vnode.attrs.mode;
        }, onupdate: (vnode) => {
            console.log('update lifecycle')
        },
        view: (vnode) => {
            if (vnode.attrs.mode == 'add') {
                console.log('add mode so enable add button');
            }
            return (
                <form
                    class="form addLead__form addLead__form--contact"
                    onsubmit={function (e) {
                        e.preventDefault();
                        let form = e.target.elements;
                        for (let i in form) {
                            let el = form[i]
                            if (el.value)
                                Contact.data[el.name] = el.value;
                        }
                        Contact.addContact(e, vnode);
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
                    {/* <div class="form__row">
                        <button type="submit" class="btn btn--def" >הוסף</button>
                    </div> */}
                </form>
            )
        }
    }
}

module.exports = FormContact
