<template>
  <div class="bg-pop">
    <div class="cont-detail" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_cultivated')" alt="">
      <div class="land-detail">
        <span class="land-id">#{{ landInfo.id }}</span>
        <div class="cont-img">
          <img class="land-img" :src="getLandImage(landInfo.level)" alt="">
          <span class="fer">{{ $t('fertility') }}:{{ landInfo.health }}</span>
          <span class="level">{{ $t('level') }}:{{ landInfo.level }}</span>
        </div>
        <div class="cont-num">
          <div class="item-num">
            <span class="num">{{ landInfo.outRate ? landInfo.outRate * 100 : 0 }}%</span>
            <span class="type">{{ $t('production_increases') }}</span>
          </div>
          <div class="item-num">
            <span class="num">{{ landInfo.perHealth }}</span>
            <span class="type">{{ $t('plant_cost') }}</span>
          </div>
        </div>
        <div class="cont-cut">
          <div class="item-cut" @click="selectGoodsHandler()">
            <div class="cont-img">
              <img class="land" v-if="currGoods.id" :src="getGoodsImage(currGoods.num)" alt="">
              <img class="type" v-else src="@/assets/images/game/icon_add_yellow.png" alt="">
            </div>
            <span class="num">{{ currGoods.id ? '1' : '0' }}/1</span>
            <span class="name">{{ $t('fertilizer') }}</span>
          </div>
        </div>
        <div class="cont-btn">
          <span class="btn-submit2" @click="submitHandler()">{{ $t('cultivate') }}</span>
        </div>

      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>

    <PopGoodsSelect v-if="showPopGoodsSelect" :type="{ status: 2 }" @success="receiveGoodsHandler"
      @close="switchSelectLandHandler" />

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getLandImage, getGoodsImage } from '@/utils/loadImages';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import PopGoodsSelect from '@/views/game/pop/PopGoodsSelect.vue';

import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const { t } = useI18n()

const props = defineProps({
  landInfo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const step = ref(1)

let currGoods = ref({})
const showPopGoodsSelect = ref(false)

onMounted(() => {
});

function switchSelectLandHandler() {
  showPopGoodsSelect.value = !showPopGoodsSelect.value
}
function receiveGoodsHandler(params) {
  showPopGoodsSelect.value = false
  console.log(params)
  currGoods.value = params
}
function selectGoodsHandler() {
  showPopGoodsSelect.value = true
}
function submitHandler() {
  if (currGoods.value && currGoods.value.id) {
    raiseLand()
  }

}
function closeHandler() {
  emit('close', true)
}
function notDo() { }


async function raiseLand() {
  proxy.$showLoading()
  const landId = props.landInfo.id
  const id = currGoods.value.id
  const res = await gameModel.landAddOutRate(landId, id)
  if (res.ok) {
    showToast(t('synthesis_uccess'))
    emit('success', res.data)
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

  .cont-detail {
    position: relative;

    .bg {
      width: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 20px;
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
        margin-top: 60px;
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
        margin-top: 30px;

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

      .cont-cut {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;

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

      .desc {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        word-wrap: break-word;
        margin-bottom: 10px;
      }

      .cont-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;

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
}
</style>