<template>
  <div class="cont-layout">
    <SideBar></SideBar>
    <AppMain></AppMain>
  </div>
</template>

<script setup>
import SideBar from './SideBar.vue';
import AppMain from './AppMain.vue';
</script>

<style lang="scss" scoped>
.cont-layout {
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>