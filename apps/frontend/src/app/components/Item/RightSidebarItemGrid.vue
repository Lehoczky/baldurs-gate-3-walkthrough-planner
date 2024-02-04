<template>
  <div v-bind="containerProps">
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

<script setup lang="ts">
import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"
import { useVirtualList } from "@vueuse/core"
import type { PropType } from "vue"
import { chunk } from "lodash-es"

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
    overscan: 20,
  },
)
</script>
