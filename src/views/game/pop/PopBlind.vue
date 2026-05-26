<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_blind')" alt="">
      <div class="cont-blind">
        <img class="icon-blind" src="@/assets/images/game/icon_blind.png" alt="">
        <span class="blind-box">{{ $t('blind_box') }}</span>
        <div class="cont-countdown">
          <span class="time-end">{{ $t('countdown_timer') }}</span>
          <span class="time-h">{{ countdown.h }}</span>
          <span class="unit">:</span>
          <span class="time-h">{{ countdown.m }}</span>
          <span class="unit">:</span>
          <span class="time-h">{{ countdown.s }}</span>
        </div>
        <div class="cont-num">
          <div class="item-num">
            <span class="num">{{ info.box }}</span>
            <span class="name">{{ $t('total') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ info.boxSell }}</span>
            <span class="name">{{ $t('number_sold') }}</span>
          </div>
        </div>
        <img class="icon-seed-list" :src="$t('image_game.icon_seed_list')" alt="">
        <div class="cont-balance">
          <span class="balance">{{ $t('my_balance') }}:</span>
          <span class="num">{{ toFixed2(info.usdt) }}</span>
          <span class="unit">USDT</span>
        </div>
        <span class="btn-buy" @click="showBuyHandler()">{{ info.boxSellAmount }} USDT {{ $t('to_buy_now') }}</span>
        <div class="list-notice">
          <div class="item-notice" v-for="(item, index) in list">
            <span class="open">{{ $t('open_box_get_products') }}</span>
            <span class="num">{{ item.content }}</span>
            <span class="date">{{ item.createdAt }}</span>
          </div>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-success" @click="notDo()" v-show="step == 2">
      <img class="bg" :src="$t('image_game.bg_blind2')" alt="">
      <div class="cont-blind">
        <img class="icon-success" src="@/assets/images/game/icon_success.png" alt="">
        <div class="cont-notice">
          <span class="notice">{{ $t('congratulations') }},</span>
          <span class="notice">{{ $t('buying_success') }}!</span>
        </div>
        <img class="icon-blind" src="@/assets/images/game/icon_blind.png" alt="">
        <span class="blind-box">{{ $t('magic_blind_box') }}</span>
        <span class="blind-id">#{{ id }}</span>
        <span class="btn-buy" @click="buyAgainHandler()">{{ $t('buy_again') }}</span>
      </div>
    </div>
    <div class="cont-submit" @click="notDo()" v-show="showSubmit">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-btn">
        <span class="btn-buy" @click="buyBoxHandler()">{{ $t('confirm') }}</span>
        <span class="btn-cancel" @click="cancelBuyHandler()">{{ $t('cancel') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { formatTime, getCountdown, outTime, toFixed2 } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const step = ref(1)
const list = ref([])
const countdown = ref({})
const isOutTime = ref(false)
const showSubmit = ref(false)
let timer = null
const id = ref('')


onMounted(() => {
  getList()
  parseDate()
  startTimer()
  
});

onUnmounted(() => {
  stopTimer();
});
function buyAgainHandler() {
  step.value = 1
}
function showBuyHandler() {
  showSubmit.value = true
}
function cancelBuyHandler() {
  showSubmit.value = false
}
function buyBoxHandler() {
  buyBlindBox()
  showSubmit.value = false
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
  if (outTime(props.info.end)) {
    isOutTime.value = true
  } else {
    isOutTime.value = false
    const date = props.info.end
    countdown.value = getCountdown(date)
  }
}

async function getList() {
  proxy.$showLoading()
  const res = await gameModel.userBoxList()
  if (res.ok) {
    list.value = res.data.list
  }
  proxy.$hideLoading()
}
async function buyBlindBox() {
  proxy.$showLoading()
  const res = await gameModel.buyBox()
  if (res.ok) {
    id.value = res.data.id
    step.value = 2
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
      width: 300px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 15px;
    }

    .cont-blind {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      height: 500px;
      display: flex;
      flex-direction: column;

      .icon-blind {
        align-self: center;
        width: 120px;
        margin-top: 20px;
      }

      .blind-box {
        font-weight: bold;
        align-self: center;
        margin-top: 5px;
      }

      .cont-countdown {
        display: flex;
        align-items: center;
        align-self: center;

        .time-end {
          font-size: 12px;
          color: #000;
          margin-right: 4px;
        }

        .time-h {
          min-width: 24px;
          height: 20px;
          border: 1px solid #ec7190;
          font-size: 12px;
          line-height: 20px;
          box-sizing: border-box;
          padding: 0 4px;
          border-radius: 3px;
          font-weight: bold;
        }

        .unit {
          font-size: 12px;
          margin: 0 2px;
          font-weight: bold;
        }
      }

      .cont-num {
        display: flex;
        align-items: center;
        padding: 0 40px;
        margin-top: 10px;

        .item-num {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          .num {
            font-size: 16px;
            color: #eb708c;
          }

          .name {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }

      .icon-seed-list {
        width: 250px;
        align-self: center;
        margin-top: 10px;
      }

      .cont-balance {
        display: flex;
        align-items: center;
        align-self: center;
        font-size: 14px;
        font-weight: bold;
        margin-top: 20px;

        .balance {
          font-size: 14px;
          font-weight: bold;
        }

        .num {
          margin-left: 4px;
        }

        .unit {
          margin-left: 4px;
        }
      }

      .btn-buy {
        width: 230px;
        height: 45px;
        background-color: #f7d961;
        border: 1px solid #000;
        box-sizing: border-box;
        border-radius: 4px;
        align-self: center;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
      }

      .list-notice {
        display: flex;
        flex-direction: column;
        align-self: center;
        margin-top: 20px;
        height: 60px;
        overflow: scroll;
        padding: 0 10px;

        .item-notice {
          display: flex;
          align-items: center;
          font-size: 10px;
          padding-bottom: 4px;
          border-bottom: 1px solid #c9c6c6;
          margin-top: 5px;

          .open {
            margin-right: 4px;
          }

          .num {
            color: #eb708c;
          }

          .date {
            margin-left: 4px;
          }
        }

      }
    }
  }

  .cont-success {
    position: relative;

    .bg {
      width: 330px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 15px;
    }

    .cont-blind {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      overflow: scroll;
      display: flex;
      flex-direction: column;

      .icon-success {
        width: 40px;
        align-self: center;
      }

      .cont-notice {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;

        .notice {
          font-size: 16px;
          color: #6ec98e;
          font-weight: bold;
        }
      }

      .icon-blind {
        align-self: center;
        width: 140px;
        margin-top: 20px;
      }

      .blind-box {
        font-weight: bold;
        align-self: center;
        margin-top: 5px;
      }

      .blind-id {
        align-self: center;
        font-weight: bold;
        margin-top: 5px;
      }

      .btn-buy {
        width: 230px;
        height: 45px;
        background-color: #f7d961;
        border: 1px solid #000;
        box-sizing: border-box;
        border-radius: 4px;
        align-self: center;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 40px;
      }

    }
  }
  .cont-submit {
    position: absolute;

    .bg {
      width: 300px;
      height: 140px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -10px;
    }

    .cont-btn {
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-evenly;

      .btn-buy {
        width: 120px;
        height: 45px;
        background-color: #f7d961;
        border: 1px solid #000;
        box-sizing: border-box;
        border-radius: 4px;
        align-self: center;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 40px;
      }

      .btn-cancel {
        width: 120px;
        height: 45px;
        background-color: #ed8582;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        box-sizing: border-box;
        border-radius: 4px;
        align-self: center;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 40px;

      }

    }
  }
}
</style>