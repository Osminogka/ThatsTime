<script setup>
import { ref } from 'vue';

const showSideBar = ref(false);

</script>

<template>
  <header>
    <div class="main-header">
      <button class="side-bar-button" @click="showSideBar = !showSideBar">Open</button>
      <h1 class="header-text">That's Time!</h1>
    </div>
    <Transition name="sidebar">
      <div v-if="showSideBar" class="sidenav">
        <div>
          <p>Your Friends</p>
        </div>
        <div>
          <p>Your Groups</p>
        </div>
        <div>
          <p>Your friend request</p>
        </div>
        <div>
          <p>Your group invites</p>
        </div>
      </div>
  </Transition>
  </header>
  <main>

  </main>
</template>

<style scoped>
/*

Transition Sidebar

*/
.sidebar-enter-active, .sidebar-leave-active {
  transition: all 0.3s ease-out;
}

.sidebar-leave-active {
  transition: all 0.3 ease-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.sidenav {
  height: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: #38b6ba;
  overflow-x: hidden;
  transition: 0.5s;
}

.sidenav div{
  margin: 10px;
  border-color: black;
  border-style: solid;
}

.side-bar-button{
  z-index: 2;
  margin-right: auto;
  margin-left: 10px;
}

.header-text{
  font-family: 'Brush Script MT', cursive;
  justify-self: center;
  margin-right: auto;
}

.main-header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: aqua;
  width: 100%;
  text-align: center;
  top: 0;
}

</style>