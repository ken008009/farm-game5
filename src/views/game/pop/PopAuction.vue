<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-if="step == 1">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info" v-if="landInfo.level && landInfo.level != '0'">
        <div class="cont-goods">
          <img class="img-goods" :src="getLandImage(landInfo.level)" alt="">
          <!-- <img class="img-goods" src="" alt=""> -->
          <span class="timer">{{ countdown }}</span>
          <div class="cont-price">
            <span class="price">{{ $t('level') }}: </span>
            <span class="price">{{ landInfo.level }}</span>
          </div>
          <div class="cont-price" v-if="currAddr">
            <span class="price">当前竞拍地址:</span>
            <span class="price">{{ maskString(currAddr) }}</span>
          </div>
          <div class="cont-price">
            <span class="price">当前竞拍价:</span>
            <span class="price">{{ landInfo.amount }} ISPAY</span>
          </div>
          <div class="cont-price">
            <span class="price">一口价:</span>
            <span class="price">{{ landInfo.amountOne }} ISPAY</span>
          </div>
        </div>
        <img class="icon-record" :src="$t('image_game.icon_record')" alt="">
        <div class="cont-title">
          <div class="item-user">
            <span class="menu">出价人</span>
            <span class="price">出价</span>
            <span class="menu">出价时间</span>
          </div>
        </div>
        
        <div class="list-user">
          <div class="item-user" v-for="(item, index) in list">
            <span class="menu">{{ maskString(item.address) }}</span>
            <span class="price">{{ item.amount }}</span>
            <span class="menu">{{ item.createdAt }}</span>
          </div>
        </div>

        <div class="cont-btn">
          <span class="btn-redemption" @click="toBuyHandler(2)">{{ $t('to_buy') }}</span>
          <span class="btn-pledge" @click="toBuyHandler(1)">{{ $t('buy_now') }}</span>
        </div>
      </div>
      <div class="cont-nodata" v-else>
        <span class="tip">{{ $t('not_yet_open') }}</span>
      </div>

      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-staking" @click="notDo()" v-if="step == 2">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info">
        <div class="cont-input">
          <input class="input-num" v-model="amt1" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="balance">{{ $t('game_balance') }}:{{ parseInt(info.git) }}ISPAY</span>
        <span class="btn-confirm" @click="submitBuyHandler">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { getLandImage, getGoodsImage, getPlantImage } from '@/utils/loadImages';
import { formatTime, formatTime3, maskString } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const { t } = useI18n()

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const step = ref(1)
const list = ref([])
const amt1 = ref('')
const buyType = ref(0)
const landInfo = ref({})
const countdown = ref('')
const currAddr = ref('')
let timer = null

onMounted(() => {
  getList()
});

function toBuyHandler(type) {
  if (type == 1) {
    buyType.value = 1
    amt1.value = landInfo.value.amountOne
  } else {
    buyType.value = 0
    amt1.value = ''
  }
  step.value = 2
}

function submitBuyHandler() {
  if (amt1.value && parseInt(amt1.value) > 0) {
    buy()
  } else {
    showToast(t('please_enter_the_correct_amount'))
  }
}

function showHomeHandler() {
  step.value = 1
}


function closeHandler() {
  emit('close', true)
}
function notDo() { }
function startTimer() {
  if (timer) {
    clearInterval(timer)
    timer = ''
  }
  timer = setInterval(() => {
    parseDate()
  }, 1000)
}
function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = ''
  }
}
function parseDate() {
  const end = parseInt(landInfo.value.limit)
  const now = (new Date().getTime()) / 1000;
  if (now >= end) {
    stopTimer()
  }
  countdown.value = getCountdownStr()
}
function getCountdownStr() {

  const end = parseInt(landInfo.value.limit) || 0
  const curr = parseInt(landInfo.value.now) || 0
  if (end <= 0 || curr <= 0) {
    return ''
  }
  if (end > curr) {
    return formatTime3(end)
  } else {
    return ''
  }
}
async function getInfo() {
  proxy.$showLoading()
  const res = await gameModel.getBuyLand()
  if (res && res.ok) {
    landInfo.value = res.data
  }
  proxy.$hideLoading()
}
async function getList() {
  proxy.$showLoading()
  const res = await gameModel.buyLandRecord()
  const resInfo = await gameModel.getBuyLand()
  if (resInfo.ok && res.ok) {
    list.value = res.data.list
    landInfo.value = resInfo.data
    if(res.data.list.length > 0) {
      currAddr.value = res.data.list[0].address
    } 
    startTimer()
  }
  proxy.$hideLoading()
}
async function buy() {
  const type = buyType.value
  const amount = parseInt(amt1.value)
  if (amount <= 0) {
    showToast('please_enter_the_amount')
  }
  proxy.$showLoading()
  const res = await gameModel.buyLand(type, amount)
  if (res.ok) {
    showToast(t('success'))
    emit('success', true)
    step.value = 1
    getList()
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
      height: 600px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -5px;
    }

    .bg-top {
      width: 200px;
    }

    .cont-info {
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .cont-goods {
        // height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url('@/assets/images/game/bg_pink.png');
        background-size: 100% 100%;
        width: 250px;
        padding: 10px 0;

        .img-goods {
          width: 100px;
          margin-bottom: 10px;
        }

        .cont-price {
          display: flex;
          align-items: center;

          .price {
            font-size: 14px;
            margin: 0 4px;
            font-weight: bold;
          }
        }
      }
      .icon-record {
        height: 20px;
        align-self: flex-start;
        margin-left: 40px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .cont-title {
        display: flex;
        width: 100%;

        .item-user {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;

          .menu {
            flex: 2;
            font-size: 14px;
            text-align: center;
          }

          .price {
            flex: 1;
            font-size: 14px;
            text-align: center;
          }
        }
      }

      .list-user {
        display: flex;
        flex-direction: column;
        height: 250px;
        overflow: scroll;
        padding: 0 20px;
        width: 100%;

        .item-user {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;

          .menu {
            flex: 2;
            font-size: 14px;
            text-align: center;
          }

          .price {
            flex: 1;
            font-size: 14px;
            text-align: center;
          }
        }
      }

      .cont-btn {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .btn-pledge {
          width: 120px;
          height: 48px;
          background-color: #f7d961;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #000;
          border-radius: 4px;
          box-sizing: border-box;
          color: #000;
          font-weight: bold;
          margin: 0 10px;
        }

        .btn-redemption {
          width: 120px;
          height: 48px;
          background-color: #ec8582;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #000;
          border-radius: 4px;
          box-sizing: border-box;
          color: #000;
          font-weight: bold;
          margin: 0 10px;
        }
      }

      .btn-game {
        width: 280px;
        height: 48px;
        background-color: #6ec98e;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }

    }
    .cont-nodata {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .tip {
        font-size: 20px;
        font-weight: bold;
        color: #f9db67;
      }
    }


  }

  .cont-staking {
    position: relative;

    .bg {
      width: 320px;
      height: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -5px;
    }

    .cont-info {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-input {
        width: 220px;
        height: 40px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        display: flex;
        align-items: center;
        margin-top: 10px;

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
        align-self: center;
        color: #000;
        font-weight: bold;
        margin-top: 10px;
      }

      .fee {
        align-self: flex-end;
        font-size: 14px;
        margin-right: 50px;
        margin-top: 10px;
        font-weight: bold;
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
        margin-top: 20px;
        color: #000;
        font-weight: bold;
      }

    }
  }

  .cont-result {
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
      top: 80px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-success {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-success {
          width: 40px;
          margin-bottom: 20px;
        }

        .notice {
          font-size: 16px;
          color: #6ec98f;
        }

        .fee {
          font-size: 16px;
          color: #6ec98f;
        }
      }

      .cont-fail {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-fail {
          width: 40px;
          margin-bottom: 20px;
        }

        .notice {
          font-size: 16px;
          color: #e56a67;
        }

        .fee {
          font-size: 16px;
          color: #e56a67;
        }
      }

      .btn-confirm {
        width: 220px;
        height: 48px;
        background-color: #6ec98e;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        margin-top: 30px;
        color: #fff;
        font-weight: bold;
      }

    }
  }

}
</style>