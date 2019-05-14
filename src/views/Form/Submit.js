import m from 'mithril'

module.exports = {
    oninit:(vnode)=>{
        console.log('submit');
    },
    view: (vnode) => {
        return (
            <div class="form addLead__submit" >
                <div class="form__row">
                    <button type="button" class="btn btn--def" >הוסף</button>
                </div>
            </div>
        )
    }
}