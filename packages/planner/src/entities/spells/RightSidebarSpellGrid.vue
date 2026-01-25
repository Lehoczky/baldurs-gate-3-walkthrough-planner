<script setup lang="ts">
import type { Spell } from "@bg3-walkthrough-planner/types"
import { useElementSize, useVirtualList } from "@vueuse/core"
import { chunk } from "es-toolkit/array"
import { computed, type PropType, toRef, useTemplateRef, watch } from "vue"

import LevelFilter from "./custom-filters/LevelFilter.vue"
import SchoolFilter from "./custom-filters/SchoolFilter.vue"
import RightSidebarSpell from "./RightSidebarSpell.vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Spell[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const wrapperElement = useTemplateRef("gridWrapper")
const { width } = useElementSize(wrapperElement)

const itemWidth = 120
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
        <RightSidebarSpell
          v-for="spell in row.data"
          :key="spell.name"
          :spell="spell"
        />
      </div>
    </div>

    <Teleport to="#additional-filters" defer>
      <LevelFilter />
      <SchoolFilter />
    </Teleport>
  </div>
</template>
