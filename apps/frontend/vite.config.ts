import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import vue from "@vitejs/plugin-vue"
import { visualizer } from "rollup-plugin-visualizer"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  root: __dirname,
  base:
    process.env.NX_TASK_TARGET_CONFIGURATION === "development"
      ? "/"
      : "/baldurs-gate-3-walkthrough-planner/",
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
    vue(),
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
        // enabled: true,
      },
    }),
    visualizer({
      // open: true,
      filename: "tmp/stats.html",
    }),
  ],
  build: {
    outDir: "../../dist/apps/frontend",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
