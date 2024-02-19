<template>
  <div>
    <main
      class="grid h-dvh text-[#d2d2d2] max-lg:grid-rows-[55%_auto] lg:grid-cols-[auto_528px]"
    >
      <FloatingDataFilters
        v-if="showFloatingFilters"
        class="absolute left-0 right-0 top-0 z-20"
      />
      <TheFlow />
      <TheSidebar v-if="storeLoaded" />
    </main>

    <Toast position="bottom-left" />
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"

import { onOfflineReady } from "./hooks/onOfflineReady"
import { useBreakpoints } from "./hooks/useBreakpoints"
import { useDataStore } from "./store/data"
import { useStorageStore } from "./store/storage"

const dataStore = useDataStore()
const { fetchStoreData } = dataStore
const { storeLoaded } = storeToRefs(dataStore)

const storageStore = useStorageStore()
const { hasUnsavedChanges } = storeToRefs(storageStore)

// Turning it off during development, because
// it's annoying.
if (!import.meta.env.DEV) {
  useEventListener("beforeunload", warnWhenLeavingTheSiteWithUnsavedChanges)
}

function warnWhenLeavingTheSiteWithUnsavedChanges(event: BeforeUnloadEvent) {
  if (hasUnsavedChanges.value) {
    event.preventDefault()
  }
}

const toast = useToast()
onOfflineReady(() => {
  toast.add({
    severity: "info",
    summary: "Ready to work offline",
    life: 3000,
  })
})

const breakpoints = useBreakpoints()
const showFloatingFilters = breakpoints.smallerOrEqual("sm")

fetchStoreData()
</script>
