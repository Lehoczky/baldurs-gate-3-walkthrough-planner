<script setup lang="ts">
import type { Creature } from "@bg3-walkthrough-planner/types"
import { useElementSize, useVirtualList } from "@vueuse/core"
import { chunk } from "es-toolkit/array"
import { computed, type PropType, toRef, useTemplateRef, watch } from "vue"

import TypeFilter from "./custom-filters/TypeFilter.vue"
import RightSidebarCreature from "./RightSidebarCreature.vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Creature[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const wrapperElement = useTemplateRef("gridWrapper")
const { width } = useElementSize(wrapperElement)

const itemWidth = 196
const columns = computed(() => {
  if (width.value < itemWidth) {
    return 1
  }
  return Math.floor(width.value / itemWidth)
})

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => chunk(props.entities, columns.value)),
  {
    itemHeight: 70,
    overscan: 3,
  },
)
</script>

<template>
  <div class="pr-1" v-bind="containerProps">
    <div ref="gridWrapper" v-bind="wrapperProps">
      <div v-for="row in list" :key="row.index" class="mt-2 mb-4 flex gap-3">
        <RightSidebarCreature
          v-for="creature in row.data"
          :key="creature.name"
          :creature="creature"
        />
      </div>
    </div>

    <Teleport to="#additional-filters" defer>
      <TypeFilter />
    </Teleport>
  </div>
</template>
