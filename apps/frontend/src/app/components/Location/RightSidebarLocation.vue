<template>
  <BaseLocation
    draggable="true"
    :location="location"
    @dragstart="onDragStart($event, dragData)"
  />
</template>

<script setup lang="ts">
import type { Location } from "@baldurs-gate-3-walkthrough-planner/types"

import { onDragStart } from "../../hooks/useNodeDragAndDrop"

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
})

const dragData = computed(() => ({
  type: "location",
  ...props.location,
}))
</script>
