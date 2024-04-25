<script setup>
import('./assets/css/router.css');
import MainHeader from './components/MainHeader.vue';
import { todayDate, monthNames } from './core/month';
import { getMyFriendList, getMyGroupList} from './core/userInfo';
import { isAuthenticated, getCurrentUser } from '@/core/authentication'; 

import { onBeforeMount } from 'vue';

onBeforeMount(async () => {
  getCurrentUser();
  if(isAuthenticated){
    await getMyFriendList();
    await getMyGroupList();
  }
});

</script>

<template>
  <header v-if="isAuthenticated">
    <main-header />
  </header>
  <main>
    <div v-if="isAuthenticated">
      <div class="link-container">
        <router-link to="/" class="custom-link" >Main Page</router-link>
        <router-link to="/records" class="custom-link">Records</router-link>
      </div>
      <h1 class="h1-date">{{ todayDate.getDate() }} {{  monthNames[todayDate.getMonth()] }} {{ todayDate.getFullYear() }}</h1>
    </div>
    <router-view>
    </router-view>
  </main>
</template>

<style scoped>

.h1-date {
  font-size: 2em;
  color: #333;
  text-align: right;
  border-bottom: 2px solid #333;
  font-family: 'Tahoma';
  font-size: 1.3em;
  margin-right: 0.2em;
}

</style>