<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-if="step == 1">
      <img class="bg" :src="$t('image_game.bg_seed')" alt="">
      <div class="cont-info">
        <div class="cont-top">
          <img class="bg-top" src="@/assets/images/game/bg_pink.png" alt="">
          <div class="top-detail">
            <img class="icon-bag" src="@/assets/images/game/icon_bag.png" alt="">
            <span class="pledge">{{ $t('pledge_pool') }}: {{ parseInt(info.stakeGetTotal) }} ISPAY</span>
            <span class="pledge">{{ $t('my_pledge') }}: {{ parseInt(info.myStakeGetTotal) }} ISPAY</span>
          </div>
        </div>
        <img class="icon-record" :src="$t('image_game.icon_record')" alt="">
        <div class="list-notice">
          <div class="item-notice" v-for="(item, index) in list">
            <div class="cont-title">
              <span class="title ellipsis">{{ item.address }}</span>
              <span class="num" v-if="item.status == '1'">{{ $t('get') }} {{ (item.reward) }} ISPAY!</span>
              <span class="num" v-else>{{ $t('lose') }}!</span>
            </div>
          </div>
        </div>
        <div class="cont-btn">
          <span class="btn-pledge" @click="toPledgeHandler">{{ $t('pledge') }}</span>
          <span class="btn-redemption" @click="toRedemHandler">{{ $t('redemption') }}</span>
        </div>
        <span class="btn-game" @click="toGameHandler">{{ $t('start_game') }}</span>
        <img class="icon-contract" src="@/assets/images/game/icon_contract.png" alt="">
        <!-- <span class="link">http://asadadsadadsa</span>
        <span class="link">asadadsadadsa</span> -->
      </div>

      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-staking" @click="notDo()" v-if="step == 2">
      <img class="bg" :src="$t('image_game.bg_staking_pledge')" alt="">
      <div class="cont-info">
        <div class="cont-input">
          <input class="input-num" v-model="amt1" maxlength="18" type="number" :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="balance">{{ $t('game_balance') }}:{{ parseInt(info.git) }}ISPAY</span>
        <span class="btn-confirm" @click="submitPledgeHandler">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-staking" @click="notDo()" v-if="step == 3">
      <img class="bg" :src="$t('image_game.bg_redemption')" alt="">
      <div class="cont-info">
        <div class="cont-input">
          <input class="input-num" v-model="amt2" maxlength="18" type="number" :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="fee">{{ $t('fee') }}:{{ fee }}ISPAY</span>
        <span class="balance">{{ $t('my_pledge') }}: {{ parseInt(info.myStakeGetTotal) }} ISPAY</span>
        <span class="btn-confirm" @click="submitRedemHandler">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-staking" @click="notDo()" v-if="step == 4">
      <img class="bg" :src="$t('image_game.bg_start_game')" alt="">
      <div class="cont-info">
        <div class="cont-input">
          <input class="input-num" v-model="amt3" maxlength="18" type="number" :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="balance">{{ $t('game_balance') }}:{{ parseInt(info.git) }}ISPAY</span>
        <span class="btn-confirm" @click="submitGameHandler">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-result" @click="notDo()" v-if="step == 5">
      <img class="bg" :src="$t('image_game.bg_result')" alt="">
      <div class="cont-info">
        <div class="cont-success" v-if="gameRes.playStatus == '1'">
          <img class="icon-success" src="@/assets/images/game/icon_success.png" alt="">
          <span class="notice">{{ $t('you_win') }} {{ (gameRes.amount) }} ISPAY.</span>
          <span class="fee">{{ $t('fee') }}: {{ fee2 }}.</span>
        </div>
        <div class="cont-fail" v-if="gameRes.playStatus == '2'">
          <img class="icon-fail" src="@/assets/images/game/icon_fail.png" alt="">
          <span class="notice">{{ $t('sorry') }}!</span>
          <span class="notice">{{ $t('you_lose') }} {{ amt3 }} ISPAY...</span>
        </div>
        <span class="btn-confirm" @click="toGameHandler">{{ $t('play_again') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
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
const amt2 = ref('')
const amt3 = ref('')
const gameRes = ref({})
const fee2 = ref('')
const rate = ref(0)
const fee = computed(() => {
  let temp = 0
  if (amt2.value) {
    temp = parseInt(amt2.value)
    temp = temp * parseFloat(rate.value)
    temp = parseInt(temp)
  }
  return temp
})

onMounted(() => {
  rate.value = props.info.stakeGetOverFeeRate
  getList()
});
function toPledgeHandler() {
  step.value = 2
}
function toRedemHandler() {
  step.value = 3
}
function toGameHandler() {
  step.value = 4
}
function showHomeHandler() {
  step.value = 1
}
function submitPledgeHandler() {
  pledge()
}
function submitRedemHandler() {
  redem()
}
function submitGameHandler() {
  game()
}

function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList() {
  proxy.$showLoading()
  const res = await gameModel.userSkateRewardList()
  if (res && res.ok) {
    list.value = res.data.list
  }
  proxy.$hideLoading()
}
async function pledge() {
  const max = parseInt(props.info.maxStake) || 0
  const min = parseInt(props.info.minStake) || 0
  const amount = parseInt(amt1.value)
  if ((amount < min) || (amount > max)) {
    showToast('please_enter_the_amount')
  }
  proxy.$showLoading()
  const res = await gameModel.skateGet(1, amount)
  if (res.ok) {
    getList()
    showToast(t('success'))
    emit('success', true)
  }
  proxy.$hideLoading()
}
async function redem() {
  const min = parseInt(props.info.minStakeTwo) || 0
  const amount = parseInt(amt2.value)
  if ((amount < min)) {
    showToast('please_enter_the_amount')
  }  
  proxy.$showLoading()
  const res = await gameModel.skateGet(2, amount)
  if (res.ok) {
    getList()
    showToast(t('success'))
    emit('success', true)
  }
  proxy.$hideLoading()
}
async function game() {
  const max = parseInt(props.info.maxPlay) || 0
  const min = parseInt(props.info.minPlay) || 0
  const amount = parseInt(amt3.value)
  if ((amount < min) || (amount > max)) {
    showToast('please_enter_the_amount')
  }  
  proxy.$showLoading()
  const res = await gameModel.skateGetPlay(amount)
  if (res.ok) {
    gameRes.value = res.data
    step.value = 5
    fee2.value = (amount - res.data.amount).toFixed(2)
    emit('success', true)
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
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .bg-top {
      width: 200px;
    }

    .cont-info {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-top {
        width: 270px;
        height: 170px;
        position: relative;
        align-self: center;

        .bg-top {
          width: 270px;
          height: 170px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .top-detail {
          position: absolute;
          left: 0;
          right: 0;
          top: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon-bag {
            width: 130px;
          }

          .pledge {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            margin-top: 5px;
          }
        }
      }

      .icon-record {
        width: 70px;
        margin-left: 30px;
        margin-top: 10px;
      }

      .list-notice {
        display: flex;
        flex-direction: column;
        height: 180px;
        overflow: scroll;

        .item-notice {
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          padding: 0 30px;
          box-sizing: border-box;
          margin-bottom: 2px;

          .cont-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            .title {
              font-size: 14px;
              font-weight: bold;
              flex: 1;
            }

            .num {
              font-size: 14px;
              font-weight: bold;
              flex: 1;
              text-align: end;
            }
          }

          .desc {
            font-size: 14px;
          }
        }
      }

      .cont-btn {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        .btn-pledge {
          width: 110px;
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
        }

        .btn-redemption {
          width: 140px;
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

      .icon-contract {
        width: 100px;
        align-self: center;
        margin-top: 10px;
      }

      .link {
        align-self: center;
        font-size: 10px;
        color: #333;
      }
    }


  }

  .cont-staking {
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