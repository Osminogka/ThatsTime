<script setup>
import('../assets/css/loadingAnimation.css');

import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { getRecordsWithGroup } from '../core/userRecords';

import RecordCard from '@/view/RecordCard.vue';
import LoadingAnimation from '@/view/LoadingAnimation.vue';

const route = useRoute();

const infoAboutGroup = reactive({
    isMember: true,
    isCreator: false,
    Creator: '',
    members: [],
    records: []
});
const error = ref(null);
const loading = ref(false);

const groupName = ref(route.params.groupname);

onMounted(async () => {
    await fetchData();
});

watch(() => route.params.groupname, async (groupname) =>{
    groupName.value = groupname;
    await fetchData();
    }
);

async function fetchData() {
    error.value = null;
    loading.value = true;
    try{
        let newData = await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const data = await getRecordsWithGroup(route.params.groupname);
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            }, 2000); // 2000 ms delay
        });
        // Clear the current object
        for (let key in infoAboutGroup) {
            delete infoAboutGroup[key];
        }
        // Add new properties
        for (let key in newData) {
            infoAboutGroup[key] = newData[key];
        }
    } catch (e) {
        error.value = e;
    }finally{
        loading.value = false;
    }
}
</script>

<template>
    <div class="group-info-container">
        <div v-if="error">
            <p>{{ error }}</p>
        </div>
        <loading-animation v-else-if="loading" />
        <div v-else-if="infoAboutGroup.isMember">
            <div class="friend-info-header">{{ route.params.groupname }}</div>
            <div class="info-header">Created by: {{ infoAboutGroup.Creator }}</div>
            <div class="info-header">Members</div>
            <div class="members-container">
                <div class="member-enitity" v-for="(member, index) in infoAboutGroup.members" :key="index">
                    <p>{{ member }}</p>
                    <button class="remove-friend-button" v-if="infoAboutGroup.isCreator" @click="removeMember(member)">Remove</button>
                </div>
            </div>
            <div v-if="infoAboutGroup.records.length === 0">
                <p>There are no records yet</p>
            </div>
            <div v-else>
                <record-card v-for="(record, index) in infoAboutGroup.records" :key="index" :record="record" />
            </div>
        </div>
        <div v-if="!infoAboutGroup.isMember">
            <h1 class="not-your-friend">You are not member of such group</h1>
        </div>
    </div>
</template>

<style scoped>

.group-info-container{
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.members-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    align-items: stretch;
    border: 5px solid black;
    border-radius: 5px;
    background-color: white;
    padding-left: 10px;
    font-size: 1.2em;
    padding-right: 10px;
    max-height: 250px;
    overflow-y: auto;
    max-width: 70%;
}

.friend-info-header{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.not-your-friend{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.member-enitity{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.info-header{
    font-size: 1.2em;
    font-family: 'Brush Script MT', cursive;
    font-weight: bold;
}

.remove-friend-button{

}

</style>