import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@features': path.resolve(__dirname, './src/features'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@images': path.resolve(__dirname, './src/assets/images'),
    },
  },
  plugins: [react()],
} as UserConfig)
