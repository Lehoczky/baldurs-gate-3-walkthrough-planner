<template>
  <main class="h-dvh grid grid-cols-[auto_520px] text-[#d2d2d2]">
    <ThePlanningCanvas />

    <TheRightSidebar v-if="isFinished" class="flex flex-col overflow-auto">
      <label class="mb-4 flex flex-col">
        <span class="mb-1 text-xl">Search</span>
        <input
          v-model="searchText"
          type="text"
          class="rounded-md px-2 py-1 text-lg focus:outline-none focus:ring focus:ring-slate-500"
        />
      </label>

      <RightSidebarItemGrid
        :items="shownWeapons"
        class="h-full"
      ></RightSidebarItemGrid>
    </TheRightSidebar>
  </main>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core"
import ThePlanningCanvas from "./components/ThePlanningCanvas.vue"
import TheRightSidebar from "./components/TheRightSidebar.vue"
import RightSidebarItemGrid from "./components/RightSidebarItemGrid.vue"
import type { SavedWikiData } from "@baldurs-gate-3-walkthrough-planner/types"

const searchText = ref("")
const { data, isFinished } = useFetch("/data.json", {
  initialData: {},
}).json<SavedWikiData>()

const weapons = computed(() => data.value.weapons ?? [])

const shownWeapons = computed(() => {
  if (!weapons.value.length) {
    return null
  }
  if (!searchText.value) {
    return weapons.value
  }

  return weapons.value.filter(({ name }) =>
    name.toLowerCase().startsWith(searchText.value.toLowerCase()),
  )
})
</script>
