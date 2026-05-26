<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-rank" @click="notDo()" v-if="step == 1">
      <img class="bg" :src="$t('image_game.bg_user_info')" alt="">
      <div class="cont-info">
        <div class="cont-tab">
          <div class="line"></div>
          <div class="list-tab">
            <div class="item-tab" @click="switchTabHandler(1)">
              <img class="tab-bg" v-if="tabSelect == 1" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 1 ? 'select' : '']">{{ $t('neighbor') }}</span>
            </div>
            <div class="item-tab tab-s" @click="switchTabHandler(2)">
              <img class="tab-bg" v-if="tabSelect == 2" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">L1</span>
            </div>
            <div class="item-tab tab-s" @click="switchTabHandler(3)">
              <img class="tab-bg" v-if="tabSelect == 3" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 3 ? 'select' : '']">L2</span>
            </div>
            <div class="item-tab tab-s" @click="switchTabHandler(4)">
              <img class="tab-bg" v-if="tabSelect == 4" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 4 ? 'select' : '']">L3</span>
            </div>
          </div>
        </div>
        <div class="cont-num" v-if="tabSelect == 1">
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalBiw) }}</span>
            <span class="name">{{ $t('performance') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalReward) }}</span>
            <span class="name">{{ $t('invite_git') }}</span>
          </div>
        </div>
        <div class="cont-num" v-if="tabSelect == 2">
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalBiwOne) }}</span>
            <span class="name">L1{{ $t('performance') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalRewardOne) }}</span>
            <span class="name">L1{{ $t('invite_git') }}</span>
          </div>
        </div>
        <div class="cont-num" v-if="tabSelect == 3">
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalBiwTwo) }}</span>
            <span class="name">L2{{ $t('performance') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalRewardTwo) }}</span>
            <span class="name">L2{{ $t('invite_git') }}</span>
          </div>
        </div>
        <div class="cont-num" v-if="tabSelect == 4">
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalBiwThree) }}</span>
            <span class="name">L3{{ $t('performance') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ parseInt(info.recommendTotalRewardThree) }}</span>
            <span class="name">L3{{ $t('invite_git') }}</span>
          </div>
        </div>
        <div class="cont-title" v-if="tabSelect == 1">
          <span class="menu2">{{ $t('address') }}</span>
          <span class="menu2">{{ $t('time') }}</span>
          <span class="menu1">{{ $t('level') }}</span>
        </div>
        <div class="cont-title" v-else>
          <span class="menu2">{{ $t('address') }}</span>
          <span class="menu2">{{ $t('bonus_time') }}</span>
          <span class="menu1">USDT</span>
        </div>
        <div class="list-income" v-if="tabSelect == 1">
          <div class="item-income" v-for="(item, index) in list">
            <span class="num2 ellipsis2">{{ item.address }}</span>
            <span class="num2">{{ item.createdAt }}</span>
            <span class="num1">{{ item.level }}</span>
          </div>
        </div>
        <div class="list-income" v-if="tabSelect != 1">
          <div class="item-income" v-for="(item, index) in list">
            <span class="num2 ellipsis2">{{ item.address }}</span>
            <span class="num2">{{ item.createdAt }}</span>
            <span class="num1">{{ item.amount }}</span>
          </div>
        </div>
        <div class="cont-bottom">
          <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
          <!-- <span class="first">{{ $t('first') }}</span> -->
          <span class="num">{{ page }}</span>
          <!-- <span class="last">{{ $t('last') }}</span> -->
          <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { useLanguageStore } from '@/stores/languageStore';
import { clearAllStorage } from '@/utils/auth';
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

const languageStore = useLanguageStore()
const step = ref(1)
const list = ref([])
const tabSelect = ref(1)
const withdrawMode = ref(true)
const amt = ref('')
const currLanguage = ref('')
const page = ref(1)
let total = 0

onMounted(() => {
  getLocalSetting()
  getList(1)
});

function swl() {
  languageStore.setLocale('zh')
}
function getLocalSetting() {
  currLanguage.value = localStorage.getItem('language') || 'en'
}
const emit = defineEmits(['close', 'success'])

function switchLanguage(e) {
  currLanguage.value = e
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
function switchTabHandler(index) {
  if (tabSelect.value != index) {
    tabSelect.value = index
    getList(1)
  }
}
function submitHandler() {
  if (withdrawMode.value) {
    //提现
    const amount = parseInt(amt.value)
    const max = parseInt(props.info.withdrawMax)
    const min = parseInt(props.info.withdrawMin)
    if (max > amount && min < amount) {
      toWithdraw(amount)
    } else {
      showToast(t('please_enter_the_correct_amount'))
    }
  } else {
    //充值
  }
}
function switchModeHandler() {
  // withdrawMode.value = !withdrawMode.value
}
function showWithdrawHandler() {
  step.value = 2
}
function showExchangeHandler() {
  emit('close', { action: 'exchange' })
}
function showSettingHandler() {
  step.value = 3
}
function submitSettingHandler() {
  const language = currLanguage.value
  localStorage.setItem('language', language)
  window.location.reload()
}
function logoutHandler() {
  clearAllStorage()
  window.location.reload()
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList(page) {
  proxy.$showLoading();
  list.value = []
  let res = ''
  if (tabSelect.value == 1) {
    res = await gameModel.userRecommend(page)
  } else if (tabSelect.value == 2) {
    res = await gameModel.userRecommendL(1, page)
  } else if (tabSelect.value == 3) {
    res = await gameModel.userRecommendL(2, page)
  } else if (tabSelect.value == 4) {
    res = await gameModel.userRecommendL(3, page)
  }
  if (res && res.ok) {
    list.value = res.data.list
  }
  proxy.$hideLoading();
}
async function toWithdraw(amount) {
  proxy.$showLoading()
  const res = await gameModel.withdraw(amount)
  if (res.ok) {
    showToast(t('success'))
    emit('success', { action: 'refresh' })
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

  .cont-rank {
    position: relative;

    .bg {
      width: 310px;
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

      .cont-user {
        display: flex;
        justify-content: space-between;
        padding: 0 25px;
        margin-top: 15px;

        .cont-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;

          .avatar {
            width: 50px;
            margin-bottom: 10px;
          }

          .setting {
            width: 65px;
            height: 20px;
            background-color: #f8da61;
            border: 1px solid #000;
            border-radius: 4px;
            font-weight: bold;
            box-sizing: border-box;
            line-height: 20px;
            text-align: center;
            font-size: 14px;

          }
        }

        .cont-msg {
          display: flex;
          flex-direction: column;

          .cont-level {
            display: flex;
            align-items: center;

            .level {
              font-size: 14px;
              font-weight: bold;
            }

            .num {
              width: 55px;
              height: 20px;
              background-color: #fbeaa1;
              border: 1px solid #ed802b;
              line-height: 20px;
              box-sizing: border-box;
              font-size: 14px;
              color: #ed802b;
              text-align: center;
              border-radius: 2px;
              margin-left: 10px;
            }
          }

          .game-id {
            font-size: 14px;
            font-weight: bold;
          }

          .cont-id {
            width: 170px;
            height: 40px;
            display: flex;
            align-items: center;
            background-color: #d3d498;
            border-radius: 2px;
            padding: 0 10px;
            box-sizing: border-box;
            margin-top: 4px;

            .addr {
              font-size: 10px;
              word-break: break-all;
            }

            .copy {
              width: 20px;
              height: 20px;
              margin-left: auto;
            }
          }
        }
      }

      .cont-git {
        width: 250px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border: 1px solid #000;
        box-sizing: border-box;
        align-self: center;
        margin-top: 20px;

        .item-git {
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          padding: 0 4px;
          box-sizing: border-box;

          .icon-git {
            width: 24px;
          }

          .name {
            margin-left: 4px;
          }

          .num {
            margin-left: auto;
          }

          .btn {
            margin-left: 4px;
            width: 70px;
            height: 24px;
            background-color: #f8da61;
            border: 1px solid #000;
            border-radius: 4px;
            font-weight: bold;
            box-sizing: border-box;
            line-height: 20px;
            text-align: center;
          }
        }

        .line {
          width: 100%;
          height: 1px;
          background-color: #999;
        }
      }

      .cont-tab {
        position: relative;
        width: 260px;
        height: 36px;
        margin-top: 10px;
        margin-left: 25px;

        .line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background-color: #f8da61;
        }

        .list-tab {
          display: flex;
          justify-content: space-evenly;
          height: 100%;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;

          .item-tab {
            height: 100%;
            width: 80px;
            position: relative;

            .tab-bg {
              height: 100%;
              width: 100%;
            }

            .tab-name {
              font-size: 14px;
              font-weight: bold;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .select {
              color: #ed802b !important;
            }
          }

          .tab-s {
            width: 50px !important;
          }
        }

      }

      .cont-num {
        display: flex;
        margin-top: 4px;

        .item-num {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          .num {
            font-size: 12px;
            color: #ed802b;
            font-weight: bold;
          }

          .name {
            font-size: 12px;
            color: #000;
            font-weight: bold;
          }
        }
      }

      .cont-more {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        .nei {
          font-size: 12px;
          font-weight: bold;

          .count {
            color: #ed802b;
          }
        }

        .more {
          font-size: 12px;
          font-weight: bold;
          text-decoration: underline;
        }
      }

      .cont-title {
        display: flex;
        padding: 0 20px;
        margin-top: 5px;

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

        .menu3 {
          flex: 3;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }
      }

      .list-income {
        height: 400px;
        margin-top: 5px;
        padding: 0 20px;
        overflow-y: scroll !important;

        .item-income {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 30px;
          margin-bottom: 4px;
          border-bottom: 1px solid #eee;

          .num1 {
            flex: 1;
            font-size: 12px;
            text-align: center;
          }

          .num2 {
            flex: 2;
            font-size: 12px;
            text-align: center;
          }

          .num3 {
            flex: 3;
            font-size: 12px;
            text-align: center;
          }

          .cont-link {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-link {
              width: 15px;
            }
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

      .giw {
        font-weight: bold;
        align-self: center;
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
        align-self: flex-end;
        color: #000;
        margin-right: 50px;
        font-weight: bold;
        margin-top: 10px;
      }

      .fee {
        font-size: 14px;
        align-self: flex-end;
        color: #000;
        margin-right: 50px;
        font-weight: bold;
        margin-top: 5px;
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
        margin-top: 20px;
        color: #000;
        font-weight: bold;
      }

    }
  }

  .cont-setting {
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
      top: 60px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-language {
        display: flex;
        margin-left: 40px;
        margin-top: 40px;

        .language {
          font-size: 16px;
          margin-right: 4px;
        }

        .cont-zh {
          display: flex;
          align-items: center;
          margin-right: 10px;

          .point {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #fff;
            border: 1px solid #000;
            box-sizing: border-box;
            margin-right: 4px;
          }

          .select {
            background-color: #f2d970 !important;
          }

          .name {
            font-size: 14px;
            font-weight: bold;
          }
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
        margin-top: 60px;
        color: #000;
        font-weight: bold;
      }

      .btn-cancel {
        width: 220px;
        height: 40px;
        background-color: #ed8582;
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

    }
  }
}
</style>