import m from 'mithril'
import settings from '../../data/settings'
import Header from '../Header/Header'
import Filters from '../commons/FiltersBar'
import Bottom from '../commons/BottomMenu'
import SettingGroup from './SettingGroup'

module.exports = {
    view: (vnode) => {
      return (
        <div class="container--settings">
          <Header title="הגדרות"/>
          <Filters filters={settings.setGroup} />
          <SettingGroup class="setGroup--leads"/>
          <SettingGroup class="setGroup--contacts" />
          <SettingGroup class="setGroup--users" />
          <Bottom /> 
        </div>
      )
    }
}