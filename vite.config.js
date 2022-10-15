import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: process.env.NODE_ENV === 'development'
  // ? '/my/dev/baseurl/'
  // : '/my/prod/baseurl/',
  // resolve: {
  //   alias: {
  //     "~": path.resolve(__dirname, "node_modules"),
  //     "@": path.resolve(__dirname, "src"),
  //   },
  // },
  build: {
    chunkSizeWarningLimit: 1600,
  },

})
