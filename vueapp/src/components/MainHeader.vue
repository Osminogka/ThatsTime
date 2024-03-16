<script setup>
import('../assets/css/header.css');
import('../assets/css/navigation.css');
import('../assets/css/nav-buttons.css');
import('../assets/css/user.css');
import { reactive, ref, onMounted } from 'vue';
import { friendList, friendRequests, groupInvites, groupList} from '../Core/userInfo'

let animateButton;

onMounted(() => {
  animateButton = document.getElementById('user-icon-button');

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
  let heightPercentage = (mainHeader.offsetHeight / parentElement.offsetHeight) * 100 - 20;
  sidebar.style.height = 'calc(100% - ' + heightPercentage + 'px)';
});

function rotateTag(showProp) {
  let tempProp = showInterface[showProp];
  tempProp = !tempProp;
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
    showFriendInvites: false,
    showGroupInvites: false,
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
        <button id="user-icon-button" @click="showUserNav = !showUserNav" class="user-icon"></button>
      </div>
    </div>
    <Transition name="usernav">
      <div v-if="showUserNav" class="user-nav">
        <button class="button-nav-user button-nav-profile"></button>
        <button class="button-nav-user button-nav-settings"></button>
        <button class="button-nav-user button-nav-logout"></button>
      </div>
    </Transition>

    <Transition name="sidebar">
      <div id="sidebar" v-show="showInterface.showSideBar" class="sidenav">
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

        <div class="nav-header">
          <p class="single-line">Requests</p>
          <hr class="nav-hr"/>
          <button id="showFriendInvites" @click="rotateTag('showFriendInvites')" class="expend-info custom-button" />
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showFriendInvites" class="main-nav-div">
            <div v-for="(request ,index) in friendRequests" :key="index" class="sidebar-entity-box">
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
          <button id="showGroupInvites" @click="rotateTag('showGroupInvites')" class="expend-info custom-button" />
        </div>
        <Transition name="navlists">
          <div v-if="showInterface.showGroupInvites" class="main-nav-div" style="margin-bottom: 20px;">
            <div v-for="(invite ,index) in groupInvites" :key="index" class="sidebar-entity-box">
              <p style="display: inline;">{{ invite.name }}</p>
              <div style="display: block;">
                <button class="button-accept custom-button"></button>
                <button class="button-decline custom-button"></button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
  </Transition>
</template>