import m from 'mithril'
import settings from '../../data/settings'
import Header from '../Header/Header'
import Filters from '../commons/FiltersBar'
import Bottom from '../commons/BottomMenu'
import SettingGroup from './SettingGroup'

let SettingsPage = (init) => {
  return {
    view: (vnode) => {
      return (
        m('.container--settings', [
          m(Header, { title: "הגדרות" }),
          m(Filters, { filters: settings.setGroup }),
          settings.setGroup.map(item => {
            if (item.groups) {
              item.count = item.groups.length;
              return item.active ? item.groups.map(group => m(SettingGroup, { title: group , rows:[{label:"א"},{label:"ב"}] })) : [];
            }
          }),
          m(Bottom),
        ])
      )
    }
  }
}

module.exports = SettingsPage;