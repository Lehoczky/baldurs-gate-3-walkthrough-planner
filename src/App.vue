<template>
  <main class="h-dvh text-[#d2d2d2]">
    <div class="grid h-full grid-cols-[auto_500px]">
      <ThePlanningCanvas />

      <TheRightSidebar v-if="isFinished" class="overflow-auto">
        <label class="flex flex-col">
          <span class="mb-1 text-xl">Search</span>
          <input
            v-model="searchText"
            type="text"
            class="rounded-md px-2 py-1 text-lg focus:outline-none focus:ring focus:ring-slate-500"
          />
        </label>

        <RightSidebarRarityGroup
          v-for="(items, rarity) in shownWeapons"
          :key="rarity"
          :rarity="rarity"
          :items="items"
        />
      </TheRightSidebar>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core"

import RightSidebarRarityGroup from "./components/RightSidebarRarityGroup.vue"
import ThePlanningCanvas from "./components/ThePlanningCanvas.vue"
import TheRightSidebar from "./components/TheRightSidebar.vue"
import type { ItemsByRarity, Rarity } from "./types"

const searchText = ref("")
const { data: weaponsByRarity, isFinished } = useFetch(
  "/weapons.json",
  {},
).json<ItemsByRarity>()

const rarities = computed(() => {
  if (!weaponsByRarity.value) {
    return []
  }
  return Object.keys(weaponsByRarity.value) as Rarity[]
})

const shownWeapons = computed<ItemsByRarity | null>(() => {
  if (!weaponsByRarity.value) {
    return null
  }
  if (!searchText.value) {
    return weaponsByRarity.value
  }

  const filteredWeapons = {} as any
  for (const rarity of rarities.value) {
    filteredWeapons[rarity] = weaponsByRarity.value[rarity]!.filter(
      ({ name }) =>
        name.toLowerCase().startsWith(searchText.value.toLowerCase()),
    )

    if (!filteredWeapons[rarity].length) {
      delete filteredWeapons[rarity]
    }
  }
  return filteredWeapons
})
</script>
