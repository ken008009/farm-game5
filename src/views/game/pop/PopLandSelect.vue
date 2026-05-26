<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()" v-show="step == 1">
      <img class="bg" :src="$t('image_game.bg_land')" alt="">
      <div class="list-land">
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
      <div class="cont-bottom">
        <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
        <span class="num">{{ page }}</span>
        <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
      </div>
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
        <div class="cont-img">
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
        <div class="btn-compound" @click="selectLandHandler()">
          <span class="name">{{ $t('select') }}</span>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="showLandHomeHandler()" alt="">
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getLandImage } from '@/utils/loadImages';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const emit = defineEmits(['close', 'success'])
const step = ref(1)
const list = ref([])
const currLand = ref({})
const page = ref(1)
let total = 0

const props = defineProps({
  mode: {
    type: Number,
    required: true
  },
})

onMounted(() => {
  page.value = 1
  getList(1)  
});

function closeHandler() {
  emit('close', true)
}
function skipPage(num) {
  if(num == 1) {
    if(list.value.length + ((page.value - 1) * 100) >= total) {
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
function showLandDetailHandler(land, index) {
  currLand.value = land
  step.value = 2
}
function showLandHomeHandler() {
  step.value = 1
}
function selectLandHandler() {
  const landId = currLand.value.id
  const level = currLand.value.level
  emit('success', { landId, level })
}
function notDo() { }

async function getList(page) {
  proxy.$showLoading()
  let temp = []
  if (props.mode == 2) {
    const res = await gameModel.userLand(1)
    if (res.ok) {
      res.data.list.map((o, i) => {
        if (o.three == '1') {
          temp.push(o)
        }
      })
    }
  } else {
    const res = await gameModel.userLand(page, '100')
    temp = res.data.list
    total = parseInt(res.data.count) || 0
  }

  list.value = temp
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

    .list-land {
      position: absolute;
      top: 50px;
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

      .btn-compound {
        width: 240px;
        height: 40px;
        background-color: #f8da61;
        border: 1px solid #000;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;

        .name {
          font-weight: bold;
        }
      }
    }
  }

}
</style>