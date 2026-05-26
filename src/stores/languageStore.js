import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const locale = ref('en')
  function setLocale(lang) {
    locale.value = lang
  }

  return { locale, setLocale, }
})
