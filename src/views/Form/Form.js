import m from 'mithril'

module.exports = {
    oninit:(vnode)=>{
        console.log('form component is init the form data is');
    },
    view: (vnode) => {
        return (
            <form class="form" >
                <div class="form__row">
                    <input type="text" class="form__input" id="contactName" placeholder="שם" />
                    <label for="contactName" class="form__label">שם</label>
                </div>
                <div class="form__row">
                    <button type="submit" class="btn btn--def" >שלח</button>
                </div>
            </form>
        )
    }
}