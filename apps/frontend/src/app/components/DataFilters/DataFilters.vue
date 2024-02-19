<template>
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
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core"
import InputText from "primevue/inputtext"

import { useDataStore } from "../../store/data"

const dataStore = useDataStore()
const { searchText, categories, selectedCategoryName } = storeToRefs(dataStore)

useEventListener("keydown", (event) => {
  const { key, ctrlKey } = event

  if (ctrlKey && key === "k") {
    event.preventDefault()
    const searchInput = document.getElementById("search")
    searchInput.focus()
  }
})
</script>
