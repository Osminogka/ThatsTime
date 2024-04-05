<script setup>
import('../assets/css/profile.css');
import CustomHideShow from '../view/CustomHideShow.vue';
import { reactive, onBeforeMount} from 'vue';
import { friendList, friendRequests, groupInvites, groupList, user} from '../core/userInfo';
import { getMyFriendRequests, getMyGroupInvites} from '../core/userInfo';

onBeforeMount(async () => {
  let friendInviteResponse = await getMyFriendRequests();
  if(friendInviteResponse.success)
    friendRequests.value = friendInviteResponse.friendList;
  else{
    friendRequests.value = [];
    console.log("Error getting friend invites");
  }
  await getMyGroupInvites();
});

function showList(list){
  showInterface[list] = !showInterface[list];
}

const showInterface = reactive({
    showFriendList: false,
    showGroupList: false,
    showFriendInvites: false,
    showGroupInvites: false,
});
</script>

<template>
  <div class="container-user">
    <div class="user-basic-info">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
    </div>
    <div class="user-info-list">
        <custom-hide-show :showInterface="showInterface.showFriendList" @showList="showList" :showType="'showFriendList'">
          Friends
        </custom-hide-show>
        <Transition name="navlists">
          <div v-if="showInterface.showFriendList" class="main-profile-div">
            <div v-for="(friend ,index) in friendList" :key="index" class="entity">
              <p style="display: inline;">{{ friend.name }}</p>
              <button class="button-nav custom-button"></button>
              <button class="custom-button delete-button"></button>
            </div>
          </div>
        </Transition>


        <custom-hide-show :showInterface="showInterface.showGroupList" @showList="showList" :showType="'showGroupList'">
          Groups
        </custom-hide-show>
        <Transition name="navlists">
          <div v-if="showInterface.showGroupList" class="main-profile-div">
            <div v-for="(group ,index) in groupList" :key="index" class="entity">
              <p style="display: inline;">{{ group.name }}</p>
              <button class="button-nav custom-button"></button>
              <button class="custom-button delete-button"></button>
            </div>
          </div>
        </Transition>

        <custom-hide-show :showInterface="showInterface.showFriendInvites" @showList="showList" :showType="'showFriendInvites'">
          Invites
        </custom-hide-show>
        <Transition name="navlists">
          <div v-if="showInterface.showFriendInvites" class="main-profile-div">
            <div v-for="(request ,index) in friendRequests" :key="index" class="entity">
              <p style="display: inline;">{{ request.name }}</p>
              <div style="display: block;">
                <button class="button-accept custom-button"></button>
                <button class="button-decline custom-button"></button>
              </div>
            </div>
          </div>
        </Transition>

        
        <custom-hide-show :showInterface="showInterface.showGroupInvites" @showList="showList" :showType="'showGroupInvites'">
          Group Invites
        </custom-hide-show>
        <Transition name="navlists">
          <div v-if="showInterface.showGroupInvites" class="main-profile-div">
            <div v-for="(invite ,index) in groupInvites" :key="index" class="entity">
              <p style="display: inline;">{{ invite.name }}</p>
              <div style="display: block;">
                <button class="button-accept custom-button"></button>
                <button class="button-decline custom-button"></button>
              </div>
            </div>
          </div>
        </Transition>
    </div>
  </div>
</template>