<template>
  <component :is="gridForCategory" :entities="shownEntities"></component>
</template>

<script setup lang="ts">
import { useStore } from "../store"
import RightSidebarCompanionGrid from "./RightSidebarCompanionGrid.vue"
import RightSidebarItemGrid from "./RightSidebarItemGrid.vue"
import RightSidebarLocationGrid from "./RightSidebarLocationGrid.vue"

const store = useStore()
const { shownEntities, selectedCategory } = storeToRefs(store)

const gridForCategory = computed(() => {
  switch (selectedCategory.value) {
    case "companions":
      return RightSidebarCompanionGrid
    case "locations":
      return RightSidebarLocationGrid
    default:
      return RightSidebarItemGrid
  }
})
</script>
