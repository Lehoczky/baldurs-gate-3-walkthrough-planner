import config from "@lehoczky/prettier-config"

/** @type {import("prettier").Options} */
export default {
  ...config,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./apps/frontend/tailwind.config.ts",
}
