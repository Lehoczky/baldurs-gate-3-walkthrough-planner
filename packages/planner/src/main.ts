import "./style.css"

import { enableDragDropTouch } from "@dragdroptouch/drag-drop-touch"
import { definePreset } from "@primeuix/themes"
import Aura from "@primeuix/themes/aura"
import { createPinia } from "pinia"
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"
import { createApp } from "vue"

import App from "./App.vue"
enableDragDropTouch(document, document, {
  allowDragScroll: false,
  isPressHoldMode: true,
})
const pinia = createPinia()

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: definePreset(Aura, {
        semantic: {
          primary: {
            50: "{orange.50}",
            100: "{orange.100}",
            200: "{orange.200}",
            300: "{orange.300}",
            400: "{orange.400}",
            500: "{orange.500}",
            600: "{orange.600}",
            700: "{orange.700}",
            800: "{orange.800}",
            900: "{orange.900}",
            950: "{orange.950}",
          },
          colorScheme: {
            dark: {
              surface: {
                0: "#ffffff",
                50: "{zinc.50}",
                100: "{zinc.100}",
                200: "{zinc.200}",
                300: "{zinc.300}",
                400: "{zinc.400}",
                500: "{zinc.500}",
                600: "{zinc.600}",
                700: "{zinc.700}",
                800: "{zinc.800}",
                900: "{zinc.900}",
                950: "{zinc.950}",
              },
              formField: {
                background: "{surface.800}",
              },
            },
          },
        },
      }),
      options: {
        cssLayer: {
          name: "primevue",
          order: "theme, base, primevue",
        },
      },
    },
  })
  .use(ToastService)
  .use(pinia)
  .mount("#app")
