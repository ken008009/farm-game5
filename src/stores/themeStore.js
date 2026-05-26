import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ALightTheme from '@/theme/light'
import ADarkTheme from '@/theme/dark'

export const useThemeStore = defineStore('theme', () => {
  const Atheme = ref(ALightTheme)
  function switchDark() {
    Atheme.value = ADarkTheme
  }
  function switchLight() {
    Atheme.value = ALightTheme
  }

  return { Atheme, switchDark, switchLight, }
})
