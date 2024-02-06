import { useRegisterSW } from "virtual:pwa-register/vue"

export function onOfflineReady(hook: () => void) {
  useRegisterSW({
    onOfflineReady: () => hook(),
  })
}
