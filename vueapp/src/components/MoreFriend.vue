<script setup>
import('../assets/css/loadingAnimation.css');

import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { getRecordsWithFriend } from '../core/userRecords';

import RecordCard from '@/view/RecordCard.vue';
import LoadingAnimation from '@/view/LoadingAnimation.vue';

const route = useRoute();

const infoAboutFriend = reactive({
    isFriend: true,
    records: []
});
const error = ref(null);
const loading = ref(false);

const friendNickname = ref(route.params.nickname);

onMounted(async () => {
    await fetchData();
});

watch(() => route.params.nickname, async (nickname) =>{
    friendNickname.value = nickname;
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
                    const data = await getRecordsWithFriend(route.params.nickname);
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            }, 2000); // 2000 ms delay
        });
        // Clear the current object
        for (let key in infoAboutFriend) {
            delete infoAboutFriend[key];
        }
        // Add new properties
        for (let key in newData) {
            infoAboutFriend[key] = newData[key];
        }
    } catch (e) {
        error.value = e;
    }finally{
        loading.value = false;
    }
}
</script>

<template>
    <div v-if="error">
        <p>{{ error }}</p>
    </div>
    <loading-animation v-else-if="loading" />
    <div v-else-if="infoAboutFriend.isFriend">
        <div class="friend-info-header">{{ route.params.nickname }}</div>
        <div v-if="infoAboutFriend.records.length === 0">
            <p>There are no records yet</p>
        </div>
        <div v-else>
            <record-card v-for="(record, index) in infoAboutFriend.records" :key="index" :record="record" />
        </div>
    </div>
    <div v-if="!infoAboutFriend.isFriend">
        <h1 class="not-your-friend">You don't have such friend</h1>
    </div>
</template>

<style scoped>

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

</style>