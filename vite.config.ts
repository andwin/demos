import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import { sync } from "glob"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      configFile: '../svelte.config.js',
    }),
  ],
  base: '/demos/',
  root: path.join(__dirname, "src"),
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
      input: sync('src/**/*.html'),
    },
  },
})
