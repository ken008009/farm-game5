<template>
  <div class="side-bar">
    <div class="cont-side side-bar-bg">
      <div class="cont-logo">logo</div>
      <div class="cont-user">
        <img class="icon-avatar" src="" alt="">
        <span class="name">LLL</span>
        <span class="login">{{ $t('login') }}</span>
      </div>
      <div class="list-menu">
        <div class="item-menu" @click="selectMenuHandler(item, index)" :class="[item.select ? 'select-menu' : '']"
          v-for="(item, index) in menuList">
          <i class="iconfont icon-menu" :class="[item.icon]"></i>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { h, reactive, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';  // 引入 useRouter

const router = useRouter();
const route = useRoute();

const { t } = useI18n()

const menuList = reactive([
  {
    select: true,
    name: t('home'),
    icon: 'icon-shouye',
    path: 'home',
  },
  {
    select: false,
    name: t('my_projects'),
    icon: 'icon-AGENTguanli',
    path: 'projects',
  },
  {
    select: false,
    name: t('library'),
    icon: 'icon-wenjianjia',
    path: 'library',
  },
])

onMounted(() => {
  checkCurrMeun()
});

function selectMenuHandler(item, index) {
  if (item.select) {
    return
  }
  menuList.forEach((o, i) => {
    if (i == index) {
      o.select = true
    } else {
      o.select = false
    }
  })
  router.replace({ path: item.path, query: {} })
}

function checkCurrMeun() {
  menuList.forEach((o, i) => {
    if (route.path.indexOf(o.path) !== -1) {
      o.select = true
    } else {
      o.select = false
    }
  })
}
</script>

<style lang="scss" scoped>
.side-bar {
  height: 100%;
  display: flex;
  flex-direction: column;

  .cont-side {
    width: 240px;
    flex: 1;
    margin: 12px 0 12px 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--color-white);
    display: flex;
    flex-direction: column;
    align-items: center;

    .cont-logo {
      margin-top: 16px;
    }

    .cont-user {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 56px;

      .icon-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-bottom: 8px;
      }

      .name {
        font-size: var(--text-primary);
        color: var(--color-text);
      }

      .login {
        font-size: var(--text-primary);
        color: var(--color-text);
      }
    }

    .list-menu {
      display: flex;
      flex-direction: column;
      margin-top: 40px;

      .select-menu {
        font-weight: bold;
        background-color: var(--color-select);

        .icon-menu {
          color: var(--color-primary) !important;
        }

        .name {
          color: var(--color-primary) !important;
        }
      }

      .item-menu {
        width: 216px;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 12px;
        margin-bottom: 4px;
        cursor: pointer;

        &:hover {
          background-color: var(--color-select);
        }

        .icon-menu {
          color: var(--color-text3);
          margin: 0 12px;
        }

        .name {
          color: var(--color-text);
        }
      }
    }
  }
}
</style>