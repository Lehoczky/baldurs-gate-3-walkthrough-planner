<template>
  <div>
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

    <Toast position="bottom-left" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "./store"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"
import InputText from "primevue/inputtext"
import { onOfflineReady } from "./hooks/onOfflineReady"

const store = useStore()
const { fetchStoreData } = store
const { searchText, storeLoaded, categories, selectedCategoryName } =
  storeToRefs(store)

const toast = useToast()
onOfflineReady(() => {
  toast.add({
    severity: "info",
    summary: "Ready to work offline",
    life: 3000,
  })
})

fetchStoreData()
</script>
