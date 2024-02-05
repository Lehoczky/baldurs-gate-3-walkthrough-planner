<template>
  <main class="grid h-dvh grid-cols-[auto_528px] text-[#d2d2d2]">
    <TheFlow />

    <TheRightSidebar v-if="storeLoaded" class="flex flex-col overflow-auto">
      <div class="mb-6">
        <label class="mb-2 flex flex-col">
          <div class="mb-1 text-xl">Search</div>
          <InputText v-model="searchText" type="text" />
        </label>

        <label>
          <div class="mb-1 text-xl">Categories</div>

          <CategorySelect
            v-model="selectedCategoryName"
            :options="categories"
          />
        </label>
      </div>

      <RightSidebarEntityGrid class="h-full" />
    </TheRightSidebar>
  </main>
</template>

<script setup lang="ts">
import { useStore } from "./store"

import InputText from "primevue/inputtext"

const store = useStore()
const { fetchStoreData } = store
const { searchText, storeLoaded, categories, selectedCategoryName } =
  storeToRefs(store)

fetchStoreData()
</script>
