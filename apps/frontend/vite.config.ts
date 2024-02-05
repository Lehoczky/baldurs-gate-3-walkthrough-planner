import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/frontend",
  server: {
    port: 4200,
    host: "localhost",
  },
  preview: {
    port: 4300,
    host: "localhost",
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("swiper-"),
        },
      },
    }),
    nxViteTsPaths(),
    Components({
      dirs: ["src/app/components"],
      dts: "src/components.d.ts",
    }),
    AutoImport({
      imports: ["vue", "pinia"],
      dirs: [],
      dts: "src/auto-imports.d.ts",
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["data.json", "icon.png"],
      devOptions: {
        enabled: true,
      },
    }),
  ],
  build: {
    outDir: "../../dist/apps/frontend",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
