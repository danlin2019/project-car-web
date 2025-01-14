import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  // 開發中 還是產品路徑
  base: process.env.NODE_ENV === 'production' ? '/project-car-web/' : '/',
  plugins: [react(),svgr()],
  server:{
    port:3000,
  }
})
