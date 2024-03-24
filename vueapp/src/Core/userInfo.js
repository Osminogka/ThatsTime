import { ref } from 'vue';

export const user = ref({
    name: 'Osminogka',
    email: 'davidkorobcenko@gmail.com'
});

const friendListOnServer = ref([
    { name: 'Friend1' },
    { name: 'Friend2' },
    { name: 'Friend3' },
    { name: 'Friend4' },
    { name: 'Friend5' },
    { name: 'Friend6' },
    { name: 'Friend7' },
    { name: 'Friend8' },
    { name: 'Friend9' },
    { name: 'Friend10' }
]);
  
const groupListOnServer = ref([
    { name: 'Group1' },
    { name: 'Group2' },
    { name: 'Group3' },
    { name: 'Group4' },
    { name: 'Group5' },
    { name: 'Group6' },
    { name: 'Group7' },
    { name: 'Group8' },
    { name: 'Group9' },
    { name: 'Group10' },
    { name: 'Group11' },
    { name: 'Group12' },
    { name: 'Group13' },
    { name: 'Group14' },
    { name: 'Group15' },
    { name: 'Group16' },
    { name: 'Group17' },
    { name: 'Group18' },
    { name: 'Group19' },
    { name: 'Group20' }
]);
  
const friendRequestsOnServer = ref([
    { name: 'Friend Request 1' },
    { name: 'Friend Request 2' },
    { name: 'Friend Request 3' },
    { name: 'Friend Request 4' },
    { name: 'Friend Request 5' }
]);
  
const groupInvitesOnServer = ref([
    { name: 'Group Invite 1' },
    { name: 'Group Invite 2' },
    { name: 'Group Invite 3' },
    { name: 'Group Invite 4' },
    { name: 'Group Invite 5' }
]);

export const friendList = ref([

]);
  
export const groupList = ref([

]);
  
export const friendRequests = ref([

]);
  
export const groupInvites = ref([

]);

export const getMyFriendList = async () => {
    if(friendList.value.length === 0) {
        friendList.value = friendListOnServer.value;
    }
    return friendList.value;
}

export const getMyGroupList = async () => {
    if(groupList.value.length === 0) {
        groupList.value = groupListOnServer.value;
    }
    return groupList.value;
}

export const getMyFriendRequests = async () => {
    if(friendRequests.value.length === 0) {
        friendRequests.value = friendRequestsOnServer.value;
    }
    return friendRequests.value;
}

export const getMyGroupInvites = async () => {
    if(groupInvites.value.length === 0) {
        groupInvites.value = groupInvitesOnServer.value;
    }
    return groupInvites.value;
}

