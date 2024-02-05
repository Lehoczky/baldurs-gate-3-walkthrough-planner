<template>
  <BaseCompanion
    draggable="true"
    :companion="companion"
    @dragstart="onDragStart"
  />
</template>

<script setup lang="ts">
import type { Companion } from "@baldurs-gate-3-walkthrough-planner/types"

const props = defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    const dragData = {
      type: "companion",
      ...props.companion,
    }
    event.dataTransfer.setData(
      "application/vueflow-node",
      JSON.stringify(dragData),
    )
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
