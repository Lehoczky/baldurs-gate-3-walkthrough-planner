<template>
  <div>
    <main class="grid h-dvh grid-cols-[auto_528px] text-[#d2d2d2]">
      <TheFlow />
      <TheSidebar v-if="storeLoaded" />
    </main>

    <Toast position="bottom-left" />
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from "./store/data"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"

import { onOfflineReady } from "./hooks/onOfflineReady"
import { useStorageStore } from "./store/storage"
import { useEventListener } from "@vueuse/core"

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

fetchStoreData()
</script>
