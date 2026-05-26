<template>
  <div class="bg-pop">
    <div class="cont-pop" @click="notDo()">
      <img class="bg" :src="$t('image_game.bg_notice')" alt="">
      <div class="list-notice">
        <div class="item-notice" v-for="(item, index) in list">
          <div class="cont-title">
            <span class="title">{{ $t('my_game_log') }}</span>
            <span class="time">{{ item.createdAt }}</span>
          </div>
          <span class="desc">{{ isZh ? item.content : item.eContent }}</span>
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
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { gameModel } from '@/api/model/gameModel';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const emit = defineEmits(['close', 'success'])

const list = ref([])
const isZh = ref(false)
const page = ref(1)
let pageMax = 1

onMounted(() => {
  getList(1)
  isZh.value = localStorage.getItem('language') == 'zh'
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
}
function closeHandler() {
  emit('close', true)
}
function notDo() { }

async function getList(page) {
  proxy.$showLoading()
  const res = await gameModel.userNoticeList(page)
  if (res.ok) {
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

  .cont-pop {
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

    .list-notice {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      height: 440px;
      overflow: scroll;

      .item-notice {
        display: flex;
        flex-direction: column;
        width: 268px;
        border: 1px solid #000;
        border-radius: 5px;
        background-color: #fff;
        margin-left: 16px;
        box-sizing: border-box;
        padding: 8px;
        margin-bottom: 4px;

        .cont-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;

          .title {
            font-size: 14px;
            font-weight: bold;
          }

          .time {
            font-size: 12px;
            color: #c3c3c3;
          }
        }

        .desc {
          font-size: 14px;
        }
      }
    }
    .cont-bottom {
      position: absolute;
      top: 500px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      font-size: 12px;
      text-decoration: underline;
      padding: 0 20px;

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
</style>