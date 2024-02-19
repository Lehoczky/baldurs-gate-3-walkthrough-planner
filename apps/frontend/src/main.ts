import "./styles.css"
import "@baldurs-gate-3-walkthrough-planner/drag-and-drop-mobile"

import { createPinia } from "pinia"
import PrimeVue, { type PrimeVueConfiguration } from "primevue/config"
import ToastService from "primevue/toastservice"
import { createApp } from "vue"

import App from "./app/App.vue"
import DesignSystem from "./design-system"

const pinia = createPinia()

const primeVueOptions: PrimeVueConfiguration = {
  unstyled: true,
  pt: DesignSystem,
}

createApp(App)
  .use(pinia)
  .use(PrimeVue, primeVueOptions)
  .use(ToastService)
  .mount("#root")
