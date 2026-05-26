<template>
  <div class="cont-land" @click="clickHandler()">

    <img class="img-land" :src="getLandImage(myLandInfo.landLevel)" alt="">

    <div class="rent-status" v-if="myLandInfo.myLandStatus == 3">
      <img class="rent" src="@/assets/images/game/icon_land_rent.png" alt="">
    </div>

    <img class="plant" v-if="myLandInfo.hasPlant && !showSeed"
      :src="getPlantImage(myLandInfo.seedType, myLandInfo.seedLevel)" alt="">

    <span class="timer" v-if="(myLandInfo.myGrowStatus == 1) && myLandInfo.countdown">{{ myLandInfo.countdown }}</span>

    <div class="plant-status" v-if="myLandInfo.hasPlant">
      <div class="my-status" v-if="myLandInfo.isPlantOwner">
        <div class="plant-receive" v-if="myLandInfo.myGrowStatus == 2">
          <img class="icon-get" src="@/assets/images/game/icon_plant_get.png" alt="">
          <span class="num">{{ toFixed2(myLandInfo.reward) || 0 }}</span>
        </div>
        <div class="plant-water" v-if="myLandInfo.myPlantStatus == 3">
          <img class="icon-water" src="@/assets/images/game/icon_shui_left.png" alt="">
        </div>
        <div class="plant-chong" v-if="myLandInfo.myPlantStatus == 2">
          <img class="icon-chong" src="@/assets/images/game/icon_chongzi.png" alt="">
        </div>
      </div>
      <div class="other-status" v-else>
        <!-- <div class="plant-tou" v-if="myLandInfo.myGrowStatus == 2">
          <img class="icon-shou" src="@/assets/images/game/goods_13.png" alt="">
        </div> -->
        <div class="plant-chan" v-if="myLandInfo.myGrowStatus == 2 || myLandInfo.myGrowStatus == 3">
          <img class="icon-chanzi" src="@/assets/images/game/goods_15.png" alt="">
        </div>
      </div>
    </div>
    <div class="cont-ani">
      <img class="seed animated bounce" ref="seed" v-show="showSeed && action.num" :src="getGoodsImage(action.num)">
      <div class="cont-git" ref="gitbox" v-show="showGitBox">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
        <img class="icon-git" src="@/assets/images/game/icon_git_big.png" alt="">
      </div>
      <div class="cont-grow" ref="growplant" v-show="showGrowplant">
        <img class="grow_plant" src="@/assets/images/game/goods_11.png" alt="">
      </div>
      <div class="cont-pesticide" ref="pesticide" v-show="showPesticide">
        <img class="pesticide" src="@/assets/images/game/goods_14.png" alt="">
      </div>
      <div class="cont-water" ref="watercup" v-show="showWatercup">
        <img class="water-cup" src="@/assets/images/game/goods_12.png" alt="">
      </div>
      <div class="cont-shovel" ref="shovel" v-show="showShovel">
        <img class="shovel" src="@/assets/images/game/goods_15.png" alt="">
      </div>
      <div class="cont-glove" ref="glove" v-show="showGlove">
        <img class="glove" src="@/assets/images/game/goods_13.png" alt="">
        <span class="tip"></span>
      </div>
      <div class="cont-option" v-if="showOption">
        <!-- <div class="bg" @click="closeOptionHandler()"></div> -->
        <div class="option-list1" v-if="optionType == 1">
          <span class="menu" @click="clickMenuHandler('fertilizer')">{{ $t('fertilizer2') }}</span>
        </div>
        <div class="option-list2" v-if="optionType == 2">
          <span class="menu" @click="clickMenuHandler('warehouse')">{{ $t('warehouse') }}</span>
          <span class="menu" @click="clickMenuHandler('market')">{{ $t('market') }}</span>
        </div>
        <div class="option-list4" v-if="optionType == 4">
          <span class="menu" @click="clickMenuHandler('plant')">{{ $t('plant') }}</span>
          <span class="menu" @click="clickMenuHandler('cultivate_land')">{{ $t('cultivate_land') }}</span>
          <span class="menu" @click="clickMenuHandler('change_land')">{{ $t('change_land') }}</span>
          <span class="menu" @click="clickMenuHandler('revoke_land')">{{ $t('revoke_land') }}</span>
        </div>
        <div class="option-list1" v-if="optionType == 5">
          <span class="menu" @click="clickMenuHandler('end_lease')">{{ $t('end_of_lease') }}</span>
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue';
import { getLandImage, getGoodsImage, getPlantImage } from '@/utils/loadImages';
import { formatTime, formatTime3, toFixed2 } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { getAddr, getCanLand, getCanPlayAdd } from '@/utils/auth';

const props = defineProps({
  landInfo: {
    type: Object,
    required: true
  },
  location: {
    type: Number,
    required: true
  },
  closeOption: {
    type: Object,
    required: true
  },
  action: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const gitbox = ref(null)
const seed = ref(null)
const growplant = ref(null)
const pesticide = ref(null)
const watercup = ref(null)
const shovel = ref(null)
const glove = ref(null)

const myLandInfo = ref({})
const showOption = ref(false)
const showGitBox = ref(false)
const showSeed = ref(false)
const showWatercup = ref(false)
const showGrowplant = ref(false)
const showPesticide = ref(false)
const showShovel = ref(false)
const showGlove = ref(false)

const myAddress = ref('')
const optionType = ref(0)

let timer = null

watch(() => props.landInfo, (newVal) => {
  myLandInfo.value = calcMyInfo(newVal);
  checkTimer()
}, { immediate: true });
watch(() => props.closeOption, (newVal) => {
  closeOptionHandler(newVal)
}, { immediate: false });
watch(() => props.action, (newVal) => {
  parseAction(newVal)
}, { immediate: false });

onMounted(() => {
  initListener()
  myAddress.value = getAddr()
});

onUnmounted(() => {
  stopTimer();
});

function initListener() {
  gitbox.value.addEventListener('animationend', () => {
    showGitBox.value = false;
  });
  seed.value.addEventListener('animationend', () => {
    showSeed.value = false;
  });
  watercup.value.addEventListener('animationend', () => {
    showWatercup.value = false;
  });
  growplant.value.addEventListener('animationend', () => {
    showGrowplant.value = false;
  });
  pesticide.value.addEventListener('animationend', () => {
    showPesticide.value = false;
  });
  shovel.value.addEventListener('animationend', () => {
    showShovel.value = false;
  });
  glove.value.addEventListener('animationend', () => {
    showGlove.value = false;
  });
}
function clickHandler() {
  const info = myLandInfo.value
  // console.log(info)
  if ((!info.hasPlant) && (info.myLandStatus == 1)) {
    showOptionAction(2)
  } else if ((!info.hasPlant) && (info.myLandStatus == 2)) {
    showOptionAction(4)
  } else if ((!info.hasPlant) && (info.myLandStatus == 3) && (info.isLandOwner) && info.myPlantStatus == 1) {
    showOptionAction(5)
  } else if (info.isPlantOwner && info.myPlantStatus == 2) {
    sendUsePesticideAction()
  } else if (info.isPlantOwner && info.myPlantStatus == 3) {
    sendUseWaterAction()
  } else if (info.isPlantOwner && info.myGrowStatus == 2) {
    sendReceiveAction()
  } else if ((!info.isPlantOwner) && (info.myGrowStatus == 2 || info.myGrowStatus == 3)) {
    sendUseShovelAction()
  } else if (info.isPlantOwner && info.hasPlant && info.myGrowStatus == 1) {
    showOptionAction(1)
  } else if (getCanPlayAdd() && info.hasPlant && info.myGrowStatus == 1) {
    showOptionAction(1)
  }
}
function closeOptionHandler() {
  const num = props.closeOption.locationNum || 0
  if (num != props.location) {
    setTimeout(() => {
      showOption.value = false
    }, 10);
  }
}
function clickMenuHandler(action) {
  sendMenuAction(action)
}
function closeHandler() {
  // console.log('close')
}
function notDo() { }
function checkTimer() {
  if (myLandInfo.value.myGrowStatus == 1) {
    parseDate()
    startTimer()
  }
}
function startTimer() {
  // console.log('start', props.location)
  if (timer) {
    clearInterval(timer)
    timer = ''
  }
  timer = setInterval(() => {
    parseDate()
  }, 1000)
}
function stopTimer() {
  // console.log('stop', props.location)
  if (timer) {
    clearInterval(timer)
    timer = ''
  }
}
function calcMyInfo(lastInfo) {
  const info = { ...lastInfo }
  info['start'] = parseInt(info.start)
  info['end'] = parseInt(info.end)
  info['currentTime'] = parseInt(info.currentTime)


  info['seedType'] = parseInt(info.seedId)
  info['seedLevel'] = getPlantLevel(info)

  info['isPlantOwner'] = info.plantUserAddress == getAddr()
  info['isLandOwner'] = info.landUserAddress == getAddr()
  info['hasPlant'] = info.landUseId != '0'
  info['myLandStatus'] = getMyLandStatus(info)
  info['myGrowStatus'] = getMyGrowStatus(info)
  info['myPlantStatus'] = getMyPlantStatus(info)
  info['countdown'] = getCountdownStr(info)

  return info
}

function getMyLandStatus(info) {//1闲置 2放置 3出租
  let status = 1
  if (info.landStatus == '1') {
    status = 2
  }
  if (info.landStatus == '3' || info.landStatus == '8') {
    status = 3
  }
  return status
}

function getMyGrowStatus(info) {//1成长中 2成熟 3过期
  const start = parseInt(info.start)
  const end = parseInt(info.end)
  const curr = parseInt(info.currentTime)
  let status = 0
  if (info.landUseId != '0') {
    if (info.rewardStatus == '2') {
      if (curr > end) {
        status = 3
      } else {
        status = 1
      }
    } else if (info.rewardStatus == '1') {
      status = 2
    }
  }
  return status
}
function getMyPlantStatus(info) {//1正常 2虫子 3缺水
  let status = 1
  if (info.status == '2') {
    status = 2
  }
  if (info.status == '3') {
    status = 3
  }
  return status
}


function parseAction(actions) {

  if (actions.locationNum == props.location) {
    // console.log(actions.action)
    if (actions.action == 'receive_git') {
      showGitBox.value = true
    }
    if (actions.action == 'seed') {
      showSeed.value = true
    }
    if (actions.action == 'grow_plant') {
      showGrowplant.value = true
    }
    if (actions.action == 'use_water') {
      showWatercup.value = true
    }
    if (actions.action == 'use_pesticide') {
      showPesticide.value = true
    }
    if (actions.action == 'use_shovel') {
      showShovel.value = true
    }
    if (actions.action == 'use_glove') {
      showGlove.value = true
    }

  }

}
function parseDate() {
  const end = parseInt(myLandInfo.value.end)
  const now = (new Date().getTime()) / 1000;
  if (now >= end) {
    stopTimer()
    sendRefreshAction()
  }
  myLandInfo.value.countdown = getCountdownStr(myLandInfo.value)
}
function getCountdownStr(info) {
  const end = info.end || 0
  const curr = info.currentTime || 0
  if (end <= 0 || curr <= 0) {
    return ''
  }
  if (end > curr) {
    return formatTime3(end)
  } else {
    return ''
  }
}
function isShowMenu(info) {
  return info.landUseId == '0'
}
function getPlantLevel(info) {
  if (info.rewardStatus == '1') {
    return 3
  }
  let level = 1
  const start = parseInt(info.start)
  const end = parseInt(info.end)
  const curr = parseInt(info.currentTime)

  const tag = ((end - start) / 3) + start
  if (curr > tag) {
    level = 2
  }
  // return 1
  return level
}
function closeOtherMenuAction() {
  const locationNum = props.location
  emit('close', { locationNum, time: new Date() })
}

function showOptionAction(type) {//1,2,3,4
  showOption.value = true
  optionType.value = type
  closeOtherMenuAction()
}
function sendMenuAction(action) {
  const locationNum = props.location
  const landId = props.landInfo.landId
  const landUseId = props.landInfo.landUseId
  emit('success', { action, landUseId, locationNum, landId })
  emit('close', { locationNum: -1, time: new Date() })
}
function sendReceiveAction() {
  const locationNum = props.location
  const landId = props.landInfo.landId
  const landUseId = props.landInfo.landUseId
  emit('success', { action: 'receive', landUseId, locationNum, landId })
}
function sendUsePesticideAction() {
  const locationNum = props.location
  const landId = props.landInfo.landId
  const landUseId = props.landInfo.landUseId
  emit('success', { action: 'use_pesticide', landUseId, locationNum, landId })
}
function sendUseWaterAction() {
  const locationNum = props.location
  const landId = props.landInfo.landId
  const landUseId = props.landInfo.landUseId
  emit('success', { action: 'use_water', landUseId, locationNum, landId })
}
function sendUseShovelAction() {
  const locationNum = props.location
  const landId = props.landInfo.landId
  const landUseId = props.landInfo.landUseId
  emit('success', { action: 'use_shovel', landUseId, locationNum, landId })
}
function sendUseGloveAction() {
  const locationNum = props.location
  const landId = props.landInfo.landId
  const landUseId = props.landInfo.landUseId
  emit('success', { action: 'use_glove', landUseId, locationNum, landId })
}
function sendRefreshAction() {
  //刷新action
  const locationNum = props.location
  const landId = props.landInfo.landId
  emit('success', { action: 'refresh', locationNum, landId })
}
</script>

<style lang="scss" scoped>
.cont-land {
  width: 100%;
  height: 100%;
  position: absolute;

  .img-land {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .plant {
    height: 100px;
    position: absolute;
    bottom: 30px;
    left: 28px;
  }

  .timer {
    bottom: 20px;
    left: 40px;
    font-size: 12px;
    color: #fff;
    min-width: 70px;
    height: 18px;
    border-radius: 10px;
    line-height: 18px;
    background-color: rgba($color: #000000, $alpha: 0.3);
    position: absolute;
    text-align: center;
  }

  .rent-status {
    position: absolute;
    top: 25px;
    left: 45px;

    .rent {
      width: 60px;
    }
  }

  .plant-status {
    position: absolute;
    top: 0;
    left: 0;

    .my-status {
      position: absolute;
      top: 0;
      left: 0;
    }

    .other-status {
      position: absolute;
      top: 0;
      left: 0;
    }

    .plant-receive {
      font-size: 12px;
      color: #fff;
      min-width: 70px;
      padding: 0 8px;
      box-sizing: border-box;
      height: 20px;
      border-radius: 10px;
      line-height: 20px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      left: 44px;
      top: -40px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-get {
        width: 12px;
      }

      .num {
        margin-left: 4px;
      }
    }

    .plant-water {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      left: 55px;
      top: -30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-water {
        width: 15px;
      }
    }

    .plant-chan {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      left: 55px;
      top: -30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-chanzi {
        width: 30px;
      }
    }

    .plant-chong {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      left: 55px;
      top: -30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-chong {
        width: 30px;
      }
    }

    .plant-tou {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      left: 55px;
      top: -30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-shou {
        width: 30px;
      }
    }
  }

  .cont-ani {
    position: absolute;
    left: 0;
    top: 0;
  }

  .seed {
    height: 45px;
    position: absolute;
    bottom: -40px;
    left: 55px;
  }

  .cont-git {
    position: absolute;
    left: 55px;
    top: 10px;

    .icon-git {
      position: absolute;
      width: 50px;
      left: 0;
      top: 0;
      animation: popUp 1.5s cubic-bezier(0.4, 0, 0.2, 1) 1;
    }

    /* 残影元素 */
    .icon-git:nth-child(2) {
      animation-delay: 0.1s;
      // animation-delay: 0.2s;
      // opacity: 0.8;
      // transform: scale(0.9);
    }

    .icon-git:nth-child(3) {
      animation-delay: 0.2s;
    }

    .icon-git:nth-child(4) {
      animation-delay: 0.3s;
    }

    .icon-git:nth-child(5) {
      animation-delay: 0.4s;
    }

    .icon-git:nth-child(6) {
      animation-delay: 0.5s;
    }

    .icon-git:nth-child(7) {
      animation-delay: 0.6s;
    }

    .icon-git:nth-child(8) {
      animation-delay: 0.7s;
    }

    .icon-git:nth-child(9) {
      animation-delay: 0.8s;
    }
  }

  .cont-grow {
    position: absolute;
    left: 30px;
    top: -70px;

    .grow_plant {
      width: 100px;
      animation: fall 1s 3;
    }
  }

  .cont-pesticide {
    position: absolute;
    left: 50px;
    top: -70px;

    .pesticide {
      width: 60px;
      animation: ellipseMove 2s 1;
    }
  }

  .cont-water {
    position: absolute;
    left: 40px;
    top: -60px;

    .water-cup {
      width: 80px;
      animation: swing 2s 1;
    }
  }

  .cont-shovel {
    position: absolute;
    left: 65px;
    top: -60px;

    .shovel {
      width: 70px;
      animation: fall2 1s 2;
    }
  }

  .cont-glove {
    position: absolute;
    left: 50px;
    top: -60px;

    .glove {
      width: 60px;
      position: absolute;
      top: 0;
      animation: ellipseMove 1s 2;
    }

    .tip {
      width: 60px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      animation: up2 0.5s infinite;
      position: absolute;
      top: -15px;
    }
  }

  .cont-option {
    position: absolute;
    bottom: -40px;
    left: 20px;

    .bg {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 30;
    }

    .option-list1 {
      position: absolute;
      bottom: 20px;
      width: 125px;
      height: 55px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url('@/assets/images/game/bg_option.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      padding-top: 15px;
      z-index: 40;
    }

    .option-list2 {
      position: absolute;
      bottom: 0;
      width: 125px;
      height: 110px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url('@/assets/images/game/bg_option.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      padding-top: 20px;
      z-index: 40;
    }

    .option-list3 {
      width: 125px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url('@/assets/images/game/bg_option.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      padding-top: 15px;
      z-index: 40;
    }

    .option-list4 {
      width: 125px;
      height: 190px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url('@/assets/images/game/bg_option.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      padding-top: 15px;
      z-index: 40;
    }

    .menu {
      width: 100px;
      height: 36px;
      background-color: #f8da61;
      border: 1px solid #000;
      box-sizing: border-box;
      margin-bottom: 5px;
      border-radius: 8px;
      line-height: 36px;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
    }
  }


}

@keyframes popUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }

  80% {
    opacity: 0.7;
    filter: blur(2px);
  }

  100% {
    transform: translateY(-100vh) scale(0.9);
    opacity: 0;
    filter: blur(5px);
  }
}

@keyframes swing {

  0%,
  100% {
    transform: translateX(0) rotate(-30deg);
  }

  50% {
    transform: translateX(0) rotate(30deg);
  }
}

@keyframes fall {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(0, 50px) scale(0.5);
    opacity: 0;
  }
}

@keyframes fall2 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(-50px, 50px) scale(0.8);
    opacity: 0.5;
  }
}

@keyframes up2 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(0, -10px) scale(1);
    opacity: 0.5;
  }
}

@keyframes ellipseMove {

  0%,
  100% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-30%, 20px);
  }

  50% {
    transform: translate(0, 40px);
  }

  75% {
    transform: translate(30%, 20px);
  }
}
</style>