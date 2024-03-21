<script setup>
import { defineProps } from 'vue';
import { monthNames } from '@/core/month';

const props = defineProps({
    record: Object
});

const isTimeCorrent = () =>{
    return !(props.record.hour == 0 && props.record.minute == 0);
};
</script>

<template>
    <div>
        <div class="record-card">
            <div><label>Date:</label> {{ record.selectedDay }} {{ monthNames[record.selectedMonth - 1] }} {{ record.selectedYear }}</div>
            <div><label>Record creator:</label> {{ record.Creator }}</div>
            <div><label>For user:</label> {{ record.selectedObject }}</div>
            <div v-if="isTimeCorrent"><label>Time:</label> {{ record.hour }} : {{ record.minute }}</div>
            <div class="record-name">{{ record.recordName }}</div>
            <div class="record-content"><p>{{ record.recordContent }}</p></div>
        </div>
    </div>
</template>

<style scoped>

.record-card{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 0.2em solid black;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: #AFFFF5;
    max-width: 20em;
    height: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

label{
    font-weight: bold;
}

.record-name{
    font-size: 1.2em;
    font-family: 'Brush Script MT', cursive;
    font-weight: bold;
    text-align: center;
    margin: 5px;
    color: rgb(6, 6, 197);
}

.record-content{
    font-family: 'Trebuchet MS', sans-serif;
    width: 100%;
    overflow: auto;
    word-wrap: break-word;
    word-break: break-all;
}

</style>