import m from 'mithril'
import FormList from '../commons/Forms/FormList';
import { insertDoc, getFollowUps } from '../../firebase/qry';
import { toggleGroup } from '../../js/utils';

const Card = (init) => {
    return {
        oninit: vnode => {
            vnode.state.followUps = [];
            vnode.state.shrink = vnode.attrs.shrink || true;
            vnode.state.counter = 0;
        },
        onbeforeupdate: vnode => {
            getCounter(vnode);
            getDist(vnode);
        },
        oncreate: vnode => {
            let stop = getFollowUps(vnode.attrs.leadID, vnode); // how to stop it!!
        },
        view: (vnode) => {
            return (
                m('form.lead-card', { onsubmit: e => updateChanges(e, vnode) }, [
                    m('.lead-card__title', { onclick: e => toggleGroup(e, vnode) }, [
                        m('span', vnode.attrs.title + ` (${vnode.state.counter})`),
                        m('svg#arrow.lead-card__toggle-arrow', m('use', { href: '/public/img/sprite.svg#icon-chevron-thin-down' }))
                    ]),
                    !vnode.state.shrink ?
                        m('.lead-follow', [
                            m('.lead-follow__list', [
                                m('.lead-follow__last-follow', 'נעקב לפני 11 ימים'),
                                vnode.state.followUps.sort(compareDates).map((item, ind) => {
                                    let date = item.date.toDate();
                                    let time = formatTime(date);
                                    let followDate = date.getDate() + '/' + Number(date.getMonth() + 1) /*  + '/' + item.date.toDate().getFullYear() */;
                                    return (
                                        m('.lead-follow__row', { key: ind, id: item.id }, [
                                            m('.lead-follow__date', `${followDate} (${time})`),
                                            m('.lead-follow__text', item.text),
                                        ])
                                    )
                                })
                            ]),
                            m(FormList, { submitFunc: e => addToList(e, vnode) })
                        ]) : []
                ])
            )
        }
    }
}

function getCounter(vnode) {
    if (vnode.state.followUps) {
        vnode.state.counter = vnode.state.followUps.length
    }
}
function getDist(vnode) {
    if (vnode.state.followUps !== []) {
        let follows = vnode.state.followUps;
        let last = follows[0];
        if (follows.length > 0) {
            for (let i = 1; i < follows.length; i++) {
                if(+follows[i] > +last)
                    last = follows[i];
            }
        }
        console.log('TODO!! apply last saw and compare to followDate in lead doc',last);
    }
}

function compareDates(a, b) {
    let aNum = +a.date.toDate();
    let bNum = +b.date.toDate();
    if (aNum > bNum) {
        return -1; // swap
    } else if (aNum < bNum) {
        return 1;
    } else {
        return 0; //dont do nothing
    }
}

function addToList(e, vnode) {
    e.preventDefault();
    let form = e.target;
    let val = form.elements[0].value;
    let doc = { date: new Date(), text: val };
    let ref = `leads/${vnode.attrs.leadID}/followUps`;
    console.log('add to this ref ', ref, '\rthis doc', JSON.stringify(doc));
    insertDoc(ref, doc).then(r => {
        console.log('new doc added', r.path);
        m.redraw();
    });
    form.reset();
}

function formatTime(date) {
    let h = date.getHours();
    if (h < 10) h = "0" + h;
    let m = date.getMinutes();
    if (m < 10) m = "0" + m;
    return h + ":" + m;

}

module.exports = Card
