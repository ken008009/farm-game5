<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-rank" @click="notDo()" v-if="step == 1">
      <img class="bg" :src="$t('image_game.bg_user_info')" alt="">
      <div class="cont-info">
        <div class="cont-user">
          <div class="cont-avatar">
            <img class="avatar" src="@/assets/images/game/icon_avatar.png" alt="">
            <span class="setting" @click="showSettingHandler">{{ $t('setting') }}</span>
          </div>
          <div class="cont-msg">
            <div class="cont-level">
              <span class="level">{{ $t('level') }}:</span>
              <span class="num">LV.{{ info.level }}</span>
            </div>
            <span class="game-id">{{ `${$t('inviter')}:${maskString(info.addressThree)}` }}</span>
            <!-- <span class="game-id">{{ $t('game_id') }}:</span> -->
            <div class="cont-id">
              <span class="addr">{{ info.myAddress }}</span>
              <img class="copy" @click="copyAddrHandler(info.myAddress)" src="@/assets/images/game/icon_copy.png"
                alt="">
            </div>
          </div>
        </div>
        <div class="cont-git">
          <!-- <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_giw.png" alt="">
            <span class="name">{{ $t('recharge') }}ISPAY</span>
            <span class="num">{{ toFixed2(info.giwTwo) }}</span>
            <span class="btn" @click="showRechargeHandler()">{{ $t('recharge') }}</span>
          </div>
          <div class="line"></div> -->
          <!-- <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_giw.png" alt="">
            <span class="name">{{ $t('withdraw2') }}ISPAY</span>
            <span class="num">{{ toFixed2(info.git) }}</span>
            <span class="btn" @click="showWithdrawHandler()">{{ $t('withdraw') }}</span>
          </div>
          <div class="line"></div> -->
          <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_git.png" alt="">
            <span class="name">{{ $t('withdraw2') }}ISPAY</span>
            <span class="num">{{ toFixed2(info.gitNewNew) }}</span>
            <span class="btn" @click="showWithdraw4Handler()">{{ $t('withdraw') }}</span>
          </div>
          <div class="line"></div>
          <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_giw.png" alt="">
            <span class="name">{{ $t('recharge') }}USDT</span>
            <span class="num">{{ toFixed2(info.usdt) }}</span>
            <!-- <span class="btn">{{ $t('recharge') }}</span> -->
            <span class="btn" @click="showWithdraw2Handler()">{{ $t('recharge') }}</span>
          </div>
          <div class="line"></div>
          <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_giw.png" alt="">
            <span class="name">{{ $t('withdraw2') }}USDT</span>
            <span class="num">{{ toFixed2(info.usdt) }}</span>
            <span class="btn" @click="showWithdraw3Handler()">{{ $t('withdraw') }}</span>
          </div>
          <!-- <div class="line"></div>
          <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_giw.png" alt="">
            <span class="name">{{ $t('transfer') }}USDT</span>
            <span class="num">{{ toFixed2(info.usdt) }}</span>
            <span class="btn" @click="showTransferHandler()">{{ $t('transfer') }}</span>
          </div> -->
          <!-- <div class="line"></div>
          <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_git.png" alt="">
            <span class="name">ISPAY</span>
            <span class="num">{{ toFixed2(info.gitNew) }}</span>
            <span class="btn" @click="showExchangeHandler()">{{ $t('exchange') }}</span>
          </div> -->
          <div class="line"></div>
          <div class="item-git">
            <img class="icon-git" src="@/assets/images/game/icon_giw.png" alt="">
            <span class="name">{{ $t('recharge') }}ISPAY</span>
            <span class="num">{{ toFixed2(info.gitNew) }}</span>
            <span class="btn" @click="showRechargeISPAYHandler()">{{ $t('recharge') }}</span>
          </div>          
        </div>

        <div class="cont-performance">
          <div class="item-performance">
            <span class="label">{{ $t('total_performance_new') }}</span>
            <span class="num">{{ toFixed2(info.newOne || 0) }}</span>
          </div>
          <div class="item-performance">
            <span class="label">{{ $t('yesterday_performance') }}</span>
            <span class="num">{{ toFixed2(info.newTwo || 0) }}</span>
          </div>
          <div class="item-performance">
            <span class="label">{{ $t('today_performance') }}</span>
            <span class="num">{{ toFixed2(info.newThree || 0) }}</span>
          </div>
        </div>

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
              <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">{{ $t('team') }}</span>
            </div>
            <div class="item-tab" @click="switchTabHandler(3)">
              <img class="tab-bg" v-if="tabSelect == 3" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 3 ? 'select' : '']">{{ $t('team_recharge') }}</span>
            </div>
            <!-- <div class="item-tab tab-s" @click="switchTabHandler(2)">
              <img class="tab-bg" v-if="tabSelect == 2" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">L1</span>
            </div>
            <div class="item-tab tab-s" @click="switchTabHandler(3)">
              <img class="tab-bg" v-if="tabSelect == 3" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 3 ? 'select' : '']">L2</span>
            </div> -->
            <!-- <div class="item-tab tab-s" @click="switchTabHandler(4)">
              <img class="tab-bg" v-if="tabSelect == 4" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 4 ? 'select' : '']">L3</span>
            </div> -->
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
        <div class="cont-num cont-num-2" v-if="tabSelect == 2">
          <div class="item-num">
            <span class="num">{{ list.reduce((s, i) => s + (Number(i.amount) || 0), 0).toFixed(2) }}</span>
            <span class="name">{{ $t('usdt_income') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ list.reduce((s, i) => s + (Number(i.ispayAmount) || 0), 0).toFixed(2) }}</span>
            <span class="name">{{ $t('ispay_income') }}</span>
          </div>
        </div>
        <div class="cont-num cont-num-2" v-if="tabSelect == 3">
          <div class="item-num">
            <span class="num">{{ list.reduce((s, i) => s + (Number(i.amount) || 0), 0).toFixed(2) }}</span>
            <span class="name">{{ $t('usdt') }}</span>
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
        <div class="cont-more">
          <span class="nei">{{ $t('neighbors') }}: <span class="count">{{ info.recommendTotal }}</span></span>
          <span class="more" @click="showMoreHandler()">{{ $t('more') }}</span>
        </div>
        <div class="cont-title" v-if="tabSelect == 1">
          <span class="menu2">{{ $t('address') }}</span>
          <span class="menu2">{{ $t('time') }}</span>
          <span class="menu1">{{ $t('level') }}</span>
        </div>
        <div class="cont-title" v-else-if="tabSelect == 2">
          <span class="menu2">{{ $t('address_short') }}</span>
          <span class="menu2">{{ $t('date') }}</span>
          <span class="menu1">{{ $t('level2') }}</span>
          <span class="menu1">{{ $t('usdt') }}</span>
          <span class="menu1">{{ $t('ispay') }}</span>
        </div>
        <div class="cont-title" v-else-if="tabSelect == 3">
          <span class="menu2">{{ $t('address_short') }}</span>
          <span class="menu2">{{ $t('date') }}</span>
          <span class="menu1">{{ $t('usdt') }}</span>
        </div>
        <div class="cont-title" v-else>
          <span class="menu2">{{ $t('address') }}</span>
          <span class="menu2">{{ $t('bonus_time') }}</span>
          <span class="menu1">USDT</span>
        </div>
        <div class="list-income" v-if="tabSelect == 1">
          <div class="item-income" v-for="(item, index) in list">
            <span class="num2 ellipsis2">{{ maskString(item.address) }}</span>
            <span class="num2">{{ item.createdAt }}</span>
            <span class="num1">{{ item.level }}</span>
          </div>
        </div>
        <div class="list-income" v-else-if="tabSelect == 2">
          <div class="item-income" v-for="(item, index) in list">
            <span class="num2 ellipsis2">{{ maskString(item.address) }}</span>
            <span class="num2">{{ item.createdAt }}</span>
            <span class="num1">{{ item.vip }}</span>
            <span class="num1">{{ toFixed4(item.amount) }}</span>
            <span class="num1">{{ toFixed4(item.ispayAmount) }}</span>
          </div>
        </div>
        <div class="list-income" v-else-if="tabSelect == 3">
          <div class="item-income" v-for="(item, index) in list">
            <span class="num2 ellipsis2">{{ maskString(item.address) }}</span>
            <span class="num2">{{ item.createdAt }}</span>
            <span class="num1">{{ toFixed4(item.amount) }}</span>
          </div>
        </div>
        <div class="list-income" v-else>
          <div class="item-income" v-for="(item, index) in list">
            <span class="num2 ellipsis2">{{ maskString(item.address) }}</span>
            <span class="num2">{{ item.createdAt }}</span>
            <span class="num1">{{ toFixed4(item.amount) }}</span>
          </div>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-pop" @click="notDo()" v-if="step == 2">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="switch" v-if="!withdrawMode" @click="switchToUSDTHandler()">切换USDT</span>
        <span class="btn-confirm" v-if="withdrawMode" @click="switchModeHandler()">{{ $t('game') }} → {{ $t('wallet')
          }}</span>
        <span class="btn-confirm" v-else @click="switchModeHandler()">{{ $t('wallet') }} → {{ $t('game') }}</span>
        <span class="balance" v-if="withdrawMode">{{ $t('game_balance') }}:{{ parseInt(info.giw) }}ISPAY</span>
        <span class="balance" v-else>{{ $t('wallet_balance') }}:{{ walletBalance }}ISPAY</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="btn-confirm" @click="submitHandler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-pop" @click="notDo()" v-if="step == 4">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="btn-confirm">{{ $t('wallet') }} → {{ $t('game') }}</span>
        <span class="balance">{{ $t('wallet_balance') }}:{{ walletUSDTBalance }}USDT</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="btn-confirm" @click="submitUSDTHandler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <!-- <div class="cont-pop" @click="notDo()" v-if="step == 6">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="btn-confirm">{{ $t('wallet') }} → {{ $t('game') }}</span>
        <span class="balance">{{ $t('wallet_balance') }}:{{ walletUSDTBalance }}USDT</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="btn-confirm" @click="submitUSDTHandler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div> -->
    <div class="cont-pop" @click="notDo()" v-if="step == 6">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="btn-confirm">{{ $t('game') }} → {{ $t('wallet') }}</span>
        <span class="balance">{{ $t('game_balance') }}:{{ toFixed4(info.usdt) }}USDT</span>
        <span class="balance">{{ $t('can_withdraw') }}/{{ $t('day') }}:{{ toFixed4(info.canUsdtWithdraw) }}USDT</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="btn-confirm" @click="submitUSDT3Handler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-pop" @click="notDo()" v-if="step == 7">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="btn-confirm">{{ $t('game') }} → {{ $t('wallet') }}</span>
        <span class="balance">{{ $t('game_balance') }}:{{ toFixed4(info.gitNewNew) }}ISPAY</span>
        <div class="cont-input">
          <!-- <input class="input-num"  maxlength="18"
            :value="amt" @input="amt = $event.target.value.replace(/[^\d]/g, '')"
            :placeholder="$t('please_enter_the_amount')">           -->
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="btn-confirm" @click="submitUSDT4Handler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-pop" @click="notDo()" v-if="step == 8">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="btn-confirm">{{ $t('wallet') }} → {{ $t('game') }}</span>
        <span class="balance">{{ $t('wallet_balance') }}:{{ walletBalance }}ISPAY</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" type="text" inputmode="decimal" maxlength="12"
            :placeholder="$t('please_enter_the_amount')" @input="onInputAmt" @blur="onBlurAmt" />          
        </div>
        <span class="btn-confirm" @click="submitISAPYHandler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div> 
    <div class="cont-pop" @click="notDo()" v-if="step == 9">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <!-- <span class="btn-confirm">{{ $t('game') }} → {{ $t('wallet') }}</span> -->
        <span class="balance">{{ $t('game_balance') }}:{{ toFixed4(info.usdt) }}USDT</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <div class="cont-input">
          <input class="input-num" v-model="address" maxlength="99" type="text"
            :placeholder="$t('please_enter_the_address')">
        </div>
        <span class="btn-confirm" @click="submitTransferHandler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>       
    <div class="cont-pop" @click="notDo()" v-if="step == 5">
      <img class="bg" :src="$t('image_game.bg_balance')" alt="">
      <div class="cont-info">
        <span class="switch" @click="switchToBIWHandler()">切换ISPAY</span>
        <span class="btn-confirm">{{ $t('wallet') }} → {{ $t('game') }}</span>
        <span class="balance">{{ $t('wallet_balance') }}:{{ walletUSDTBalance }}USDT</span>
        <div class="cont-input">
          <input class="input-num" v-model="amt" maxlength="18" type="number"
            :placeholder="$t('please_enter_the_amount')">
        </div>
        <span class="fee">{{ amt ? (toFixed2(amt / info.biwPrice) || 0) : 0 }}ISPAY</span>
        <span class="btn-confirm" @click="submitUSDT2Handler()">{{ $t('confirm') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-setting" @click="notDo()" v-if="step == 3">
      <img class="bg" :src="$t('image_game.bg_setting')" alt="">
      <div class="cont-info">
        <div class="cont-language">
          <span class="language">{{ $t('music') }}:</span>
          <div class="cont-zh" @click="switchMusic(1)">
            <span class="point" :class="[currMusic ? 'select' : '']"></span>
            <span class="name">ON</span>
          </div>
          <div class="cont-zh" @click="switchMusic(0)">
            <span class="point" :class="[currMusic ? '' : 'select']"></span>
            <span class="name">OFF</span>
          </div>
        </div>
        <div class="cont-language">
          <span class="language">{{ $t('language') }}:</span>
          <div class="cont-zh" @click="switchLanguage('en')">
            <span class="point" :class="[currLanguage == 'en' ? 'select' : '']"></span>
            <span class="name">English</span>
          </div>
          <div class="cont-zh" @click="switchLanguage('zh')">
            <span class="point" :class="[currLanguage == 'zh' ? 'select' : '']"></span>
            <span class="name">中文</span>
          </div>
        </div>
        <span class="btn-confirm" @click="submitSettingHandler()">{{ $t('determine') }}</span>
        <span class="btn-cancel" @click="logoutHandler">{{ $t('sign_out') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <PopUserNeighbor v-if="showMore" :info="info" @close="closeMoreHandler"></PopUserNeighbor>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { formatTime, formatTime3, maskString, toFixed2, toFixed4 } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { useLanguageStore } from '@/stores/languageStore';
import { useAudioStore } from '@/stores/audioStore';
import { clearAllStorage } from '@/utils/auth';
import { ETH, Contract } from '@/tools/contract'
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';
import PopUserNeighbor from './PopUserNeighbor.vue';

const { proxy } = getCurrentInstance();
const { t } = useI18n()

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const languageStore = useLanguageStore()
const audioStore = useAudioStore()
const step = ref(1)
const list = ref([])
const tabSelect = ref(1)
const withdrawMode = ref(true)
const amt = ref('')
const address = ref('')
const currLanguage = ref('')
const currMusic = ref(0)
const showMore = ref(false)
const walletBalance = ref(0)
const walletUSDTBalance = ref(0)

const BUY_ISPAY = new Contract(import.meta.env.VITE_BUY_ISPAY, "BUY");
const BUY_USDT = new Contract(import.meta.env.VITE_BUY_USDT, "BUY");
const BUY_USDT2 = new Contract(import.meta.env.VITE_BUY_USDT2, "BUY");
const AUTH_ISPAY = new Contract(import.meta.env.VITE_ISPAY, "ERC20");
const AUTH_USDT = new Contract(import.meta.env.VITE_USDT, "ERC20");
const AUTH_USDT2 = new Contract(import.meta.env.VITE_USDT2, "ERC20");

onMounted(() => {
  getLocalSetting()
  getList()
  getBalance()
  getRwbApproved()
});

function swl() {
  languageStore.setLocale('zh')
}
function getLocalSetting() {
  currLanguage.value = localStorage.getItem('language') || 'en'
  currMusic.value = parseInt(localStorage.getItem('music')) || 0
}
const emit = defineEmits(['close', 'success'])

function switchMusic(e) {
  currMusic.value = e
}
function switchLanguage(e) {
  currLanguage.value = e
}
function showMoreHandler() {
  showMore.value = true
}
function closeMoreHandler() {
  showMore.value = false
}
async function copyAddrHandler(addr) {
  try {
    const hostname = import.meta.env.VITE_API_URL
    const url = `${hostname}/game/?invite=${addr}`
    await navigator.clipboard.writeText(url);
    console.log('复制成功');
    showToast(t('copy_success'))
  } catch (err) {
    console.error('复制失败', err);
  }
}
function switchTabHandler(index) {
  if (tabSelect.value != index) {
    tabSelect.value = index
    getList()
  }
}
function switchToUSDTHandler() {
  step.value = 5
}
function switchToBIWHandler() {
  step.value = 2
}
function submitHandler() {
  if (withdrawMode.value) {
    //提现
    const amount = parseFloat(amt.value)
    const max = parseFloat(props.info.withdrawMax)
    const min = parseFloat(props.info.withdrawMin)
    if (max >= amount && min <= amount) {
      toWithdraw(amount, 1)
    } else {
      showToast(`${t('please_enter_the_correct_amount')}(${min}~${max})`)
    }
  } else {
    //充值
    const amount = parseFloat(amt.value)
    if (amount < 10) {
      showToast(t('please_enter_the_correct_amount'))
    } else {
      authApprove()
    }

  }
}
function submitUSDTHandler() {
  const amount = parseFloat(amt.value)
  console.log('amount', amount)
  // if (!amount || amount < 10) {
  if (!amount) {
    showToast(t('please_enter_the_correct_amount'))
  } else {
    authApproveUSDT()
  }
}
function submitISAPYHandler() {
  const amount = parseFloat(amt.value)
  console.log('amount', amount)
  if (!amount) {
    showToast(t('please_enter_the_correct_amount'))
  } else {
    authApprove()
  }
}
function submitUSDT2Handler() {
  const amount = parseFloat(amt.value)
  if (amount < 10) {
    showToast(t('please_enter_the_correct_amount'))
  } else {
    authApproveUSDT2()
  }
}
function submitUSDT3Handler() {
  const amount = parseFloat(amt.value)
  const max = parseFloat(props.info.withdrawMaxTwo)
  const min = parseFloat(props.info.withdrawMinTwo)
  if (max >= amount && min <= amount) {
    toWithdraw(amount, 4)
  } else {
    showToast(`${t('please_enter_the_correct_amount')}(${min}~${max})`)
  }
}
function submitUSDT4Handler() {
  const amount = parseFloat(amt.value)
  const max = parseFloat(props.info.withdrawMaxThree)
  const min = parseFloat(props.info.withdrawMinThree)
  if (max >= amount && min <= amount) {
    toWithdraw(amount, 3)
  } else {
    showToast(`${t('please_enter_the_correct_amount')}(${min}~${max})`)
  }
}
function submitTransferHandler() {
  const amount = parseFloat(amt.value)
  const addr = address.value
  if(!addr) {
    showToast(t('please_enter_the_address'))
    return
  }
  if (0 <= amount) {
    toTransfer(amount, addr)
  } else {
    showToast(`${t('please_enter_the_correct_amount')}`)
  }
}
function switchModeHandler() {
  // withdrawMode.value = !withdrawMode.value
}
function showWithdrawHandler() {
  withdrawMode.value = true
  step.value = 2
}
function showRechargeHandler() {
  withdrawMode.value = false
  step.value = 2
}
function showWithdraw2Handler() {
  step.value = 4
}
function showWithdraw3Handler() {
  step.value = 6
}
function showWithdraw4Handler() {
  step.value = 7
}
function showTransferHandler() {
  step.value = 9
}
function showRechargeISPAYHandler() {
  step.value = 8
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
  const music = currMusic.value
  localStorage.setItem('music', music)
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

const onInputAmt = (e) => {
  let val = e.target.value

  // 只允许数字和一个小数点
  val = val.replace(/[^\d.]/g, '')
  val = val.replace(/^(\d*\.\d*).*$/, '$1')
  val = val.replace(/^0+(\d)/, '$1')

  // 限制三位小数
  if (val.includes('.')) {
    const [i, d] = val.split('.')
    val = i + '.' + d.slice(0, 3)
  }

  // 实时限制最大值
  if (Number(val) > 1000) {
    val = '1000'
  }

  amt.value = val
}

const onBlurAmt = () => {
  let val = Number(amt.value)

  if (!val || val < 0.001) {
    amt.value = '0.001'
    return
  }

  if (val > 1000) {
    amt.value = '1000'
    return
  }

  amt.value = val.toFixed(3)
}

async function getRwbApproved() {
  let res = await AUTH_ISPAY.call("allowance", [ETH.account, BUY_ISPAY.address]);
  let resUsdt = await AUTH_USDT.call("allowance", [ETH.account, BUY_USDT.address]);
  let resUsdt2 = await AUTH_USDT2.call("allowance", [ETH.account, BUY_USDT2.address]);
  console.log((res))
}
async function authApprove() {
  proxy.$showLoading()
  AUTH_ISPAY.send("approve", [
    BUY_ISPAY.address,
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ]).then(() => {
    console.log('approve success')
    const amount = parseInt(parseFloat(amt.value)*1000)
    toRecharge(amount)
  }).catch(() => {
    proxy.$hideLoading();
  });
}
async function authApproveUSDT() {
  proxy.$showLoading()
  AUTH_USDT.send("approve", [
    BUY_USDT.address,
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ]).then(() => {
    const amount = parseInt(amt.value)
    toRechargeUSDT(amount)
  }).catch(() => {
    proxy.$hideLoading();
  });
}
async function authApproveUSDT2() {
  proxy.$showLoading()
  AUTH_USDT2.send("approve", [
    BUY_USDT2.address,
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ]).then(() => {
    const amount = parseInt(amt.value)
    toRechargeUSDT2(amount)
  }).catch(() => {
    proxy.$hideLoading();
  });
}
function toRecharge(value) {
  BUY_ISPAY.send("buy", [Number(value)]).then(() => {
    proxy.$hideLoading();
    console.log('buysuccess')
    showToast(t('success'))
  }).catch(() => {
    proxy.$hideLoading();
  });
}
function toRechargeUSDT(value) {
  BUY_USDT.send("buy", [Number(value)]).then(() => {
    proxy.$hideLoading();
    console.log('buysuccess')
    showToast(t('recharge_success'))
  }).catch(() => {
    proxy.$hideLoading();
  });
}
function toRechargeUSDT2(value) {
  BUY_USDT2.send("buy", [Number(value)]).then(() => {
    proxy.$hideLoading();
    console.log('buysuccess')
    showToast(t('recharge_success'))
  }).catch(() => {
    proxy.$hideLoading();
  });
}
async function getBalance() {
  const balance = await ETH.getISPAYBalance()
  walletBalance.value = toFixed4(balance) || 0
  const usdt = await ETH.getUSDTBalance()
  walletUSDTBalance.value = toFixed4(parseFloat(usdt) || 0)

  console.log(balance)
}
async function getList() {
  proxy.$showLoading();
  list.value = []
  let res = ''
  if (tabSelect.value == 1) {
    res = await gameModel.userRecommend(1)
  } else if (tabSelect.value == 2) {
    res = await gameModel.userRewardList(1)
  } else if (tabSelect.value == 3) {
    res = await gameModel.userTeamDepositList(1)
  } else if (tabSelect.value == 4) {
    res = await gameModel.userRecommendL(3, 1)
  }
  if (res && res.ok) {
    list.value = res.data.list
  }
  proxy.$hideLoading();
}

async function toWithdraw(amount, withdrawType) {
  proxy.$showLoading()
  const res = await gameModel.withdraw(amount, withdrawType)
  if (res.ok) {
    showToast(t('success'))
    emit('success', { action: 'refresh' })
  }
  proxy.$hideLoading()
}
async function toTransfer(amount, address) {
  proxy.$showLoading()
  const res = await gameModel.transfer(amount, address)
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
        margin-top: 10px;

        .item-git {
          width: 100%;
          height: 30px;
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
            height: 20px;
            background-color: #f8da61;
            border: 1px solid #000;
            border-radius: 4px;
            font-weight: bold;
            box-sizing: border-box;
            line-height: 20px;
            text-align: center;
            font-size: 13px;
          }
        }

        .line {
          width: 100%;
          height: 1px;
          background-color: #999;
        }
      }

      .cont-performance {
        width: 260px;
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        margin-left: 25px;

        .item-performance {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;

          .label {
            font-size: 12px;
            color: #000;
            font-weight: bold;
          }

          .num {
            font-size: 14px;
            color: #ed802b;
            font-weight: bold;
          }
        }
      }

      .cont-tab {
        position: relative;
        width: 260px;
        height: 36px;
        margin-top: 5px;
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

      .cont-num-2 .item-num {
        flex-direction: row;
        justify-content: center;
        gap: 4px;
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
        height: 150px;
        margin-top: 1px;
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

      // .cont-bottom {
      //   display: flex;
      //   align-items: center;
      //   font-size: 12px;
      //   text-decoration: underline;
      //   padding: 0 20px;
      //   margin-top: 20px;

      //   .prev {
      //     flex: 1;
      //   }

      //   .first {
      //     flex: 1;
      //   }

      //   .num {
      //     flex: 4;
      //     text-align: center;
      //   }

      //   .last {
      //     flex: 1;
      //   }

      //   .next {
      //     flex: 1;
      //   }

      // }
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
      top: 50px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .giw {
        font-weight: bold;
        align-self: center;
      }

      .switch {
        font-size: 12px;
        align-self: flex-end;
        margin-right: 20px;
        height: 20px;
        border: 1px solid #000;
        line-height: 20px;
        padding: 0 4px;
        border-radius: 2px;
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
      top: 30px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-language {
        display: flex;
        margin-left: 40px;
        margin-top: 30px;

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