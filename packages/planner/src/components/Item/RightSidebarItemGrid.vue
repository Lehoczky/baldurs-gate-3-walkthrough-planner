<script setup lang="ts">
import type { Item } from "@bg3-walkthrough-planner/types"
import { useElementSize, useVirtualList } from "@vueuse/core"
import { chunk } from "es-toolkit/array"
import { computed, type PropType, toRef, useTemplateRef, watch } from "vue"

import RightSidebarItem from "./RightSidebarItem.vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Item[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const wrapperElement = useTemplateRef("gridWrapper")
const { width } = useElementSize(wrapperElement)

const itemWidth = 110
const columns = computed(() => {
  if (width.value < itemWidth) {
    return 1
  }
  return Math.floor(width.value / itemWidth)
})

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => chunk(props.entities, columns.value)),
  {
    itemHeight: 118,
    overscan: 16,
  },
)
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
  </div>
</template>
