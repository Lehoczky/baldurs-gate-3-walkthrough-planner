<script setup lang="ts">
import type { Companion } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "@/flowchart/useNodeDragAndDrop"

import BaseCompanion from "./BaseCompanion.vue"

const props = defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})

const dragData = computed(() => ({
  type: "companion",
  ...props.companion,
}))
</script>

<template>
  <BaseCompanion
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :companion="companion"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
