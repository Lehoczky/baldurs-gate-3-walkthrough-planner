<template>
  <main class="grid h-dvh grid-cols-[auto_520px] text-[#d2d2d2]">
    <TheFlow />

    <TheRightSidebar v-if="storeLoaded" class="flex flex-col overflow-auto">
      <label class="mb-3 flex flex-col">
        <span class="mb-1 text-xl">Search</span>
        <InputText v-model="searchText" type="text" />
      </label>

      <label class="mb-4">
        <div class="mb-1 text-xl">Categories</div>

        <Dropdown
          scroll-height="400px"
          v-model="selectedCategory"
          :options="categories"
          filter
        />
      </label>

      <RightSidebarEntityGrid class="h-full" />
    </TheRightSidebar>
  </main>
</template>

<script setup lang="ts">
import { useStore } from "./store"
import Dropdown from "primevue/dropdown"

import InputText from "primevue/inputtext"

const store = useStore()
const { fetchStoreData } = store
const { searchText, storeLoaded, categories, selectedCategory } =
  storeToRefs(store)

onMounted(async () => {
  await fetchStoreData()
})
</script>
