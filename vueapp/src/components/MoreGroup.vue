<script setup>
import('../assets/css/loadingAnimation.css');

import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRecordsWithGroup } from '../core/userRecords';
import { user } from '@/core/userInfo';

import RecordList from '@/view/RecordsList.vue'
import LoadingAnimation from '@/view/LoadingAnimation.vue';
import { friendList } from '@/core/userInfo';
import { inviteFriendToGroup, removeMemberFromGroup, promoteMemberInGroup, demoteMemberInGroup } from '../core/groupInfo'

const route = useRoute();
const router = useRouter();

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

const showInterface = reactive({
    showGroupInfo: false,
    showFriendInviteBox: false,
    showLeaveOption: false
});

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

function showOptionalActions(action){
    if(action === 'invite'){
        showInterface.showLeaveOption = false;
        showInterface.showFriendInviteBox = !showInterface.showFriendInviteBox;
    }
    else if(action === 'leave')
    {
        showInterface.showFriendInviteBox = false;
        showInterface.showLeaveOption = !showInterface.showLeaveOption;
    }
}

async function leaveGroup(){
    await removeMemberFromGroup(user.value.nickname);
    router.push('/');
}

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
            <div class="header-container">
                <div class="friend-info-header">{{ route.params.groupname }}</div>
                <button class="group-show-info-button custom-button" @click="showInterface.showGroupInfo = !showInterface.showGroupInfo" />
                <button v-if="infoAboutGroup.isCreator" class="delete-group-button custom-button" @click="deleteGroup()"></button>
                <Transition name="bounce">
                    <div class="group-actions-container" v-if="showInterface.showGroupInfo">
                        <div class="header-container">
                            <button class="show-invite-friend-button" @click="showOptionalActions('invite')">Invite</button>
                            <button class="show-invite-friend-button" @click="showOptionalActions('leave')">Leave</button>
                        </div>
                        <div v-if="showInterface.showFriendInviteBox" class="frieds-container">
                            <div class="info-social-header">Invite</div>
                            <div :class="{'member-enitity': member !== lastToInvite,'member-enitity-last': member === lastToInvite}" v-for="(friend, index) in friendToInvite" :key="index">
                                <p>{{ friend.name }}</p>
                                <button class="invite-friend-button custom-button" @click="inviteToGroup(friend.name)" />
                            </div>
                        </div>
                        <div class="leave-group-option" v-else-if="showInterface.showLeaveOption">
                            <p style="text-align: center;">Leave this group?</p>
                            <button class="leave-button" @click="leaveGroup()">Leave</button>
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="info-header">Created by: {{ infoAboutGroup.Creator }}</div>
            <div class="social-action-container">
                <div class="members-container">
                    <div class="info-social-header">Members</div>
                    <div v-for="(member, index) in infoAboutGroup.members" 
                        :class="{'member-enitity': member !== lastMember,'member-enitity-last': member === lastMember}" :key="index">
                        <p>{{ member }}</p>
                        <div v-if="infoAboutGroup.isCreator" class="member-action-buttons">
                            <button class="promote-member custom-button" @click="promoteMember(member)"/>
                            <button class="demote-member custom-button" @click="demoteMember(member)" />
                            <button class="remove-friend-button custom-button" @click="removeMember(member)" />
                        </div>
                    </div>
                </div>
            </div>
                <h2 style="text-align: center;">Group Records</h2>
                <record-list :no-recent="infoAboutGroup.records.length === 0" :group="$route.params.groupname" />
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

.header-container{
    display: flex;
    flex-direction: row;
}

.group-actions-container{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 9em;
    border: 3px solid black;
    border-radius: 5px;
    background-color: #03f7ff;
    width: auto;
    z-index: 1;
}

.show-invite-friend-button{
    background-color: #55FFEF;
    width: auto;
    border-style: solid;
    border-color: black;
    border-radius: 0.5em;
    border-width: 0.15em;
    padding: 0.5em;
    font-weight: bold;
    cursor: pointer;
    margin: 10px;
}

.frieds-container{
    display: flex;
    flex-direction: column;
    width: auto;
    margin: 10px;
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
}

.members-container{
    display: flex;
    flex-direction: column;
    width: auto;
    margin-top: 10px;
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
}

.social-action-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.invite-friend-button{
    background-image: url('../assets/svg/Social/addfriend.svg');
    background-color: white;
    margin-left: 10px;
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
    align-items: center;
    border-bottom: 1px solid black;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.member-enitity-last{
    display: flex;
    align-items: center;
    border: none;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.member-action-buttons{
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-left: 5em;
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
    margin-left: auto;
    margin-right: 10px;
}

.promote-member{
    background-image: url('../assets/svg/Social/promote.svg');
    background-color: white;
}

.demote-member{
    background-image: url('../assets/svg/Social/demote.svg');
    background-color: white;
}

.leave-group-option{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.delete-group-button{
    background-image: url('../assets/svg/Social/deletegroup.svg');
    background-color: white;
    justify-content: flex-end;
    margin-left: auto;
}

.leave-button{
    background-color: #fb5b5b;
    width: auto;
    border-style: solid;
    border-color: black;
    border-radius: 0.5em;
    border-width: 0.15em;
    padding: 0.5em;
    font-weight: bold;
    cursor: pointer;
    margin: 10px;
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

.group-show-info-button{
    background-image: url('../assets/svg/Social/more-vertical-circle-svgrepo-com.svg');
    background-color: white;
    margin-left: 10px;
}

@media (max-width: 600px) {
    .member-enitity {
        width: 70%;
    }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

</style>