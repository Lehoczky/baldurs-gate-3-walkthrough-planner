// @ts-expect-error: internal nx types
import { createGlobPatternsForDependencies } from "@nx/vue/tailwind"
import { join } from "path"

import { Config } from "tailwindcss"

module.exports = {
  content: [
    join(__dirname, "index.html"),
    join(__dirname, "src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
