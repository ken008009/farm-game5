import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'layout',
    //   redirect: '/home',
    //   component: () => import('@/layout/index.vue'),
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'Home',
    //       component: () => import('@/views/Home.vue')
    //     },
    //     {
    //       path: 'projects',
    //       name: 'Projects',
    //       component: () => import('@/views/projects/Projects.vue')
    //     },
    //     {
    //       path: 'library',
    //       name: 'Library',
    //       component: () => import('@/views/library/Library.vue')
    //     },
    //   ],
    // },
    // {
    //   path: '/home',
    //   name: 'home',
    //   // redirect: '/game',
    //   component: () => import('@/views/Home.vue')
    // },
    // {
    //   path: '/',
    //   name: 'game',
    //   component: () => import('@/views/game/Game.vue')
    // },
    {
      path: '/',
      // redirect: '/game',
      name: 'Game',
      component: () => import('@/views/game/Game.vue')
    },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: () => import('@/views/Home.vue')
    // },
    { 
      path: '/home', 
      beforeEnter() { 
        window.location.href = '/home/Magic_Manor.html'; 
      }
    },    
    // {
    //   path: '/game',
    //   name: 'Game',
    //   component: () => import('@/views/game/Game.vue')
    // },
    {
      path: '/game2',
      name: 'Game2',
      component: () => import('@/views/game/GameOther.vue')
    },
  ]
})

export default router
