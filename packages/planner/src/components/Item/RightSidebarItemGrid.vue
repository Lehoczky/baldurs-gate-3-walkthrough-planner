<script setup lang="ts">
import type { Item } from "@bg3-walkthrough-planner/types"
import { useVirtualList } from "@vueuse/core"
import { chunk } from "es-toolkit/array"
import { computed, type PropType, toRef, watch } from "vue"

import RightSidebarItem from "./RightSidebarItem.vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Item[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => chunk(props.entities, 4)),
  {
    itemHeight: 118,
    overscan: 16,
  },
)
</script>

<template>
  <div class="pr-1" v-bind="containerProps">
    <div v-bind="wrapperProps">
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
