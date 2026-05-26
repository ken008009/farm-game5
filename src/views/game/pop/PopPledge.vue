<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-if="step == 1">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info" v-if="true">
        <span class="btn-buy" v-if="menuInfo.one <= 0" @click="toBuyHandler()">{{ $t('to_buy') }}</span>
        <span class="btn-hide" v-else></span>
        <div class="cont-menu">
          <div class="item-menu">
            <span class="menu1">{{ $t('level2') }}:{{ (menuInfo.level) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('subscription_amount') }}:{{ toFixed2(menuInfo.one) }}</span>
            <span class="menu1">{{ $t('ratio') }}:{{ toFixed2(menuInfo.two) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('released') }}:{{ toFixed2(menuInfo.three) }}</span>
            <span class="menu1">{{ $t('not_released') }}:{{ toFixed2(menuInfo.four) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('static_state') }}:{{ toFixed2(menuInfo.five) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('direct_push') }}:{{ toFixed2(menuInfo.six) }}</span>
            <span class="menu1">{{ $t('direct_acceleration') }}:{{ toFixed2(menuInfo.seven) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('team') }}:{{ toFixed2(menuInfo.eight) }}</span>
            <span class="menu1">{{ $t('good_ordinary') }}:{{ toFixed2(menuInfo.nine) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('all_dividend') }}:{{ toFixed2(menuInfo.ten) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('total_performance') }}:{{ toFixed2(menuInfo.elven) }}</span>
            <span class="menu1">{{ $t('direct_performance') }}:{{ toFixed2(menuInfo.twelve) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('regional_performance') }}:{{ toFixed2(menuInfo.thirteen) }}</span>
            <span class="menu1">{{ $t('community_performance') }}:{{ toFixed2(menuInfo.fourteen) }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('direct_number') }}:{{ menuInfo.recommendNum }}</span>
            <span class="menu1">{{ $t('activated_number') }}:{{ menuInfo.buyNum }}</span>
          </div>
          <div class="item-menu">
            <span class="menu1">{{ $t('team_number') }}:{{ menuInfo.teamNum }}</span>
          </div>
        </div>
        <span class="btn-detail" @click="toDetailHandler()">{{ $t('to_buy_detail') }}</span>
      </div>
      <div class="cont-nodata" v-else>
        <span class="tip">{{ $t('not_yet_open') }}</span>
      </div>

      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-staking" @click="notDo()" v-if="step == 2">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info">
        <div class="list-buy">
          <div class="item-buy" v-for="(item, index) in listBuy">
            <span class="menu">{{ $t('amt') }}:{{ item.amt }}</span>
            <span class="menu">{{ $t('daily') }}:{{ item.rate }}%</span>
            <span class="buy" @click="submitBuyHandler(item)">{{ $t('buy') }}</span>
          </div>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-sub" @click="notDo()" v-if="step == 3">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info">
        <div class="list-buy">
          <div class="item-buy">
            <span class="menu">usdt{{ $t('balance') }}:{{ menuInfo.usdt }}</span>
            <span class="menu">ispay{{ $t('balance') }}:{{ menuInfo.giw }}</span>
          </div>
          <div class="item-buy">
            <span class="menu">usdt{{ $t('deduct') }}:{{ selectBuy.amt / 2 }}</span>
            <span class="menu">ispay{{ $t('deduct') }}:{{ (selectBuy.amt / 2) / menuInfo.price }}</span>
          </div>
        </div>
        <span class="price">{{ $t('price') }}: ispay:usdt={{ menuInfo.price }}</span>
        <span class="btn-submit" @click="submitBuyTwoHandler()">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
    <div class="cont-detail" @click="notDo()" v-if="step == 4">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info">
        <div class="cont-tab">
          <span class="item-tab" :class="[currTab == 1 ? 'select-tab' : '']" @click="switchTabHandler(1)">{{ $t('subscribe') }}</span>
          <span class="item-tab" :class="[currTab == 2 ? 'select-tab' : '']" @click="switchTabHandler(2)">{{ $t('direct') }}</span>
          <span class="item-tab" :class="[currTab == 3 ? 'select-tab' : '']" @click="switchTabHandler(3)">{{ $t('static') }}</span>
          <span class="item-tab" :class="[currTab == 4 ? 'select-tab' : '']" @click="switchTabHandler(4)">{{ $t('direct_acceleration') }}</span>
          <span class="item-tab" :class="[currTab == 5 ? 'select-tab' : '']" @click="switchTabHandler(5)">{{ $t('team') }}</span>
          <span class="item-tab" :class="[currTab == 6 ? 'select-tab' : '']" @click="switchTabHandler(6)">{{ $t('good_ordinary') }}</span>
          <span class="item-tab" :class="[currTab == 7 ? 'select-tab' : '']" @click="switchTabHandler(7)">{{ $t('all_net') }}</span>
        </div>
        <!-- <div class="cont-title">
          <span class="menu1">USDT</span>
          <span class="menu1">ISPAY</span>
          <span class="menu1" v-if="currTab == 2 || currTab == 4 || currTab == 5 || currTab == 6">下级地址</span>
          <span class="menu1" v-if="currTab == 4 || currTab == 5 || currTab == 6">代数</span>
          <span class="menu1">时间</span>
        </div> -->
        <div class="list-detail">
          <div class="item-detail" v-for="(item, index) in list">
            <div class="cont-m">
              <span class="menu1">USDT:{{ toFixed2(item.amount) }}</span>
              <span class="menu1">ISPAY:{{ toFixed2(item.amountTwo) }}</span>
            </div>
            
            <span class="menu1" v-if="currTab == 1">{{ $t('subscription_amount') }}:{{ maskString(item.amountThree) }}</span>
            <span class="menu1" v-if="currTab == 2 || currTab == 4 || currTab == 5 || currTab == 6">{{ $t('address') }}:{{ maskString(item.address) }}</span>
            <span class="menu1" v-if="currTab == 4 || currTab == 5 || currTab == 6">{{ $t('level_number') }}:{{ item.num }}</span>
            <span class="menu1">{{ $t('time') }}:{{ item.createdAt }}</span>
          </div>
        </div>
        <div class="cont-bottom">
          <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
          <span class="num">{{ page }}</span>
          <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showHomeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { getLandImage, getGoodsImage, getPlantImage } from '@/utils/loadImages';
import { formatTime, formatTime3, maskString, toFixed2 } from '@/utils/util';
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
const listBuy = [
  { amt: 100, rate: 0.6 },
  { amt: 300, rate: 0.65 },
  { amt: 500, rate: 0.7 },
  { amt: 1000, rate: 0.75 },
  { amt: 5000, rate: 0.8 },
  { amt: 10000, rate: 0.85 },
  { amt: 15000, rate: 0.9 },
  { amt: 30000, rate: 1 },
]
const selectBuy = ref({})
const menuInfo = ref({})
const page = ref(1)
const currTab = ref(1)
let timer = null
let total = 0

onMounted(() => {
  getInfo()
  getList(1)
});

function toBuyHandler() {
  step.value = 2
}
function toDetailHandler() {
  step.value = 4
}
function submitBuyHandler(item) {
  selectBuy.value = item
  step.value = 3
}
function submitBuyTwoHandler() {
  const amount = selectBuy.value.amt || 0
  if (amount <= 0) {
    showToast('金额错误')
  } else {
    buy(amount)
  }
}
function showHomeHandler() {
  step.value = 1
}
function switchTabHandler(num) {
  currTab.value = num
  page.value = 1
  getList(1)
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
  }, 1000)
}
function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = ''
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

async function getInfo() {
  proxy.$showLoading()
  const res = await gameModel.userBuy()
  if (res.ok) {
    menuInfo.value = res.data
  }
  proxy.$hideLoading()
}
async function getList(page) {
  // proxy.$showLoading()
  const num = currTab.value
  const res = await gameModel.userBuyList(page, num)
  if (res.ok) {
    list.value = res.data.list
    total = parseInt(res.data.count) || 0
  }
  // proxy.$hideLoading()
}
async function buy(amount) {
  proxy.$showLoading()
  const res = await gameModel.buyTwo(amount)
  if (res.ok) {
    showToast(t('success'))
    emit('success', true)
    step.value = 1
    getInfo()
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
      top: 0;
      left: 0;
      right: 0;
      height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .btn-buy {
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
        margin-top: 20px;
      }
      .btn-hide {
        width: 120px;
        height: 48px;
        opacity: 0;
      }

      .btn-detail {
        width: 200px;
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
        margin-top: auto;
        margin-bottom: 20px;
      }

      .cont-menu {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;

        .item-menu {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 0 20px;

          .menu1 {
            font-size: 16px;
            font-weight: bold;
            min-width: 50%;
            margin-bottom: 10px;
          }
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
      height: 400px;
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
      top: 50px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .list-buy {
        display: flex;
        flex-direction: column;

        .item-buy {
          width: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 30px;
          margin-bottom: 10px;

          .menu {
            flex: 1;
            font-size: 14px;
            font-weight: bold;
          }

          .buy {
            width: 60px;
            height: 24px;
            background-color: #f7d961;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #000;
            border-radius: 4px;
            box-sizing: border-box;
            color: #000;
            font-weight: bold;
            font-size: 14px;
          }
        }
      }

    }
  }

  .cont-sub {
    position: relative;

    .bg {
      width: 320px;
      height: 280px;
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
      top: 50px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .list-buy {
        display: flex;
        flex-direction: column;

        .item-buy {
          width: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 30px;
          margin-bottom: 10px;

          .menu {
            flex: 1;
            font-size: 14px;
            font-weight: bold;
          }

        }
      }

      .price {
        font-size: 14px;
        font-weight: bold;
        margin-left: 30px;
      }

      .btn-submit {
        width: 100px;
        height: 40px;
        background-color: #f7d961;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        box-sizing: border-box;
        color: #000;
        font-weight: bold;
        font-size: 16px;
        align-self: center;
        margin-top: 40px;
      }
    }
  }

  .cont-detail {
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

    .cont-info {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-tab {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 0 15px;

        .item-tab {
          flex-shrink: 0;
          font-size: 14px;
          min-width: 50px;
          margin: 0 10px;
          border: 1px solid #000;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          box-sizing: border-box;
        }

        .select-tab {
          border: 2px solid #f2d970 !important;
          color: #f2d970;
        }
      }

      .cont-title {
        display: flex;
        margin-top: 10px;

        .menu1 {
          flex: 1;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
        }
      }

      .list-detail {
        height: 400px;
        margin-top: 10px;
        overflow-y: scroll !important;

        .item-detail {
          display: flex;
          align-items: start;
          flex-direction: column;
          margin: 0 20px 10px;
          border: 1px solid #000;
          padding: 8px 8px 4px;
          border-radius: 10px;
          .cont-m {
            display: flex;
            width: 100%;
            padding-right: 70px;
            box-sizing: border-box;
            justify-content: space-between;
          }

          .menu1 {
            font-size: 14px;
            text-align: center;
            margin-bottom: 4px;
            font-weight: bold;
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