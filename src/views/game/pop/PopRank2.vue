<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-income" @click="notDo()" v-if="true">
      <img class="bg" :src="$t('image_game.bg_rank')" alt="">
      <div class="cont-list">
        <div class="cont-tab">
          <div class="line"></div>
          <div class="cont-input">
            <input class="input-addr" v-model="searchKey" type="text"></input>
            <span class="search" @click="searchHandler">{{ $t('search') }}</span>
          </div>
          <!-- <div class="list-tab">
            <div class="item-tab" @click="switchTabHandler(1)">
              <img class="tab-bg" v-if="tabSelect == 1" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 1 ? 'select' : '']">{{ $t('world') }}</span>
            </div>
            <div class="item-tab" @click="switchTabHandler(2)">
              <img class="tab-bg" v-if="tabSelect == 2" src="@/assets/images/game/icon_tab_select.png" alt="">
              <img class="tab-bg" v-else src="@/assets/images/game/icon_tab.png" alt="">
              <span class="tab-name" :class="[tabSelect == 2 ? 'select' : '']">{{ $t('my_friend') }}</span>
            </div>
          </div> -->
        </div>
        <div class="cont-title" v-if="tabSelect == 1">
          <span class="menu1">{{ $t('rank') }}</span>
          <span class="menu3">{{ $t('user_name') }}</span>
          <!-- <span class="menu2">ISPAY</span> -->
          <span class="menu1">{{ $t('manor') }}</span>
        </div>
        <div class="list-income" v-if="tabSelect == 1">
          <div class="item-income" :class="[item.address == addr ? 'mine' : '']" v-for="(item, index) in list">
            <span class="num1">{{ index + 1 }}</span>
            <span class="num3">{{ maskString(item.address) }}</span>
            <!-- <span class="num2">{{ parseInt(item.git) }}</span> -->
            <div class="cont-link">
              <img class="icon-link" v-if="item.address != addr" @click="toOtherHandler(item.address)"
                src="@/assets/images/game/icon_home_mini.png" alt="">
              <div class="point" v-if="item.red === '1'"></div>
            </div>
          </div>
        </div>
        <div class="cont-nodata" v-if="tabSelect == 2">
          <span class="tip">{{ $t('not_yet_open') }}</span>
        </div>
        <div class="cont-bottom">
          <span class="prev" @click="skipPage(-1)">{{ $t('prev') }}</span>
          <span class="num">{{ $t('skip') }}</span>
          <!-- <span class="num">{{ page }}</span> -->
          <input class="input-num"  type="number" v-model="page" @blur="changePageHandler"/>
          <span class="next" @click="skipPage(1)">{{ $t('next') }}</span>
        </div>
      </div>
      <img class="icon-close" src="@/assets/images/game/icon_close.png" @click="closeHandler()" alt="">
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getAddr } from '@/utils/auth';
import { maskString } from '@/utils/util';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';
import { get } from 'lodash';

const { proxy } = getCurrentInstance();
const { t } = useI18n()
const router = useRouter();
const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const step = ref(1)
const list = ref([])
const tabSelect = ref(1)
const addr = ref('')
const searchKey = ref('')
const page = ref(1)
let pageMax = 1


onMounted(() => {
  addr.value = getAddr()
  getList(1)
});
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


  // if(num == 1) {
  //   if(list.value.length + ((page.value - 1) * 20) >= total) {
  //     return
  //   }
  // }
  // if (num == -1 && page.value == 1) {
  //   return
  // }
  // const temp = page.value + num
  // if (temp >= 1) {
  //   page.value = temp
  //   getList(temp)
  // }
}
function switchTabHandler(index) {
  if (tabSelect.value != index) {
    tabSelect.value = index
  }
}
function searchHandler() {
  page.value = 1
  getList(1)
}
function toOtherHandler(address) {
  router.push({ path: '/game2', query: { address } });
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList(page) {
  const address = searchKey.value || ''
  proxy.$showLoading()
  const res = await gameModel.userOrderListTwo(page, address)
  if (res && res.ok) {
    list.value = res.data.list
    if(parseInt(res.data.count) != 0){
      pageMax = Math.ceil(parseInt(res.data.count) / 20) || 1
    }
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

  .cont-income {
    position: relative;

    .bg {
      width: 310px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .cont-list {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .cont-tab {
        position: relative;
        width: 260px;
        height: 42px;
        margin-top: 20px;
        margin-left: 25px;

        .line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background-color: #f8da61;
        }
        .cont-input {
          display: flex;
          align-items: center;
          .input-addr {
            flex: 1;
            background-color: transparent;
            border: 1px solid #f9dc67;
            border-radius: 5px;
            outline: none;
            color: inherit;
            height: 32px;
            font-size: 14px;            
          }
          .search {
            width: 64px;
            height: 32px;
            background-color: #f9dc67;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            font-weight: bold;
            margin-left: 4px;
          }
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

            .select {
              color: #ed802b !important;
            }
          }
        }

      }

      .cont-title {
        display: flex;
        padding: 0 20px;
        margin-top: 15px;

        .menu1 {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }

        .menu2 {
          flex: 2;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }

        .menu3 {
          flex: 3;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }
      }

      .list-income {
        height: 420px;
        margin-top: 10px;
        padding: 0 20px;
        overflow-y: scroll !important;

        .mine {
          border: 1px solid #f9da61 !important;
          background-color: #fff !important;
        }

        .item-income {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          border: 1px solid #000;
          border-radius: 8px;
          margin-bottom: 4px;

          .num1 {
            flex: 1;
            font-size: 12px;
            text-align: center;
          }

          .num2 {
            flex: 2;
            font-size: 12px;
            text-align: center;
          }

          .num3 {
            flex: 3;
            font-size: 12px;
            text-align: center;
          }

          .cont-link {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-link {
              width: 16px;
              height: 16px;
            }
            .point {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background-color: red;
              margin-left: -4px;
              margin-top: -14px;
            }
          }
        }
      }

      .cont-nodata {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 80px;

        .tip {
          font-size: 20px;
          font-weight: bold;
          color: #f9db67;
        }
      }

      .cont-bottom {
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
  }
}
</style>