<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-if="true">
      <img class="bg" :src="$t('image_game.bg_sale')" alt="">
      <div class="cont-info">
        <span class="id">#{{ id }}</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" type="number" :placeholder="$t('please_enter_the_amount')">
          <span class="unit">USDT</span>
        </div>
        <span class="fee">{{ $t('fee') }}:{{ fee }}USDT</span>
        <span class="fee">{{ amt - fee }}USDT</span>
        <span class="btn-confirm" @click="submitHandler()">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
  sellFeeRate: {
    type: Number,
    required: true
  },
  id: {
    type: String,
  }
})

const emit = defineEmits(['close', 'success'])
const amt = ref('')
let rate = ref(0)
const fee = computed(() => {
  let temp = 0
  if (amt.value) {
    temp = parseInt(amt.value)
    temp = temp * parseFloat(rate.value)
    temp = parseInt(temp)
  }
  return temp
})
onMounted(() => {
  rate.value = props.sellFeeRate || 0
});

function submitHandler() {
  const price = amt.value || 0
  emit('success', { price })
}
function closeHandler() {
  emit('close', true)
}
function notDo() {

}

</script>

<style lang="scss" scoped>
.bg-pop {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  .cont-pop {
    position: relative;

    .bg {
      width: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .cont-info {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;


      .id {
        font-weight: bold;
        align-self: center;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      .cont-input {
        width: 220px;
        height: 40px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        display: flex;
        align-items: center;
        margin-top: 0px;

        .input-num {
          flex: 1;
          border: 0;
          outline: none;
          background-color: transparent;
          padding: 4px;
        }

        .input-num::placeholder {
          color: #c4c4c4;
        }

        .unit {
          margin-right: 8px;
        }
      }

      .balance {
        font-size: 14px;
        align-self: flex-end;
        color: #000;
        margin-right: 50px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .fee {
        font-size: 14px;
        align-self: flex-end;
        color: #000;
        margin-right: 50px;
        font-weight: bold;
        margin-top: 10px;
      }

      .btn-confirm {
        width: 220px;
        height: 48px;
        background-color: #f7d961;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        margin-top: 30px;
        color: #000;
        font-weight: bold;
      }

    }
  }

}
</style>