import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import postcssPxToViewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 允许所有IP访问
    port: 5100,
    proxy: {
      '/api': {
        target: 'https://www.ppflsc.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')      
      }
    }    
  },
  plugins: [
    vue(),
  ],
  base: '/game/',
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          viewportWidth: 375,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: ['.ignore', '.no-convert', 'hairlines', /^el-/, /^van-/],
          minPixelValue: 2,
          mediaQuery: false,
          exclude: [/node_modules\/vant/],
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
