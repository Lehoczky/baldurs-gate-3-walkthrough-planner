<script setup lang="ts">
import { storeToRefs } from "pinia"
import { computed } from "vue"

import RightSidebarCompanionGrid from "@/entities/companions/RightSidebarCompanionGrid.vue"
import RightSidebarItemGrid from "@/entities/items/RightSidebarItemGrid.vue"
import RightSidebarLocationGrid from "@/entities/locations/RightSidebarLocationGrid.vue"
import RightSidebarSpellGrid from "@/entities/spells/RightSidebarSpellGrid.vue"
import { useDataStore } from "@/store/data"

const dataStore = useDataStore()
const { shownEntities, selectedCategoryName } = storeToRefs(dataStore)

const gridForCategory = computed(() => {
  switch (selectedCategoryName.value) {
    case "bosses":
    case "companions":
      return RightSidebarCompanionGrid
    case "locations":
      return RightSidebarLocationGrid
    case "spells":
      return RightSidebarSpellGrid
    default:
      return RightSidebarItemGrid
  }
})
</script>

<template>
  <component
    :is="gridForCategory"
    :key="selectedCategoryName"
    :entities="shownEntities"
  />
</template>
