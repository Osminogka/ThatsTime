import { reactive } from "vue";
import { friendList, groupList, user } from "./userInfo";
import { todayDate, shortMonthNames } from "./month";

var records = reactive([]);

let recordOnServer = [{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: 19,
    selectedObject: "John",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan",
    
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate(),
    selectedObject: "John",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate(),
    selectedObject: "John",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate() + 1,
    selectedObject: "John",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate() + 1,
    selectedObject: "Friend1",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate() + 1,
    selectedObject: "Friend1",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate() + 1,
    selectedObject: "Friend2",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: false,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
},
{
    selectedYear: 2024,
    selectedMonth: 3,
    selectedDay: todayDate.getDate() + 1,
    selectedObject: "Group1",
    Creator: "Osminogka",
    yourSelf: false,
    showGroupList: true,
    hour: 12,
    minute: 30,
    recordName: "Meeting",
    recordContent: "Discuss the project plan"
}
]

export const getRecords = (date) => {
    let startDay = Math.min(date, todayDate.getDate());
    let endDay = Math.max(date, todayDate.getDate());
    return records.filter(record => record.selectedMonth === todayDate.getMonth() + 1 && record.selectedYear === todayDate.getFullYear() 
        && (todayDate.getDate() == date? record.selectedDay === date : record.selectedDay > startDay && record.selectedDay < endDay));
}

export const getCertainRecord = (date) => {
    let monthIndex = shortMonthNames.indexOf(date.month) + 1;
    return recordOnServer.filter(record => record.selectedDay === date.day && record.selectedMonth === monthIndex && record.selectedYear === date.year);
}

export const getRecordsWithFriend = (friendName) => {
    if(friendList.value.some(obj => obj.name === friendName)) 
        return {
            isFriend: true,
            records: [...recordOnServer.filter(record => (record.selectedObject === friendName  || record.Creator === friendName) && record.yourSelf === false && record.showGroupList === false)]
        };
    else
        return {
            isFriend: false,
            records: []
        };
}

export const getRecordsWithGroup = (groupName) => {
    if(groupList.value.some(obj => obj.name === groupName)) 
        return {
            isMember: true,
            isCreator: groupList.value.find(obj => obj.name === groupName).creator === user.value.name,
            Creator: groupList.value.find(obj => obj.name === groupName).creator,
            members: ['test1', 'test2', 'test3'],
            records: recordOnServer.filter(record => record.selectedObject === groupName && record.showGroupList === true)
        };
    else
        return {
            isMember: false,
            isCreator: false,
            members: [],
            records: []
        };
}

export const getRecordsFromServer = () =>{
    records = recordOnServer;
}

export const postRecord = (record) => {
    let erroList = isRecordValid(record);
    if(erroList.length === 0) {
        record.Creator = user.value.name;
        record.selectedMonth += 1;
        recordOnServer.push(record);
        return [];
    } else {
        return erroList;
    }
}

function isRecordValid (record) {
    let errorList = [];

    if (!(todayDate.getFullYear() - 10 <= record.selectedYear && record.selectedYear <= todayDate.getFullYear() + 10)) {
        errorList.push('selectedYear');
    }
    // Check if selectedDay is a valid day
    if (!(1 <= record.selectedDay && record.selectedDay <= new Date(record.selectedYear, record.selectedMonth + 1, 0).getDate())) {
        errorList.push('selectedDay');
    }
    // Check if selectedMonth is a valid month
    if (!(0 <= record.selectedMonth && record.selectedMonth <= 11)) {
        errorList.push('selectedMonth');
    }
    // Check if selectedObject is a valid object
    if (record.yourSelf? !(record.selectedObject == user.value.name) 
        : record.showGroupList ? !groupList.value.some(obj => obj.name === record.selectedObject) : !friendList.value.some(obj => obj.name === record.selectedObject)) {
        errorList.push('selectedObject');
    }
    // Check if hour is a valid hour
    if (!(0 <= parseInt(record.hour) && parseInt(record.hour) <= 23)) {
        errorList.push('hour');
    }
    // Check if minute is a valid minute
    if (!(0 <= parseInt(record.minute) && parseInt(record.minute) <= 59)) {
        errorList.push('minute');
    }
    // Check if recordName is not empty
    if (record.recordName.length <= 0 || record.recordName.length > 50) {
        errorList.push('recordName');
    }
    // Check if recordContent is not empty
    if (record.recordContent.length <= 0 || record.recordContent.length > 500) {
        errorList.push('recordContent');
    }

    return errorList;
}