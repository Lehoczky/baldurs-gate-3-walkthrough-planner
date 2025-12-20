<script setup lang="ts">
import type { Companion } from "@bg3-walkthrough-planner/types"
import { useElementSize, useVirtualList } from "@vueuse/core"
import { chunk } from "es-toolkit/array"
import { computed, type PropType, toRef, useTemplateRef, watch } from "vue"

import RightSidebarCompanion from "./RightSidebarCompanion.vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Companion[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const wrapperElement = useTemplateRef("gridWrapper")
const { width } = useElementSize(wrapperElement)

const itemWidth = 150
const columns = computed(() => {
  if (width.value < itemWidth) {
    return 1
  }
  return Math.floor(width.value / itemWidth)
})

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => chunk(props.entities, columns.value)),
  {
    itemHeight: 158,
    overscan: 3,
  },
)
</script>

<template>
  <div class="pr-1" v-bind="containerProps">
    <div ref="gridWrapper" v-bind="wrapperProps">
      <div v-for="row in list" :key="row.index" class="mb-2 flex gap-2">
        <RightSidebarCompanion
          v-for="companion in row.data"
          :key="companion.name"
          :companion="companion"
        />
      </div>
    </div>
  </div>
</template>
