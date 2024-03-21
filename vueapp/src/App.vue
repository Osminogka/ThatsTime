<script setup>
import('./assets/css/router.css');
import MainHeader from './components/MainHeader.vue';
import { todayDate, monthNames } from './core/month';

</script>

<template>
  <header>
    <main-header />
  </header>
  <main>
    <div class="link-container">
      <router-link to="/" class="custom-link" >Main Page</router-link>
      <router-link to="/records" class="custom-link">Records</router-link>
    </div>
    <h1 class="h1-date">{{ todayDate.getDate() }} {{  monthNames[todayDate.getMonth()] }} {{ todayDate.getFullYear() }}</h1>
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
}

</style>