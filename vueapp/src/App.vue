<script setup>
import('./assets/css/header.css');
import('./assets/css/navigation.css');
import('./assets/css/nav-buttons.css');

import { ref } from 'vue';

const showSideBar = ref(false);
const friendList = ref([
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

const groupList = ref([
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

const friendRequests = ref([
  { name: 'Friend Request 1' },
  { name: 'Friend Request 2' },
  { name: 'Friend Request 3' },
  { name: 'Friend Request 4' },
  { name: 'Friend Request 5' }
]);

const groupInvites = ref([
  { name: 'Group Invite 1' },
  { name: 'Group Invite 2' },
  { name: 'Group Invite 3' },
  { name: 'Group Invite 4' },
  { name: 'Group Invite 5' }
]);

</script>

<template>
  <header>
    <div class="main-header">
      <div class="main-header">
        <button class="svg-button" @click="showSideBar = !showSideBar">
        </button>
        <h1 class="header-text">That's Time!</h1>
      </div>
    </div>
    <Transition name="sidebar">
      <div v-if="showSideBar" class="sidenav">
        <p class="nav-header">Your Friends</p>
        <div class="main-nav-div">
          <div v-for="(friend ,index) in friendList" :key="index" class="sidebar-entity-box">
            <p style="display: inline;">{{ friend.name }}</p>
            <button class="button-nav">More info</button>
          </div>
        </div>
        <p class="nav-header">Your groups</p>
        <div class="main-nav-div">
          <div v-for="(group ,index) in groupList" :key="index" class="sidebar-entity-box">
            <p style="display: inline;">{{ group.name }}</p>
            <button class="button-nav">More info</button>
          </div>
        </div>
        <p class="nav-header">Your friend request</p>
        <div class="main-nav-div">
          <div v-for="(request ,index) in friendRequests" :key="index" class="sidebar-entity-box">
            <p style="display: inline;">{{ request.name }}</p>
            <div style="display: block;">
              <button class="button-accept"></button>
              <button class="button-decline"></button>
            </div>
          </div>
        </div>
        <p class="nav-header">Your group invites</p>
        <div class="main-nav-div">
          <div v-for="(invite ,index) in groupInvites" :key="index" class="sidebar-entity-box">
            <p style="display: inline;">{{ invite.name }}</p>
            <div style="display: block;">
              <button class="button-accept"></button>
              <button class="button-decline"></button>
            </div>
          </div>
        </div>
      </div>
  </Transition>
  </header>
  <main>

  </main>
</template>