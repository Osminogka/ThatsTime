<script setup>
import RecordCard from '../view/RecordCard.vue'
import CustomHideShow from '@/view/CustomHideShow.vue';
import DateSelector from '@/view/DateSelector.vue';
import { getRecords, getCertainRecord,getRecordsFromServer } from '../core/userRecords'
import { todayDate } from '@/core/month';

import { ref, onMounted } from 'vue';

onMounted(() => {
    getRecordsFromServer();
    records.value.find(record => record.showType == 0).records = getRecords(todayDate.getDate());
});

const records = ref([
    {
        showType: -7,
        records: [],
        isGotBefore: false,
        isHidden: true
    },
    {
        showType: 0,
        records: [],
        isGotBefore: false,
        isHidden: false
    },
    {
        showType: 7,
        records: [],
        isGotBefore: false,
        isHidden: true
    },
    {
        showType: -1,
        records: [],
    }
]);

function getRecordsLocal(date){
    records.value.find(record => record.showType == date).isHidden = !records.value.find(record => record.showType == date).isHidden;
    if(records.value.find(record => record.showType == date).isGotBefore) 
        return;
    records.value.find(record => record.showType == date).records = getRecords(todayDate.getDate() + parseInt(date));
    records.value.find(record => record.showType == date).isGotBefore = true;
}

function getVisibility(showType){
    return !records.value.find(record => record.showType == showType).isHidden;
}

const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

function searchRecord(){
    let date = {
        day: selectedDay.value,
        month: selectedMonth.value,
        year: selectedYear.value
    }
    records.value.find(record => record.showType == '-1').records = getCertainRecord(date);
}
</script>

<template>
    <div class="container-records">
            <custom-hide-show :showInterface="records.find(record => record.showType == '-7').isHidden"  @showList="getRecordsLocal" :showType="'-7'">
                Last week
            </custom-hide-show>
            <Transition  name="fadey">
                <div v-if="getVisibility('-7')">
                    <div v-if="records.find(record => record.showType == '-7').records.length == 0">No records</div>
                    <div v-else  class="container-week">
                        <record-card v-for="(record, index) in records.find(record => record.showType == '-7').records" :record="record" :key="index"/>
                    </div>
                </div>
            </Transition>
            <custom-hide-show :showInterface="records.find(record => record.showType == '0').isHidden" @showList="getRecordsLocal" :showType="'0'">
                Today
            </custom-hide-show>
            <Transition  name="fadey">
                <div v-if="getVisibility('0')">
                    <div v-if="records.find(record => record.showType == '0').records.length == 0">No records</div>
                    <div v-else  class="container-week">
                        <record-card v-for="(record, index) in records.find(record => record.showType == '0').records" :record="record" :key="index"/>
                    </div>
                </div>
            </Transition>
            <custom-hide-show :showInterface="records.find(record => record.showType == '7').isHidden" @showList="getRecordsLocal" :showType="'7'">
                Next week
            </custom-hide-show>
            <Transition name="fadey">
                <div v-if="getVisibility('7')">
                    <div v-if="records.find(record => record.showType == '7').records.length == 0">No records</div>
                    <div v-else  class="container-week">
                        <record-card v-for="(record, index) in records.find(record => record.showType == '7').records" :record="record" :key="index"/>
                    </div>
                </div>
            </Transition>
        <div class="search-record-box">
            <date-selector v-model="selectedDay" type="day"/>
            <date-selector v-model="selectedMonth" type="month"/>
            <date-selector v-model="selectedYear" type="year"/>
            <button @click="searchRecord" class="search-button custom-button"></button>
        </div> 
        <div class="container-week">
            <record-card v-for="(record, index) in records.find(record => record.showType == '-1').records" :record="record" :key="index"/>
        </div>
    </div>
</template>

<style scoped>

.container-records{
    margin: 0.2em;
}

.container-week{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}


@media  (max-width: 600px) {
    .container-week{
        justify-content: center;
    }
}

.fadey-enter-active, .fadey-leave-active {
    transition: all 0.3s ease-out;
}

.fadey-leave-active {
    transition: all 0.3 ease-out;
}

.fadey-enter-from,
.fadey-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}

.search-record-box{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.search-button{
    background-image: url('../assets/svg/Records/search.svg');
    background-color: white;
    width: 2em;
    height: 2em;
    margin-left: 10px;
    cursor: pointer;
}

</style>