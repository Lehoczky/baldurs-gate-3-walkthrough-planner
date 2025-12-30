<script setup lang="ts">
import type { Location } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "@/flowchart/useNodeDragAndDrop"

import BaseLocation from "./BaseLocation.vue"

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

<template>
  <BaseLocation
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :location="location"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
