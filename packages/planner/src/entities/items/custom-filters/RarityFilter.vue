<script setup lang="ts">
import type { Item, Rarity } from "@bg3-walkthrough-planner/types"
import { storeToRefs } from "pinia"
import Select from "primevue/select"

import { useDataStore } from "@/store/data"

const dataStore = useDataStore()
const { addFilter } = dataStore
const { selectedCategoryName } = storeToRefs(dataStore)

const rarities: Rarity[] = [
  "Legendary",
  "Very Rare",
  "Rare",
  "Uncommon",
  "Common",
  "Story Item",
  "???",
]

function applyRarityFilter(rarity: Rarity | null) {
  addFilter({
    category: selectedCategoryName.value,
    name: "rarity",
    filter: rarity ? (entity: Item) => entity.rarity === rarity : null,
  })
}
</script>

<template>
  <label>
    <div class="mb-1 text-xl">Rarity</div>
    <Select
      :options="rarities"
      fluid
      show-clear
      @update:model-value="applyRarityFilter($event)"
    />
  </label>
</template>
