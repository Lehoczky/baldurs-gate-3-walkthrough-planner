import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"

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
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),
    AutoImport({
      imports: ["vue", "pinia"],
      dirs: [],
      dts: "src/auto-imports.d.ts",
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
