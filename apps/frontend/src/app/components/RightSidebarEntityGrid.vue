<template>
  <component :is="gridForCategory" :entities="shownEntities" />
</template>

<script setup lang="ts">
import { useDataStore } from "../store/data"
import RightSidebarCompanionGrid from "./Companion/RightSidebarCompanionGrid.vue"
import RightSidebarItemGrid from "./Item/RightSidebarItemGrid.vue"
import RightSidebarLocationGrid from "./Location/RightSidebarLocationGrid.vue"

const dataStore = useDataStore()
const { shownEntities, selectedCategoryName } = storeToRefs(dataStore)

const gridForCategory = computed(() => {
  switch (selectedCategoryName.value) {
    case "bosses":
    case "companions":
      return RightSidebarCompanionGrid
    case "locations":
      return RightSidebarLocationGrid
    default:
      return RightSidebarItemGrid
  }
})
</script>
