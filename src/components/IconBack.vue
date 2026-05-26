<template>
  <div class="cont-back" @click="closeHandler()">
    <i class="iconfont icon-zuojiantou icon-close"></i>
  </div>
</template>
<script setup>
const emit = defineEmits(['back'])
function closeHandler() {
  emit('back')
}
</script>
<style lang="scss" scoped>
.cont-back {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}

.cont-back:hover {
  background-color: var(--color-float);
}

.cont-back .icon-close {
  font-size: 16px;
}
</style>
