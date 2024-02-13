<template>
  <div class="flex flex-col overflow-auto bg-[#1b1b1b] p-4 shadow-md">
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

    <EntityGrid class="h-full" />
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext"

import { useDataStore } from "../store/data"

const dataStore = useDataStore()
const { searchText, categories, selectedCategoryName } = storeToRefs(dataStore)
</script>
