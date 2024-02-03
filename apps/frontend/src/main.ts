import "./styles.css"
import { register } from "swiper/element/bundle"
import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./app/App.vue"

register()

const pinia = createPinia()

createApp(App).use(pinia).mount("#root")
