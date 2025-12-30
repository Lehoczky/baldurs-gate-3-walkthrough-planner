<script setup lang="ts">
import type { Item, Rarity } from "@bg3-walkthrough-planner/types"
import { useElementSize, useVirtualList } from "@vueuse/core"
import { chunk } from "es-toolkit/array"
import { storeToRefs } from "pinia"
import Select from "primevue/select"
import { computed, type PropType, useTemplateRef } from "vue"

import { useDataStore } from "../../store/data"
import RightSidebarItem from "./RightSidebarItem.vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Item[]>,
    required: true,
  },
})

const wrapperElement = useTemplateRef("gridWrapper")
const { width } = useElementSize(wrapperElement)

const itemWidth = 110
const columns = computed(() => {
  if (width.value < itemWidth) {
    return 1
  }
  return Math.floor(width.value / itemWidth)
})

const { list, containerProps, wrapperProps } = useVirtualList(
  computed(() => chunk(props.entities, columns.value)),
  {
    itemHeight: 118,
    overscan: 16,
  },
)

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
  <div class="pr-1" v-bind="containerProps">
    <div ref="gridWrapper" v-bind="wrapperProps">
      <div v-for="row in list" :key="row.index" class="mb-2 flex gap-2">
        <RightSidebarItem
          v-for="item in row.data"
          :key="item.name"
          :item="item"
        />
      </div>
    </div>

    <Teleport to="#additional-filters" defer>
      <label>
        <div class="mb-1 text-xl">Rarity</div>
        <Select
          :options="rarities"
          fluid
          show-clear
          @update:model-value="applyRarityFilter($event)"
        />
      </label>
    </Teleport>
  </div>
</template>
