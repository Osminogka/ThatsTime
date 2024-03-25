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
    { name: 'Group1', creator: 'Osminogka'},
    { name: 'Group2' , creator: 'Osminogka'},
    { name: 'Group3' , creator: 'Osminogka'},
    { name: 'Group4' , creator: 'Osminogka'},
    { name: 'Group5' , creator: 'Osminogka'},
    { name: 'Group6' , creator: 'Osminogka'},
    { name: 'Group7' , creator: 'Osminogka'},
    { name: 'Group8' , creator: 'Osminogka'},
    { name: 'Group9' , creator: 'Osminogka'},
    { name: 'Group10', creator: 'Osminogka' },
    { name: 'Group11', creator: 'Osminogka' },
    { name: 'Group12', creator: 'Osminogka' },
    { name: 'Group13', creator: 'Osminogka' },
    { name: 'Group14', creator: 'Osminogka' },
    { name: 'Group15', creator: 'Osminogka' },
    { name: 'Group16', creator: 'Osminogka' },
    { name: 'Group17', creator: 'Osminogka' },
    { name: 'Group18', creator: 'Osminogka' },
    { name: 'Group19', creator: 'Osminogka' },
    { name: 'Group20', creator: 'Osminogka' }
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

