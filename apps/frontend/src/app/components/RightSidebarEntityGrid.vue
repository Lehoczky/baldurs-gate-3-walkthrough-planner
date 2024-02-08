<template>
  <component :is="gridForCategory" :entities="shownEntities" />
</template>

<script setup lang="ts">
import { useStore } from "../store"
import RightSidebarCompanionGrid from "./Companion/RightSidebarCompanionGrid.vue"
import RightSidebarItemGrid from "./Item/RightSidebarItemGrid.vue"
import RightSidebarLocationGrid from "./Location/RightSidebarLocationGrid.vue"

const store = useStore()
const { shownEntities, selectedCategoryName } = storeToRefs(store)

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
