<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_market')" alt="">
      <div class="cont-tab">
        <div class="line"></div>
        <div class="list-tab">
          <div class="item-tab" @click="switchTabHandler(1)">
            <img class="tab-bg" v-if="tabSelect == 1" src="@/assets/images/game/icon_tab_select.png" alt="">
            <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
            <span class="tab-name" :class="[tabSelect == 1 ? 'select' : '']">{{ $t('market') }}</span>
          </div>
          <div class="item-tab" @click="switchTabHandler(2)">
            <img class="tab-bg" v-if="tabSelect == 2" src="@/assets/images/game/icon_tab_select.png" alt="">
            <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
            <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">{{ $t('leasing') }}</span>
          </div>
          <div class="item-tab" @click="switchTabHandler(3)">
            <img class="tab-bg" v-if="tabSelect == 3" src="@/assets/images/game/icon_tab_select.png" alt="">
            <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
            <span class="tab-name" :class="[tabSelect == 3 ? 'select' : '']">{{ $t('mine') }}</span>
          </div>
        </div>
      </div>
      <div class="list-sub" v-if="tabSelect == 1 || tabSelect == 3">
        <span class="item-sub" :class="[subTabSelect == 1 ? 'select-bg' : '']" @click="switchSubTabHandler(1)">{{
          $t('seeds') }}</span>
        <span class="item-sub" :class="[subTabSelect == 2 ? 'select-bg' : '']" @click="switchSubTabHandler(2)">{{
          $t('land') }}</span>
        <span class="item-sub" :class="[subTabSelect == 3 ? 'select-bg' : '']" @click="switchSubTabHandler(3)">{{
          $t('prop') }}</span>
      </div>
      <div class="list-sub" v-if="tabSelect == 2">
        <span class="item-sub" :class="[subTabSelect == 1 ? 'select-bg' : '']" @click="switchSubTabHandler(1)">{{ $t('all')
          }}</span>
        <span class="item-sub" :class="[subTabSelect == 2 ? 'select-bg' : '']" @click="switchSubTabHandler(2)">{{ $t('my_plant')
          }}</span>
      </div>
      <div class="list-type" v-if="subTabSelect == 3">
        <span class="item-type" :class="[subTypeSelect == 1 ? 'select-bg' : '']" @click="switchSubTypeHandler(1)">{{ $t('name_11')}}</span>
        <span class="item-type" :class="[subTypeSelect == 2 ? 'select-bg' : '']" @click="switchSubTypeHandler(2)">{{ $t('name_12')}}</span>
        <span class="item-type" :class="[subTypeSelect == 3 ? 'select-bg' : '']" @click="switchSubTypeHandler(3)">{{ $t('name_13')}}</span>
        <span class="item-type" :class="[subTypeSelect == 4 ? 'select-bg' : '']" @click="switchSubTypeHandler(4)">{{ $t('name_14')}}</span>
        <span class="item-type" :class="[subTypeSelect == 5 ? 'select-bg' : '']" @click="switchSubTypeHandler(5)">{{ $t('name_15')}}</span>
      </div>
      <div class="list-wrap" v-if="tabSelect == 1 && subTabSelect == 1">
        <div class="item-seed" v-for="(item, index) in list" @click="showDetailHandler(item, '1')">
          <div class="item-border">
            <img class="icon-seed" :src="getGoodsImage(item.num)" alt="">
            <span class="name">{{ $t(`name_${item.num}`) }}</span>
            <span class="yield">{{ $t('yield') }}:{{ item.outMax }}</span>
          </div>
          <span class="price">{{ item.amount }}<span class="unit">USDT</span></span>
          <span class="buy">{{ $t('buy') }}</span>
        </div>
      </div>
      <div class="list-wrap" v-if="tabSelect == 1 && subTabSelect == 2">
        <div class="item-land" v-for="(item, index) in list" @click="showDetailHandler(item, '3')">
          <div class="item-border"></div>
          <img class="icon-land" :src="getLandImage(item.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ item.maxHealth }}</span>
          <span class="level">{{ $t('level') }}:{{ item.level }}</span>
          <span class="price">{{ item.amount }}<span class="unit">USDT</span></span>
          <span class="buy">{{ $t('buy') }}</span>
        </div>
      </div>
      <div class="list-wrap list-wrap2" v-if="tabSelect == 1 && subTabSelect == 3">
        <div class="item-tool" v-for="(item, index) in list" @click="showDetailHandler(item, '2')">
          <div class="item-border">
            <img class="icon-tool" :src="getGoodsImage(item.num)" alt="">
            <span class="name">{{ $t(`name_${item.num}`) }}</span>
            <div class="cont-count">
              <img class="type" v-if="item.num == '12'" src="@/assets/images/game/icon_shui_left.png" alt="">
              <img class="type" v-if="item.num == '13'" src="@/assets/images/game/icon_shou_left.png" alt="">
              <img class="type" v-if="item.num == '14'" src="@/assets/images/game/icon_shui_left.png" alt="">
              <img class="type" v-if="item.num == '15'" src="@/assets/images/game/icon_chanzi_left.png" alt="">
              <span class="num" v-if="item.num == '12' || item.num == '13' || item.num == '14' || item.num == '15'">{{
                item.useMax }}</span>
            </div>
          </div>
          <span class="price">{{ item.amount }}<span class="unit">USDT</span></span>
          <span class="buy">{{ $t('buy') }}</span>
        </div>
      </div>
      <div class="list-rent" v-if="tabSelect == 2">
        <div class="item-land" v-for="(item, index) in list" @click="showDetailHandler(item, '3')">
          <div class="item-border"></div>
          <img class="icon-land" :src="getLandImage(item.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ item.maxHealth }}</span>
          <span class="level">{{ $t('level') }}:{{ item.level }}</span>
          <div class="cont-rate">
            <img class="icon-type" src="@/assets/images/game/icon_maizi.png" alt="">
            <span class="num">{{ (item.rentAmount * 100).toFixed(2) }}%</span>
          </div>
          <span class="buy">{{ $t('to_his_house') }}</span>
        </div>
      </div>
      <div class="list-mine" v-if="tabSelect == 3">
        <div class="item-wrap" v-for="(item, index) in list" @click="showDetailHandler(item, item.type)">
          <div class="item-seed" v-if="subTabSelect == 1">
            <div class="item-border">
              <img class="icon-seed" :src="getGoodsImage(item.num)" alt="">
              <span class="name">{{ $t(`name_${item.num}`) }}</span>
              <span class="yield">{{ $t('yield') }}:{{ item.outMax }}</span>
            </div>
            <span class="price">{{ item.amount }}<span class="unit">USDT</span></span>
            <span class="buy">{{ $t('off_the_shelves') }}</span>
          </div>
          <div class="item-tool" v-else-if="subTabSelect == 3">
            <div class="item-border">
              <img class="icon-tool" :src="getGoodsImage(item.num)" alt="">
              <span class="name">{{ $t(`name_${item.num}`) }}</span>
              <div class="cont-count">
                <img class="type" v-if="item.num == '12'" src="@/assets/images/game/icon_shui_left.png" alt="">
                <img class="type" v-if="item.num == '13'" src="@/assets/images/game/icon_shou_left.png" alt="">
                <img class="type" v-if="item.num == '14'" src="@/assets/images/game/icon_shui_left.png" alt="">
                <img class="type" v-if="item.num == '15'" src="@/assets/images/game/icon_chanzi_left.png" alt="">
                <span class="num" v-if="item.num == '12' || item.num == '13' || item.num == '14' || item.num == '15'">{{
                  item.useNum }}</span>
              </div>
            </div>
            <span class="price">{{ item.amount }}<span class="unit">USDT</span></span>
            <span class="buy">{{ $t('off_the_shelves') }}</span>
          </div>
          <div class="item-land" v-else-if="subTabSelect == 2">
            <div class="item-border"></div>
            <img class="icon-land" :src="getLandImage(item.level)" alt="">
            <span class="fer">{{ $t('fertility') }}:{{ item.maxHealth }}</span>
            <span class="level">{{ $t('level') }}:{{ item.level }}</span>
            <div class="cont-rate">
              <img class="icon-type" src="@/assets/images/game/icon_maizi.png" alt="">
              <span class="num">{{ (item.rentAmount * 100).toFixed(2) }}%</span>
            </div>
            <span class="buy">{{ $t('off_the_shelves') }}</span>
            <img class="status" v-if="item.status == '1'" src="@/assets/images/game/icon_rent.png" alt="">
            <img class="status" v-if="item.status == '2'" src="@/assets/images/game/icon_sale.png" alt="">
          </div>
        </div>
      </div>
      <div class="cont-bottom">
        <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
        <span class="num">{{ $t('skip') }}</span>
        <input class="input-num"  type="number" v-model="page" @blur="changePageHandler"/>
        <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
      </div>      
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-detail" @click="notDo()" v-if="step == 2">
      <img class="bg" :src="$t('image_game.bg_market')" alt="">
      <div class="store-detail">
        <span class="seed-id">#{{ currGoods.id }}</span>
        <div class="cont-img" v-if="currGoods.type == '1'">
          <img class="seed-img" :src="getGoodsImage(currGoods.num)" alt="">
          <span class="fer">{{ $t('grown') }}:{{ getHour(currGoods.time) }}H</span>
          <span class="level">{{ $t('yield') }}:{{ currGoods.outMax }}</span>
        </div>
        <div class="cont-img" v-if="currGoods.type == '2'">
          <img class="seed-img" :src="getGoodsImage(currGoods.num)" alt="">
        </div>
        <div class="cont-img" v-if="currGoods.type == '3'">
          <img class="land-img" :src="getLandImage(currGoods.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ (currGoods.maxHealth) }}</span>
          <span class="level">{{ $t('level') }}:{{ currGoods.level }}</span>
        </div>
        <span class="name" v-if="currGoods.type == '1'">{{ $t(`name_${currGoods.num || 1}`) }}</span>
        <div class="cont-count" v-if="currGoods.type == '2'">
          <img class="type" v-if="currGoods.num == '12'" src="@/assets/images/game/icon_shui_left.png" alt="">
          <img class="type" v-if="currGoods.num == '13'" src="@/assets/images/game/icon_shou_left.png" alt="">
          <img class="type" v-if="currGoods.num == '14'" src="@/assets/images/game/icon_shui_left.png" alt="">
          <img class="type" v-if="currGoods.num == '15'" src="@/assets/images/game/icon_chanzi_left.png" alt="">
          <span class="num"
            v-if="currGoods.num == '12' || currGoods.num == '13' || currGoods.num == '14' || currGoods.num == '15'">{{
              currGoods.useNum }}</span>
        </div>
        <div class="cont-num" v-if="currGoods.type == '3'">
          <div class="item-num">
            <span class="num">{{ parseInt(currGoods.outPutRate) }}%</span>
            <span class="type">{{ $t('production_increases') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ currGoods.perHealth }}</span>
            <span class="type">{{ $t('plant_cost') }}</span>
          </div>
        </div>
        <div class="cont-num" v-if="currGoods.type == '3'">
          <div class="item-num">
            <span class="num">{{ currGoods.rentAmount ? (currGoods.rentAmount * 100).toFixed(2) : 0 }}%</span>
            <span class="type">{{ $t('harvest_ratio') }}</span>
          </div>
        </div>
        <span class="price" v-if="currGoods.amount">{{ currGoods.amount ? currGoods.amount : 0 }}<span
            class="unit">USDT</span></span>
        <div class="cont-desc">
          <span class="title">{{ $t('holders') }}:</span>
          <span class="desc-short">{{ currGoods.address }}</span>
          <span class="title">{{ $t('description') }}:</span>
          <span class="desc">{{ isZh ? currGoods.content : currGoods.eContent }}</span>
          <span class="title">{{ $t('blockchain_network') }}:</span>
          <span class="desc-short">binance smart chain</span>
        </div>
        <span class="btn-off" v-if="tabSelect == 1" @click="buyGoodsHandler()">{{ $t('confirm_purchase') }}</span>
        <span class="btn-off" v-if="tabSelect == 2" @click="toOtherHandler(currGoods.addressTwo)">{{ $t('to_his_house')
        }}</span>
        <span class="btn-off" v-if="tabSelect == 3" @click="offGoodsHandler()">{{ $t('off_the_shelves') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="toHomeHadler()" alt="">
    </div>
    <div class="cont-submit" @click="notDo()" v-show="showSubmit">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-btn">
        <span class="btn-buy" @click="submitBuyHandler()">{{ $t('confirm') }}</span>
        <span class="btn-cancel" @click="cancelBuyHandler()">{{ $t('cancel') }}</span>
      </div>
    </div>    
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { getGoodsImage, getLandImage } from '@/utils/loadImages';
import { getHour } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance();
const { t } = useI18n()
const emit = defineEmits(['close', 'success'])
const router = useRouter();
const tabSelect = ref(1)
const subTabSelect = ref(2)
const subTypeSelect = ref(1)
const step = ref(1)
const showSubmit = ref(false)
const list = ref([])
const currGoods = ref({})
const isZh = ref(false)
const page = ref(1)
let pageMax = 1

onMounted(() => {
  page.value = 1
  getList(1)
  isZh.value = localStorage.getItem('language') == 'zh'
});

function switchTabHandler(index) {
  if (tabSelect.value != index) {
    tabSelect.value = index
    if(tabSelect.value == 2){
      subTabSelect.value = 1
    } else {
      subTabSelect.value = 2
    }
    page.value = 1
    getList(1)    
  }
}
function switchSubTabHandler(index) {
  if (subTabSelect.value != index) {
    subTabSelect.value = index
    page.value = 1
    getList(1)    
  }
}
function switchSubTypeHandler(index) {
  if (subTypeSelect.value != index) {
    subTypeSelect.value = index
    page.value = 1
    getList(1)    
  }
}
function changePageHandler() {
  const newPage = parseInt(page.value)
  if (isNaN(newPage) || newPage < 1 || newPage > pageMax) {
    page.value = 1
    getList(1)
    return
  }
  page.value = newPage
  getList(newPage)
}
function skipPage(num) {
  const newPage = page.value + num
  if (newPage < 1 || newPage > pageMax) {
    return
  }
  page.value = newPage
  getList(newPage)
}
function showDetailHandler(item, type) {
  currGoods.value = { type, ...item }
  step.value = 2
}
function toOtherHandler(address) {
  router.push({ path: '/game2', query: { address } });
}
function toHomeHadler() {
  step.value = 1
}
function buyGoodsHandler() {
  showSubmit.value = true
}
function submitBuyHandler() {
  buy()
  showSubmit.value = false
}
function cancelBuyHandler() {
  showSubmit.value = false
}
function offGoodsHandler() {
  offGoods()
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList(page) {
  proxy.$showLoading()
  list.value = []
  let res = ''
  if (tabSelect.value == 3) {
    let num = 1
    if (subTabSelect.value == 1) {
      num = 2
    } else if (subTabSelect.value == 2) {
      num = 3
    } else if (subTabSelect.value == 3) {
      num = 1
    }
    res = await gameModel.userMarketMyList(page, num)
  } else if (tabSelect.value == 2) {
    if (subTabSelect.value == 2) {
      res = await gameModel.userMarketRentLandList(page, 2)
    } else {
      res = await gameModel.userMarketRentLandList(page, 1)
    }
  } else {
     //11化肥，12水，13手套，14除虫剂，15铲子
    if (subTabSelect.value == 3) {
      let propType = '11'
      if (subTypeSelect.value == 1) {
        propType = '11'
      } else if (subTypeSelect.value == 2) {
        propType = '12'
      } else if (subTypeSelect.value == 3) {
        propType = '13'
      } else if (subTypeSelect.value == 4) {
        propType = '14'
      } else if (subTypeSelect.value == 5) {
        propType = '15'
      }
      res = await gameModel.userMarketPropList(page, propType)
    } else if (subTabSelect.value == 2) {
      res = await gameModel.userMarketLandList(page)
    } else {
      res = await gameModel.userMarketSeedList(page)
    }
  }
  if (res && res.ok) {
    list.value = res.data.list
    if(parseInt(res.data.count) != 0){
      pageMax = Math.ceil(parseInt(res.data.count) / 100) || 1
    }    
    console.log('pageMax', pageMax)
  }
  proxy.$hideLoading()
}

async function buy() {
  proxy.$showLoading()
  const id = currGoods.value.id
  const type = currGoods.value.type
  // if (parseInt(type) == 3) {
  //   showToast(t('not_yet_open'))
  //   return
  // }
  const res = await gameModel.buy(id, type)
  if (res.ok) {
    showToast(t('buy_success'))
    page.value = 1
    getList(1)
    step.value = 1
  }
  proxy.$hideLoading()
}
async function offGoods() {
  const id = currGoods.value.id
  const type = currGoods.value.type
  // if (parseInt(type) == 3) {
  //   showToast(t('not_yet_open'))
  //   return
  // }
  proxy.$showLoading()
  const res = await gameModel.sell(id, '', 2, type, 0)
  // console.log(res)
  if (res.ok) {
    showToast(t('off_the_shelves_success'))
    page.value = 1
    getList(1)    
    step.value = 1
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
      width: 330px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .cont-tab {
      position: absolute;
      top: 50px;
      left: 35px;
      right: 0;
      width: 260px;
      height: 36px;

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
        justify-content: space-between;
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
      }

    }

    .list-sub {
      position: absolute;
      left: 30px;
      top: 90px;
      right: 0;
      width: 100%;
      display: flex;
      align-items: center;

      .item-sub {
        font-size: 14px;
        font-weight: bold;
        min-width: 60px;
        height: 30px;
        background-color: #fff;
        border: 1px solid #f7d961;
        box-sizing: border-box;
        border-radius: 2px;
        line-height: 30px;
        text-align: center;
        margin-right: 10px;
        margin-bottom: 4px;
      }

      .select-bg {
        background-color: #f7d961 !important;
      }
    }
    .list-type {
      position: absolute;
      left: 30px;
      top: 125px;
      right: 0;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .item-type {
        font-size: 12px;
        font-weight: bold;
        min-width: 60px;
        height: 25px;
        background-color: #fff;
        border: 1px solid #f7d961;
        box-sizing: border-box;
        border-radius: 2px;
        line-height: 25px;
        text-align: center;
        margin-right: 10px;
        margin-bottom: 2px;
      }

      .select-bg {
        background-color: #f7d961 !important;
      }
    }



    .list-wrap2 {
      position: absolute;
      top: 175px!important;
      left: 0;
      right: 0;
      max-height: 380px!important;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;      
    }
    .list-wrap {
      position: absolute;
      top: 125px;
      left: 0;
      right: 0;
      max-height: 430px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;

      .item-seed {
        width: 90px;
        height: 125px;
        position: relative;
        margin-bottom: 4px;
        margin-right: 5px;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-seed {
          height: 30px;
          margin-top: 10px;
        }

        .name {
          font-size: 10px;
          color: #000;
          margin-top: 8px;
        }

        .yield {
          font-size: 10px;
          color: #000;
          margin-top: auto;
          margin-bottom: 8px;
        }

        .price {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          width: 85px;
          bottom: 18px;
          left: 0;
          text-align: center;

          .unit {
            color: #000;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .item-land {
        width: 90px;
        height: 120px;
        position: relative;
        margin-bottom: 4px;
        margin-right: 5px;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
        }

        .icon-land {
          height: 30px;
          position: absolute;
          top: 14px;
          left: 10px;
        }

        .fer {
          font-size: 12px;
          color: #000;
          position: absolute;
          top: 50px;
          left: 12px;
        }

        .level {
          font-size: 12px;
          color: #ed8630;
          position: absolute;
          top: 68px;
          left: 16px;
        }

        .price {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          bottom: 15px;
          left: 16px;

          .unit {
            color: #000;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .item-tool {
        width: 90px;
        height: 125px;
        position: relative;
        margin-bottom: 4px;
        margin-right: 5px;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-tool {
          height: 35px;
          margin-top: 10px;
        }

        .name {
          font-size: 12px;
          color: #000;
          margin-top: 5px;
        }

        .cont-count {
          display: flex;
          align-items: center;

          .type {
            width: 8px;
          }

          .num {
            font-size: 10px;
            color: #ed802b;
            margin-left: 4px;
          }
        }

        .price {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          width: 85px;
          bottom: 18px;
          left: 0;
          text-align: center;

          .unit {
            color: #000;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }

    .list-rent {
      position: absolute;
      top: 125px;
      left: 0;
      right: 0;
      max-height: 430px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;

      .item-land {
        width: 90px;
        height: 120px;
        position: relative;
        margin-bottom: 4px;
        margin-right: 5px;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
        }

        .icon-land {
          height: 30px;
          position: absolute;
          top: 14px;
          left: 10px;
        }

        .fer {
          font-size: 12px;
          color: #000;
          position: absolute;
          top: 50px;
          left: 12px;
        }

        .level {
          font-size: 12px;
          color: #ed8630;
          position: absolute;
          top: 68px;
          left: 16px;
        }

        .cont-rate {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          bottom: 15px;
          left: 20px;
          display: flex;
          align-items: center;

          .icon-type {
            width: 8px;
          }

          .num {
            margin-left: 4px;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }

    .list-mine {
      position: absolute;
      top: 125px;
      left: 0;
      right: 0;
      max-height: 430px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;

      .item-wrap {
        width: 90px;
        height: 120px;
        position: relative;
        margin-bottom: 4px;
        margin-right: 5px;
      }

      .item-land {
        width: 90px;
        height: 120px;
        position: relative;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
        }

        .icon-land {
          height: 30px;
          position: absolute;
          top: 14px;
          left: 10px;
        }

        .fer {
          font-size: 12px;
          color: #000;
          position: absolute;
          top: 50px;
          left: 12px;
        }

        .level {
          font-size: 12px;
          color: #ed8630;
          position: absolute;
          top: 68px;
          left: 16px;
        }

        .cont-rate {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          bottom: 15px;
          left: 20px;
          display: flex;
          align-items: center;

          .icon-type {
            width: 8px;
          }

          .num {
            margin-left: 4px;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .item-tool {
        width: 90px;
        height: 125px;
        position: relative;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-tool {
          height: 35px;
          margin-top: 10px;
        }

        .name {
          font-size: 12px;
          color: #000;
          margin-top: 5px;
        }

        .cont-count {
          display: flex;
          align-items: center;

          .type {
            width: 8px;
          }

          .num {
            font-size: 10px;
            color: #ed802b;
            margin-left: 4px;
          }
        }


        .price {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          width: 85px;
          bottom: 18px;
          left: 0;
          text-align: center;

          .unit {
            color: #000;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .item-seed {
        width: 90px;
        height: 125px;
        position: relative;

        .item-border {
          width: 85px;
          height: 85px;
          border: 3px solid #f8da61;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .icon-seed {
          height: 30px;
          margin-top: 10px;
        }

        .name {
          font-size: 10px;
          color: #000;
          margin-top: 8px;
        }

        .yield {
          font-size: 10px;
          color: #000;
          margin-top: auto;
          margin-bottom: 8px;
        }

        .price {
          font-size: 10px;
          color: #ed802b;
          position: absolute;
          width: 85px;
          bottom: 18px;
          left: 0;
          text-align: center;

          .unit {
            color: #000;
          }
        }

        .buy {
          font-size: 10px;
          color: #000;
          width: 85px;
          height: 15px;
          background-color: #92eead;
          position: absolute;
          bottom: 0px;
          left: 0;
          font-weight: bold;
          text-align: center;
          border: 1px solid #000;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }

    .cont-bottom {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      font-size: 12px;
      text-decoration: underline;
      padding: 0 20px;
      margin-top: 20px;

      .prev {
        margin-right: auto;
      }

      .num {
        text-align: center;
        margin-right: 4px;
      }
      .input-num {
        width: 30px;
        height: 16px;
        text-align: center;
        border: 1px solid #000;
        border-radius: 4px;
        outline: none;
      }

      .next {
        margin-left: auto;
      }

    }    

  }

  .cont-detail {
    position: relative;

    .bg {
      width: 330px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .store-detail {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      right: 0;
      top: 50px;
      padding: 0 30px;

      .cont-rule {
        display: flex;
        flex-direction: column;
        align-self: flex-end;

        .icon-rule {
          width: 20px;
        }

        .rule {
          font-size: 10px;
          color: #605015;
        }
      }

      .seed-id {
        font-size: 16px;
        font-weight: bold;
        align-self: center;
      }

      .cont-img {
        position: relative;
        height: 90px;
        margin-top: 10px;

        .seed-img {
          width: 70px;
          position: absolute;
          left: 90px;
          top: 0;
        }

        .land-img {
          width: 150px;
          position: absolute;
          left: 50px;
          top: 0;
        }

        .blind-img {
          width: 100px;
          position: absolute;
          left: 70px;
          top: 0;
        }

        .fer {
          width: 80px;
          height: 20px;
          background-color: rgba(248, 218, 97, 0.8);
          border: 1px solid #666;
          font-size: 12px;
          padding-right: 5px;
          line-height: 20px;
          text-align: end;
          position: absolute;
          right: 35px;
          top: 10px;
        }

        .level {
          width: 80px;
          height: 20px;
          background-color: rgba(228, 210, 252, 0.8);
          border: 1px solid #8951cb;
          font-size: 12px;
          padding-right: 5px;
          line-height: 20px;
          text-align: end;
          position: absolute;
          right: 35px;
          top: 40px;
        }
      }

      .name {
        font-size: 16px;
        font-weight: bold;
        align-self: center;
      }

      .cont-count {
        display: flex;
        align-items: center;
        align-self: center;

        .type {
          width: 10px;
        }

        .num {
          font-size: 12px;
          color: #ed802b;
          margin-left: 4px;
        }
      }

      .cont-num {
        display: flex;
        margin-bottom: 8px;

        .item-num {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          .num {
            font-size: 18px;
            color: #ef923b;
            font-weight: bold;
          }

          .type {
            font-size: 12px;
            color: #000;
            margin-top: 4px;
          }
        }
      }

      .price {
        color: #ed802b;
        align-self: center;
        margin-top: 10px;

        .unit {
          color: #000;
          margin-left: 4px;
        }
      }

      .btn-off {
        width: 220px;
        height: 48px;
        background-color: #f8da61;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        margin-top: 30px;
        color: #000;
        font-weight: bold;
      }

      .btn-sell {
        width: 220px;
        height: 48px;
        background-color: #ed8582;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        margin-top: 30px;
        color: #000;
        font-weight: bold;
      }

      .btn-open {
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
        color: #000;
        font-weight: bold;
      }

      .cont-desc {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .title {
          font-size: 14px;
          font-weight: bold;
          margin-top: 4px;
        }

        .desc-short {
          width: 100%;
          font-size: 12px;
          word-wrap: break-word;
        }

        .desc {
          width: 100%;
          height: 80px;
          font-size: 12px;
          word-wrap: break-word;
        }
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