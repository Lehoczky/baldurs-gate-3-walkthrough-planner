<template>
  <div v-bind="containerProps">
    <div v-bind="wrapperProps">
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

<script setup lang="ts">
import type { Companion } from "@baldurs-gate-3-walkthrough-planner/types"
import { useVirtualList } from "@vueuse/core"
import type { PropType } from "vue"
import { chunk } from "lodash-es"

const props = defineProps({
  entities: {
    type: Array as PropType<Companion[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => chunk(props.entities, 3)),
  {
    itemHeight: 158,
    overscan: 3,
  },
)
</script>
