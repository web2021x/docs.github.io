import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  plugins: [vue(),AutoImport({
    imports: ['vue'], dts: 'src/auto-import.d.ts'
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "zclib",
      fileName: (format) => `zc-lib.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "ant-design-vue"],
      output: {
        globals: {
          vue: "Vue",
          "ant-design-vue": "antDesignVue",
        },
        exports: "named",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 允许 Less 内联 JS
      },
    },
  },
});
