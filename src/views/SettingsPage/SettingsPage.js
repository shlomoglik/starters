import m from 'mithril'
import settings from '../../data/settings'
import Header from '../Header/Header'
import Filters from '../commons/FiltersBar'
import Bottom from '../commons/BottomMenu'
import ScrollTop from '../commons/ScrollTop'
import SettingGroup from './SettingGroup'

let SettingsPage = (init) => {
  return {
    oninit:vnode=>{
      vnode.state.groups = settings.setGroup;
    },
    onbeforeupdata:(vnode)=>{
      vnode.state.groups = settings.setGroup;
    },
    view: (vnode) => {
      return (
        m('.container--settings', [
          m(Header, { title: "הגדרות" }),
          m(Filters, { filters: vnode.state.groups }),
          vnode.state.groups.map(item => {
            if (item.groups) {
              item.count = item.groups.length;
              return item.active ? item.groups.map(group => m(SettingGroup, { title: group.title , rows:group.data , collection:group.collection})) : [];
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