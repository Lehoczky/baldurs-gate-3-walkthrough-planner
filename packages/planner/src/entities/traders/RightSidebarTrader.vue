<script setup lang="ts">
import type { Trader } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "@/flowchart/useNodeDragAndDrop"

import BaseLocation from "./BaseTrader.vue"

const props = defineProps({
  trader: {
    type: Object as PropType<Trader>,
    required: true,
  },
})

const dragData = computed(() => ({
  nodeType: "trader",
  ...props.trader,
}))
</script>

<template>
  <BaseLocation
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :trader="trader"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
