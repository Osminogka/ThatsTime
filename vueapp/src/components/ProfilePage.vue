<script setup>
import('../assets/css/profile.css')
import { reactive} from 'vue';
import { friendList, friendRequests, groupInvites, groupList, user} from '../core/userInfo'

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
        <div class="nav-header">
          <p class="single-line">Friends</p>
          <hr class="nav-hr"/>
          <div @click="showList('showFriendList')" class="arrow-select-user" 
            :class="{ 'expanded-user' : showInterface.showFriendList }"></div>
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showFriendList" class="main-nav-div">
            <div v-for="(friend ,index) in friendList" :key="index" class="entity">
              <p style="display: inline;">{{ friend.name }}</p>
              <button class="button-nav custom-button"></button>
              <button class="custom-button delete-button"></button>
            </div>
          </div>
        </Transition>


        <div class="nav-header">
          <p class="single-line">Groups</p>
          <hr class="nav-hr"/>
          <div @click="showList('showGroupList')" class="arrow-select-user" 
            :class="{ 'expanded-user' : showInterface.showGroupList }"></div>
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showGroupList" class="main-nav-div">
            <div v-for="(group ,index) in groupList" :key="index" class="entity">
              <p style="display: inline;">{{ group.name }}</p>
              <button class="button-nav custom-button"></button>
              <button class="custom-button delete-button"></button>
            </div>
          </div>
        </Transition>

        <div class="nav-header">
          <p class="single-line">Requests</p>
          <hr class="nav-hr"/>
          <div @click="showList('showFriendInvites')" class="arrow-select-user" 
            :class="{ 'expanded-user' : showInterface.showFriendInvites }"></div>
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showFriendInvites" class="main-nav-div">
            <div v-for="(request ,index) in friendRequests" :key="index" class="entity">
              <p style="display: inline;">{{ request.name }}</p>
              <div style="display: block;">
                <button class="button-accept custom-button"></button>
                <button class="button-decline custom-button"></button>
              </div>
            </div>
          </div>
        </Transition>

        
        <div class="nav-header">
          <p class="single-line">Invites</p>
          <hr class="nav-hr"/>
          <div @click="showList('showGroupInvites')" class="arrow-select-user" 
            :class="{ 'expanded-user' : showInterface.showGroupInvites }"></div>
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showGroupInvites" class="main-nav-div">
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