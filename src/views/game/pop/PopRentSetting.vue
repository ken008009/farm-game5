<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()" v-if="true">
      <img class="bg" :src="$t('image_game.bg_rent_setting')" alt="">
      <div class="cont-info">
        <span class="id">ID:#{{ id }}</span>
        <div class="cont-rate">
          <span class="name">{{ $t('harvest_ratio') }}:</span>
          <div class="select-ratio">
            <img class="bg" @click="showListHandler" src="@/assets/images/game/icon_bg_ratio.png" alt="">
            <span class="ratio" >{{ ratioList[selectIndex] }}%</span>
            <div class="list-ratio" v-if="showList">
              <span class="item-ratio" @click="selectHandler(index)" v-for="(item, index) in ratioList">{{ item
                }}%</span>
            </div>
          </div>
        </div>
        <span class="btn-confirm" @click="submitHandler()">{{ $t('determine') }}</span>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  ratioList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const selectIndex = ref(0)
const showList = ref(false)

// const ratioList = [1]
onMounted(() => {
});

function showListHandler() {
  showList.value = true
}
function selectHandler(index) {
  selectIndex.value = index
  showList.value = false
}
function submitHandler() {
  // let rate = selectIndex.value || 0
  // rate = rate + 1
  // emit('success', { rate })
  emit('success', { rate: 1 })
}
function closeHandler() {
  emit('close', true)
}
function notDo() {

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
      top: 60px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;


      .id {
        font-weight: bold;
        align-self: center;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      .cont-rate {
        display: flex;

        .name {
          font-size: 16px;
          margin-left: 30px;
          margin-right: 10px;
        }

        .select-ratio {
          position: relative;
          width: 95px;
          height: 26px;

          .bg {
            width: 95px;
            height: 26px;
            position: absolute;
            left: 0;
            top: 0;
          }

          .ratio {
            height: 26px;
            position: absolute;
            left: 10px;
            top: 0;
            font-size: 12px;
            text-align: center;
            line-height: 26px;
          }

          .list-ratio {
            display: flex;
            flex-direction: column;
            width: 95px;
            position: absolute;
            left: 0px;
            top: 30px;
            font-size: 12px;
            background-color: #fff;
            border: 1px solid #000;
            border-radius: 4px;

            .item-ratio {
              height: 26px;
              line-height: 26px;
              padding-left: 10px;
            }
          }
        }
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
        margin-top: 100px;
        color: #000;
        font-weight: bold;
      }

    }
  }

}
</style>