<template>
  <div class="common-layout">
    <el-container>
      <div class="wrapper">
        <TheAside />
        <div class="main-wrapper">
          <el-header class="site-header">
            <div class="site-header__wrapper">
              <div class="site-header__wrapper--user">
                <h5>{{ user?.name }}</h5>
                <svg width="40" height="40" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"></path></svg>
                <el-button type="primary" @click="Logout">Logout</el-button>
              </div>
            </div>
          </el-header>
          
          <el-main class="site-main">
            <router-view></router-view>
          </el-main>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core';
import TheAside from "../../components/TheAside.vue"
import { useStore } from 'vuex';
const store = useStore();
const user = ref()

onMounted(() => {
  user.value = store.state.user
})

const Logout = () => {
  store.dispatch("logout")
}
</script>

<style scoped>

.wrapper{
  display: flex;
  width: 100%;
  height: 100vh;
}
.site-header{
  background-color: darkslategray;
}
.site-header__wrapper{
  display: flex;
  justify-content: flex-end;
}
.site-header__wrapper--user{
  align-items: center;
  display: flex;
}
.site-header__wrapper--user h5{
  color: #fff;
}
.site-header__wrapper--user svg{
  color: #fff;
}
.site-aside{
  background-color: darkslategray;
}
.aside-top h3{
  color: #fff;
}
.main-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
