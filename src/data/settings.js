let settings = {
    groupTypeFilter: [
        {title: "קבוצות",count: 0,active: true},
        {title: "אירועים",count: 0},
        {title: "חוגים",count: 0},
        {title: "כלבייה",count: 0},
        {title: "כללי",count: 0,}
    ],
    setGroup:[
        {title: "לידים",count: 0, groups:["סוגי לידים","קבוצות לידים","מקורות לידים","סטטוסים"],active: true},
        {title: "אנשי קשר",count: 0, groups:["סוגי אנשי קשר"]},
        {title: "משתמשים",count: 0, groups:["הגדרות תפקיד משתמשים"]},
        {title: "כללי",count: 0,},
    ],
    //leads group fill from db
    setLeadType:[], 
    setLeadGroup:[], 
    setLeadSource:[], 
    setLeadStatus:[], 
}

module.exports = settings;