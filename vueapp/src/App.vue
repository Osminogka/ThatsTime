<script setup>
import('./assets/css/router.css');
import MainHeader from './components/MainHeader.vue';

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
    <router-view></router-view>
  </main>
</template>