<script setup lang="ts">
import { storeToRefs } from "pinia"
import InputText from "primevue/inputtext"

import { useDataStore } from "../store/data"
import CategorySelect from "./CategorySelect.vue"

const dataStore = useDataStore()
const { searchText, categories, selectedCategoryName } = storeToRefs(dataStore)
</script>

<template>
  <div>
    <label class="mb-2 flex flex-col">
      <div class="mb-1 text-xl">Search</div>
      <InputText id="search" v-model="searchText" type="search" />
    </label>

    <div id="additional-filters" class="grid grid-cols-2 gap-4">
      <label>
        <div class="mb-1 text-xl">Categories</div>
        <CategorySelect v-model="selectedCategoryName" :options="categories" />
      </label>
    </div>
  </div>
</template>
