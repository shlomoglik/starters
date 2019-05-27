import m from 'mithril'
import Contact from '../../data/Contact'
import Lead from '../../data/Lead'
import SearchList from '../commons/SearchList'

let list = [
    { term: 'שלמה', id: 'ased' },
    { term: 'שלמה גליקמן', id: 'gwer' },
    { term: 'שלמה גליקמן', id: 'jsar' },
];

let FormLead = (init) => {
    return {
        view: (vnode) => {
            let submitForm = (e)=>{
                e.preventDefault();
                let newContactData = getDataByClass(vnode, 'Contact');
                let newLeadData = getDataByClass(vnode, 'Lead');
                let newContact = new Contact('', newContactData);
                let newLead = new Lead('', newLeadData);
                Lead.addLeadAndContact(newContact, newLead);
                e.target.reset();
            }
            let ContactData =(myData)=>{
                let meta = myData.meta;
                let data = myData.data;

                return Object.keys(data).map((k,ind)=>{
                    let curr = data[k];
                    return [
                        m('.form__row',
                        [
                            m(`input#${k}[class="form__input ${meta.class}"]`, curr.input),
                            m('label[class="form__label"]', { for: k }, curr.label.text)
                        ])
                    ]
                })
            }
            return (
                m('form.addLead__form form',
                    {onsubmit: submitForm(e,vnode)}
                    , [
                        m('.heading',
                            m('.heading__secondary', vnode.attrs.formDataContact.meta.heading)
                        ),
                        ContactData(vnode.attrs.formDataContact)
                    ]
                    )
            )



            //         <div class="form__row form__select-group">
            //             <button type="button" class="form__select-item form__select-item--active" id="add">איש קשר חדש</button>
            //             <button type="button" class="form__select-item" id="exist">איש קשר קיים</button>
            //         </div>

            //         <div class="form__row" style='position:relative'>
            //             <input type="text" name="name" class="form__input Contact" id="contactName" placeholder="שם" required />
            //             <label for="contactName" class="form__label">שם איש קשר</label>
            //             <SearchList list={list} />
            //         </div>
            //         <div class="form__row">
            //             <input type="tel" name="phone" class="form__input Contact" pattern="[0-9]{3}-[0-9]{7}" placeholder="טלפון" />
            //             <label for="contactPhone" class="form__label">טלפון איש קשר</label>
            //         </div>
            //         <div class="form__row">
            //             <input type="email" name="email" class="form__input Contact" id="contactMail" placeholder="אימייל" />
            //             <label for="contactMail" class="form__label">אימייל איש קשר</label>
            //         </div>


            //         <div className="heading">
            //             <h1 className="heading__secondary">פרטי פנייה</h1>
            //         </div>
            //         <div class="form__row" >
            //             <input type="text" name="type" class="form__input Lead" id="leadType" placeholder="סוג פנייה" />
            //             <label for="leadType" class="form__label">סוג פנייה</label>
            //         </div>
            //         <div class="form__row" >
            //             <input type="text" class="form__input Lead" name="source" placeholder="מקור הגעה" />
            //             <label for="contactPhone" class="form__label">מקור הגעה</label>
            //         </div>
            //         <div class="form__row">
            //             <input type="date" name="duedate" class="form__input Lead" id="lead_duedate" placeholder="תאריך יעד" />
            //             <label for="lead_duedate" class="form__label">תאריך יעד</label>
            //         </div>

            //         <div class="form__row">
            //             <textarea class="form__input Lead" name="description" id="lead_description " placeholder="תיאור והערות *" required />
            //         </div>

            //         <div class="form__row">
            //             <button type="submit" class="btn btn--def" >הוסף</button>
            //         </div>
            //     </form>
            // )
        }
    }
}

function renderFormData(vnode) {
    let myData = vnode.attrs.formDataContact;
    for (let k in myData[data]) {
        let curr = myData[data][k];
        return m('.form__row',
            [
                m(`input[class="${myData.meta.class}" id="${k}"]`, curr.input),
                m('label', { for: k }, curr.label.text)
            ])
    }
}

function getDataByClass(vnode, className) {
    let elements = vnode.dom.querySelectorAll("." + className);
    let data = {};
    for (let i in elements) {
        let el = elements[i]
        if (el.name) {
            data[el.name] = el.value || ""
        }
    }
    return data;
};

module.exports = FormLead
