let settings = {
    groupTypeFilter: [
        {title: "קבוצות",count: 0,active: true},
        {title: "אירועים",count: 0},
        {title: "חוגים",count: 0},
        {title: "כלבייה",count: 0},
        {title: "כללי",count: 0,}
    ],
    setGroup:[
        {title: "כללי",count: 0,},
        {title: "לידים",count: 0,groups:["סוגי לידים","קבוצות לידים","מקורות לידים","סטטוסים"]},
        {title: "אנשי קשר",count: 0,groups:["סוגי אנשי קשר"]},
        {title: "משתמשים",count: 0,groups:["הגדרות תפקיד משתמשים"]},
    ],
    setLeadType:[], //fill from db
    setLeadGroup:[], //fill from db
}

module.exports = settings;