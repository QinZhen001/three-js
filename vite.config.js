import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


const { name = "" } = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  // const { BASE_URL = '/' } = env

  return {
    base: process.env.NODE_ENV === "production" ? `/${name}/` : "",
    plugins: [react()],
    server: {
      //使用IP能访问
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        "assets": resolve(__dirname, './assets'),
      }
    },
  }

})
