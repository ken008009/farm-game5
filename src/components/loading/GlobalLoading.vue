<!-- components/GlobalLoading.vue -->
<template>
  <div v-if="isLoading" class="loading-overlay">
    <!-- <div class="loading-spinner"> -->
      <img class="loading-spinner" src="@/assets/images/game/icon_loading.png" alt="">
    <!-- </div> -->
  </div>
</template>

<script setup>
import { inject } from 'vue';

const isLoading = inject('isLoading');
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>