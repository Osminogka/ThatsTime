import { ref } from 'vue';

export const user = ref({
    name: '',
    email: ''
});

const friendListOnServer = ref([
    
]);
  
const groupListOnServer = ref([
    
]);
  
const friendRequestsOnServer = ref([
    
]);
  
const groupInvitesOnServer = ref([
    
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

