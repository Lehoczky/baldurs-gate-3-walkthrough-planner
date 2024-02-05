<template>
  <BaseLocation
    draggable="true"
    :location="location"
    @dragstart="onDragStart"
  />
</template>

<script setup lang="ts">
import type { Location } from "@baldurs-gate-3-walkthrough-planner/types"

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
})

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    const dragData = {
      type: "location",
      ...props.location,
    }
    event.dataTransfer.setData(
      "application/vueflow-node",
      JSON.stringify(dragData),
    )
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
