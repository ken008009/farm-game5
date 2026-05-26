<template>
  <div id="app">
    <GlobalLoading />
    <RouterView v-slot="{ Component, route }">
      <keep-alive include="Home,Game,Game2">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </RouterView>
  </div>
  <!-- <div id="app">
    <GlobalLoading />
    <keep-alive>
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </keep-alive>
  </div> -->
</template>
<script setup>
import { RouterView } from 'vue-router'
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';
import { useAudioStore } from "@/stores/audioStore";
import ALightTheme from '@/theme/light';
import GlobalLoading from '@/components/loading/GlobalLoading.vue';
// 国际化
const { locale } = useI18n();
const languageStore = useLanguageStore();
watch(
  () => languageStore.locale,
  (curr, pre) => {
    switchLocale(curr)
  }
)
function switchLocale(lang) {
  console.log(lang)
  locale.value = lang
}

// 主题颜色
const themeStore = useThemeStore();
const currTheme = ref(ALightTheme);
watch(
  () => themeStore.Atheme,
  (curr, pre) => {
    switchTheme(curr)
  }
)
function switchTheme(theme) {
  console.log(theme)
  currTheme.value = theme
}
const audioStore = useAudioStore()
onMounted(() => {
  audioStore.initAudio('/game/audio/1.mp3')
});
</script>
<style scoped></style>
