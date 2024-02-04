<template>
  <div v-bind="containerProps">
    <div v-bind="wrapperProps">
      <RightSidebarLocation
        v-for="location in list"
        :key="location.index"
        :location="location.data"
        class="mb-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Location } from "@baldurs-gate-3-walkthrough-planner/types"
import { useVirtualList } from "@vueuse/core"
import type { PropType } from "vue"

const props = defineProps({
  entities: {
    type: Array as PropType<Location[]>,
    required: true,
  },
})

watch(toRef(props, "entities"), () => scrollTo(0))

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  computed(() => props.entities),
  {
    itemHeight: 152,
    overscan: 3,
  },
)
</script>
