<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_store')" alt="">
      <div class="list-seed" v-if="status == 1">
        <div class="item-seed" v-for="(item, index) in list" @click="showDetailHandler(item)">
          <div class="item-border">
            <img class="icon-seed" :src="getGoodsImage(item.num)" alt="">
            <span class="name">{{ $t(`name_${item.num}`) }}</span>
            <span class="yield">{{ $t('yield') }}:{{ item.outMax }}</span>
          </div>
          <span class="seed-id">#{{ item.id }}</span>
          <img class="status" v-if="item.status == '4'" src="@/assets/images/game/icon_sale.png" alt="">
        </div>
      </div>
      <div class="list-tool" v-if="status == 2">
        <div class="item-tool" v-for="(item, index) in list" @click="showDetailHandler(item)">
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
          <span class="seed-id">#{{ item.id }}</span>
          <img class="status" v-if="item.status == '4'" src="@/assets/images/game/icon_sale.png" alt="">
        </div>
      </div>
      <div class="cont-bottom">
        <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
        <span class="num">{{ page }}</span>
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
        <div class="cont-img" v-if="status == 1">
          <img class="seed-img" :src="getGoodsImage(currGoods.num)" alt="">
          <img class="blind-img" v-if="false" src="@/assets/images/game/icon_blind.png" alt="">
          <span class="fer">{{ $t('grown') }}:{{ getHour(currGoods.time) }}H</span>
          <span class="level">{{ $t('yield') }}:{{ currGoods.outMax }}</span>
        </div>
        <div class="cont-img" v-if="status == 2">
          <img class="blind-img" v-if="currGoods.num == '16'" src="@/assets/images/game/icon_blind.png" alt="">
          <img class="seed-img" v-else :src="getGoodsImage(currGoods.num)" alt="">
        </div>
        <span class="name" v-if="status == 1">{{ $t(`name_${currGoods.num || 1}`) }}</span>
        <div class="cont-count" v-if="status == 2">
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
            class="unit">ISPAY</span></span>
        <span class="btn-off" @click="selectHandler()">{{ $t('select') }}</span>

      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="toHomeHadler()" alt="">
    </div>

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
  type: {
    type: Object,
    required: true
  },
})
const emit = defineEmits(['close', 'success'])
const step = ref(1)
const list = ref([])
const list1 = ref([])
const list2 = ref([])
const currGoods = ref({})
const status = ref(1)
const isZh = ref(false)
const page = ref(1)
let total = 0

onMounted(() => {
  status.value = props.type.status || 1
  page.value = 1
  getList(1)  
  isZh.value = localStorage.getItem('language') == 'zh'
});
function skipPage(num) {
  console.log(total)
  if (num == 1) {
    if (list.value.length + ((page.value - 1) * 100) >= total) {
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
function showDetailHandler(item) {
  currGoods.value = item
  step.value = 2
}
function toHomeHadler() {
  step.value = 1
}
function selectHandler() {
  const type = props.type
  const id = currGoods.value.id
  const num = currGoods.value.num
  emit('success', { type, id, num })
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList(page = 1) {
  const type = props.type.status == 1 ? '2' : '1'
  const propType = props.type.num ? props.type.num : '0'
  proxy.$showLoading()
  const res = await gameModel.userBackList(page, type, propType)
  if (res && res.ok) {
    // res.data.list.map((o, i) => {
    //   if (o.status == '1' || o.status == '2') {
    //     if (o.type == '1') {
    //       temp1.push(o)
    //     } else if (o.type == '2') {
    //       if (props.type.num) {
    //         if (props.type.num == o.num) {
    //           temp2.push(o)
    //         }
    //       } else {
    //         temp2.push(o)
    //       }
    //     }
    //   }
    // })
    // list1.value = temp1
    // list2.value = temp2
    list.value = res.data.list
    total = parseInt(res.data.count) || 0

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
        }
      }

    }

    .list-seed {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      max-height: 450px;
      overflow: scroll;
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

    .list-tool {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      max-height: 450px;
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
        font-size: 12px;
        margin-top: 5px;
        word-wrap: break-word;
        height: 80px;
      }

    }
  }
}
</style>