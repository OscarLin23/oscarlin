import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/selectALL': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      },
      '/authCode': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      },
      '/verifyCode': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      },
      '/user/register': {
        target: 'http://localhost:9527',
        changeOrigin: true,
      },
    }
  }
})
