<template>
  <div class="cont-splash" v-show="showSplash">
    <!-- <img class="bg-splash" src="@/assets/images/game/bg_splash.jpg" alt=""> -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progress}%`, }"></div>
    </div>
  </div>
  <div class="game-container" v-show="!showSplash" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
    @touchend="handleTouchEnd">
    <div class="map-container" ref="mapContainer" :style="containerStyle">
      <div class="map-bg" @click="clickOther">
        <div class="h-bg">
          <img class="bg" src="@/assets/images/game/bg_1.jpg" alt="">
          <img class="bg" src="@/assets/images/game/bg_2.jpg" alt="">
        </div>
        <div class="h-bg">
          <img class="bg" src="@/assets/images/game/bg_3.jpg" alt="">
          <img class="bg" src="@/assets/images/game/bg_4.jpg" alt="">
        </div>
      </div>
      <div class="land-position">
        <div v-for="(land, index) in landList" :key="index" class="land-plot" :style="getPlotStyle(index)">
          <Land :closeOption="closeMenuAction" :action="landAction" :land-info="land" :location="index + 1"
            @success="landActionHandler" @close="closeOtherMenuHandler" />
        </div>
      </div>
    </div>
    <div class="cont-arrow" @click="switchShowMenuHandler()">
      <span class="name" v-if="showMenu">{{ $t('hide') }}</span>
      <span class="name" v-else>{{ $t('show') }}</span>
      <!-- <i class="iconfont icon-xiajiantou icon-close" v-if="showMenu"></i>
      <i class="iconfont icon-shangjiantou icon-close" v-else></i> -->
    </div>
    <div class="cont-top">
      <div class="cont-avatar" @click="switchUserCenterHandler()">
        <img class="icon-avatar" src="@/assets/images/game/icon_avatar.png" alt="">
        <img class="icon-level" src="@/assets/images/game/icon_level.png" alt="">
        <span class="level">{{ userInfo.level }}</span>
        <span class="recharge">{{ $t('recharge') }}</span>
      </div>
      <div class="cont-git" :class="[showShakeGit ? 'animated tada' : '']" @click="switchRankHandler()">
        <img class="bg-git" src="@/assets/images/game/bg_top_git.png" alt="">
        <span class="tip2">ISPAY:</span>
        <span class="num">{{ userInfo.gitNew ? toFixed4(userInfo.gitNew) : 0 }}</span>
        <!-- <count-up class="num" :options="{ 'separator': '' }"
          :end-val="userInfo.gitNew ? parseInt(userInfo.gitNew) : 0"></count-up> -->
        <span class="tip">USDT:{{ toFixed2(userInfo.usdt) }}</span>
        <div class="point" v-if="userInfo.red === '1'"></div>
      </div>
      <!-- <div class="cont-usdt">
        <img class="bg-git" src="@/assets/images/game/bg_top_git.png" alt="">
        <span class="num">{{ userInfo.usdt ? parseInt(userInfo.usdt) : 0 }}</span>
      </div> -->
      <div class="cont-bsc">
        <img class="bg-bsc" src="@/assets/images/game/bg_top_bsc.png" alt="">
        <span class="num">{{ maskString(userInfo.myAddress) }}</span>
      </div>
    </div>
    <div class="cont-top2">
      <div class="cont-num">
        <span class="num">{{ $t('company')+`:${toFixed2(userInfo.one)}` }}</span>
        <span class="num">{{ $t('community')+`:${toFixed2(userInfo.two)}` }}</span>
        <span class="num">{{ $t('mining')+`:${toFixed2(userInfo.three)}` }}</span>
      </div>
    </div>
    <div class="cont-top3">
      <div class="cont-notice" @click="switchAllNoticeHandler">
        <img class="icon-notice" src="@/assets/images/game/icon_all_notice.png" alt="">
        <span class="tip">{{ $t('notice') }}</span>
      </div>
      <div class="cont-marquee" v-if="userInfo.adminListM && userInfo.adminListM.length > 0">
        <div class="notice">{{ isZh?userInfo.adminListM[0].content:userInfo.adminListM[0].contentTwo }}</div> 
      </div>
    </div>
    <div class="cont-top4">
      <div class="cont-notice" @click="switchAllRuleHandler">
        <img class="icon-notice" src="@/assets/images/game/icon_rule.png" alt="">
        <span class="tip">{{ $t('rule') }}</span>
      </div>
    </div>    
    <div class="cont-top5">
      <div class="cont-notice" @click="switchRank2Handler">
        <img class="icon-notice" src="@/assets/images/game/icon_rule2.png" alt="">
        <span class="tip">{{ $t('harvest') }}</span>
      </div>
    </div>    
    <div class="cont-right animated " :class="[showMenu ? 'fadeInRight' : 'fadeOutRight']">
      <img class="icon" @click="switchNoticeHandler()" :src="$t('image_game.menu_notice')" alt="">
      <img class="icon" @click="switchUserSeedHandler()" :src="$t('image_game.menu_seed')" alt="">
      <img class="icon" @click="switchUserGranaryHandler()" :src="$t('image_game.menu_granary')" alt="">
      <!-- <img class="icon" @click="switchUserPledgeHandler()" :src="$t('image_game.menu_pledge')" alt=""> -->
      <!-- <img class="icon" @click="switchUserExchangeHandler()" :src="$t('image_game.menu_exchange')" alt=""> -->
      <!-- <img class="icon" @click="toUrlHandler()" :src="$t('image_game.menu_shop')" alt=""> -->
      <!-- <img class="icon" @click="toUrl2Handler()" :src="$t('image_game.menu_pay')" alt=""> -->
      <img class="icon" @click="switchUserBlindHandler()" :src="$t('image_game.menu_blind')" alt="">
      <img class="icon" @click="switchUserAuctionHandler()" :src="$t('image_game.menu_auction')" alt="">
      <img class="icon" @click="switchUserLandHandler()" :src="$t('image_game.menu_land')" alt="">
      <img class="icon" @click="switchUserStoreHandler()" :src="$t('image_game.menu_store')" alt="">
      <img class="icon" @click="switchUserMarketHandler()" :src="$t('image_game.menu_market')" alt="">
    </div>
    <div v-if="false" class="cont-bottom animated" :class="[showMenu ? 'fadeInUp' : 'fadeOutDown']">
      <!-- <img class="icon" @click="switchUserBlindHandler()" :src="$t('image_game.menu_blind')" alt="">
      <img class="icon" @click="switchUserAuctionHandler()" :src="$t('image_game.menu_auction')" alt="">
      <img class="icon" @click="switchUserLandHandler()" :src="$t('image_game.menu_land')" alt="">
      <img class="icon" @click="switchUserStoreHandler()" :src="$t('image_game.menu_store')" alt="">
      <img class="icon" @click="switchUserMarketHandler()" :src="$t('image_game.menu_market')" alt=""> -->
      <div class="cont-chat">
        <div :class="[isAllMsg ? 'list-msg-h' : 'list-msg']" ref="listMsgContainer" @click="switchMsgHandler">
          <span class="item-msg" v-for="(item, index) in msgList">{{ maskString2(item.address) }}：{{
            item.content}}</span>
          <!-- <span class="item-msg">Dear Users, To enhance the user experience, our system will be upgraded to version 2.0. The update is scheduled for completion at 23:15 Beijing Time. We appreciate your support and understanding.</span> -->
        </div>
        <div class="cont-input">
          <input type="text" v-model="msg" class="input-msg" maxlength="50"></input>
          <span class="send" @click="submitMsgHandler">{{ $t('send') }}</span>
        </div>
      </div>

    </div>
    <div class="cont-success" v-if="showLinkSuccess">
      <img class="bg" :src="$t('image_game.bg_login3')" alt="">
      <div class="cont-info">
        <span class="addr">{{ address }}</span>
        <span class="btn-confirm" @click="closeLinkHandler()">{{ $t('determine') }}</span>
      </div>
    </div>

    <PopLogin v-if="showPopLogin" @success="loginSuccessHandler" @close="closeLoginHandler" />
    <PopRank v-if="showPopRank" :info="userInfo" @close="switchRankHandler" />
    <PopRank2 v-if="showPopRank2" :info="userInfo" @close="switchRank2Handler" />
    <PopUserInfo v-if="showPopUserInfo" :info="userInfo" @success="refreshHandler" @close="switchUserCenterHandler" />
    <PopNotice v-if="showPopNotice" @close="switchNoticeHandler" />
    <PopLand v-if="showPopLand" :info="userInfo" @close="switchUserLandHandler" />
    <PopGranary v-if="showPopGranary" :info="userInfo" @success="refreshHandler" @close="switchUserGranaryHandler" />
    <PopBlind v-if="showPopBlind" :info="userInfo" @success="refreshHandler" @close="switchUserBlindHandler" />
    <PopMarket v-if="showPopMarket" @close="switchUserMarketHandler" />
    <PopExchange v-if="showPopExchange" :info="userInfo" @success="refreshHandler" @close="switchUserExchangeHandler" />
    <PopSeed v-if="showPopSeed" :info="userInfo" @success="refreshHandler" @close="switchUserSeedHandler" />
    <PopStore v-if="showPopStore" :info="userInfo" @close="switchUserStoreHandler" />
    <PopAuction v-if="showPopAuction" :info="userInfo" @close="switchUserAuctionHandler" />
    <PopPledge v-if="showPopPledge" :info="userInfo" @close="switchUserPledgeHandler" />
    <PopAllNotice v-if="isAllNotice" :info="userInfo" @close="switchAllNoticeHandler" />
    <PopAllRule v-if="isAllRule" :info="userInfo" @close="switchAllRuleHandler" />

    <PopLandSelect v-if="showPopLandSelect" :mode="1" @success="selectLandHandler" @close="switchSelectLandHandler" />
    <PopGoodsSelect v-if="showPopGoodsSelect" :type="goodsSelectType" @success="selectGoodsHandler"
      @close="switchSelectGoodsHandler" />
    <PopLandCutivated v-if="showPopRaiseLand" :land-info="currLand" @success="raiseLandHandler"
      @close="switchRaiseLandHandler" />



  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed, nextTick, watch, useTemplateRef, onMounted, onUnmounted, onDeactivated, onActivated } from 'vue';
import { calculateFileSHA1, formatTime, formatBytes, maskString, maskString2, toFixed2, toFixed4 } from '@/utils/util';
import { fetchSign, checkAccount } from '@/tools/fetchSign';
import { getToken, getAddr, getSign, setCanLand, setCanPlayAdd } from '@/utils/auth';
import { useAudioStore } from '@/stores/audioStore';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { showToast } from 'vant';

import CountUp from 'vue-countup-v3'
import PopNotice from '@/views/game/pop/PopNotice.vue';
import PopLand from '@/views/game/pop/PopLand.vue';
import PopGranary from '@/views/game/pop/PopGranary.vue';
import PopBlind from '@/views/game/pop/PopBlind.vue';
import PopMarket from '@/views/game/pop/PopMarket.vue';
import PopExchange from '@/views/game/pop/PopExchange.vue';
import PopSeed from '@/views/game/pop/PopSeed.vue';
import PopStore from '@/views/game/pop/PopStore.vue';
import PopRank from '@/views/game/pop/PopRank.vue';
import PopRank2 from '@/views/game/pop/PopRank2.vue';
import PopUserInfo from '@/views/game/pop/PopUserInfo.vue';
import PopLogin from '@/views/game/pop/PopLogin.vue';
import Land from '@/views/game/Land.vue';
import PopLandSelect from '@/views/game/pop/PopLandSelect.vue';
import PopGoodsSelect from '@/views/game/pop/PopGoodsSelect.vue';
import PopLandCutivated from '@/views/game/pop/PopLandCutivated.vue';
import PopAuction from '@/views/game/pop/PopAuction.vue';
import PopPledge from '@/views/game/pop/PopPledge.vue';
import PopAllNotice from '@/views/game/pop/PopAllNotice.vue';
import PopAllRule from '@/views/game/pop/PopAllRule.vue';

import { getCurrentInstance } from 'vue';
import { defineOptions } from 'vue';
defineOptions({
  name: 'Game'
});
const { proxy } = getCurrentInstance();
const router = useRouter();
const audioStore = useAudioStore()
const route = useRoute();

function pxToVw(px) {
  const viewportWidth = 375; // 设计稿的宽度
  return `${(px / viewportWidth) * 100}vw`;
  // return `${(px / viewportWidth) * 100}vw`;
}
// 地图尺寸
const mapWidth = 2115
const mapHeight = 1140

let targetX = 540; // 镜头目标位置
let targetY = 285;
const viewportHeight = window.innerHeight;
targetY = 570 - viewportHeight / 2
if (targetY < 0) {
  targetY = (mapHeight - viewportHeight) / 2
}
// targetY = (mapHeight - viewportHeight) / 2
// 视角偏移量
const offsetX = ref(-targetX)
const offsetY = ref(-targetY)
// 添加模板引用
const mapContainer = ref(null)

// 触摸状态
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const lastOffsetX = ref(0)
const lastOffsetY = ref(0)
// 计算容器样式
// const containerStyle = computed(() => ({
//   width: `${pxToVw(mapWidth)}`,
//   height: `${pxToVw(mapHeight)}`,
//   transform: `translate3d(${pxToVw(offsetX.value)}, ${pxToVw(offsetY.value)}, 0)`
// }))
const containerStyle = computed(() => ({
  width: `${mapWidth}px`,
  height: `${mapHeight}px`,
  transform: `translate3d(${offsetX.value}px, ${offsetY.value}px, 0)`
}))
// 土地位置
const plots = [
  { x: 540, y: 570 },
  { x: 645, y: 600 },
  { x: 750, y: 630 },
  { x: 855, y: 660 },

  { x: 560, y: 660 },
  { x: 665, y: 690 },
  { x: 770, y: 720 },

  { x: 470, y: 720 },
  { x: 575, y: 750 }
]

const isZh = ref(false)

const progress = ref(10)
const showSplash = ref(true)
const showPopUserInfo = ref(false)
const showPopRank = ref(false)
const showPopRank2 = ref(false)
const showPopNotice = ref(false)
const showPopLand = ref(false)
const showPopGranary = ref(false)
const showPopBlind = ref(false)
const showPopMarket = ref(false)
const showPopExchange = ref(false)
const showPopSeed = ref(false)
const showPopStore = ref(false)
const showPopAuction = ref(false)
const showPopPledge = ref(false)
const showPopLogin = ref(false)

const showPopLandSelect = ref(false)
const showPopGoodsSelect = ref(false)
const showPopRaiseLand = ref(false)

const showMenu = ref(true)
const showLinkSuccess = ref(false)

const showPop = computed(() => {
  const flag = showPopUserInfo.value
    || showPopRank.value
    || showPopRank2.value
    || showPopNotice.value
    || showPopLand.value
    || showPopGranary.value
    || showPopBlind.value
    || showPopMarket.value
    || showPopExchange.value
    || showPopSeed.value
    || showPopStore.value
    || showPopAuction.value
    || showPopPledge.value
    || showPopLogin.value
    || showPopLandSelect.value
    || showPopGoodsSelect.value
    || showPopRaiseLand.value

  return flag
})

const userInfo = ref({})
const landList = ref([])
const currLand = ref({})
let locationNum = 0
let actionLandId = 0
let actionLandUseId = 0
let actionMenu = ''

const closeMenuAction = ref({})
const goodsSelectType = ref({ status: 1 })
const landAction = ref({ action: 'seed' })
const showShakeGit = ref(false)
const address = ref('')
const msgList = ref([])
const listMsgContainer = ref(null)
const msg = ref('')
const isAllMsg = ref(false)
const isAllNotice = ref(false)
const isAllRule = ref(false)
let timer = null
let progressTimer = null

onMounted(() => {
  isZh.value = localStorage.getItem('language') == 'zh'
  initSplash()
  checkLogin()
});
onUnmounted(() => {
  stopTimer()
})
// onActivated(() => {
//   checkLogin()
// })
// onDeactivated(() => {
//   stopTimer()  
// })
watch(msgList, async () => {
  // 等 DOM 更新完
  await nextTick()
  const el = listMsgContainer.value
  if (el) el.scrollTop = el.scrollHeight
})

function initSplash() {
  startProgressTimer()
  setTimeout(() => {
    stopProgressTimer()
    showSplash.value = false
  }, 3 * 1000);
}
function startProgressTimer() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = ''
  }
  progressTimer = setInterval(() => {
    progress.value = progress.value + 10
  }, 1000)
}
function stopProgressTimer() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = ''
  }
}

//处理边界点击
function clickOther() {
  // router.push({ path: '/game2', query: {} });
  // landAction.value = { action: 'use_glove', locationNum: 2, num: 1, time: new Date() }
  closeMenuAction.value = { locationNum: -1, time: new Date() }
}
function closeOtherMenuHandler(params) {
  closeMenuAction.value = { locationNum: params.locationNum, time: new Date() }
}
//c处理滑动时间
const handleTouchStart = (e) => {
  if (e.touches.length === 1) {
    isDragging.value = true
    startX.value = e.touches[0].clientX
    startY.value = e.touches[0].clientY
    lastOffsetX.value = offsetX.value
    lastOffsetY.value = offsetY.value
  }
}
const handleTouchMove = (e) => {
  if (showPop.value) return //弹窗时阻止滑动
  if (!isDragging.value) return
  e.preventDefault()

  const touch = e.touches[0]
  const deltaX = touch.clientX - startX.value
  const deltaY = touch.clientY - startY.value

  offsetX.value = lastOffsetX.value + deltaX
  offsetY.value = lastOffsetY.value + deltaY

  // 边界检测
  if (mapContainer.value) {
    const maxX = mapContainer.value.clientWidth - window.innerWidth
    const maxY = mapContainer.value.clientHeight - window.innerHeight

    offsetX.value = Math.min(0, Math.max(-maxX, offsetX.value))
    offsetY.value = Math.min(0, Math.max(-maxY, offsetY.value))
  }
}
const handleTouchEnd = () => {
  isDragging.value = false
}

//基础事件
function loginSuccessHandler() {
  init()
  startTimer()
}
function refreshHandler(e) {
  init()
}
function closeLinkHandler() {
  const music = parseInt(localStorage.getItem('music')) || 0
  if (music) {
    audioStore.playMusic()
  }
  showLinkSuccess.value = false
}
function switchShowMenuHandler() {
  showMenu.value = !showMenu.value
}
function switchMsgHandler() {
  isAllMsg.value = !isAllMsg.value
}
function switchAllNoticeHandler() {
  isAllNotice.value = !isAllNotice.value
}
function switchAllRuleHandler() {
  isAllRule.value = !isAllRule.value
}
function closeLoginHandler() {
  showPopLogin.value = false
}
function switchUserCenterHandler(e) {
  showPopUserInfo.value = !showPopUserInfo.value
  if (e && e.action == 'exchange') {
    showPopExchange.value = true
  }
}
function switchRankHandler() {
  showPopRank.value = !showPopRank.value
}
function switchRank2Handler() {
  showPopRank2.value = !showPopRank2.value
}
function switchNoticeHandler() {
  showPopNotice.value = !showPopNotice.value
}
function switchUserLandHandler() {
  showPopLand.value = !showPopLand.value
}
function switchSelectLandHandler() {
  showPopLandSelect.value = !showPopLandSelect.value
}
function switchSelectGoodsHandler() {
  showPopGoodsSelect.value = !showPopGoodsSelect.value
}
function switchRaiseLandHandler() {
  showPopRaiseLand.value = !showPopRaiseLand.value
}
function switchUserGranaryHandler() {
  showPopGranary.value = !showPopGranary.value
}
function switchUserBlindHandler() {
  showPopBlind.value = !showPopBlind.value
}
function switchUserMarketHandler() {
  showPopMarket.value = !showPopMarket.value
}
function switchUserExchangeHandler() {
  showPopExchange.value = !showPopExchange.value
}
function switchUserSeedHandler() {
  showPopSeed.value = !showPopSeed.value
}
function switchUserStoreHandler() {
  showPopStore.value = !showPopStore.value
}
function switchUserAuctionHandler() {
  showPopAuction.value = !showPopAuction.value
}
function switchUserPledgeHandler() {
  showPopPledge.value = !showPopPledge.value
}
function submitMsgHandler() {
  submitMessage()
}
function toUrlHandler() {
  window.location.href = "http://www.nanaplay.net/";
}
function toUrl2Handler() {
  window.location.href = "https://onramper.com/try";
}
function landActionHandler(params) {
  console.log(params)
  locationNum = params.locationNum
  actionLandId = params.landId
  actionLandUseId = params.landUseId
  actionMenu = params.action

  const temp = landList.value[locationNum - 1]
  const land = {
    health: temp.health,
    id: temp.landId,
    level: temp.landLevel,
    outRate: 4,
    perHealth: temp.perHealth,
    status: temp.landStatus,
    one: '1',
    two: '1',
    three: '1',
  }
  currLand.value = land

  parseLandAction(params.action, params)
}
function selectLandHandler(params) {
  if (actionMenu == 'warehouse') {
    selectLand(params.landId)
  } else if (actionMenu == 'change_land') {
    replaceLand(params.landId)
  }
  showPopLandSelect.value = false
  console.log(params)
}
function selectGoodsHandler(params) {
  console.log(params)
  if (actionMenu == 'plant') {
    plantSeed(actionLandId, params.id, params.num)
  } else if (actionMenu == 'fertilizer') {
    growPlant(actionLandUseId, params.id)
  } else if (actionMenu == 'use_pesticide') {
    usePesticide(actionLandUseId, params.id)
  } else if (actionMenu == 'use_water') {
    useWater(actionLandUseId, params.id)
  } else if (actionMenu == 'use_shovel') {
    useShovel(actionLandUseId, params.id)
  } else if (actionMenu == 'use_glove') {

  }
  showPopGoodsSelect.value = false

}
function raiseLandHandler(params) {
  showPopRaiseLand.value = false
  console.log(params)
}

function parseLandAction(action, params) {
  if (action == 'warehouse') {
    showPopLandSelect.value = true
  } else if (action == 'market') {
    showPopMarket.value = true
  } else if (action == 'plant') {
    goodsSelectType.value = { status: 1, num: '' }
    showPopGoodsSelect.value = true
  } else if (action == 'cultivate_land') {
    showPopRaiseLand.value = true
  } else if (action == 'change_land') {
    showPopLandSelect.value = true
  } else if (action == 'revoke_land') {
    removeLand(actionLandId)
  } else if (action == 'end_lease') {
    receiveLand(actionLandId)
  } else if (action == 'fertilizer') {
    goodsSelectType.value = { status: 2, num: '11' }
    showPopGoodsSelect.value = true
  } else if (action == 'use_pesticide') {
    goodsSelectType.value = { status: 2, num: '14' }
    showPopGoodsSelect.value = true
  } else if (action == 'use_water') {
    goodsSelectType.value = { status: 2, num: '12' }
    showPopGoodsSelect.value = true
  } else if (action == 'use_shovel') {
    goodsSelectType.value = { status: 2, num: '15' }
    showPopGoodsSelect.value = true
  } else if (action == 'use_glove') {

  } else if (action == 'receive') {
    getPlantReward(params.landUseId)
  } else if (action == 'refresh') {
    init()
  }
}
function getPlotStyle(index) {
  const plot = plots[index]
  return {
    left: `${pxToVw(plot.x)}`,
    top: `${pxToVw(plot.y)}`,
    width: pxToVw(162),   // 土地块尺寸
    height: pxToVw(78)
  };
}
function playGitAni() {
  showShakeGit.value = true
  setTimeout(() => {
    showShakeGit.value = false
  }, 4000);
}
async function checkLogin() {
  await checkAccount()
  if (getToken()) {
    init()
    startTimer()
    address.value = getAddr()
    showLinkSuccess.value = true
  } else {
    showPopLogin.value = true
  }
}
function startTimer() {
  if (timer) {
    clearInterval(timer)
    timer = ''
  }
  timer = setInterval(() => {
    init()
  }, 30 * 1000)
}
function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = ''
  }
}
function init() {
  getUserInfo()
  getLandList()
  // setTimeout(() => {
    
  // }, 2500);
}

async function getUserInfo() {
  const res = await userModel.userInfo()
  if (res.ok) {
    userInfo.value = res.data
    setCanLand(res.data.canLand)
    setCanPlayAdd(res.data.canPlayAdd)
    msgList.value = res.data.listM.reverse()
  }
}
async function getLandList() {
  const res = await gameModel.userIndexList('')
  if (res.ok) {
    landList.value = res.data.list
  }
}
async function selectLand(landId) {
  const res = await gameModel.landPlay(3, locationNum, landId, '', '')
  if (res.ok) {
    init()
  }
}
async function removeLand(landId) {
  const res = await gameModel.landPlay(1, locationNum, landId, '', '')
  if (res.ok) {
    init()
  }
}
async function receiveLand(landId) {
  const rate = 1
  const res = await gameModel.rentLand(2, landId, '', rate)
  if (res.ok) {
    init()
  }
}
async function replaceLand(landTwoId) {
  const res = await gameModel.landPlay(2, locationNum, actionLandId, landTwoId, '')
  if (res.ok) {
    init()
  }
}
async function plantSeed(landId, seedId, num) {
  const res = await gameModel.landPlayOne(landId, seedId)
  if (res.ok) {
    //播放种子动画
    landAction.value = { action: 'seed', locationNum, num, time: new Date() }
    init()
  }
}
async function getPlantReward(landUseId) {
  const res = await gameModel.landPlayTwo(landUseId)
  if (res.ok) {
    //播放收获动画
    landAction.value = { action: 'receive_git', locationNum, time: new Date() }
    playGitAni()
    init()
  }
}
async function growPlant(landUseId, goodsId) {
  const res = await gameModel.landPlayThree(landUseId, goodsId)
  if (res.ok) {
    //播放施肥动画
    landAction.value = { action: 'grow_plant', locationNum, time: new Date() }
    init()
  }
}
async function usePesticide(landUseId, goodsId) {
  const res = await gameModel.landPlayFour(landUseId, goodsId)
  if (res.ok) {
    //播放杀虫剂动画
    landAction.value = { action: 'use_pesticide', locationNum, time: new Date() }
    init()
  }
}
async function useWater(landUseId, goodsId) {
  const res = await gameModel.landPlayFive(landUseId, goodsId)
  if (res.ok) {
    //播放浇水动画
    landAction.value = { action: 'use_water', locationNum, time: new Date() }
    init()
  }
}
async function useShovel(landUseId, goodsId) {
  const res = await gameModel.landPlaySix(landUseId, goodsId)
  if (res.ok) {
    //播放铲子动画
    landAction.value = { action: 'use_shovel', locationNum, time: new Date() }
    init()
  }
}
async function useGlove(landUseId, goodsId) {
  const res = await gameModel.landPlaySeven(landUseId, goodsId)
  if (res.ok) {
    //播放手套动画
    landAction.value = { action: 'use_glove', locationNum, time: new Date() }
    init()
  }
}
async function submitMessage() {
  const content = msg.value
  if (content) {
    const res = await gameModel.addMessage(content)
    if (res.ok) {
      msg.value = ''
      init()
    }
  }
}




</script>

<style lang="scss" scoped>
.cont-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  background-image: url('@/assets/images/game/bg_splash.jpg');
  background-size: 100% 100%;

  .progress-bar {
    position: absolute;
    left: 70px;
    right: 70px;
    bottom: 160px;
    height: 10px;
    background-color: #eee;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);

    .progress-fill {
      height: 100%;
      border-radius: 8px;
      transition: width 0.3s ease;
      background-color: #a5cb48;
    }
  }


}

.game-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  touch-action: none;
  position: relative;

  /* 禁用默认触摸行为 */
  .map-container {
    position: relative;
    transition: transform 0.1s;
    /* 拖拽时的平滑效果 */

    .map-bg {
      display: flex;
      flex-direction: column;

      .h-bg {
        display: flex;
        flex-direction: row;
        margin-bottom: -0.5px;

        .bg {
          width: auto;
          height: 570px;
          object-fit: contain;
          margin-right: -0.5px;
        }
      }
    }
  }

  // .cont-menu {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: 50;

  .cont-arrow {
    position: absolute;
    top: 80px;
    right: 25px;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    width: 45px;
    height: 18px;
    text-align: center;
    padding: 5px;
    color: #fff;
    font-size: 14px;

  }

  .cont-top {
    display: flex;
    align-items: center;
    position: absolute;
    top: 24px;
    left: 15px;
    right: 15px;

    .cont-avatar {
      width: 50px;
      height: 50px;
      position: relative;

      .icon-avatar {
        width: 50px;
        height: 50px;
      }

      .icon-level {
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .level {
        width: 20px;
        text-align: center;
        font-size: 12px;
        color: #9f7220;
        font-weight: bold;
        position: absolute;
        line-height: 20px;
        bottom: 0;
        right: 0;
      }

      .recharge {
        font-size: 12px;
        position: absolute;
        color: #9f7220;
        font-weight: bold;
        bottom: -10px;
        left: 0;
        right: 0;
        text-align: center;
      }
    }

    .cont-git {
      height: 32px;
      position: relative;
      margin-left: 20px;
      animation-iteration-count: 2;

      .bg-git {
        height: 32px;
      }

      .num {
        font-size: 12px;
        color: #fff;
        position: absolute;
        left: 70px;
        top: 5px;
      }

      .point {
        position: absolute;
        left: 22px;
        top: 22px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: red;
      }

      .tip {
        font-size: 10px;
        color: #f0af36;
        position: absolute;
        left: 35px;
        bottom: 2px;
      }
      .tip2 {
        font-size: 10px;
        color: #fff;
        position: absolute;
        left: 35px;
        top: 6px;
      }
    }

    .cont-bsc {
      height: 32px;
      position: relative;
      margin-left: auto;

      .bg-bsc {
        height: 32px;
        width: 130px;
      }

      .num {
        font-size: 10px;
        color: #000;
        position: absolute;
        left: 45px;
        top: 10px;
        width: 70px;
      }
    }
  }

  .cont-top2 {
    display: flex;
    position: absolute;
    top: 5px;
    left: 15px;
    right: 15px;
    height: 20px;

    .cont-num {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .num {
        font-size: 10px;
        color: #fff;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        line-height: 20px;
        padding: 0 10px;
      }
    }
  }
  .cont-top3 {
    display: flex;
    position: absolute;
    top: 90px;
    left: 15px;
    width: 200px;

    .cont-notice {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      color: #fff;
      width: 50px;
      
      .icon-notice {
        width: 25px;
        height: 25px;
      }
      .tip {
        font-size: 12px;
        color: #9f7220;
        font-weight: bold;
        text-align: center;        
      }
    }
    .cont-marquee {
      width: 150px;
      height: 20px;
      overflow: hidden;            /* 超出部分隐藏 */
      white-space: nowrap;         /* 不换行 */
      box-sizing: border-box;  
      border-radius: 10px;  
      background-color: rgba(0, 0, 0, 0.5);  
      .notice {
        font-size: 10px;
        color: #fff;
        align-self: flex-end;
        line-height: 20px;
        display: inline-block;
        padding-left: 80%;          /* 初始位置从右边外面开始 */
        animation: marquee 80s linear infinite; /* 动画 */        
      }   
    }
 
    /* 定义滚动动画 */
    @keyframes marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-100%);
      }
    }
  }
  .cont-top4 {
    display: flex;
    position: absolute;
    top: 140px;
    left: 15px;
    width: 100px;

    .cont-notice {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      color: #fff;
      width: 50px;
      
      .icon-notice {
        width: 25px;
        height: 25px;
      }
      .tip {
        font-size: 12px;
        color: #9f7220;
        font-weight: bold;
        text-align: center;        
      }
    }
  }
  .cont-top5 {
    display: flex;
    position: absolute;
    top: 185px;
    left: 15px;
    width: 100px;

    .cont-notice {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      color: #fff;
      width: 50px;
      
      .icon-notice {
        width: 25px;
        height: 25px;
      }
      .tip {
        font-size: 12px;
        color: #9f7220;
        font-weight: bold;
        text-align: center;        
      }
    }
  }
  .cont-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 120px;

    .icon {
      height: 52px;
      width: auto;
      margin-bottom: 10px;
    }

    .icon-c {
      height: 52px;
      width: auto;
      padding-left: 10px;
      margin-bottom: 10px;
    }

    .icon-r {
      height: 52px;
      width: auto;
      margin-bottom: 10px;
      border-radius: 50%;
    }
  }

  .cont-bottom {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 20px;
    left: 10px;
    right: 80px;

    .icon {
      height: 55px;
      margin-left: 15px;
    }

    .icon-r {
      height: 55px;
      width: auto;
      margin-left: 15px;
      border-radius: 50%;
    }

    .cont-chat {
      display: flex;
      flex-direction: column;
      width: 100%;

      .list-msg {
        display: flex;
        flex-direction: column;
        height: 64px;
        overflow-y: auto;
        margin-bottom: 10px;

        // mask-image: linear-gradient(to top, white 60%, transparent);
        .item-msg {
          font-size: 14px;
        }
      }

      .list-msg-h {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        // mask-image: linear-gradient(to top, white 60%, transparent);
        .item-msg {
          font-size: 14px;
        }
      }
    }

    .cont-input {
      display: flex;
      align-items: center;
      width: 100%;

      .input-msg {
        flex: 1;
        background-color: transparent;
        border: 1px solid #eef350;
        border-radius: 5px;
        outline: none;
        color: inherit;
        height: 32px;
        font-size: 16px;
      }

      .send {
        width: 56px;
        height: 32px;
        background-color: #eef350;
        border-radius: 10px;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        font-weight: bold;
        margin-left: 4px;
      }
    }
  }

  .cont-success {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);

    .bg {
      width: 320px;
      position: absolute;
      top: 30%;
      left: 30px;
    }


    .cont-info {
      position: absolute;
      top: 30%;
      left: 30px;
      width: 320px;
      display: flex;
      flex-direction: column;

      .addr {
        width: 250px;
        font-weight: bold;
        align-self: center;
        text-align: center;
        word-wrap: break-word;
        margin-top: 80px;
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

  .land-position {
    position: absolute;
    left: 0;
    top: 0;
    // background-color: aqua;
    // width: 10px;
    // height: 10px;
    // left: 450px;
    // top: 550px;
  }

  .land-plot {
    position: absolute;
    // background: rgba(29, 0, 252, 0.3);
    box-sizing: border-box;
    transition: all 0.2s;
  }

  /* 点击反馈效果 */
  .land-plot:active {
    transform: scale(0.95);
  }

  .color-main {
    color: #6633FF !important;
  }

  .font-white {
    color: #FFFFFF !important;
  }

  .font-gray1 {
    color: rgba(255, 255, 255, 0.6) !important;
  }

}
</style>