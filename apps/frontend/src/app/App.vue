<template>
  <main class="grid h-dvh grid-cols-[auto_520px] text-[#d2d2d2]">
    <TheFlow />

    <TheRightSidebar v-if="storeLoaded" class="flex flex-col overflow-auto">
      <label class="mb-3 flex flex-col">
        <span class="mb-1 text-xl">Search</span>
        <input
          v-model="searchText"
          type="text"
          class="rounded-md px-2 py-1 text-lg focus:outline-none focus:ring focus:ring-slate-500"
        />
      </label>

      <div class="mb-4">
        <div class="text-xl">Categories</div>
        <!-- <swiper-container slides-per-view="5">
          <swiper-slide v-for="category in categories" :key="category">
            <BButton @click="selectedCategory = category">
              {{ category }}
            </BButton>
          </swiper-slide>
        </swiper-container> -->

        <BButton
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
        >
          {{ category }}
        </BButton>
      </div>

      <RightSidebarEntityGrid class="h-full"></RightSidebarEntityGrid>
    </TheRightSidebar>
  </main>
</template>

<script setup lang="ts">
import { useStore } from "./store"

const store = useStore()
const { fetchStoreData } = store
const { searchText, storeLoaded, categories, selectedCategory } =
  storeToRefs(store)

onMounted(async () => {
  await fetchStoreData()
})
</script>
