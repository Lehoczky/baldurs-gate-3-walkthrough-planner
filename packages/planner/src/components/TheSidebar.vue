<script setup lang="ts">
import { storeToRefs } from "pinia"
import { defineAsyncComponent } from "vue"

import { useBreakpoints } from "../hooks/useBreakpoints"
import { useDeselectElements } from "../hooks/useDeselectElements"
import { useDataStore } from "../store/data"
import DataFilters from "./DataFilters/DataFilters.vue"
import EntityGrid from "./Sidebar/EntityGrid.vue"

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

<template>
  <div
    class="bg-surface-900 flex gap-6 overflow-auto p-4 shadow-md max-lg:justify-center max-md:flex-col lg:flex-col"
    @focusin="deselectElements()"
  >
    <DataFilters v-if="showDataFilters" />
    <LazyErrorMessage v-if="error" />
    <EntityGrid class="h-full" />
  </div>
</template>
