<script setup>
import RecordCard from '../view/RecordCard.vue'
import { getRecords } from '../core/userRecords'
import { todayDate } from '@/core/month';

const records = getRecords(todayDate.getDate());
</script>

<template>
    <div>
        Your records for previous 7 days:
    </div>
    <div>
        Your records for today:
        <div class="container">
            <record-card v-for="record in records" :record="record" :key="record.id" />
        </div>
    </div>
    <div>
        Your records for next 7 days:
    </div>
</template>

<style scoped>

.container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

</style>