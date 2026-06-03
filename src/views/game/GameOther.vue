<template>
  <div class="game-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
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
          <Land :closeOption="closeMenuAction" :action="landAction" :land-info="land" :curr-addr="currAddr" :location="index + 1"
            @success="landActionHandler" @close="closeOtherMenuHandler" />
        </div>
      </div>
    </div>
    <div class="cont-back">
      <img class="icon-back" @click="backHandler()" src="@/assets/images/game/icon_back.png" alt="">
    </div>
    <PopLogin v-if="showPopLogin" @success="loginSuccessHandler" @close="closeLoginHandler" />
    <PopRank v-if="showPopRank" :info="userInfo" @close="switchrRankHandler" />
    <PopUserInfo v-if="showPopUserInfo" :info="userInfo" @success="refreshHandler" @close="switchUserCenterHandler" />
    <PopNotice v-if="showPopNotice" @close="switchNoticeHandler" />
    <PopLand v-if="showPopLand" :info="userInfo" @close="switchUserLandHandler" />
    <PopGranary v-if="showPopGranary" :info="userInfo" @close="switchUserGranaryHandler" />
    <PopBlind v-if="showPopBlind" :info="userInfo" @success="refreshHandler" @close="switchUserBlindHandler" />
    <PopMarket v-if="showPopMarket" @close="switchUserMarketHandler" />
    <PopExchange v-if="showPopExchange" :info="userInfo" @close="switchUserExchangeHandler" />
    <PopRentSetting v-if="showPopRent" :id="currLand.id" :ratio-list="ratioList" @success="receiveRentHandler"
      @close="switchRentHandler" />    
    <PopSeed v-if="showPopSeed" :info="userInfo" @close="switchUserSeedHandler" />
    <PopStore v-if="showPopStore" :info="userInfo" @close="switchUserStoreHandler" />

    <PopLandSelect v-if="showPopLandSelect" :mode="1" @success="selectLandHandler" @close="switchSelectLandHandler" />
    <PopGoodsSelect v-if="showPopGoodsSelect" :type="goodsSelectType" @success="selectGoodsHandler"
      @close="switchSelectGoodsHandler" />
    <PopLandCutivated v-if="showPopRaiseLand" :land-info="currLand" @success="raiseLandHandler"
      @close="switchRaiseLandHandler" />



  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';  // 引入 useRouter
import { ref, reactive, computed, useTemplateRef, onMounted, onUnmounted, onDeactivated, onActivated } from 'vue';
import { calculateFileSHA1, formatTime, formatBytes } from '@/utils/util';
import { fetchSign, checkAccount } from '@/tools/fetchSign';
import { getToken, getAddr, getSign } from '@/utils/auth';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { showToast } from 'vant';

import PopNotice from '@/views/game/pop/PopNotice.vue';
import PopLand from '@/views/game/pop/PopLand.vue';
import PopGranary from '@/views/game/pop/PopGranary.vue';
import PopBlind from '@/views/game/pop/PopBlind.vue';
import PopMarket from '@/views/game/pop/PopMarket.vue';
import PopExchange from '@/views/game/pop/PopExchange.vue';
import PopRentSetting from '@/views/game/pop/PopRentSetting.vue';
import PopSeed from '@/views/game/pop/PopSeed.vue';
import PopStore from '@/views/game/pop/PopStore.vue';
import PopRank from '@/views/game/pop/PopRank.vue';
import PopUserInfo from '@/views/game/pop/PopUserInfo.vue';
import PopLogin from '@/views/game/pop/PopLogin.vue';
import Land from '@/views/game/LandOther.vue';
import PopLandSelect from '@/views/game/pop/PopLandSelect.vue';
import PopGoodsSelect from '@/views/game/pop/PopGoodsSelect.vue';
import PopLandCutivated from '@/views/game/pop/PopLandCutivated.vue';

import { getCurrentInstance } from 'vue';
defineOptions({
  name: 'Game2'
});
const { proxy } = getCurrentInstance();
const router = useRouter();
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

const showPopUserInfo = ref(false)
const showPopRank = ref(false)
const showPopNotice = ref(false)
const showPopLand = ref(false)
const showPopGranary = ref(false)
const showPopBlind = ref(false)
const showPopMarket = ref(false)
const showPopExchange = ref(false)
const showPopRent = ref(false)
const showPopSeed = ref(false)
const showPopStore = ref(false)
const showPopLogin = ref(false)

const showPopLandSelect = ref(false)
const showPopGoodsSelect = ref(false)
const showPopRaiseLand = ref(false)

const showPop = computed(() => {
  const flag = showPopUserInfo.value
    || showPopRank.value
    || showPopNotice.value
    || showPopLand.value
    || showPopGranary.value
    || showPopBlind.value
    || showPopMarket.value
    || showPopExchange.value
    || showPopRent.value
    || showPopSeed.value
    || showPopStore.value
    || showPopLogin.value
    || showPopLandSelect.value
    || showPopGoodsSelect.value
    || showPopRaiseLand.value

  return flag
})

const userInfo = ref({})
const landList = ref([])
const currLand = ref({})
const ratioList = ref([0])
let locationNum = 0
let actionLandId = 0
let actionLandUseId = 0
let actionMenu = ''

const closeMenuAction = ref({})
const goodsSelectType = ref({ status: 1 })
const landAction = ref({ action: 'seed' })
const showShakeGit = ref(false)
let timer = null

const currAddr = ref('')

onMounted(() => {
  // currAddr.value = route.query.address || ''
  // checkLogin()
});
onActivated(() => {
  currAddr.value = route.query.address || ''
  checkLogin()
})
onDeactivated(() => {
  console.log('closepage')
  stopTimer()  
  // 执行清理操作
})

onUnmounted(() => {

})
function backHandler() {
  router.go(-1)
}
//处理边界点击
function clickOther() {
  // landAction.value = { action: 'use_shovel', locationNum: 2, num: 1, time: new Date() }
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
    // 获取容器实际渲染尺寸
    const containerRect = mapContainer.value.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // 获取视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 计算最大允许偏移量（负数）
    const maxX = Math.max(containerWidth - viewportWidth, 0);
    const maxY = Math.max(containerHeight - viewportHeight, 0);

    // 限制X轴偏移范围（-maxX ≤ offsetX ≤ 0）
    offsetX.value = Math.min(0, Math.max(-maxX, offsetX.value));
    // 限制Y轴偏移范围（-maxY ≤ offsetY ≤ 0）
    offsetY.value = Math.min(0, Math.max(-maxY, offsetY.value));
    // console.log(offsetX.value, 'off-endX')
    // console.log(offsetY.value, 'off-endY')
  }
}
const handleTouchEnd = () => {
  isDragging.value = false
}

//基础事件
function loginSuccessHandler() {
  init()
}
function refreshHandler(e) {
  init()
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
function switchrRankHandler() {
  showPopRank.value = !showPopRank.value
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
function switchRentHandler() {
  showPopRent.value = !showPopRent.value
}
function switchUserSeedHandler() {
  showPopSeed.value = !showPopSeed.value
}
function switchUserStoreHandler() {
  showPopStore.value = !showPopStore.value
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
function receiveRentHandler(e) {
  showPopRent.value = false
  rentLand(e.rate)
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
    useGlove(actionLandUseId, params.id)
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
  } else if (action == 'rent') {
    showPopRent.value = true
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
    goodsSelectType.value = { status: 2, num: '13' }
    showPopGoodsSelect.value = true
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
}

async function getUserInfo() {
  const res = await userModel.userInfo()
  if (res.ok) {
    userInfo.value = res.data
    const ratio1 = (( parseFloat(res.data.rentOne) * 100) || 0).toFixed(1)
    const ratio2 = (( parseFloat(res.data.rentTwo) * 100) || 0).toFixed(1)
    const ratio3 = (( parseFloat(res.data.rentThree) * 100) || 0).toFixed(1)
    ratioList.value = [ratio1]    
  }
}
async function getLandList() {
  const addr = currAddr.value || ''
  const res = await gameModel.userIndexList(addr)
  if (res.ok) {
    landList.value = res.data.list
  }
}
async function selectLand(landId) {
  const res = await gameModel.landPlay(3, locationNum, landId, '', currAddr.value)
  if (res.ok) {
    init()
  }
}
async function removeLand(landId, locationNum) {
  const res = await gameModel.landPlay(1, locationNum, landId, '', currAddr.value)
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
  const res = await gameModel.landPlay(2, locationNum, actionLandId, landTwoId, currAddr.value)
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
    landAction.value = { action: 'use_glove', locationNum, amount: res.data.amount, time: new Date() }
    init()
  }
}
async function rentLand(rate) {
  const id = currLand.value.id
  const res = await gameModel.rentLand(1, id, '', rate)
  if (res.ok) {
    showToast(t('rent_success'))
    init()
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


  .cont-back {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 15px;
    right: 15px;

    .icon-back {
      width: 50px;
    }
  }

  // .cont-menu {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: 50;

  .cont-top {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
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
        font-size: 14px;
        color: #fff;
        position: absolute;
        left: 35px;
        top: 2px;
      }

      .tip {
        font-size: 10px;
        color: #f0af36;
        position: absolute;
        left: 35px;
        bottom: 2px;
      }
    }

    .cont-bsc {
      height: 32px;
      position: relative;
      margin-left: auto;

      .bg-bsc {
        height: 32px;
      }

      .num {
        font-size: 12px;
        color: #000;
        position: absolute;
        left: 43px;
        top: 8px;
        width: 70px;
      }
    }
  }

  .cont-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 140px;

    .icon {
      height: 55px;
      width: auto;
      margin-bottom: 25px;
    }
  }

  .cont-bottom {
    display: flex;
    align-items: center;
    position: absolute;
    right: 100px;
    bottom: 20px;

    .icon {
      height: 55px;
      margin-left: 25px;
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