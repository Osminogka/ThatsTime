<script setup>
import('../assets/css/table.css')
import('../assets/css/mainForm.css')
import('../assets/css/user.css')
import { friendList, groupList} from '../Core/userInfo'

import { computed, onMounted, reactive } from 'vue';

let todayDate = new Date();

let currentMonth = new Date().getMonth() + 2;
let currentYear = new Date().getFullYear();
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() - 1;

const importanceList = [
    { name: 'Low', value: 0 },
    { name: 'Medium', value: 1 },
    { name: 'High', value: 2 }
];

const recordCreationForm = reactive({
    selectedDay: 1,
    selectedMonth: currentMonth,
    showGroupList: false,
    selectedObject: friendList.value[0].name,
    importance: 0,
    enterTime: false,
    hour: 0,
    minute: 0,
    recordName: '',
    recordContent: '',
    showObjectList: false,
    showImportanceList: false
});

function toggleObjectList() {
    if(recordCreationForm.showImportanceList)
        recordCreationForm.showImportanceList = false;
    recordCreationForm.showObjectList = !recordCreationForm.showObjectList;
}
function selectObjectList(option) {
    recordCreationForm.selectedObject = option;
}

function toggleImportance() {
    recordCreationForm.showImportanceList = !recordCreationForm.showImportanceList;
}

function selectImportance(option) {
    recordCreationForm.importance = importanceList.find(item => item.name === option).value;
}

let animateCell = (event) => {
    let button = event.target;
    button.classList.add('animate');
    setTimeout(() => {
        button.classList.remove('animate');
        recordCreationForm.selectedDay = event.target.textContent;
    }, 300);
}

let animateArrow = (event) => {
    recordCreationForm.selectedMonth += 1;
    let button = event.target;
    button.classList.add('animate');
    setTimeout(() => {
        button.classList.remove('animate');
    }, 300);
}


onMounted(() => {
    let forGroupSelector = document.getElementById('input-checkbox');
    forGroupSelector.addEventListener('change', () => {
        recordCreationForm.showGroupList? recordCreationForm.selectedObject = groupList.value[0].name : recordCreationForm.selectedObject = friendList.value[0].name;
    });
});

let weeks = computed(() => {
    let weeks = [];
    let week = [];
    let day = 1;

  // Fill the first week of the month with empty days until the first day of the month
    for (let i = 0; i < 7; i++) {
        if (i < firstDayOfMonth) {
            week.push(null);
        } else {
            week.push(day++);
        }
    }
    weeks.push(week);

// Fill the rest of the weeks
    while (day <= daysInMonth) {
        week = [];
        for (let i = 0; i < 7; i++) {
            if(day <= daysInMonth)
                week.push(day++);
            else
                week.push(null);
        }
        weeks.push(week);
    }
    return weeks;
});
</script>

<template>
    <h1 class="h1-date">{{ todayDate.getDate() }} {{  monthNames[todayDate.getMonth()] }} {{ todayDate.getFullYear() }}</h1>
    <div class="container">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(week, index) in weeks" :key="index">
                        <td v-for="(day, index) in week" :key="index" 
                            :class="{ 'td-today': day === currentDay, 'td-common-day': day !== currentDay, 'td-null-day': day === null }">
                                <button :id="'table-button' + day" v-if="day !== null" @click="animateCell" class="button-cell" 
                                    :class="{'button-cell-current-day': day === currentDay, 'button-cell-selected': day == recordCreationForm.selectedDay}">
                                    {{ day }}
                                </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="arrow-container">
                <button @click="animateArrow(-1)" class="left-arrow custom-button arrow" />
                <button @click="animateArrow(1)" class="right-arrow custom-button arrow" />
            </div>
        </div>
        <form class="form-for-record">
            <p class="p-selected-day">Selected day: {{ recordCreationForm.selectedDay }}</p>
            <div>
                <input id="input-checkbox" v-model="recordCreationForm.showGroupList" type="checkbox" /> For Group
            </div>
            <div class="aselect" :data-value="recordCreationForm.selectedObject" :data-list="recordCreationForm.showGroupList? groupList : friendList">
                <div class="selector" @click="toggleObjectList()">
                    <div class="label">
                        <span>{{ recordCreationForm.selectedObject }}</span>
                    </div>
                    <div class="arrow" :class="{ expanded : recordCreationForm.showObjectList }"></div>
                    <Transition name="fadey">
                        <div v-if="recordCreationForm.showObjectList">
                            <ul>
                                <li :class="{ current : item === value }" v-for="(item, index) in recordCreationForm.showGroupList? groupList : friendList" 
                                @click="selectObjectList(item.name)" :key="index">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>
            </div>
            <label>Select importance</label>
            <div class="aselect" :data-value="recordCreationForm.importance" :data-list="importanceList.name">
                <div class="selector" @click="toggleImportance()">
                    <div class="label">
                        <span>{{ importanceList.find(item => item.value === recordCreationForm.importance).name }}</span>
                    </div>
                    <div class="arrow" :class="{ expanded : recordCreationForm.showImportanceList }"></div>
                    <Transition name="fadey">
                        <div v-if="recordCreationForm.showImportanceList">
                            <ul>
                                <li :class="{ current : item === value }" v-for="(item, index) in importanceList" 
                                @click="selectImportance(item.name)" :key="index">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>
            </div>
            <div>
                <input id="input-checkbox" type="checkbox" v-model="recordCreationForm.enterTime" /> Enter time
            </div>
            <Transition name="showTimeEnter">
                <div v-if="recordCreationForm.enterTime">
                    <label>Hour</label>
                    <input v-model="recordCreationForm.hour" type="number" step="1" min="0" max="23" />
                    <label>Minute</label>
                    <input v-model="recordCreationForm.minute" type="number" step="1" min="0" max="59" />
                </div>
            </Transition>
            <div>
                <label>Record Name</label>
                <input type="text" v-model="recordCreationForm.recordName" />
                <label>Record Content</label>
                <textarea class="input-record-content" v-model="recordCreationForm.recordContent"></textarea>
            </div>
        </form>
    </div>
</template>

<style scoped>
.h1-date {
  font-size: 2em;
  color: #333;
  padding: 10px;
  text-align: right;
  border-bottom: 2px solid #333;
  font-family: 'Tahoma';
  font-size: 1.3em;
}
</style>