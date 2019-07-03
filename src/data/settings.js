//leads group  helpers
let setLeadType = { title: "סוגי לידים", collection: "setLeadType", data: [] }
let setLeadGroup = { title: "קבוצות לידים", collection: "setLeadGroup", data: [] }
let setLeadSource = { title: "מקורות לידים", collection: "setLeadSource", data: [] }
let setLeadStatus = { title: "סטטוסים", collection: "setLeadStatus", data: [] }
let setContactType = { title: "סוגי אנשי קשר", collection: "setContactType", data: [] }
let setUserRoles = { title: "הגדרות תפקיד משתמשים", collection: "setUserRoles", data: [] }

let settings = {
    //FILTERS:
    filtersAddContact: [
        { title: 'איש קשר חדש', type: 'add', active: true },
        { title: 'איש קשר קיים', type: 'search' },
    ],
    groupTypeFilter: [
        { title: "קבוצות", count: 0, active: true },
        { title: "אירועים", count: 0 },
        { title: "חוגים", count: 0 },
        { title: "כלבייה", count: 0 },
        { title: "כללי", count: 0 },
    ],

    //FORMS DATA CONFIG:
    formDataContact: {
        "meta": { heading: 'הוסף איש קשר', class: 'Contact' },
        "data": {
            "name": {
                "input": { type: "text", name: "name", placeholder: "שם", required: true },
                "label": { text: "שם איש קשר" }
            },
            "phone": {
                "input": { type: "tel", name: "phone", placeholder: "טלפון", pattern: "[0-9]{3}-[0-9]{7}" },
                "label": { text: "טלפון איש קשר (xxx-xxxxxxx)" }
            },
            "email": {
                "input": { type: "email", name: "email", placeholder: "אימייל" },
                "label": { text: "אימייל איש קשר" }
            },
        }
    },
    
    formDataLead: {
        "meta": { heading: 'פרטי פנייה', class: 'Lead' },
        "data": {
            "type": {
                "input": { type: "text", name: "type", placeholder: "סוג פנייה", required: true, list: "typeList" ,autocomplete:"off"},
                "label": { text: "סוג פנייה" }
            },
            "source": {
                "input": { type: "text", name: "source", placeholder: "מקור הגעה", list: "sourceList" , autocomplete:"off"},
                "label": { text: "בחר מקור הגעה של הליד מתוך רשימה" }
            },
            "duedate": {
                "input": { type: "date", name: "duedate", placeholder: "תאריך יעד" },
                "label": { text: "תאריך יעד" }
            },
            "description": {
                "textarea": { name: "description", placeholder: "תיאור והערות", required: true },
            },
        }
    },


    formDataLeadArr:[
        {
            "meta" : {"inputID" : "type" , "inputType": "input" },
            "options": { type: "text", name: "type", placeholder: "סוג פנייה", required: true, list: "typeList" ,autocomplete:"off"},
            "label": { text: "סוג פנייה" }
        },
        {
            "meta" : {"inputID" : "source" , "inputType": "input" },
            "options": { type: "text", name: "source", placeholder: "מקור הגעה", list: "sourceList" , autocomplete:"off"},
            "label": { text: "בחר מקור הגעה של הליד מתוך רשימה" }
        },
        {
            "meta" : {"inputID" : "duedate" , "inputType": "input" },
            "options": { type: "date", name: "duedate", placeholder: "תאריך יעד" },
            "label": { text: "תאריך יעד" }
        },
        {
            "meta" : {"inputID" : "description" , "inputType": "textarea" },
            "options": { name: "description", placeholder: "תיאור והערות", required: true },
        }
    ],


    //SETTINGS GROUPS:
    setGroup: [
        { title: "לידים", count: 0, groups: [setLeadType, setLeadGroup, setLeadSource, setLeadStatus], active: true },
        { title: "אנשי קשר", count: 0, groups: [setContactType] },
        { title: "משתמשים", count: 0, groups: [setUserRoles] },
        { title: "מתקדם", count: 0 },
    ],

    leadTypeList: [],
    leadSourceList: [],

    setLeadStatus : [
        {status:'ליד חדש' , id:'newLead' , done:true },
        {status:'פגישה' , id:'meeting' },
        {status:'הצעת מחיר' , id:'priceQuote' },
        {status:'סגור' , id:'invitation' },
        {status:'הזמנה חתומה' , id:'invitationSigned' },
        {status:'שולמה מקדמה' , id:'downPayment' },
    ]
}

module.exports = settings;