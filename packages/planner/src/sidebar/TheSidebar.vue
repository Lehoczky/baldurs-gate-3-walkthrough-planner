<script setup lang="ts">
import { storeToRefs } from "pinia"
import { defineAsyncComponent } from "vue"

import DataFilters from "@/data-filters/DataFilters.vue"
import { useDeselectElements } from "@/flowchart/useDeselectElements"
import { useDataStore } from "@/store/data"
import { useBreakpoints } from "@/ui/useBreakpoints"

import EntityGrid from "./EntityGrid.vue"

const dataStore = useDataStore()
const { error } = storeToRefs(dataStore)

const LazyErrorMessage = defineAsyncComponent({
  loader: () => import("./DataLoadingErrorMessage.vue"),
  delay: 0,
})

const breakpoints = useBreakpoints()
const showDataFilters = breakpoints.greater("sm")

const { deselectElements } = useDeselectElements()
</script>

<template>
  <div
    class="flex gap-6 overflow-auto bg-surface-900 p-4 shadow-md max-lg:justify-center max-md:flex-col lg:flex-col"
    @focusin="deselectElements()"
  >
    <DataFilters v-if="showDataFilters" />
    <LazyErrorMessage v-if="error" />
    <EntityGrid class="h-full" />
  </div>
</template>
