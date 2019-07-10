import m from 'mithril'
import settings from '../../data/settings'
import Header from '../commons/Header/Header'
import Filters from '../commons/Filters/FiltersBar'
import Bottom from '../commons/Menus/BottomMenu'
import ScrollTop from '../commons/ScrollTop'
import SettingGroup from './SettingGroup'
import SetLeadType from './SetLeadType'

let SettingsPage = (init) => {
  return {
    oninit: vnode => {
      vnode.state.groups = settings.setGroup;
      window.scrollTo(0, 0);
    },
    onbeforeupdata: (vnode) => {
      vnode.state.groups = settings.setGroup;
    },
    view: (vnode) => {
      return (
        m('.container--settings', [
          m(Header, { title: "הגדרות" }),
          m(Filters, { filters: vnode.state.groups }),
          vnode.state.groups.map(item => {
            switch (true) {
              case (item.label == 'כללי'):
                return item.active ? [
                  m('.setGroup', 'advancedItem2'),
                  m('.setGroup' , 'another adv one')
                ] : [];
              case (item.label == 'פילוח לידים'):
                return item.active ? 
                  m(SetLeadType): []
              default:
                item.count = item.groups.length;
                return item.active ?
                  item.groups.map(group => {
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
          m(Bottom),
          m(ScrollTop)
        ])
      )
    }
  }
}

module.exports = SettingsPage;