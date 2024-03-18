import { friendList, groupList } from "./userInfo";

var records = [];

export const getRecords = () => {
    return records;
}

export const postRecord = (record) => {
    let erroList = isRecordValid(record);
    if(erroList.length === 0) {
        records.push(record);
        return [];
    } else {
        return erroList;
    }
}

function isRecordValid (record) {
    let errorList = [];

    if (!(2020 <= record.selectedYear && record.selectedYear <= 2030)) {
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
    if (record.showGroupList ? !groupList.value.some(obj => obj.name === record.selectedObject) : !friendList.value.some(obj => obj.name === record.selectedObject)) {
        errorList.push('selectedObject');
    }
    // Check if hour is a valid hour
    if (!(0 <= record.hour && record.hour <= 23)) {
        errorList.push('hour');
    }
    // Check if minute is a valid minute
    if (!(0 <= record.minute && record.minute <= 59)) {
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