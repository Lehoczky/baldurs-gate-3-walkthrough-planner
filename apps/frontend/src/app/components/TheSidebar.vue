<template>
  <div class="bg-sidebar flex flex-col overflow-auto p-4 shadow-md">
    <div class="mb-6">
      <label class="mb-2 flex flex-col">
        <div class="mb-1 text-xl">Search</div>
        <InputText v-model="searchText" type="text" />
      </label>

      <label>
        <div class="mb-1 text-xl">Categories</div>

        <CategorySelect v-model="selectedCategoryName" :options="categories" />
      </label>
    </div>

    <LazyErrorMessage v-if="error" severity="error" :closable="false">
      <div>Failed to load necessary data.</div>
      <div class="text-sm">
        Please open a bug ticket on
        <a
          href="https://github.com/Lehoczky/baldurs-gate-3-walkthrough-planner"
          target="_blank"
          class="underline underline-offset-2"
          >Github</a
        >.
      </div>
    </LazyErrorMessage>

    <EntityGrid class="h-full" />
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext"

import { useDataStore } from "../store/data"

const dataStore = useDataStore()
const { searchText, categories, selectedCategoryName, error } =
  storeToRefs(dataStore)

const LazyErrorMessage = defineAsyncComponent({
  loader: () => import("primevue/message"),
  delay: 0,
})
</script>
