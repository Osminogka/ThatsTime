<script setup>
import('../assets/css/table.css')
import('../assets/css/mainForm.css')
import { friendList, groupList} from '../Core/userInfo'

import { computed, ref } from 'vue';

let currentMonth = new Date().getMonth() + 2;
let currentYear = new Date().getFullYear();
let currentDay = new Date().getDate();
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonthName = monthNames[currentMonth];

let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() - 1;

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

const selectedDay = ref(1);

const showGroupList = ref(false);
const var_importance = ref(0);
const enterTime =ref(false);
const var_hour = ref(0);
const var_minute = ref(0);
const var_recordName = ref('');
const var_recordContent = ref('');
</script>

<template>
    <h1 class="h1-date">{{ currentDay }} {{ currentMonthName }} {{ currentYear }}</h1>
    <div class="container">
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
                            <button v-if="day !== null" @click="selectedDay = day" class="button-cell" :class="{'button-cell-current-day': day === currentDay}">{{ day }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <form class="form-for-record">
            <p class="p-selected-day">Selected day: {{ selectedDay }}</p>
            <div>
                <input id="input-checkbox" v-model="showGroupList" type="checkbox" /> For Group
            </div>
            <select id="selectBox">
              <option v-for="(friend, index) in showGroupList? groupList : friendList" :key="index" :value="friend.name">{{ friend.name }}</option>
            </select>
            <label>Select importance</label>
            <select v-model="var_importance">
                <option value="2">Very important</option>
                <option value="1">Important</option>
                <option value="0">Not important</option>
            </select>
            <div>
                <input id="input-checkbox" type="checkbox" v-model="enterTime" /> Enter time
            </div>
            <div v-if="enterTime">
                <label>Hour</label>
                <input v-model="var_hour" type="number" step="1" min="0" max="23" />
                <label>Minute</label>
                <input v-model="var_minute" type="number" step="1" min="0" max="59" />
            </div>
            <div>
                <label>Record Name</label>
                <input type="text" v-model="var_recordName" />
                <label>Record Content</label>
                <textarea class="input-record-content" v-model="var_recordContent"></textarea>
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