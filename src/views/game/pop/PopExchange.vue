<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-if="step === 1">
      <img class="bg" :src="$t('image_game.bg_exchange')" alt="">
      <div class="cont-info">
        <div class="cont-switch">
          <!-- <span class="switch selected" @click="switchToBIWHandler()">ISPAY→ISPAY</span> -->
          <span class="switch" @click="switchUSDTToISAPYHandler()">USDT→ISPAY</span>
          <span class="switch" @click="switchISPAYToUSDTHandler()">ISPAY→USDT</span>          
        </div>
        <span class="giw">{{ bRate }} ISPAY: 1 ISPAY</span>
        <span class="btn-confirm">ISPAY/ISPAY</span>
        <span class="balance">{{ $t('game_balance') }}:{{ parseInt(info.git) }}ISPAY</span>
        <div class="cont-input">
          <input class="input-num" maxlength="18" v-model="amt" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="fee">{{ $t('fee') }}:{{ toFixed2(fee * bRate) }}ISPAY</span>
        <span class="fee">{{ toFixed2((amt - fee) * bRate) }}ISPAY</span>
        <span class="btn-confirm" @click="submitHandler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-pop" @click="notDo()" v-if="step === 2">
      <img class="bg" :src="$t('image_game.bg_exchange')" alt="">
      <div class="cont-info">
        <div class="cont-switch">
          <!-- <span class="switch" @click="switchToBIWHandler()">ISPAY→ISPAY</span> -->
          <span class="switch selected" @click="switchUSDTToISAPYHandler()">USDT→ISPAY</span>
          <!-- <span class="switch" @click="switchISPAYToUSDTHandler()">ISPAY→USDT</span> -->
        </div>
        <span class="giw">{{ uRate }} ISPAY: 1 USDT</span>
        <!-- <span class="giw">查询交易池中</span> -->
        <span class="btn-confirm">USDT/ISPAY</span>
        <span class="balance">{{ $t('game_balance') }}:{{ toFixed4(info.usdt) }}USDT</span>
        <div class="cont-input">
          <input class="input-num" maxlength="18" v-model="amt" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="fee">{{ $t('fee') }}:{{ toFixed4(fee2 * uRate) }}ISPAY</span>
        <span class="fee">{{ toFixed4((amt - fee2) * uRate) }}ISPAY</span>
        <span class="btn-confirm" @click="submit2Handler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-pop" @click="notDo()" v-if="step === 3">
      <img class="bg" :src="$t('image_game.bg_exchange')" alt="">
      <div class="cont-info">
        <div class="cont-switch">
          <!-- <span class="switch" @click="switchToBIWHandler()">ISPAY→ISPAY</span> -->
          <span class="switch" @click="switchUSDTToISAPYHandler()">USDT→ISPAY</span>
          <span class="switch selected" @click="switchISPAYToUSDTHandler()">ISPAY→USDT</span>
        </div>        
        <span class="giw">{{ bRate2 }} USDT: 1 ISPAY</span>
        <span class="btn-confirm">ISPAY/USDT</span>
        <span class="balance">{{ $t('game_balance') }}:{{ parseInt(info.git) }}ISPAY</span>
        <div class="cont-input">
          <input class="input-num" maxlength="18" v-model="amt" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="fee">{{ $t('fee') }}:{{ toFixed2(fee3 * bRate) }}USDT</span>
        <span class="fee">{{ toFixed2(((amt - fee3) * bRate)) }}USDT</span>
        <!-- <span class="fee">{{ $t('fee') }}:{{ toFixed2(fee3 * bRate2) }}USDT</span>
        <span class="fee">{{ toFixed2((amt - fee3) * bRate2) }}USDT</span> -->
        <span class="btn-confirm" @click="submit3Handler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { formatTime, formatTime3, maskString, toFixed2, toFixed4 } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance();
const { t } = useI18n()

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const amt = ref('')
const step = ref(2)
const rate = ref(0)
const rate2 = ref(0)
const rate3 = ref(0)
const bRate = ref(1)
const uRate = ref(1)
const bRate2 = ref(1)
const fee = computed(() => {
  let temp = 0
  if (amt.value) {
    temp = parseInt(amt.value)
    temp = temp * parseFloat(rate.value)
    temp = parseInt(temp)
  }
  return temp
})
const fee2 = computed(() => {
  let temp = 0
  if (amt.value) {
    temp = parseFloat(amt.value)
    temp = temp * parseFloat(rate2.value)
    temp = parseFloat(temp)
  }
  return temp
})
const fee3 = computed(() => {
  let temp = 0
  if (amt.value) {
    temp = parseInt(amt.value)
    temp = temp * parseFloat(rate2.value)
    temp = parseInt(temp)
  }
  return temp
})
onMounted(() => {
  rate.value = props.info.exchangeFeeRate
  // rate2.value = props.info.exchangeFeeRateTwo
  rate2.value = props.info.exchangeRateThree
  rate3.value = props.info.exchangeFeeRateThree||0.03
  bRate.value = parseFloat(props.info.exchangeRate.toFixed(4)) || 0
  // uRate.value = parseFloat(props.info.exchangeThree.toFixed(4)) || 0
  uRate.value = parseFloat((1/parseFloat(props.info.exchangeThree)).toFixed(4)) || 0
  bRate2.value = parseFloat((parseFloat(props.info.exchangeRateTwo)/parseFloat(props.info.exchangeRate)).toFixed(4)) || 0
});

function closeHandler() {
  emit('close', true)
}
function switchUSDTToISAPYHandler() {
  step.value = 2
}
function switchToBIWHandler() {
  step.value = 1
}
function switchISPAYToUSDTHandler() {
  step.value = 3
}
function submitHandler() {
  const amount = parseFloat(amt.value) || 0
  if (amount < 1) {
    showToast(t('please_enter_the_correct_amount'))
    return
  }
  exchangeGit(amount, 1)
}
function submit2Handler() {
  const amount = parseFloat(amt.value) || 0
  const max = parseFloat(props.info.exchangeMaxThree)
  const min = parseFloat(props.info.exchangeMinThree)  
  if (max >= amount && min <= amount) {
    exchangeGit(amount, 2)
  } else {
    showToast(`${t('please_enter_the_correct_amount')}(${min}~${max})`)
  }  
}
function submit3Handler() {
  const amount = parseFloat(amt.value) || 0
  if (amount < 1) {
    showToast(t('please_enter_the_correct_amount'))
    return
  }
  exchangeGit(amount, 3)
}
function notDo() { }

async function exchangeGit(amount, exchangeType) {
  proxy.$showLoading()
  const res = await gameModel.exchange(amount, exchangeType)
  if (res.ok) {
    showToast(t('success'))
    emit('success', true)
  }
  proxy.$hideLoading()
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
      top: 50px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-switch {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 4px 30px 0;
        .selected {
          color: #f2da74!important;
          border: 1px solid #f2da74!important;
        }
        .switch {
          font-size: 12px;
          height: 20px;
          border: 1px solid #000;
          line-height: 20px;
          padding: 0 4px;
          border-radius: 2px;
          margin: 0 10px;
        }
      }


      .giw {
        font-weight: bold;
        align-self: center;
        margin-top: 3px;
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
        margin-top: 5px;
        color: #000;
        font-weight: bold;
      }

    }
  }

}
</style>