<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_granary')" alt="">
      <div class="cont-info">
        <img class="icon-rule" @click="showIncomeHandler()" src="@/assets/images/game/icon_rule2.png" alt="">
        <div class="cont-num">
          <div class="item-num">
            <span class="name">{{ $t('my_ispay') }}</span>
            <span class="num">{{ info.myStakeGit }}</span>
          </div>
          <div class="item-num">
            <span class="name">{{ $t('today_income') }}</span>
            <span class="num">{{ info.todayRewardSkateGit }}</span>
          </div>
        </div>
        <div class="cont-input">
          <input class="input-num" v-model="amt1" type="text" inputmode="decimal" maxlength="7"
            :placeholder="$t('please_enter_the_amount')" @input="onInputAmt" @blur="onBlurAmt" />
          <!-- <input class="input-num" maxlength="18" v-model="amt1" type="number"
            :placeholder="$t('please_enter_the_amount')"> -->
          <span class="unit">ISPAY</span>
        </div>
        <div class="cont-day">
          <span class="balance">{{ $t('balance') }}: </span>
          <span class="num">{{ toFixed2(info.gitNew) }}</span>
          <span class="unit">ISPAY</span>
        </div>
        <!-- <div class="list-sub">
          <span class="item-sub" :class="[subTabSelect == 1 ? 'select-bg' : '']"
            @click="switchSubTabHandler(1)">{{ 30 }}</span>
          <span class="item-sub" :class="[subTabSelect == 2 ? 'select-bg' : '']"
            @click="switchSubTabHandler(2)">{{ 60 }}</span>
          <span class="item-sub" :class="[subTabSelect == 3 ? 'select-bg' : '']"
            @click="switchSubTabHandler(3)">{{ 90 }}</span>
          <span class="item-sub" :class="[subTabSelect == 4 ? 'select-bg' : '']"
            @click="switchSubTabHandler(4)">{{ 120 }}</span>
          <span class="item-sub" :class="[subTabSelect == 5 ? 'select-bg' : '']"
            @click="switchSubTabHandler(5)">{{ 360 }}</span>
          <span class="unit">{{ $t('day') }}</span>
        </div> -->
        <span class="btn-confirm" @click="confirmHandler()">{{ $t('confirm_wait') }}</span>
        <span class="btn-confirm" @click="waitHandler()">{{ $t('wait_record') }}</span>
        <span class="btn-confirm" @click="toRedemptionHandler()">{{ $t('pledge_record') }}</span>
        <span class="desc">{{ $t('granary_rule') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-redemption" @click="notDo()" v-show="step == 2">
      <img class="bg" :src="$t('image_game.bg_income')" alt="">
      <div class="cont-info">
        <div class="cont-list">
          <div class="cont-title">
            <span class="menu1">{{ $t('date') }}</span>
            <span class="menu1">{{ $t('stake') }}</span>
            <span class="menu1">{{ $t('period') }}</span>
            <span class="menu1">{{ $t('can_withdraw') }}</span>
            <!-- <span class="btn-menu">{{ $t('redemption') }}</span> -->
          </div>
          <div class="list-redem">
            <div class="item-redem" v-for="(item, index) in redemList">
              <span class="menu1">{{ item.createdAt }}</span>
              <span class="menu1">{{ item.stake }}</span>
              <span class="menu1">{{ item.day }}</span>
              <span class="menu1">{{ item.reward }}</span>
              <!-- <span class="btn-menu" @click="confirmRedemption(item.id)">{{ $t('redemption') }}</span> -->
            </div>
          </div>
        </div>

        <!-- <span class="btn-confirm" @click="confirmRedemption()">{{ $t('redemption') }}</span> -->
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-income" @click="notDo()" v-show="step == 3">
      <img class="bg" :src="$t('image_game.bg_income')" alt="">
      <div class="cont-list">
        <div class="cont-title">
          <span class="menu">{{ $t('date') }}</span>
          <span class="menu">{{ $t('incoming') }}</span>
        </div>
        <div class="list-income">
          <div class="item-income" v-for="(item, index) in list">
            <span class="num">{{ item.createdAt }}</span>
            <span class="num">{{ item.amount }}</span>
          </div>
        </div>
        <div class="cont-bottom">
          <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
          <!-- <span class="first" @click="toPage(1)">{{ $t('first') }}</span> -->
          <span class="num">{{ page }}</span>
          <!-- <span class="last" @click="skipPage(1)">{{ $t('last') }}</span> -->
          <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-record" @click="notDo()" v-show="step == 4">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-list">
        <div class="cont-menu">
          <span class="menu">{{ $t('total_order') }}: <br>{{ listInfo.myCount }}</span>
          <span class="menu">{{ $t('left_amount') }}: <br>{{ toFixed2(listInfo.todayAmount) }}USDT</span>
        </div>        
        <div class="cont-title">
          <span class="menu1">{{ $t('submit_date') }}</span>
          <span class="menu2">{{ $t('address') }}</span>
          <span class="menu1">{{ $t('stake') }}</span>
          <!-- <span class="menu1">{{ $t('period') }}</span> -->
          <!-- <span class="menu2">{{ $t('can_withdraw') }}</span> -->
          <!-- <span class="btn-menu">{{ $t('redemption') }}</span> -->
        </div>
        <div class="list-redem">
          <div class="item-redem" v-for="(item, index) in redemList">
            <span class="menu1">{{ item.createdAt }}</span>
            <span class="menu2">{{ maskString(item.address) }}</span>
            <span class="menu1">{{ toFixed4(item.stake) }}</span>
            <!-- <span class="menu1">{{ item.day }}</span> -->
            <!-- <span class="menu2">{{ toFixed2(item.reward) }}</span> -->
            <!-- <span class="btn-menu" @click="confirmRedemption(item.id)">{{ $t('redemption') }}</span> -->
          </div>
        </div>        
        <div class="cont-bottom">
          <span class="prev" @click="skipPage2(-1)">{{ $t('prev') }}</span>
          <!-- <span class="first" @click="toPage(1)">{{ $t('first') }}</span> -->
          <span class="num">{{ page }}</span>
          <!-- <span class="last" @click="skipPage(1)">{{ $t('last') }}</span> -->
          <span class="next" @click="skipPage2(1)">{{ $t('next') }}</span>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { maskString, toFixed2, toFixed4 } from '@/utils/util';

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
const subTabSelect = ref(1)
const redemList = ref([])
const listInfo = ref({})
const page = ref(1)
const amt1 = ref('')
const amt2 = ref('')
let total = 0
let total2 = 0

onMounted(() => {

});

function toPage(num) {
  const temp = num
  if (temp >= 1) {
    page.value = temp
    getList(temp)
  }
}
function skipPage(num) {
  if (num == 1) {
    if (list.value.length + ((page.value - 1) * 20) >= total) {
      return
    }
  }
  if (num == -1 && page.value == 1) {
    return
  }
  const temp = page.value + num
  if (temp >= 1) {
    page.value = temp
    getList(temp)
  }
}
function skipPage2(num) {
  if (num == 1) {
    if (redemList.value.length + ((page.value - 1) * 20) >= total2) {
      return
    }
  }
  if (num == -1 && page.value == 1) {
    return
  }
  const temp = page.value + num
  if (temp >= 1) {
    page.value = temp
    getWaitList(temp)
  }
}
function closeHandler() {
  emit('close', true)
}
function showIncomeHandler() {
  getList(1)
  step.value = 3
}
function showHomeHandler() {
  page.value = 1
  list.value = []
  redemList.value = []
  step.value = 1
}
function toRedemptionHandler() {
  getRedemList()
  step.value = 2
}
function switchSubTabHandler(index) {
  if (subTabSelect.value != index) {
    subTabSelect.value = index
  }
}
const onInputAmt = (e) => {
  let val = e.target.value

  // 只允许数字和一个小数点
  val = val.replace(/[^\d.]/g, '')
  val = val.replace(/^(\d*\.\d*).*$/, '$1')
  val = val.replace(/^0+(\d)/, '$1')

  // 限制两位小数
  if (val.includes('.')) {
    const [i, d] = val.split('.')
    val = i + '.' + d.slice(0, 2)
  }

  // 实时限制最大值
  if (Number(val) > 1000) {
    val = '1000'
  }

  amt1.value = val
}

const onBlurAmt = () => {
  let val = Number(amt1.value)

  if (!val || val < 0.01) {
    amt1.value = '0.01'
    return
  }

  if (val > 1000) {
    amt1.value = '1000'
    return
  }

  amt1.value = val.toFixed(2)
}
function confirmHandler() {
  pledgeGit()
}
function waitHandler() {
  getWaitList(1)
  step.value = 4
}
function confirmRedemption(id) {
  redemGit(id)
}
function notDo() { }

function getDay() {
  let day = 30
  if (subTabSelect.value == 1) {
    day = 30
  } else if (subTabSelect.value == 2) {
    day = 60
  } else if (subTabSelect.value == 3) {
    day = 90
  } else if (subTabSelect.value == 4) {
    day = 120
  } else if (subTabSelect.value == 5) {
    day = 360
  }
  return day
}

async function getList(page) {
  proxy.$showLoading()
  const res = await gameModel.userStakeRewardList(page)
  if (res.ok) {
    list.value = res.data.list
    total = parseInt(res.data.count) || 0
  }
  proxy.$hideLoading()
}
async function getRedemList() {
  proxy.$showLoading()
  const res = await gameModel.userStakeGitStakeList()
  if (res.ok) {
    listInfo.value = res.data
    redemList.value = res.data.list
  }
  proxy.$hideLoading()
}
async function getWaitList(page) {
  proxy.$showLoading()
  const res = await gameModel.userStakeGitStakeList(1, page)
  if (res.ok) {
    listInfo.value = res.data
    redemList.value = res.data.list
    total2 = parseInt(res.data.count) || 0
    console.log('total2', total2)    
  }
  proxy.$hideLoading()
}

async function pledgeGit() {
  proxy.$showLoading()
  const amount = parseFloat(amt1.value)
  const day = getDay()
  const res = await gameModel.stakeGit(1, amount, 0, day)
  if (res.ok) {
    showToast(t('success'))
    emit('success', true)
  }
  proxy.$hideLoading()
}
async function redemGit(id) {
  proxy.$showLoading()
  const day = getDay()
  const res = await gameModel.stakeGit(2, 0, id, day)
  if (res.ok) {
    showToast(t('success'))
    emit('success', true)
    getRedemList()
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
      top: 5px;
    }

    .cont-info {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .icon-rule {
        width: 20px;
        align-self: flex-end;
        margin-right: 30px;
      }

      .cont-num {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;

        .item-num {
          display: flex;
          flex-direction: column;
          align-items: center;

          .name {
            font-size: 14px;
            color: #000;
          }

          .num {
            font-size: 18px;
            color: #000;
            font-weight: bold;
          }
        }
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
        margin-top: 20px;

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

      .cont-day {
        align-self: flex-end;
        margin-right: 40px;
        font-size: 14px;
        color: #000;
        font-weight: bold;
        margin-top: 6px;
      }

      .list-sub {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;

        .item-sub {
          font-size: 14px;
          font-weight: bold;
          min-width: 40px;
          height: 30px;
          background-color: #fff;
          border: 1px solid #f7d961;
          box-sizing: border-box;
          border-radius: 2px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        .unit {
          font-size: 14px;
          font-weight: bold;
          margin-left: auto;
        }

        .select-bg {
          background-color: #f7d961 !important;
        }
      }

      .btn-confirm {
        width: 220px;
        height: 40px;
        background-color: #f7d961;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        margin-top: 10px;
        color: #000;
        font-weight: bold;
      }

      .desc {
        width: 100%;
        font-size: 10px;
        margin-top: 40px;
        word-wrap: break-word;
        padding: 0 30px;
        box-sizing: border-box;
        color: #999;
      }
    }
  }

  .cont-redemption {
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
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-list {
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;

        .cont-title {
          display: flex;
          padding: 0 10px;
          text-align: center;

          .menu1 {
            flex: 1;
            font-size: 14px;
            font-weight: bold;
          }

          .menu2 {
            flex: 2;
            font-size: 14px;
            font-weight: bold;
          }

          .btn-menu {
            flex: 1;
            font-size: 14px;
            font-weight: bold;
          }
        }

        .list-redem {
          height: 400px;
          margin-top: 10px;
          padding: 0 10px;
          text-align: center;
          overflow-y: scroll !important;

          .item-redem {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            .menu1 {
              flex: 1;
              font-size: 12px;
            }

            .menu2 {
              flex: 2;
              font-size: 12px;
            }

            .btn-menu {
              flex: 1;
              width: 80px;
              height: 20px;
              background-color: #f7d961;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #000;
              border-radius: 4px;
              align-self: center;
              box-sizing: border-box;
              color: #000;
              font-weight: bold;
              font-size: 10px;
            }
          }
        }

      }

      .cont-num {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;

        .item-num {
          display: flex;
          flex-direction: column;
          align-items: center;

          .name {
            font-size: 14px;
            color: #000;
          }

          .num {
            font-size: 18px;
            color: #000;
            font-weight: bold;
          }
        }
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
        margin-top: 20px;

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
        margin-top: 40px;
        color: #000;
        font-weight: bold;
      }
    }
  }

  .cont-income {
    position: relative;

    .bg {
      width: 300px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .cont-list {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-title {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;

        .menu {
          font-size: 14px;
          font-weight: bold;
        }
      }

      .list-income {
        height: 360px;
        margin-top: 10px;
        padding: 0 30px;
        overflow-y: scroll !important;

        .item-income {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .num {
            font-size: 12px;
            height: 25px;
          }
        }
      }

      .cont-bottom {
        display: flex;
        align-items: center;
        font-size: 12px;
        text-decoration: underline;
        padding: 0 20px;
        margin-top: 20px;

        .prev {
          flex: 1;
        }

        .first {
          flex: 1;
        }

        .num {
          flex: 4;
          text-align: center;
        }

        .last {
          flex: 1;
        }

        .next {
          flex: 1;
        }

      }
    }
  }
  .cont-record {
    position: relative;

    .bg {
      width: 300px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -10px;
    }

    .cont-list {
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-menu {
        display: flex;
        padding: 0 10px;
        text-align: center;
        justify-content: space-evenly;

        .menu {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
        }

        .menu2 {
          flex: 2;
          font-size: 14px;
          font-weight: bold;
        }

        .btn-menu {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
        }
      }      
      .cont-title {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-top: 10px;

        .menu1 {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }
        .menu2 {
          flex: 2;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }
      }
      
        .list-redem {
          height: 350px;
          margin-top: 10px;
          padding: 0 10px;
          text-align: center;
          overflow-y: scroll !important;

          .item-redem {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            .menu1 {
              flex: 1;
              font-size: 12px;
              text-align: center;
            }

            .menu2 {
              flex: 2;
              font-size: 12px;
              text-align: center;
            }

            .btn-menu {
              flex: 1;
              width: 80px;
              height: 20px;
              background-color: #f7d961;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #000;
              border-radius: 4px;
              align-self: center;
              box-sizing: border-box;
              color: #000;
              font-weight: bold;
              font-size: 10px;
            }
          }
        }

      .cont-bottom {
        display: flex;
        align-items: center;
        font-size: 12px;
        text-decoration: underline;
        padding: 0 20px;
        margin-top: 20px;

        .prev {
          flex: 1;
        }

        .first {
          flex: 1;
        }

        .num {
          flex: 4;
          text-align: center;
        }

        .last {
          flex: 1;
        }

        .next {
          flex: 1;
        }

      }
    }
  }
}
</style>