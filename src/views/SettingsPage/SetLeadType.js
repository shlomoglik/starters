import m from 'mithril'
import settings from '../../data/settings'
import SettingGroup from './SettingGroup'

const SetLeadType = (init) => {
    return {
        oninit: (vnode)=>{
            console.log(settings.leadGroupsList);
        },
        view: (vnode) => {
            return [
                settings.leadGroupsList.map((group,ind)=>{
                    return m(SettingGroup, { key: `group${ind}`,title: group.label, rows: getRows(group.id), collection: `setLeadGroup/${group.id}/types` })
                })
            ]
            
        }
    }
}

function getRows(groupID){
    return settings.allLeadTypes.filter(type=>type.col == `setLeadGroup/${groupID}/types`)
}

module.exports = SetLeadType
