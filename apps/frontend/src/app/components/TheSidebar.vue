<template>
  <div
    class="bg-sidebar flex gap-6 overflow-auto p-4 shadow-md max-lg:justify-center max-md:flex-col lg:flex-col"
    @focusin="deselectElements()"
  >
    <DataFilters v-if="showDataFilters" />
    <LazyErrorMessage v-if="error" />
    <EntityGrid class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from "../hooks/useBreakpoints"
import { useDeselectElements } from "../hooks/useDeselectElements"
import { useDataStore } from "../store/data"

const dataStore = useDataStore()
const { error } = storeToRefs(dataStore)

const LazyErrorMessage = defineAsyncComponent({
  loader: () => import("./Sidebar/DataLoadingErrorMessage.vue"),
  delay: 0,
})

const breakpoints = useBreakpoints()
const showDataFilters = breakpoints.greater("sm")

const { deselectElements } = useDeselectElements()
</script>
