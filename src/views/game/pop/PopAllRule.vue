<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-pop" @click="notDo()">
      <img class="bg" src="@/assets/images/game/bg_common.png" alt="">
      <div class="cont-info">
        <div class="title">{{ $t('rule') }}</div>
        <div class="detail" @touchmove.stop @click.stop>{{ $t('all_rule') }}</div>
        <!-- <div class="cont-bottom">
          <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
          <span class="num">{{ page }}</span>
          <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
        </div> -->
      </div>
      <!-- <div class="cont-nodata" v-else>
        <span class="tip">{{ $t('not_yet_open') }}</span>
      </div> -->

      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { getLandImage, getGoodsImage, getPlantImage } from '@/utils/loadImages';
import { formatTime, formatTime3, maskString } from '@/utils/util';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
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
const noticeList = ref([])
let pageMax = 1
const page = ref(1)

const isZh = ref(false)

onMounted(() => {
  isZh.value = localStorage.getItem('language') == 'zh'
  noticeList.value = props.info.adminListM || []
  pageMax = noticeList.value.length
});


function closeHandler() {
  emit('close', true)
}
function skipPage(num) {
  const newPage = page.value + num
  if (newPage < 1 || newPage > pageMax) {
    return
  }
  page.value = newPage
}
function notDo() { }


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
      height: 600px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -5px;
    }

    .bg-top {
      width: 200px;
    }

    .cont-info {
      width: 320px;
      height: 600px;
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        font-size: 24px;
        font-weight: bold;
      }

      .detail {
        padding: 30px;
        font-size: 14px;
        line-height: 20px;
        height: 500px;
        overflow-y: scroll;
        box-sizing: border-box;
      }

      .cont-bottom {
        position: absolute;
        bottom: 50px;
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

      .cont-title {
        display: flex;
        width: 100%;

        .item-user {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;

          .menu {
            flex: 2;
            font-size: 14px;
            text-align: center;
          }

          .price {
            flex: 1;
            font-size: 14px;
            text-align: center;
          }
        }
      }

      .list-user {
        display: flex;
        flex-direction: column;
        height: 250px;
        overflow: scroll;
        padding: 0 20px;
        width: 100%;

        .item-user {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;

          .menu {
            flex: 2;
            font-size: 14px;
            text-align: center;
          }

          .price {
            flex: 1;
            font-size: 14px;
            text-align: center;
          }
        }
      }

      .cont-btn {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .btn-pledge {
          width: 120px;
          height: 48px;
          background-color: #f7d961;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #000;
          border-radius: 4px;
          box-sizing: border-box;
          color: #000;
          font-weight: bold;
          margin: 0 10px;
        }

        .btn-redemption {
          width: 120px;
          height: 48px;
          background-color: #ec8582;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #000;
          border-radius: 4px;
          box-sizing: border-box;
          color: #000;
          font-weight: bold;
          margin: 0 10px;
        }
      }

      .btn-game {
        width: 280px;
        height: 48px;
        background-color: #6ec98e;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        box-sizing: border-box;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }

    }

    .cont-nodata {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .tip {
        font-size: 20px;
        font-weight: bold;
        color: #f9db67;
      }
    }


  }

  .cont-staking {
    position: relative;

    .bg {
      width: 320px;
      height: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -5px;
    }

    .cont-info {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-input {
        width: 220px;
        height: 40px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 4px;
        align-self: center;
        display: flex;
        align-items: center;
        margin-top: 10px;

        .input-num {
          flex: 1;
          border: 0;
          outline: none;
          background-color: transparent;
          padding: 4px;
        }

        .input-num::placeholder {
          color: #c4c4c4;
        }

        .unit {
          margin-right: 8px;
        }
      }

      .balance {
        font-size: 14px;
        align-self: center;
        color: #000;
        font-weight: bold;
        margin-top: 10px;
      }

      .fee {
        align-self: flex-end;
        font-size: 14px;
        margin-right: 50px;
        margin-top: 10px;
        font-weight: bold;
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

  .cont-result {
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
      top: 80px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-success {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-success {
          width: 40px;
          margin-bottom: 20px;
        }

        .notice {
          font-size: 16px;
          color: #6ec98f;
        }

        .fee {
          font-size: 16px;
          color: #6ec98f;
        }
      }

      .cont-fail {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-fail {
          width: 40px;
          margin-bottom: 20px;
        }

        .notice {
          font-size: 16px;
          color: #e56a67;
        }

        .fee {
          font-size: 16px;
          color: #e56a67;
        }
      }

      .btn-confirm {
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
        color: #fff;
        font-weight: bold;
      }

    }
  }

}
</style>