<template>
  <div class="bg-pop" @click="notDo()">
    <div class="cont-login" @click="notDo()" v-if="step == 1">
      <img class="bg" :src="$t('image_game.bg_login')" alt="">
      <div class="cont-info">
        <span class="notice">{{ $t('please_visit_the_game_in_the_following_wallet') }}</span>
        <!-- <img class="login-way" src="@/assets/images/game/icon_login_bsc.png" alt=""> -->
        <div class="login-way2" @click="tpLoginHandler()">
          <img class="icon" src="@/assets/images/game/icon_ispay.png" alt="">
          <span class="name">Ispay Wallet</span>
        </div>
        <img class="login-way" @click="tpLoginHandler()" src="@/assets/images/game/icon_login_tp.png" alt="">
      </div>
    </div>
    <div class="cont-link" @click="notDo()" v-if="step == 2">
      <img class="bg" :src="$t('image_game.bg_login2')" alt="">
      <div class="cont-info">
        <span class="addr">{{ address }}</span>
        <span class="notice">{{ $t('please_set_your_neighbor') }}</span>
        <div class="cont-input">
          <textarea class="input-num" v-model="inputAddr" type="text" :placeholder="$t('please_ennter_the_neighbor_id')"></textarea>
          <!-- <input class="input-num" v-model="inputAddr" type="text" :placeholder="$t('please_ennter_the_neighbor_id')"> -->
        </div>
        <span class="btn-confirm" @click="bindAddrHandler()">{{ $t('determine') }}</span>
      </div>
    </div>
    <div class="cont-success" @click="notDo()" v-if="step == 3">
      <img class="bg" :src="$t('image_game.bg_login3')" alt="">
      <div class="cont-info">
        <span class="addr">{{ address }}</span>
        <span class="btn-confirm" @click="closeHandler()">{{ $t('determine') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed, onMounted } from 'vue';
import { userModel } from '@/api/model/userModel';
import { fetchSign, checkAccount } from '@/tools/fetchSign';
import { getToken, setToken, getAddr, setAddr, getSign, setSign } from '@/utils/auth';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const { t } = useI18n()
const route = useRoute();

defineProps({
  status: {//success,fail
    type: String,
    // required: true
  }
})
const emit = defineEmits(['close', 'success'])
const step = ref(1)
const address = ref('')
const inputAddr = ref('')


onMounted(() => {

});

function closeHandler() {
  emit('close', true)
}
function notDo() { }
function tpLoginHandler() {
  auth()
}
function bindAddrHandler() {
  if (inputAddr.value) {
    login()
  } else {
    showToast(t('address_empty'))
  }
}

async function auth() {
  await fetchSign()
  await login()
}

async function login() {
  const sign = getSign()
  let addr = getAddr()
  let code = inputAddr.value || ''
  code = code.replace(/\s/g, '');
  address.value = addr
  if (sign && addr) {
    const res = await userModel.ethAuth(addr, code, sign)
    if (res.ok) {
      step.value = 3
      setToken(res.data.token)
      emit('success', {})
    } else {
      const invite = route.query.invite || ''
      console.log(invite, 'invite_addr')
      inputAddr.value = invite
      step.value = 2
    }
  }
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

  .cont-login {
    position: relative;

    .bg {
      width: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 15px;
    }

    .cont-info {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .notice {
        font-size: 14px;
        font-weight: bold;
        align-self: center;
        color: #000;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 220px;
        word-wrap: break-word;
      }

      .login-way2 {
        width: 220px;
        height: 49px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border: 2px solid #000;
        box-sizing: border-box;
        border-radius: 4px;
        align-self: center;

        .icon {
          width: 18px;
          height: 18px;
        }

        .name {
          font-size: 16px;
          font-weight: bold;
          margin-left: 10px;
          margin-right: 16px;
        }
      }

      .login-way {
        width: 220px;
        align-self: center;
        margin-top: 10px;
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
        margin-top: 10px;
        color: #000;
        font-weight: bold;
      }

    }
  }

  .cont-link {
    position: relative;

    .bg {
      width: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 15px;
    }

    .cont-info {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .addr {
        width: 230px;
        font-weight: bold;
        align-self: center;
        text-align: center;
        word-wrap: break-word;
      }

      .cont-input {
        width: 220px;
        height: 60px;
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

      .notice {
        font-size: 14px;
        align-self: center;
        color: #000;
        margin-top: 80px;
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
        margin-top: 10px;
        color: #000;
        font-weight: bold;
      }

    }
  }

  .cont-success {
    position: relative;

    .bg {
      width: 320px;
    }

    .icon-close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: 15px;
    }

    .cont-info {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;

      .addr {
        width: 250px;
        font-weight: bold;
        align-self: center;
        text-align: center;
        word-wrap: break-word;
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

}
</style>