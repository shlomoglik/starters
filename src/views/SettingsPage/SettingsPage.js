import m from 'mithril'
import settings from '../../data/settings'
import Header from '../commons/Header/HeaderFullPage'
import FiltersBar from '../commons/Filters/FiltersBar'
import ScrollTop from '../commons/ScrollTop'
import SettingGroup from './SettingGroup'
import SetLeadType from './SetLeadType'

let SettingsPage = (init) => {
  return {
    oninit: vnode => {
      vnode.state.filters = settings.setGroup;
      window.scrollTo(0, 0);
    },
    onbeforeupdata: (vnode) => {
      vnode.state.filters = settings.setGroup;
    },
    view: (vnode) => {
      return (
        m('.container--settings', [
          m(Header, { title: "הגדרות", backTo: false }),
          m(FiltersBar, { filters: vnode.state.filters, oncreate: node => node.dom.classList.add("filterBar--light") }),
          vnode.state.filters.map(item => {
            switch (true) {
              case (item.label == 'כללי' && item.active):
                return [
                  m('.setGroup', 'advancedItem2'),
                  m('.setGroup', 'another adv one')
                ];
              case (item.label == 'פילוח לידים' && item.active):
                  return m(SetLeadType)
              default :
                item.count = item.groups ? item.groups.length : 0;
                return item.groups && item.active ? item.groups.map(group => {
                  return m(SettingGroup, { title: group.title, rows: group.data, collection: group.collection })
                }) : [];
            }
            // if (item.groups && item.label !== 'מתקדם') {
            //   return item.active ?
            //     item.groups.map(group => {
            //       return m(SettingGroup, { title: group.title, rows: group.data, collection: group.collection })
            //     }): [];
            // } else if (item.label == 'מתקדם') {
            //   return item.active ?
            //     [
            //       m('.setGroup', 'advancedItem2')
            //     ]
            //     : [];
            // }
          }),
          m(ScrollTop)
        ])
      )
    }
  }
}

module.exports = SettingsPage;