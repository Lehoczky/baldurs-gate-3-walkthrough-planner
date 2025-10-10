<script setup lang="ts">
import type { Location } from "@bg3-walkthrough-planner/types"
import { useVirtualList } from "@vueuse/core"
import { computed, type PropType, toRef, watch } from "vue"

import RightSidebarLocation from "./RightSidebarLocation.vue"

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
    itemHeight: 160,
    overscan: 3,
  },
)
</script>

<template>
  <div class="pr-1" v-bind="containerProps">
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
