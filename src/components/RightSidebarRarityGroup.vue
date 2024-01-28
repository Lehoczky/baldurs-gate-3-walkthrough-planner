<template>
  <div>
    <div class="mb-2 mt-4 text-2xl">{{ rarity }}</div>
    <div class="flex flex-wrap gap-2">
      <RightSidebarItem
        v-for="item in items"
        :key="item.name"
        :item="item"
        :rarity="rarity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item, Rarity } from "../types"
import RightSidebarItem from "./RightSidebarItem.vue"

defineProps({
  rarity: {
    type: String as PropType<Rarity>,
    required: true,
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
})
</script>
