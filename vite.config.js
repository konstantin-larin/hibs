import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";
// https://vite.dev/config/
export default defineConfig({
  base: '/hibs/',
  plugins: [react()],
  resolve: {
    alias: {
      '@images': resolve('src/assets/images'),        // Путь до папки assets
      '@fonts': resolve('src/assets/fonts'),
      '@styles': resolve('src/index.scss'),
      '@common': resolve('src/components/common'), // Путь до папки components
      '@hooks': resolve('src/components/hooks'),
      '@layout': resolve('src/components/layout'),
      '@pages': resolve('src/components/pages'),
      '@protected': resolve('src/components/protected'),
      '@contexts': resolve('src/contexts'),    // Путь до папки contexts
    }
  }
})
