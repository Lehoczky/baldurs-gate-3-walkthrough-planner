import { useRegisterSW } from "virtual:pwa-register/vue"

/**
 * Triggers when the service worker finished
 * caching everything that's needed for the app
 * to work offline.
 */
export function onOfflineReady(hook: () => void) {
  useRegisterSW({
    onOfflineReady: () => hook(),
  })
}
