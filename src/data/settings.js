//leads group fill from db
let setLeadType = { title: "סוגי לידים", collection: "setLeadType", data: [] }
let setLeadGroup = { title: "קבוצות לידים", collection: "setLeadGroup", data: [] }
let setLeadSource = { title: "מקורות לידים", collection: "setLeadSource", data: [] }
let setLeadStatus = { title: "סטטוסים", collection: "setLeadStatus", data: [] }
let setContactType = { title: "סוגי אנשי קשר", collection: "setContactType", data: [] }
let setUserRoles = { title: "הגדרות תפקיד משתמשים", collection: "setUserRoles", data: [] }

let settings = {
    groupTypeFilter: [
        { title: "קבוצות", count: 0, active: true },
        { title: "אירועים", count: 0 },
        { title: "חוגים", count: 0 },
        { title: "כלבייה", count: 0 },
        { title: "כללי", count: 0 },
    ],
    setGroup: [
        { title: "לידים", count: 0, groups: [setLeadType, setLeadGroup, setLeadSource, setLeadStatus], active: true },
        { title: "אנשי קשר", count: 0, groups: [setContactType] },
        { title: "משתמשים", count: 0, groups: [setUserRoles] },
        { title: "מתקדם", count: 0 },
    ],
    setLeadType: { meta:setLeadType , data: setLeadType.data, dataGroups: setLeadGroup.data }
}

module.exports = settings;