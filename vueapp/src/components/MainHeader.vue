<script setup>
import('../assets/css/header.css');
import('../assets/css/navigation.css');
import('../assets/css/nav-buttons.css');
import('../assets/css/user.css');
import { reactive, ref, onMounted } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
import { friendList, groupList} from '../core/userInfo'

function hideSideBar() {
  if(showInterface.showSideBar && event.target.id != 'showSideBar')
  {
    showInterface.showSideBar = false;
    rotateTag('showSideBar', true);
  }
}

function hideUserNav() {
  if(showUserNav.value && event.target.id != 'user-icon-button')
  {
    showUserNav.value = false;
  }
}

onMounted(() => {
  window.addEventListener('scroll', hideSideBar);
  window.addEventListener('scroll', hideUserNav);
  let animateButton = document.getElementById('user-icon-button');

  animateButton.addEventListener('click', () => {
    animateButton.classList.add('animate');

    // Remove the 'animate' class after the animation is finished
    setTimeout(() => {
      animateButton.classList.remove('animate');
    }, 300);
});

  const mainHeader = document.getElementById('main-header');
  const sidebar = document.getElementById('sidebar');
  let parentElement = mainHeader.parentElement;
  let heightPercentage = (mainHeader.offsetHeight / parentElement.offsetHeight) * 100 - 18;
  sidebar.style.height = 'calc(100% - ' + heightPercentage + 'px)';
});

function rotateTag(showProp, isExplicit = false) {
  let tempProp = showInterface[showProp];
  if(!isExplicit) tempProp = !tempProp;
  showInterface[showProp] = tempProp;
  var new_value = "";
  if(tempProp)
    if(showProp == 'showSideBar')
      new_value = 'rotate(90deg)';
    else
      new_value = "rotate(180deg)";
  else
    new_value = "rotate(0deg)";
  
  document.getElementById(showProp).style.transform = new_value;
}

const showInterface = reactive({
    showSideBar: false,
    showFriendList: false,
    showGroupList: false,
});

const showUserNav = ref(false);

//const username = 'Osminogka';
</script>

<template>
    <div id="main-header" class="main-header">
      <div class="main-header">
        <button id="showSideBar" class="show-nav-button" @click="rotateTag('showSideBar')">
        </button>
        <h1 class="header-text">That's Time!</h1>
        <button id="user-icon-button" @click="showUserNav = !showUserNav" class="user-icon" v-on-click-outside="hideUserNav"></button>
      </div>
    </div>
    <Transition name="usernav">
      <div id="usernavmenu" v-show="showUserNav" class="user-nav">
        <router-link to="/profile" class="button-nav-user button-nav-profile"></router-link>
        <router-link to="/logout" class="button-nav-user button-nav-logout"></router-link>
      </div>
    </Transition>

    <Transition name="sidebar">
      <div id="sidebar" v-show="showInterface.showSideBar" class="sidenav" v-on-click-outside="hideSideBar">
        <router-link to="/addfriend" class="add-button add-friend-button custom-button"></router-link>
        <router-link to="/addgroup" class="add-button add-group-button custom-button"></router-link>
        <div class="nav-header">
          <p class="single-line">Friends</p>
          <hr class="nav-hr"/>
          <button id="showFriendList" @click="rotateTag('showFriendList')" class="expend-info custom-button" />
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showFriendList" class="main-nav-div">
            <div v-for="(friend ,index) in friendList" :key="index" class="sidebar-entity-box">
              <p style="display: inline;">{{ friend.name }}</p>
              <button class="button-nav custom-button"></button>
            </div>
          </div>
        </Transition>


        <div class="nav-header">
          <p class="single-line">Groups</p>
          <hr class="nav-hr"/>
          <button id="showGroupList" @click="rotateTag('showGroupList')" class="expend-info custom-button" />
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showGroupList" class="main-nav-div">
            <div v-for="(group ,index) in groupList" :key="index" class="sidebar-entity-box">
              <p style="display: inline;">{{ group.name }}</p>
              <button class="button-nav custom-button"></button>
            </div>
          </div>
        </Transition>
      </div>
  </Transition>
</template>