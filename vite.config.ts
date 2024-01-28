import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "pinia"],
      dirs: [],
      dts: "src/autoImports.ts",
    }),
  ],
})
