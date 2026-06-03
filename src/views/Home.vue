<template>
  <div class="home">
    <div @click="loginHandler()" class="main-btn">{{ $t('login')}}</div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';
import { showToast } from 'vant';
defineOptions({
  name: 'Home'
});
const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const router = useRouter();

function swl() {
  languageStore.setLocale('zh')
  themeStore.switchDark()
}

function loginHandler() {
  // router.go(-1)
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  // background-color: aqua;
  .main-btn {
    width: 100px;
    height: 100px;
    background-color: aqua;
  }
}
</style>