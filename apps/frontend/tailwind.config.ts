import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons"
// @ts-expect-error: internal nx types
import { createGlobPatternsForDependencies } from "@nx/vue/tailwind"
import { join } from "path"
import type { Config } from "tailwindcss"

const rgbVar = (prop: string) => `rgb(var(${prop}) / <alpha-value>)`

module.exports = {
  content: [
    join(__dirname, "index.html"),
    join(__dirname, "src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: rgbVar("--primary-50"),
          100: rgbVar("--primary-100"),
          200: rgbVar("--primary-200"),
          300: rgbVar("--primary-300"),
          400: rgbVar("--primary-400"),
          500: rgbVar("--primary-500"),
          600: rgbVar("--primary-600"),
          700: rgbVar("--primary-700"),
          800: rgbVar("--primary-800"),
          900: rgbVar("--primary-900"),
          950: rgbVar("--primary-950"),
        },
        surface: {
          0: rgbVar("--surface-0"),
          50: rgbVar("--surface-50"),
          100: rgbVar("--surface-100"),
          200: rgbVar("--surface-200"),
          300: rgbVar("--surface-300"),
          400: rgbVar("--surface-400"),
          500: rgbVar("--surface-500"),
          600: rgbVar("--surface-600"),
          700: rgbVar("--surface-700"),
          800: rgbVar("--surface-800"),
          900: rgbVar("--surface-900"),
          950: rgbVar("--surface-950"),
        },
        sidebar: "#1b1b1b",
        canvas: "#222222",
      },
      spacing: {
        em: "1em",
      },
      /** https://tailwindcss.com/docs/typography-plugin#adding-custom-color-themes */
      typography: ({ theme }) => ({
        slate: {
          css: {
            "--tw-prose-bullets": theme("colors.slate[500]"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    iconsPlugin({
      collections: getIconCollections(["lucide", "ri"]),
    }),
  ],
} satisfies Config
