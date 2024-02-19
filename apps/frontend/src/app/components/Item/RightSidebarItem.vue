<template>
  <BaseItem
    draggable="true"
    class="has-[[data-mobile-drag-enabled]]:!bg-surface-700 data-mobile-drag-enabled:!bg-surface-700 transition-color duration-200"
    :item="item"
    @dragstart="onDragStart($event, dragData)"
  />
</template>

<script setup lang="ts">
import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"

import { onDragStart } from "../../hooks/useNodeDragAndDrop"

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const dragData = computed(() => ({
  type: "item",
  ...props.item,
}))
</script>
