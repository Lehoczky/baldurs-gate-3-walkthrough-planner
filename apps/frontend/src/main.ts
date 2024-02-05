import "./styles.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import PrimeVue, { type PrimeVueConfiguration } from "primevue/config"
import DesignSystem from "./design-system"
import App from "./app/App.vue"
import ToastService from "primevue/toastservice"

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
