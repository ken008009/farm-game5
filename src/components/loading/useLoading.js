// composables/useLoading.js
import { ref, provide } from 'vue';

export function useLoading() {
  const isLoading = ref(false);

  const showLoading = () => { isLoading.value = true; };
  const hideLoading = () => { isLoading.value = false; };

  provide('isLoading', isLoading);

  return { isLoading, showLoading, hideLoading };
}