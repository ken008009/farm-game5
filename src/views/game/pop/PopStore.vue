<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_store')" alt="">
      <div class="cont-tab">
        <div class="line"></div>
        <div class="list-tab">
          <div class="item-tab" @click="switchTabHandler(1)">
            <img class="tab-bg" v-if="tabSelect == 1" src="@/assets/images/game/icon_tab_select.png" alt="">
            <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
            <span class="tab-name" :class="[tabSelect == 1 ? 'select' : '']">{{ $t('seeds') }}</span>
          </div>
          <div class="item-tab" @click="switchTabHandler(2)">
            <img class="tab-bg" v-if="tabSelect == 2" src="@/assets/images/game/icon_tab_select.png" alt="">
            <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
            <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">{{ $t('prop') }}</span>
          </div>
          <div class="item-tab" @click="switchTabHandler(3)">
            <img class="tab-bg" v-if="tabSelect == 3" src="@/assets/images/game/icon_tab_select.png" alt="">
            <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
            <span class="tab-name" :class="[tabSelect == 3 ? 'select' : '']">{{ $t('blind_box') }}</span>
          </div>
        </div>
      </div>
      <div class="list-sub">
        <span class="item-sub" :class="[subTabSelect == 1 ? 'select-bg' : '']" @click="switchSubTabHandler(1)">{{
          $t('default') }}</span>
        <span class="item-sub" :class="[subTabSelect == 2 ? 'select-bg' : '']" @click="switchSubTabHandler(2)">{{
          $t('bulk_sell') }}</span>
        <span v-if="subTabSelect != 1" class="btn-confirm" @click="submitMultiHandler()">{{ $t('confirm') }}</span>
      </div>
      <div class="list-type" v-if="tabSelect == 2">
        <span class="item-type" :class="[subTypeSelect == 1 ? 'select-bg' : '']" @click="switchSubTypeHandler(1)">{{ $t('name_11')}}</span>
        <span class="item-type" :class="[subTypeSelect == 2 ? 'select-bg' : '']" @click="switchSubTypeHandler(2)">{{ $t('name_12')}}</span>
        <span class="item-type" :class="[subTypeSelect == 3 ? 'select-bg' : '']" @click="switchSubTypeHandler(3)">{{ $t('name_13')}}</span>
        <span class="item-type" :class="[subTypeSelect == 4 ? 'select-bg' : '']" @click="switchSubTypeHandler(4)">{{ $t('name_14')}}</span>
        <span class="item-type" :class="[subTypeSelect == 5 ? 'select-bg' : '']" @click="switchSubTypeHandler(5)">{{ $t('name_15')}}</span>
      </div>
      <div class="list-seed" v-if="tabSelect == 1">
        <div class="item-seed" v-for="(item, index) in list">
          <div class="item-border" v-if="subTabSelect == 1" @click="showDetailHandler(item)">
            <img class="icon-seed" :src="getGoodsImage(item.num)" alt="">
            <span class="name">{{ $t(`name_${item.num}`) }}</span>
            <span class="yield">{{ $t('yield') }}:{{ item.outMax }}</span>
          </div>
          <div class="item-border" :class="[item.check?'':'item-border2']" v-else-if="subTabSelect == 2" @click="selectSellHandler(item, index)">
            <img class="icon-seed" :src="getGoodsImage(item.num)" alt="">
            <span class="name">{{ $t(`name_${item.num}`) }}</span>
            <span class="yield">{{ $t('yield') }}:{{ item.outMax }}</span>
          </div>
          <span class="seed-id">#{{ item.id }}</span>
          <img class="status" v-if="item.status == '4'" src="@/assets/images/game/icon_sale.png" alt="">
        </div>
      </div>
      <div class="list-tool list-tool2" v-else-if="tabSelect == 2">
        <div class="item-tool" v-for="(item, index) in list">
          <div class="item-border" v-if="subTabSelect == 1" @click="showDetailHandler(item)">
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
          <div class="item-border" :class="[item.check?'':'item-border2']" v-else-if="subTabSelect == 2" @click="selectSellHandler(item, index)">
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
          <span class="seed-id">#{{ item.id }}</span>
          <img class="status" v-if="item.status == '4'" src="@/assets/images/game/icon_sale.png" alt="">
        </div>
      </div>
      <div class="list-tool" v-else-if="tabSelect == 3">
        <div class="item-tool" v-for="(item, index) in list">
          <div class="item-border" v-if="subTabSelect == 1" @click="showDetailHandler(item)">
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
          <div class="item-border" :class="[item.check?'':'item-border2']" v-else-if="subTabSelect == 2" @click="selectSellHandler(item, index)">
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
          <span class="seed-id">#{{ item.id }}</span>
          <img class="status" v-if="item.status == '4'" src="@/assets/images/game/icon_sale.png" alt="">
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
    <div class="cont-detail" @click="notDo()" v-show="step == 2">
      <img class="bg" :src="$t('image_game.bg_store2')" alt="">
      <div class="store-detail">
        <div class="cont-rule">
          <img class="icon-rule" src="@/assets/images/game/icon_rule.png" alt="">
          <span class="rule">{{ $t('rule') }}</span>
        </div>

        <span class="seed-id">#{{ currGoods.id }}</span>
        <div class="cont-img" v-if="tabSelect == 1">
          <img class="seed-img" :src="getGoodsImage(currGoods.num)" alt="">
          <img class="blind-img" v-if="false" src="@/assets/images/game/icon_blind.png" alt="">
          <span class="fer">{{ $t('grown') }}:{{ getHour(currGoods.time) }}H</span>
          <span class="level">{{ $t('yield') }}:{{ currGoods.outMax }}</span>
        </div>
        <div class="cont-img" v-if="tabSelect == 2">
          <img class="blind-img" v-if="currGoods.num == '16'" src="@/assets/images/game/icon_blind.png" alt="">
          <img class="seed-img" v-else :src="getGoodsImage(currGoods.num)" alt="">
        </div>
        <span class="name" v-if="tabSelect == 1">{{ $t(`name_${currGoods.num || 1}`) }}</span>
        <div class="cont-count" v-if="tabSelect == 2">
          <img class="type" v-if="currGoods.num == '12'" src="@/assets/images/game/icon_shui_left.png" alt="">
          <img class="type" v-if="currGoods.num == '13'" src="@/assets/images/game/icon_shou_left.png" alt="">
          <img class="type" v-if="currGoods.num == '14'" src="@/assets/images/game/icon_shui_left.png" alt="">
          <img class="type" v-if="currGoods.num == '15'" src="@/assets/images/game/icon_chanzi_left.png" alt="">
          <span class="num"
            v-if="currGoods.num == '12' || currGoods.num == '13' || currGoods.num == '14' || currGoods.num == '15'">{{
              currGoods.useNum }}</span>
        </div>
        <span class="desc" v-if="currGoods.num != '16'">{{ isZh ? currGoods.content : currGoods.eContent }}</span>
        <span class="price" v-if="currGoods.amount">{{ currGoods.amount ? currGoods.amount : 0 }}<span
            class="unit">USDT</span></span>
        <span class="btn-open" v-if="currGoods.num == '16'" @click="openBoxHandler()">{{ $t('open') }}</span>
        <span class="btn-off" v-else-if="currGoods.status == '4'" @click="offGoodsHandler()">{{ $t('off_the_shelves')
        }}</span>
        <span class="btn-sell" v-else @click="switchSaleHandler">{{ $t('sell') }}</span>

      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="toHomeHadler()" alt="">
    </div>

    <PopSaleSetting v-if="showSale" :id="currGoods.id" :sellFeeRate="info.sellFeeRate || 0"
      @success="receivePriceHandler" @close="switchSaleHandler" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { getGoodsImage, getLandImage } from '@/utils/loadImages';
import { getHour } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import PopSaleSetting from '@/views/game/pop/PopSaleSetting.vue';
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
const tabSelect = ref(1)
const subTabSelect = ref(1)
const subTypeSelect = ref(1)
const step = ref(1)
const list = ref([])
const currGoods = ref({})
const showSale = ref(false)
const isZh = ref(false)
const page = ref(1)
let pageMax = 1
let currLandIds = ''

onMounted(() => {
  page.value = 1
  getList(1)
  isZh.value = localStorage.getItem('language') == 'zh'
});

function switchTabHandler(index) {
  if (tabSelect.value != index) {
    tabSelect.value = index
    page.value = 1
    getList(1)
  }
}
function switchSubTabHandler(index) {
  if (subTabSelect.value != index) {
    subTabSelect.value = index
    // page.value = 1
    // getList(1)
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
function showDetailHandler(item) {
  currGoods.value = item
  step.value = 2
}
function selectSellHandler(item, index) {
  list.value[index].check = !item.check
}
function submitMultiHandler() {
  const temp = []
  if (subTabSelect.value == 2) {
    list.value.map((o, i) => {
      if (o.check) {
        temp.push(o)
      }
    })
  }
  if (temp.length > 0) {
    const ids = temp
      .filter(item => item.check)   // 只保留 check 为 true 的对象
      .map(item => item.id)         // 取出 id
      .join('&');
    if (subTabSelect.value == 2) {
      showSale.value = true
    }
    currLandIds = ids
    console.log(currLandIds)
  } else {
    showToast(t('please_select_goods'))
  }
}
function openBoxHandler() {
  const id = currGoods.value.id
  if (id) {
    openBlindBox(id)
  }
}
function toHomeHadler() {
  step.value = 1
}
function offGoodsHandler() {
  offGoods()
}
function switchSaleHandler() {
  showSale.value = !showSale.value
}
function receivePriceHandler(e) {
  showSale.value = false
  step.value = 1
  if (subTabSelect.value == 1) {
    sellGoods(e.price)
  } else {
    sellMultiGoods(e.price)
  }
  
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList(page = 1) {
  let type = '1'
  let propType = '0'
  if (tabSelect.value == 1) {
    type = '2'
  } else if (tabSelect.value == 2) {
    type = '1'
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
  } else if (tabSelect.value == 3) {
    type = '3'
  }
  proxy.$showLoading()
  list.value = []
  const res = await gameModel.userBackList(page, type, propType)
  if (res && res.ok) {
    list.value = res.data.list.map((o,i)=>{
      o['check'] = true
      return o
    })
    if(parseInt(res.data.count) != 0){
      pageMax = Math.ceil(parseInt(res.data.count) / 100) || 1
    }
  }
  proxy.$hideLoading()
}
async function openBlindBox(id) {
  proxy.$showLoading()
  const res = await gameModel.openBox(id)
  if (res.ok) {
    // tabSelect.value = parseInt(res.data.openType)
    currGoods.value = res.data
    page.value = 1
    getList(1)
  }
  proxy.$hideLoading()
}
async function sellMultiGoods(amount) {
  proxy.$showLoading()
  const landIds = currLandIds
  const sellType = tabSelect.value
  const res = await gameModel.sell(0, landIds, 1, sellType, amount)
  if (res.ok) {
    showToast(t('sell_success'))
    page.value = 1
    getList(1)
  }
  proxy.$hideLoading()
}
async function sellGoods(amount) {
  proxy.$showLoading()
  const id = currGoods.value.id
  const sellType = tabSelect.value
  const res = await gameModel.sell(id, '', 1, sellType, amount)
  if (res.ok) {
    showToast(t('sell_success'))
    page.value = 1
    getList(1)
  }
  proxy.$hideLoading()
}
async function offGoods() {
  proxy.$showLoading()
  const id = currGoods.value.id
  const sellType = tabSelect.value
  const res = await gameModel.sell(id, '', 2, sellType, 0)
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
      left: 40px;
      right: 0;
      width: 250px;
      height: 32px;

      .line {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
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
          width: 75px;
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
        }
      }

    }
    .list-sub {
      position: absolute;
      left: 30px;
      top: 87px;
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
      }

      .btn-confirm {
        width: 56px;
        height: 28px;
        background-color: #eef350;
        border-radius: 10px;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
        margin-left: auto;
        margin-right: 60px;
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

    .list-seed {
      position: absolute;
      top: 115px;
      left: 0;
      right: 0;
      max-height: 435px; // 改为最大高度限制
      height: auto; // 移除固定高度
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;

      .item-seed {
        width: 90px;
        height: 110px;
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
        .item-border2 {
          border: 1px solid #f8da61!important;
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

        .seed-id {
          font-size: 12px;
          color: #000;
          position: absolute;
          width: 85px;
          left: 0;
          bottom: 0px;
          font-weight: bold;
          text-align: center;
        }

        .status {
          width: 40px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }

    .list-tool2 {
      top: 175px!important;
      max-height: 340px!important;
    }
    .list-tool {
      position: absolute;
      top: 115px;
      left: 0;
      right: 0;
      max-height: 435px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;

      .item-tool {
        width: 90px;
        height: 110px;
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
        .item-border2 {
          border: 1px solid #f8da61!important;
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


        .seed-id {
          font-size: 12px;
          color: #000;
          position: absolute;
          width: 85px;
          left: 0;
          bottom: 0px;
          font-weight: bold;
          text-align: center;
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
      bottom: 14px;
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

    .btn-compound {
      width: 240px;
      height: 40px;
      position: absolute;
      bottom: 30px;
      left: 45px;
      background-color: #f8da61;
      border: 1px solid #000;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;

      .add {
        width: 20px;
        margin-right: 10px;
      }

      .name {
        font-weight: bold;
      }
    }
  }

  .cont-detail {
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
        opacity: 0;

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
          right: 15px;
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
          right: 15px;
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
        margin-top: 90px;
        color: #000;
        font-weight: bold;
      }

      .desc {
        width: 100%;
        height: 80px;
        font-size: 12px;
        margin-top: 5px;
        word-wrap: break-word;
      }

    }
  }
}
</style>