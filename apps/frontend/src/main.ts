import "./styles.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import PrimeVue from "primevue/config"
import DesignSystem from "./design-system"
import App from "./app/App.vue"

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(PrimeVue, {
    unstyled: true,
    pt: DesignSystem,
  })
  .mount("#root")
