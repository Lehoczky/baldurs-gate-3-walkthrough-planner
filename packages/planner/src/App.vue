<script setup lang="ts">
import { useEventListener } from "@vueuse/core"
import { storeToRefs } from "pinia"
import Toast from "primevue/toast"

import FloatingDataFilters from "@/data-filters/FloatingDataFilters.vue"
import TheFlow from "@/flowchart/TheFlow.vue"
import TheSidebar from "@/sidebar/TheSidebar.vue"
import { useDataStore } from "@/store/data"
import { useStorageStore } from "@/store/storage"
import { useBreakpoints } from "@/ui/useBreakpoints"

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

const breakpoints = useBreakpoints()
const showFloatingFilters = breakpoints.smallerOrEqual("sm")

fetchStoreData()
</script>

<template>
  <div>
    <main
      class="grid h-dvh text-[#d2d2d2] max-lg:grid-rows-[55%_auto] lg:grid-cols-[auto_528px]"
    >
      <FloatingDataFilters
        v-if="showFloatingFilters"
        class="absolute top-0 right-0 left-0 z-20"
      />
      <TheFlow />
      <TheSidebar v-if="storeLoaded" />
    </main>

    <Toast position="bottom-left" />
  </div>
</template>
