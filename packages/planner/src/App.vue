<script setup lang="ts">
import { useEventListener } from "@vueuse/core"
import { storeToRefs } from "pinia"
import Splitter from "primevue/splitter"
import SplitterPanel from "primevue/splitterpanel"
import Toast from "primevue/toast"
import { computed } from "vue"

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
const isSmallScreen = breakpoints.smallerOrEqual("sm")
const splitterLayout = computed(() => {
  return isSmallScreen.value ? "vertical" : "horizontal"
})
const splitterStorageKey = import.meta.env.DEV ? null : "planner:splitter-size"

fetchStoreData()
</script>

<template>
  <div>
    <main class="grid text-[#d2d2d2]">
      <FloatingDataFilters
        v-if="isSmallScreen"
        class="absolute top-0 right-0 left-0 z-20"
      />

      <Splitter
        :layout="splitterLayout"
        :state-key="splitterStorageKey"
        state-storage="local"
        class="h-dvh"
      >
        <SplitterPanel :size="75">
          <TheFlow />
        </SplitterPanel>

        <SplitterPanel v-if="storeLoaded">
          <TheSidebar class="h-dvh lg:min-w-[506px]" />
        </SplitterPanel>
      </Splitter>
    </main>

    <Toast position="bottom-left" />
  </div>
</template>
