<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_land')" alt="">
      <div class="list-sub">
        <span class="item-sub" :class="[subTabSelect == 1 ? 'select-bg' : '']" @click="switchSubTabHandler(1)">{{
          $t('default') }}</span>
        <span class="item-sub" :class="[subTabSelect == 2 ? 'select-bg' : '']" @click="switchSubTabHandler(2)">{{
          $t('bulk_sell') }}</span>
        <span class="item-sub" :class="[subTabSelect == 3 ? 'select-bg' : '']" @click="switchSubTabHandler(3)">{{
          $t('bulk_rent') }}</span>
        <span v-if="subTabSelect != 1" class="btn-confirm" @click="submitMultiHandler()">{{ $t('confirm') }}</span>
      </div>
      <div class="list-land" v-if="subTabSelect == 1">
        <div class="item-land" v-for="(item, index) in list" @click="showLandDetailHandler(item, index)">
          <div class="item-border"></div>
          <img class="icon-land" :src="getLandImage(item.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ item.health }}</span>
          <span class="level">{{ $t('level') }}:{{ item.level }}</span>
          <span class="land-id">#{{ item.id }}</span>
          <img class="status" v-if="item.status == '3'" src="@/assets/images/game/icon_rent.png" alt="">
          <img class="status" v-if="item.status == '4'" src="@/assets/images/game/icon_sale.png" alt="">
        </div>
      </div>
      <div class="list-land" v-if="subTabSelect == 2">
        <div class="item-land" v-for="(item, index) in listSell" @click="selectSellHandler(item, index)">
          <div :class="[item.check ? 'item-border' : 'item-border2']"></div>
          <img class="icon-land" :src="getLandImage(item.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ item.health }}</span>
          <span class="level">{{ $t('level') }}:{{ item.level }}</span>
          <span class="land-id">#{{ item.id }}</span>
        </div>
      </div>
      <div class="list-land" v-if="subTabSelect == 3">
        <div class="item-land" v-for="(item, index) in listRent" @click="selectRentHandler(item, index)">
          <div :class="[item.check ? 'item-border' : 'item-border2']"></div>
          <img class="icon-land" :src="getLandImage(item.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ item.health }}</span>
          <span class="level">{{ $t('level') }}:{{ item.level }}</span>
          <span class="land-id">#{{ item.id }}</span>
        </div>
      </div>
      <div class="cont-bottom">
        <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
        <span class="num">{{ $t('skip') }}</span>
        <input class="input-num"  type="number" v-model="page" @blur="changePageHandler"/>
        <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
      </div>      
      <!-- <div class="btn-compound" @click="landCompoundHandler">
        <img class="add" src="@/assets/images/game/icon_add_black.png" alt="">
        <span class="name">{{ $t('land_formation') }}</span>
      </div> -->
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
    <div class="cont-detail" @click="notDo()" v-show="step == 2">
      <img class="bg" :src="$t('image_game.bg_land2')" alt="">
      <div class="land-detail">
        <div class="cont-rule">
          <img class="icon-rule" src="@/assets/images/game/icon_rule.png" alt="">
          <span class="rule">{{ $t('rule') }}</span>
        </div>
        <span class="land-id">#{{ currLand.id }}</span>
        <div class="cont-img" @click="toOtherHandler(currLand.addressTwo)">
          <img class="land-img" :src="getLandImage(currLand.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ currLand.health }}</span>
          <span class="level">{{ $t('level') }}:{{ currLand.level }}</span>
        </div>
        <div class="cont-num">
          <div class="item-num">
            <span class="num">{{ currLand.outRate ? currLand.outRate * 100 : 0 }}%</span>
            <span class="type">{{ $t('production_increases') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ currLand.perHealth }}</span>
            <span class="type">{{ $t('plant_cost') }}</span>
          </div>
        </div>
        <span class="desc">{{ isZh ? currLand.content : currLand.eContent }}</span>
        <div class="cont-btn" v-if="currLand.status == '0'">
          <div class="cont-short">
            <span class="btn-short" v-if="currLand.one === '1'" @click="switchSaleHandler">{{ $t('sell') }}</span>
            <!-- <span class="btn-short" v-if="currLand.two === '1'" @click="switchRentHandler">{{ $t('rent') }}</span> -->
          </div>
          <span class="btn-submit" @click="switchRaiseLandHandler">{{ $t('cultivate')
            }}</span>
        </div>
        <div class="cont-btn" v-if="currLand.status === '1'">
          <div class="cont-short">
            <span class="btn-short" v-if="currLand.two === '1'" @click="switchRentHandler">{{ $t('rent') }}</span>
          </div>
        </div>
        <div class="cont-btn" v-else-if="currLand.status == '4'">
          <span class="btn-submit2" @click="offLandHandler">{{ $t('off_the_shelves')
            }}</span>
        </div>
        <div class="cont-btn" v-else-if="(currLand.status == '3') && (currLand.rentPlant == '0')">
          <span class="btn-submit3" @click="offRentHandler">{{ $t('end_of_lease')
            }}</span>
        </div>

      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showLandHomeHandler()" alt="">
    </div>
    <div class="cont-compound" @click="notDo()" v-show="step == 3">
      <img class="bg" :src="$t('image_game.bg_land_compound')" alt="">
      <div class="compound-detail">
        <div class="cont-rule">
          <img class="icon-rule" src="@/assets/images/game/icon_rule.png" alt="">
          <span class="rule">{{ $t('rule') }}</span>
        </div>
        <div class="cont-tab">
          <div class="line"></div>
          <div class="list-tab">
            <div class="item-tab" @click="switchTabHandler(1)">
              <img class="tab-bg" v-if="tabSelect == 1" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 1 ? 'select' : '']">{{ $t('fertilizer') }}</span>
            </div>
            <div class="item-tab" @click="switchTabHandler(2)">
              <img class="tab-bg" v-if="tabSelect == 2" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">{{ $t('land') }}</span>
            </div>
          </div>
        </div>
        <div class="cont-img">
          <img class="land-img" src="@/assets/images/game/land_1.png" alt="">
        </div>
        <div class="cont-cut" v-if="tabSelect == 1">
          <div class="item-cut">
            <div class="cont-img">
              <img class="type" src="@/assets/images/game/goods_17.png" alt="">
            </div>
            <span class="num">{{ countDeed }}/1</span>
            <span class="name">{{ $t('deed') }}</span>
          </div>
          <div class="item-cut">
            <div class="cont-img">
              <img class="type" src="@/assets/images/game/goods_11.png" alt="">
            </div>
            <span class="num">{{ countFertilizer }}/5</span>
            <span class="name">{{ $t('fertilizer') }}</span>
          </div>
        </div>
        <div class="cont-cut" v-if="tabSelect == 2">
          <div class="item-cut" @click="selectCompoundLandHandler(1)">
            <div class="cont-img">
              <img class="land" v-if="countLand1.landId" :src="getLandImage(countLand1.level)" alt="">
              <img class="type" v-else src="@/assets/images/game/icon_add_yellow.png" alt="">
            </div>
            <span class="num">{{ countLand1.landId ? '1' : '0' }}/1</span>
            <span class="name">{{ $t('land') }}</span>
          </div>
          <div class="item-cut" @click="selectCompoundLandHandler(2)">
            <div class="cont-img">
              <img class="land" v-if="countLand2.landId" :src="getLandImage(countLand2.level)" alt="">
              <img class="type" v-else src="@/assets/images/game/icon_add_yellow.png" alt="">
            </div>
            <span class="num">{{ countLand2.landId ? '1' : '0' }}/1</span>
            <span class="name">{{ $t('land') }}</span>
          </div>
        </div>
        <div class="cont-btn" @click="submitCompoundHandler">
          <span class="submit">{{ $t('confirm_the_synthesis') }}</span>
        </div>
        <div class="cont-tip">
          <img class="bg-tip" src="@/assets/images/game/bg_notice_tip.png" alt="">
          <span class="tip">{{ $t('synthetic_rules') }}:</span>
        </div>
        <span class="desc">{{ $t('land_rule') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showLandHomeHandler()" alt="">
    </div>

    <PopSaleSetting v-if="showSale" :id="currLand.id" :sellFeeRate="info.sellFeeRate || 0"
      @success="receivePriceHandler" @close="switchSaleHandler" />
    <PopRentSetting v-if="showRent" :id="currLand.id" :ratio-list="ratioList" @success="receiveRentHandler"
      @close="switchRentHandler" />
    <PopLandSelect v-if="showPopLandSelect" :mode="2" @success="selectLandHandler" @close="switchSelectLandHandler" />
    <PopLandCutivated v-if="showPopRaiseLand" :land-info="currLand" @success="raiseLandHandler"
      @close="switchRaiseLandHandler" />

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getLandImage } from '@/utils/loadImages';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import PopSaleSetting from '@/views/game/pop/PopSaleSetting.vue';
import PopRentSetting from '@/views/game/pop/PopRentSetting.vue';
import PopLandSelect from '@/views/game/pop/PopLandSelect.vue';
import PopLandCutivated from '@/views/game/pop/PopLandCutivated.vue';

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
const router = useRouter();
const tabSelect = ref(1)
const step = ref(1)
const list = ref([])
const listSell = ref([])
const listRent = ref([])
const subTabSelect = ref(1)
const currLand = ref({})
let currLandIds = ''
const showSale = ref(false)
const showRent = ref(false)
const ratioList = ref([0])

let countDeed = ref(0)
let countFertilizer = ref(0)
const showPopLandSelect = ref(false)
const showPopRaiseLand = ref(false)
const countLand1 = ref({})
const countLand2 = ref({})
let receiveLandNo = 1 //1,2
const isZh = ref(false)
const page = ref(1)
let pageMax = 1

onMounted(() => {
  getList(1)
  // getToolList()
  isZh.value = localStorage.getItem('language') == 'zh'
  const ratio1 = ((parseFloat(props.info.rentOne) * 100) || 0).toFixed(1)
  const ratio2 = ((parseFloat(props.info.rentTwo) * 100) || 0).toFixed(1)
  const ratio3 = ((parseFloat(props.info.rentThree) * 100) || 0).toFixed(1)
  ratioList.value = [ratio1]
});

function switchTabHandler(index) {
  if (tabSelect.value != index) {
    tabSelect.value = index
  }
}
function switchSubTabHandler(index) {
  if (subTabSelect.value != index) {
    subTabSelect.value = index
    page.value = 1
    getList(1)
  }
}
function submitMultiHandler() {
  const temp = []
  if (subTabSelect.value == 2) {
    listSell.value.map((o, i) => {
      if (o.check) {
        temp.push(o)
      }
    })
  } else if (subTabSelect.value == 3) {
    listRent.value.map((o, i) => {
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
    } else if (subTabSelect.value == 3) {
      showRent.value = true
    }
    currLandIds = ids
    console.log(currLandIds)
  } else {
    showToast(t('please_select_land'))
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
function showLandDetailHandler(land, index) {
  // console.log(land)
  currLand.value = land
  step.value = 2
}
function selectSellHandler(land, index) {
  listSell.value[index].check = !land.check
}
function selectRentHandler(land, index) {
  listRent.value[index].check = !land.check
}
function switchSelectLandHandler() {
  showPopLandSelect.value = !showPopLandSelect.value
}
function switchRaiseLandHandler() {
  showPopRaiseLand.value = !showPopRaiseLand.value
}
function selectLandHandler(params) {
  showPopLandSelect.value = false
  if (receiveLandNo == 1) {
    countLand1.value = params
  } else if (receiveLandNo == 2) {
    countLand2.value = params
  }
  console.log(params)
}
function raiseLandHandler(params) {
  showPopRaiseLand.value = false
  page.value = 1
  getList(1)
}
function selectCompoundLandHandler(no) {
  receiveLandNo = no
  showPopLandSelect.value = true
}
function submitCompoundHandler() {
  if (tabSelect.value == 1) {
    if (countDeed.value >= 1 && countFertilizer.value >= 5) {
      compoundLand(1, 0, 0)
    } else {
      showToast(t('goods_not_enough'))
    }
  } else if (tabSelect.value == 2) {
    const id1 = countLand1.value.landId
    const id2 = countLand2.value.landId
    if (id1 == id2) {
      showToast(t('please_select_different_land'))
      return
    }
    if (id1 && id2) {
      compoundLand(2, id1, id2)
    } else {
      showToast(t('please_select_land'))
    }
  }
}
function landCompoundHandler() {
  step.value = 3
}
function showLandHomeHandler() {
  step.value = 1
}
function switchSaleHandler() {
  showSale.value = !showSale.value
}
function switchRentHandler() {
  showRent.value = !showRent.value
}
function toOtherHandler(address) {
  if (address) {
    router.push({ path: '/game2', query: { address } });
  }
}
function receivePriceHandler(e) {
  showSale.value = false
  step.value = 1
  console.log(e)
  if (subTabSelect.value == 1) {
    sellLand(e.price)
  } else {
    sellMultiLand(e.price)
  }
}
function receiveRentHandler(e) {
  showRent.value = false
  step.value = 1
  // console.log(e)
  // rentLand(0)
  if (subTabSelect.value == 1) {
    rentLand(e.rate)
  } else {
    rentMultiLand(e.rate)
  }
}
function offLandHandler() {
  offLand()
}
function offRentHandler() {
  receiveLand()
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

function parseList(list) {
  currLandIds = ''
  const temp1 = []
  const temp2 = []
  list.map((o, i) => {
    // if (o.status == '0' && o.one == '1') {
    //   o['check'] = false
    //   temp1.push(o)
    // }
    // if (o.status == '1' && o.two == '1') {
    //   o['check'] = false
    //   temp2.push(o)
    // }
    o['check'] = true
    temp1.push(o)
    temp2.push(o)
  })
  listSell.value = temp1
  listRent.value = temp2
}

async function getList(page) {
  proxy.$showLoading()
  let status = '0'
  if (subTabSelect.value == 1) {
    status = '0'
  } else if (subTabSelect.value == 2) {
    status = '100'
  } else if (subTabSelect.value == 3) {
    status = '1'
  }
  const res = await gameModel.userLand(page, status)
  if (res.ok) {
    list.value = res.data.list
    if(parseInt(res.data.count) != 0){
      pageMax = Math.ceil(parseInt(res.data.count) / 100) || 1
    }    
    parseList(res.data.list)
  }
  proxy.$hideLoading()
}
async function getToolList() {//合成关闭，暂时弃用，方法内逻辑不可直接使用
  proxy.$showLoading()
  let temp1 = 0
  let temp2 = 0
  const res = await gameModel.userBackList()
  if (res && res.ok) {
    res.data.list.map((o, i) => {
      if (o.num == '17') {
        temp1++
      } else if (o.num == '11') {
        temp2++
      }
    })
  }
  countDeed.value = temp1
  countFertilizer.value = temp2
  proxy.$hideLoading()
}
async function sellMultiLand(amount) {
  proxy.$showLoading()
  const landIds = currLandIds
  const res = await gameModel.sell(0, landIds, 1, 3, amount)
  if (res.ok) {
    showToast(t('sell_success'))
    page.value = 1
    getList(1)
  }
  proxy.$hideLoading()
}
async function sellLand(amount) {
  proxy.$showLoading()
  const id = currLand.value.id
  const res = await gameModel.sell(id, '', 1, 3, amount)
  if (res.ok) {
    showToast(t('sell_success'))
    page.value = 1
    getList(1)
  }
  proxy.$hideLoading()
}
async function offLand() {
  proxy.$showLoading()
  const id = currLand.value.id
  const res = await gameModel.sell(id, '', 2, 3, 0)
  if (res.ok) {
    showToast(t('off_the_shelves_success'))
    page.value = 1
    getList(1)
    step.value = 1
  }
  proxy.$hideLoading()
}
async function rentMultiLand(rate) {
  proxy.$showLoading()
  const landIds = currLandIds
  const res = await gameModel.rentLand(1, 0, landIds, rate)
  if (res.ok) {
    showToast(t('rent_success'))
    page.value = 1
    getList(1)
    step.value = 1
  }
  proxy.$hideLoading()
}
async function rentLand(rate) {
  proxy.$showLoading()
  const id = currLand.value.id
  const res = await gameModel.rentLand(1, id, '', rate)
  if (res.ok) {
    showToast(t('rent_success'))
    getList(1)
    step.value = 1
  }
  proxy.$hideLoading()
}
async function receiveLand() {
  proxy.$showLoading()
  const id = currLand.value.id
  const rate = 1
  const res = await gameModel.rentLand(2, id, '', rate)
  if (res.ok) {
    showToast(t('off_the_shelves_success'))
    page.value = 1
    getList(1)
    step.value = 1
  }
  proxy.$hideLoading()
}
async function compoundLand(num, landOneId, landTwoId) {
  proxy.$showLoading()
  const res = await gameModel.getLand(num, landOneId, landTwoId)
  if (res.ok) {
    showToast(t('synthesis_uccess'))
    page.value = 1
    getList(1)
    getToolList()
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

    .list-sub {
      position: absolute;
      left: 30px;
      top: 40px;
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
        margin-right: 42px;
      }

      .select-bg {
        background-color: #f7d961 !important;
      }
    }

    .list-land {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      max-height: 480px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      padding-left: 25px;

      .item-land {
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
        }

        .item-border2 {
          width: 85px;
          height: 85px;
          border: 1px solid #f8da61;
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

        .land-id {
          font-size: 12px;
          color: #000;
          position: absolute;
          bottom: 0px;
          left: 16px;
          font-weight: bold;
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

    .land-detail {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
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

      .land-id {
        font-size: 18px;
        font-weight: bold;
        align-self: center;
      }

      .cont-img {
        position: relative;
        height: 90px;
        margin-top: 10px;

        .land-img {
          width: 170px;
          position: absolute;
          left: 30px;
          top: 0;
        }

        .fer {
          width: 90px;
          height: 24px;
          background-color: rgba(248, 218, 97, 0.8);
          border: 1px solid #666;
          font-size: 12px;
          padding-right: 5px;
          line-height: 24px;
          text-align: end;
          position: absolute;
          right: 0;
          top: 10px;
        }

        .level {
          width: 80px;
          height: 24px;
          background-color: rgba(228, 210, 252, 0.8);
          border: 1px solid #8951cb;
          font-size: 12px;
          padding-right: 5px;
          line-height: 24px;
          text-align: end;
          position: absolute;
          right: 0;
          top: 45px;
        }
      }

      .cont-num {
        display: flex;

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

      .desc {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        word-wrap: break-word;
        margin-bottom: 10px;
        overflow-y: scroll;
      }

      .cont-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: auto;

        .cont-short {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .btn-short {
            width: 110px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8da61;
            border: 1px solid #000;
            border-radius: 4px;
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
            margin: 0 5px;
          }
        }

        .btn-submit {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #93efae;
          border: 1px solid #000;
          border-radius: 4px;
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
        }

        .btn-submit2 {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8da61;
          border: 1px solid #000;
          border-radius: 4px;
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
        }

        .btn-submit3 {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ed8582;
          border: 1px solid #000;
          border-radius: 4px;
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
        }
      }


    }
  }

  .cont-compound {
    position: relative;

    .bg {
      width: 300px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 15px;
    }

    .compound-detail {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      right: 0;
      top: 55px;
      padding: 0 20px;

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

      .cont-tab {
        width: 220px;
        height: 36px;
        position: relative;
        align-self: center;
        margin-top: 20px;

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
          justify-content: space-around;
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
          }
        }

      }

      .cont-img {
        position: relative;
        height: 90px;
        margin-top: 10px;

        .land-img {
          width: 170px;
          position: absolute;
          left: 40px;
          top: 0;
        }
      }

      .cont-cut {
        display: flex;
        justify-content: space-evenly;

        .item-cut {
          display: flex;
          flex-direction: column;
          align-items: center;

          .cont-img {
            width: 45px;
            height: 45px;
            border: 2px solid #f8da61;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fdfebe;

            .type {
              height: 30px;
            }

            .land {
              width: 45px;
            }
          }

          .num {
            font-size: 12px;
            color: #333;
            margin-top: 4px;
          }

          .name {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }

      .cont-btn {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8da61;
        border: 1px solid #000;
        border-radius: 4px;
        margin-top: 10px;

        .submit {
          font-size: 18px;
          font-weight: bold;
        }
      }

      .cont-tip {
        position: relative;
        margin-top: 10px;

        .bg-tip {
          height: 20px;
          width: 100px;
        }

        .tip {
          position: absolute;
          left: 8px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 10px;
        }
      }

      .desc {
        width: 100%;
        font-size: 12px;
        margin-top: 5px;
        word-wrap: break-word;
        height: 100px;
        overflow-y: scroll;
      }
    }
  }

}
</style>