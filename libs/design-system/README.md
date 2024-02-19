# design-system

Lara preset for PrimeVue, downloaded from <https://tailwind.primevue.org/builder/>.

## Usage

```ts
// main.ts
import "@baldurs-gate-3-walkthrough-planner/drag-and-drop-mobile"

import DesignSystem from "@baldurs-gate-3-walkthrough-planner/design-system"
import PrimeVue, { type PrimeVueConfiguration } from "primevue/config"
import { createApp } from "vue"

import App from "./app/App.vue"

const primeVueOptions: PrimeVueConfiguration = {
  unstyled: true,
  pt: DesignSystem,
}

createApp(App).use(PrimeVue, primeVueOptions).mount("#root")
```

## Building

Run `nx build design-system` to build the library.
