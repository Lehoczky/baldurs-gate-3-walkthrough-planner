// @ts-check
import { configLehoczkyVue } from "@lehoczky/eslint-config-vue"
import { defineConfig } from "eslint/config"

export default defineConfig([
  configLehoczkyVue(),
  {
    rules: {
      "vue/no-v-html": "off",
    },
  },
])
