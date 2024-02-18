<template>
  <div
    class="bg-sidebar flex gap-6 overflow-auto p-4 shadow-md max-lg:justify-center lg:flex-col"
  >
    <div>
      <label class="mb-2 flex flex-col">
        <div class="mb-1 text-xl">Search</div>
        <InputText id="search" v-model="searchText" type="search" />
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
import { useEventListener } from "@vueuse/core"
import InputText from "primevue/inputtext"

import { useDataStore } from "../store/data"

const dataStore = useDataStore()
const { searchText, categories, selectedCategoryName, error } =
  storeToRefs(dataStore)

const LazyErrorMessage = defineAsyncComponent({
  loader: () => import("primevue/message"),
  delay: 0,
})

useEventListener("keydown", (event) => {
  const { key, ctrlKey } = event

  if (ctrlKey && key === "k") {
    event.preventDefault()
    const searchInput = document.getElementById("search")
    searchInput.focus()
  }
})
</script>
