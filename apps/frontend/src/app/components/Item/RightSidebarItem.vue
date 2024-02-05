<template>
  <BaseItem draggable="true" :item="item" @dragstart="onDragStart" />
</template>

<script setup lang="ts">
import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    const dragData = {
      type: "item",
      ...props.item,
    }
    event.dataTransfer.setData(
      "application/vueflow-node",
      JSON.stringify(dragData),
    )
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
