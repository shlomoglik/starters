import m from 'mithril'
import settings from '../../data/settings'
import Header from '../commons/Header/Header'
import Filters from '../commons/FiltersBar'
import Bottom from '../commons/Menus/BottomMenu'
import ScrollTop from '../commons/ScrollTop'
import SettingGroup from './SettingGroup'
import SetLeadType from './SetLeadType'

let SettingsPage = (init) => {
  return {
    oninit: vnode => {
      vnode.state.groups = settings.setGroup;
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
            if (item.groups && item.title !== 'מתקדם') {
              item.count = item.groups.length;
              return item.active ?
                item.groups.map(group => m(SettingGroup, { title: group.title, rows: group.data, collection: group.collection }))
                : [];
            } else if (item.title == 'מתקדם') {
              return item.active ?
                [
                  m(SetLeadType),
                  m('.setGroup', 'advancedItem2')
                ]
                : [];
            }
          }),
          m(Bottom),
          m(ScrollTop)
        ])
      )
    }
  }
}

module.exports = SettingsPage;