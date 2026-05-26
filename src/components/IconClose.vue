<template>
  <div class="cont-close" @click="closeHandler()">
    <i class="iconfont icon-guanbi icon-close"></i>
  </div>
</template>
<script setup>
const emit = defineEmits(['close'])
function closeHandler() {
  emit('close')
}
</script>
<style lang="scss" scoped>
.cont-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}

.cont-close:hover {
  background-color: var(--color-float);
}

.cont-close .icon-close {
  font-size: 16px;
}
</style>
