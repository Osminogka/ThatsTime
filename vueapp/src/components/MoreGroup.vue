<script setup>
import('../assets/css/loadingAnimation.css');

import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import { getRecordsWithGroup } from '../core/userRecords';

import RecordCard from '@/view/RecordCard.vue';
import LoadingAnimation from '@/view/LoadingAnimation.vue';
import { friendList } from '@/core/userInfo';
import { inviteFriendToGroup, removeMemberFromGroup, promoteMemberInGroup, demoteMemberInGroup } from '../core/groupInfo'

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
        let newData = await getRecordsWithGroup(route.params.groupname);

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

const lastMember = computed(() => infoAboutGroup.members[infoAboutGroup.members.length - 1]);

const friendToInvite = ref([...friendList.value])

const lastToInvite = computed(() => friendToInvite.value[friendToInvite.value.length - 1].name);

async function removeMember(memberName){
    await removeMemberFromGroup(memberName);
}

async function inviteToGroup(friendName){
    await inviteFriendToGroup(friendName);
    friendToInvite.value = friendToInvite.value.filter(friend => friend.name !== friendName);
}

async function promoteMember(memberName){
    await promoteMemberInGroup(memberName);
}

async function demoteMember(memberName){
    await demoteMemberInGroup(memberName);
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
            <button class="group-show-info-button" @clikc="showGroupInfo()" />
            <div class="info-header">Created by: {{ infoAboutGroup.Creator }}</div>
            <div class="social-action-container">
                <div class="members-container">
                    <div class="info-social-header">Members</div>
                    <div v-for="(member, index) in infoAboutGroup.members" 
                        :class="{'member-enitity': member !== lastMember,'member-enitity-last': member === lastMember}" :key="index">
                        <p>{{ member }}</p>
                        <div v-if="infoAboutGroup.isCreator">
                            <button class="promote-member" @click="promoteMember(member)"/>
                            <button class="demote-member" @click="demoteMember(member)" />
                            <button class="remove-friend-button custom-button" @click="removeMember(member)" />
                        </div>
                    </div>
                </div>
                <div class="members-container">
                    <div class="info-social-header">Invite</div>
                    <div :class="{'member-enitity': member !== lastToInvite,'member-enitity-last': member === lastToInvite}" v-for="(friend, index) in friendToInvite" :key="index">
                        <p>{{ friend.name }}</p>
                        <button class="invite-friend-button custom-button" @click="inviteToGroup(friend.name)" />
                    </div>
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
    max-width: 40%;
}

.social-action-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.invite-friend-button{
    background-image: url('../assets/svg/Social/sendgroupinvite.svg');
    background-color: white;
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

.member-enitity-last{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.info-header{
    font-size: 1.2em;
    font-family: 'Brush Script MT', cursive;
    font-weight: bold;
}

.info-social-header{
    font-size: 1.2em;
    font-family: 'Brush Script MT', cursive;
    font-weight: bold;
    text-align: center;
}

.remove-friend-button{
    background-image: url('../assets/svg/Profile/bin.svg');
    background-color: white;
    padding: 5px;
    margin-left: 20px;
    margin-right: 10px;
}

.custom-button{
    background-position: center;
    background-size:contain;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    height: 2em;
    width: 2em;
}

@media (max-width: 600px) {
    .member-enitity {
        width: 70%;
    }
}

</style>